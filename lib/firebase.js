// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const rtdb = getDatabase(app);

// Add a helper function to sign in with default admin credentials
const signInAsAdmin = async () => {
  try {
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "hasnainff9999@gmail.com";
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin";
    
    console.log("Attempting to sign in as admin:", adminEmail);
    return await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
  } catch (error) {
    console.error("Error signing in as admin:", error);
    
    // If user doesn't exist, try to create it
    if (error.code === "auth/user-not-found") {
      try {
        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "hasnainff9999@gmail.com";
        const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin";
        
        console.log("Creating admin user account...");
        return await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
      } catch (createError) {
        console.error("Error creating admin user:", createError);
        throw createError;
      }
    }
    
    throw error;
  }
};

export { auth, db, storage, rtdb, signInAsAdmin }; 