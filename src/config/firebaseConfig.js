import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyB7eP0_uzyX5RGVFnCtK5QKjTPpb05LSI4",
  authDomain: "olx-clone-c14a5.firebaseapp.com",
  projectId: "olx-clone-c14a5",
  storageBucket: "olx-clone-c14a5.appspot.com",
  messagingSenderId: "305013859100",
  appId: "1:305013859100:web:5e30458c455ba2d92850d9",
  measurementId: "G-N5CH7LN4Z0"
}

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error("Firebase initialization error:", error);
  throw error;
}

// Initialize services
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);