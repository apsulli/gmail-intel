import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firebaseConfig } from '../firebase-config.js';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function logEmailSent(emailData) {
  try {
    const docRef = await addDoc(collection(db, "emails"), {
      ...emailData,
      sentAt: serverTimestamp()
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
}
