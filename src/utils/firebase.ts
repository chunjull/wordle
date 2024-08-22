import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: (import.meta as any).env.VITE_FIREBASE_API_KEY,
  authDomain: "wordle-3732d.firebaseapp.com",
  projectId: "wordle-3732d",
  storageBucket: "wordle-3732d.appspot.com",
  messagingSenderId: "1087572836827",
  appId: "1:1087572836827:web:67f64f747c501f71a6e7fe",
  measurementId: "G-NLCVTX7NZV",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const fetchAnswerWord = async () => {
  const querySnapshot = await getDocs(collection(db, "wordle"));
  const fireDoc = querySnapshot.docs[0];
  return fireDoc ? fireDoc.data().answerWords : [];
};

export default db;

export { fetchAnswerWord };
