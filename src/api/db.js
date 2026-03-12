import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc, setDoc, serverTimestamp,
  collection, query, orderBy, limit,
  getDoc, getDocs
} from "firebase/firestore/lite";
import { firebaseConfig } from "../firebase-config.js";

const app = initializeApp(firebaseConfig);
// Use the Firestore Lite SDK: it communicates via plain HTTP fetch with no
// WebChannel or streaming transport at all. This permanently eliminates the
// "WebChannelConnection RPC Listen stream transport errored" warnings that
// appear in Chrome extension sandbox contexts when using the full SDK.
export const db = getFirestore(app);

export function subscribeToEmails(userId, callback, onError, limitCount = 20) {
  async function fetchOnce() {
    try {
      const q = query(
        collection(db, "users", userId, "emails"),
        orderBy("sentAt", "desc"),
        limit(limitCount)
      );
      const snapshot = await getDocs(q);
      callback(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error("Gmail Intel: subscribeToEmails error", error);
      onError?.(error);
    }
  }
  fetchOnce();
  const id = setInterval(fetchOnce, 30_000);
  return () => clearInterval(id);
}

export function subscribeToEvents(userId, emailId, callback, onError) {
  async function fetchOnce() {
    try {
      const q = query(
        collection(db, "users", userId, "emails", emailId, "events"),
        orderBy("timestamp", "desc")
      );
      const snapshot = await getDocs(q);
      callback(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error("Gmail Intel: subscribeToEvents error", emailId, error);
      onError?.(error);
    }
  }
  fetchOnce();
  const id = setInterval(fetchOnce, 30_000);
  return () => clearInterval(id);
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
    // Write lookup doc so Cloud Functions can resolve userId from emailId.
    // sentAt (client Unix ms) lets trackPixel suppress the Google Image Proxy
    // pre-fetch that fires within seconds of the email landing in Sent.
    try {
      await setDoc(doc(db, "emailLookup", emailId), { userId, sentAt: Date.now() });
    } catch (e) {
      console.error("Gmail Intel: emailLookup write failed", e);
    }
    return emailId;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
}
