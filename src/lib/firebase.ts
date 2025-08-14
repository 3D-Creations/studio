
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
// IMPORTANT: Replace this with the actual config for your second Firebase project.
const storageFirebaseConfig = {
  projectId: "your-storage-project-id",
  appId: "your-storage-app-id",
  storageBucket: "your-storage-project-id.appspot.com",
  apiKey: "your-storage-api-key",
  authDomain: "your-storage-project-id.firebaseapp.com",
  messagingSenderId: "your-storage-messaging-sender-id"
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
