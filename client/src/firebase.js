// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-9171e.firebaseapp.com",
  projectId: "mern-blog-9171e",
  storageBucket: "mern-blog-9171e.appspot.com",
  messagingSenderId: "268223188252",
  appId: "1:268223188252:web:1e6b179f5287a2c9a4fed9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

