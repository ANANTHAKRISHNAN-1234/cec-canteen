// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdTgGgbwuxoyl1YwEt8ADGKMCdS0hdqP0",
  authDomain: "canteen-92cc6.firebaseapp.com",
  projectId: "canteen-92cc6",
  storageBucket: "canteen-92cc6.appspot.com",
  messagingSenderId: "64293993349",
  appId: "1:64293993349:web:d422b89d283ad16af822ec",
  measurementId: "G-GMXRX7PSDY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default app;