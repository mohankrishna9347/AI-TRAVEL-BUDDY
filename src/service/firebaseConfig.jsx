// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // ✅ Corrected function name

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDKjXgzQsdo71Rfq9xc6ruQyrGV3lD0-Q",
  authDomain: "traveliez-3df3f.firebaseapp.com",
  projectId: "traveliez-3df3f",
  storageBucket: "traveliez-3df3f.appspot.com", // ✅ Fixed incorrect storageBucket URL
  messagingSenderId: "791934551662",
  appId: "1:791934551662:web:1e0d7ca3e4ff015d02887f",
  measurementId: "G-BF05YSGP79",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // ✅ Corrected function name
