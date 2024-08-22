import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "wordle-3732d.firebaseapp.com",
  projectId: "wordle-3732d",
  storageBucket: "wordle-3732d.appspot.com",
  messagingSenderId: "1087572836827",
  appId: "1:1087572836827:web:67f64f747c501f71a6e7fe",
  measurementId: "G-NLCVTX7NZV",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
