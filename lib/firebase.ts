// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For production, these should be in environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCODlyZt50HuI0aATAQko3is7eGO9M9gro",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "fexixo-adeb6.firebaseapp.com",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://fexixo-adeb6-default-rtdb.firebaseio.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "fexixo-adeb6",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "fexixo-adeb6.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "87713372568",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:87713372568:web:ba0829a0be32a3409173ed",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-N15DJVDC5R"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const realtime = getDatabase(app);

// Helper function to sign in with admin credentials
export const signInAsAdmin = async () => {
  try {
    await signInWithEmailAndPassword(auth, "hasnainff9999@gmail.com", "admin");
    return true;
  } catch (error) {
    console.error("Error signing in as admin:", error);
    return false;
  }
};

export { db, storage, auth, realtime, firebaseConfig }; 