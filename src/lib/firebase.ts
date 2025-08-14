
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// --- Main Firebase Project (for Firestore & Auth) ---
const mainFirebaseConfig = {
  projectId: "d-creations-hub-k5nyk",
  appId: "1:29314648397:web:24b28946756262662f8f04",
  storageBucket: "d-creations-hub-k5nyk.firebasestorage.app",
  apiKey: "AIzaSyBb7hA1Ma6Bx2TxmtpqcIAZJaQVs7Em1ak",
  authDomain: "d-creations-hub-k5nyk.firebaseapp.com",
  messagingSenderId: "29314648397"
};

// --- Secondary Firebase Project (for Storage) ---
const storageFirebaseConfig = {
  apiKey: "AIzaSyB1M9sHgY_W5JjPjQU2dgXH1l-T5i4dK0Q",
  authDomain: "d-creations-cd15a.firebaseapp.com",
  projectId: "d-creations-cd15a",
  storageBucket: "d-creations-cd15a.firebasestorage.app",
  messagingSenderId: "835398855771",
  appId: "1:835398855771:web:7bc6e82ca9583525a1a37e",
  measurementId: "G-P6QECJKZQ6"
};


// Initialize the default app (for Firestore/Auth)
let mainApp: FirebaseApp;
if (!getApps().some(app => app.name === '[DEFAULT]')) {
  mainApp = initializeApp(mainFirebaseConfig, '[DEFAULT]');
} else {
  mainApp = getApp('[DEFAULT]');
}


// Initialize the secondary app (for Storage)
let storageApp: FirebaseApp;
if (!getApps().some(app => app.name === 'storageApp')) {
  storageApp = initializeApp(storageFirebaseConfig, 'storageApp');
} else {
  storageApp = getApp('storageApp');
}

// Get services from the correct app instance
const db = getFirestore(mainApp);
const auth = getAuth(mainApp);
const storage = getStorage(storageApp);

export { db, auth, storage };
