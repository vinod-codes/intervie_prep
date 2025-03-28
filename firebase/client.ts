// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRq02QxeINx4lJWdDsSTnBidLcu_uocj0",
  authDomain: "interview-prep-c0a7b.firebaseapp.com",
  projectId: "interview-prep-c0a7b",
  storageBucket: "interview-prep-c0a7b.firebasestorage.app",
  messagingSenderId: "293432180374",
  appId: "1:293432180374:web:70bbc7a438c920a33c4cb7",
  measurementId: "G-HTMDCHCCJR"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
