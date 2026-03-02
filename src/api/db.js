import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc, setDoc, serverTimestamp,
  collection, query, where, orderBy, limit,
  onSnapshot, getDoc, getDocs
} from "firebase/firestore";
import { firebaseConfig } from "../firebase-config.js";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export function subscribeToEmails(userId, callback, onError) {
  const q = query(
    collection(db, "emails"),
    where("userId", "==", userId),
    orderBy("sentAt", "desc"),
    limit(50)
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

export function subscribeToEvents(emailId, callback, onError) {
  const q = query(
    collection(db, "emails", emailId, "events"),
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

export async function getEmailWithEvents(emailId) {
  const emailRef = doc(db, "emails", emailId);
  const [emailSnap, eventsSnap] = await Promise.all([
    getDoc(emailRef),
    getDocs(collection(db, "emails", emailId, "events"))
  ]);
  if (!emailSnap.exists()) return null;
  const events = eventsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
  return { id: emailSnap.id, ...emailSnap.data(), events };
}

export async function logEmailSent(emailData) {
  try {
    // Use the emailId (UUID) as the Firestore document ID so it matches
    // the path used by Cloud Functions: emails/{emailId}/events/{eventId}
    const { emailId, ...rest } = emailData;
    await setDoc(doc(db, "emails", emailId), {
      ...rest,
      sentAt: serverTimestamp(),
    });
    return emailId;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
}
