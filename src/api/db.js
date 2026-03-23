// Firestore REST API client — no Firebase SDK imported here so no remote-URL
// strings end up in the content-script bundle (Chrome Web Store policy).
const PROJECT = 'gm-intel';
const FS = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;
const BATCH = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents:batchWrite`;

// --- Value converters ---

function toFs(v) {
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === 'boolean') return { booleanValue: v };
  if (typeof v === 'number') return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  if (typeof v === 'string') return { stringValue: v };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(toFs) } };
  if (typeof v === 'object') return { mapValue: { fields: fieldsOf(v) } };
  return { nullValue: null };
}

function fieldsOf(obj) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, toFs(v)]));
}

function fromFs(v) {
  if ('stringValue' in v) return v.stringValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return v.doubleValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('nullValue' in v) return null;
  if ('timestampValue' in v) {
    const d = new Date(v.timestampValue);
    // Return compat object so callers can keep using .toDate()
    return { toDate: () => d };
  }
  if ('arrayValue' in v) return (v.arrayValue.values ?? []).map(fromFs);
  if ('mapValue' in v) return fromFsFields(v.mapValue.fields ?? {});
  return null;
}

function fromFsFields(fields) {
  return Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, fromFs(v)]));
}

function docToObj(doc) {
  const id = doc.name.split('/').pop();
  return { id, ...fromFsFields(doc.fields ?? {}) };
}

// --- REST helpers ---

async function fsRunQuery(parentPath, collectionId, orderField, dir, limit, idToken) {
  const query = {
    from: [{ collectionId }],
    orderBy: [{ field: { fieldPath: orderField }, direction: dir }],
  };
  if (limit) query.limit = limit;
  const res = await fetch(`${FS}/${parentPath}:runQuery`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${idToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ structuredQuery: query }),
  });
  if (!res.ok) throw new Error(`Firestore runQuery ${parentPath}: ${res.status}`);
  const rows = await res.json();
  return rows.filter(r => r.document).map(r => docToObj(r.document));
}

async function fsPatch(docPath, data, idToken) {
  const res = await fetch(`${FS}/${docPath}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${idToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: fieldsOf(data) }),
  });
  if (!res.ok) throw new Error(`Firestore PATCH ${docPath}: ${res.status}`);
}

// Write a document and atomically set one field to the server timestamp.
async function fsBatchWrite(docPath, data, serverTsField, idToken) {
  const name = `projects/${PROJECT}/databases/(default)/documents/${docPath}`;
  const body = {
    writes: [{
      update: { name, fields: fieldsOf(data) },
      updateTransforms: [{ fieldPath: serverTsField, setToServerValue: 'REQUEST_TIME' }],
    }],
  };
  const res = await fetch(BATCH, {
    method: 'POST',
    headers: { Authorization: `Bearer ${idToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Firestore batchWrite ${docPath}: ${res.status}`);
}

async function fsGet(docPath, idToken) {
  const res = await fetch(`${FS}/${docPath}`, {
    headers: { Authorization: `Bearer ${idToken}` },
  });
  if (!res.ok) throw new Error(`Firestore GET ${docPath}: ${res.status}`);
  return res.json();
}

// --- Public API ---

export function subscribeToEmails(userId, idToken, callback, onError, limitCount = 20) {
  async function fetchOnce() {
    try {
      const docs = await fsRunQuery(`users/${userId}`, 'emails', 'sentAt', 'DESCENDING', limitCount, idToken);
      callback(docs);
    } catch (e) {
      console.error('Gmail Intel: subscribeToEmails error', e);
      onError?.(e);
    }
  }
  fetchOnce();
  const id = setInterval(fetchOnce, 30_000);
  return () => clearInterval(id);
}

export function subscribeToEvents(userId, emailId, idToken, callback, onError) {
  async function fetchOnce() {
    try {
      const docs = await fsRunQuery(
        `users/${userId}/emails/${emailId}`, 'events', 'timestamp', 'DESCENDING', null, idToken
      );
      callback(docs);
    } catch (e) {
      console.error('Gmail Intel: subscribeToEvents error', emailId, e);
      onError?.(e);
    }
  }
  fetchOnce();
  const id = setInterval(fetchOnce, 30_000);
  return () => clearInterval(id);
}

export async function getEmailWithEvents(userId, emailId, idToken) {
  const [emailDoc, events] = await Promise.all([
    fsGet(`users/${userId}/emails/${emailId}`, idToken).then(doc => (doc.fields ? docToObj(doc) : null)),
    fsRunQuery(`users/${userId}/emails/${emailId}`, 'events', 'timestamp', 'DESCENDING', null, idToken),
  ]);
  if (!emailDoc) return null;
  return { ...emailDoc, events };
}

export async function logEmailSent(emailData, idToken) {
  try {
    const { emailId, userId, ...rest } = emailData;
    await fsBatchWrite(`users/${userId}/emails/${emailId}`, rest, 'sentAt', idToken);
    try {
      await fsPatch(`emailLookup/${emailId}`, { userId, sentAt: Date.now() }, idToken);
    } catch (e) {
      console.error('Gmail Intel: emailLookup write failed', e);
    }
    return emailId;
  } catch (e) {
    console.error('Error adding document:', e);
    throw e;
  }
}
