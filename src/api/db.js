import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  doc, setDoc, serverTimestamp,
  collection, query, orderBy, limit,
  onSnapshot, getDoc, getDocs
} from "firebase/firestore";
import { firebaseConfig } from "../firebase-config.js";

const app = initializeApp(firebaseConfig);
// Chrome extension content scripts run in a sandboxed context where Firestore's
// default WebChannel transport fails. Force long-polling to avoid the
// "WebChannelConnection RPC Listen stream transport errored" noise.
// Chrome extension content scripts cannot use WebChannel or fetch-based
// streams — both are blocked by the extension sandbox. Force XHR long
// polling only: experimentalForceLongPolling disables WebChannel,
// useFetchStreams:false disables the fetch transport added in Firebase 10.x.
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

export function subscribeToEmails(userId, callback, onError, limitCount = 20) {
  const q = query(
    collection(db, "users", userId, "emails"),
    orderBy("sentAt", "desc"),
    limit(limitCount)
  );
  return onSnapshot(q,
    (snapshot) => {
      const emails = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      callback(emails);
    },
    (error) => {
      console.error("Gmail Intel: subscribeToEmails error", error);
      onError?.(error);
    }
  );
}

export function subscribeToEvents(userId, emailId, callback, onError) {
  const q = query(
    collection(db, "users", userId, "emails", emailId, "events"),
    orderBy("timestamp", "desc")
  );
  return onSnapshot(q,
    (snapshot) => {
      const events = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      callback(events);
    },
    (error) => {
      console.error("Gmail Intel: subscribeToEvents error", emailId, error);
      onError?.(error);
    }
  );
}

export async function getEmailWithEvents(userId, emailId) {
  const emailRef = doc(db, "users", userId, "emails", emailId);
  const [emailSnap, eventsSnap] = await Promise.all([
    getDoc(emailRef),
    getDocs(collection(db, "users", userId, "emails", emailId, "events"))
  ]);
  if (!emailSnap.exists()) return null;
  const events = eventsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
  return { id: emailSnap.id, ...emailSnap.data(), events };
}

export async function logEmailSent(emailData) {
  try {
    const { emailId, userId, ...rest } = emailData;
    await setDoc(doc(db, "users", userId, "emails", emailId), {
      ...rest,
      sentAt: serverTimestamp(),
    });
    // Write lookup doc so Cloud Functions can resolve userId from emailId
    try {
      await setDoc(doc(db, "emailLookup", emailId), { userId });
    } catch (e) {
      console.error("Gmail Intel: emailLookup write failed", e);
    }
    return emailId;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
}
