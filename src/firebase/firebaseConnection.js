// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhgvbEN30qr1wlOiKf3lYOuN4ImHEm-xQ",
  authDomain: "somativa2react-9940d.firebaseapp.com",
  projectId: "somativa2react-9940d",
  storageBucket: "somativa2react-9940d.firebasestorage.app",
  messagingSenderId: "1047638248092",
  appId: "1:1047638248092:web:a18fdbf39db8bb4e793b59",
  measurementId: "G-7S8J33NP4Q"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

