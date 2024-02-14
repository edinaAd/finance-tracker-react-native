import { initializeApp } from "firebase/app";
import  { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyClJHtV6gJv1zUz1csh9BFlM-x1_FQxuLs",
  authDomain: "fir-tracker-6c099.firebaseapp.com",
  projectId: "fir-tracker-6c099",
  storageBucket: "fir-tracker-6c099.appspot.com",
  messagingSenderId: "972123309381",
  appId: "1:972123309381:web:814498c56ccbd21a1d6a2c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;

export const db = getFirestore(app)