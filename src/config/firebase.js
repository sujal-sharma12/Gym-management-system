// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAbER58uZp7DC9Y8qYnQ0sn_BeERkmeqA0",
  authDomain: "sujal-65a74.firebaseapp.com",
  projectId: "sujal-65a74",
  storageBucket: "sujal-65a74.firebasestorage.app",
  messagingSenderId: "412705665935",
  appId: "1:412705665935:web:802251f35a7c398de091fa",
  measurementId: "G-DVVJ7M6273"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
