
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "d-creations-hub-k5nyk",
  appId: "1:29314648397:web:24b28946756262662f8f04",
  storageBucket: "d-creations-hub-k5nyk.firebasestorage.app",
  apiKey: "AIzaSyBb7hA1Ma6Bx2TxmtpqcIAZJaQVs7Em1ak",
  authDomain: "d-creations-hub-k5nyk.firebaseapp.com",
  messagingSenderId: "29314648397"
};

// Initialize Firebase
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
