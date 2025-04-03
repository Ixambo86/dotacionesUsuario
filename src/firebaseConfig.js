// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAymT3yVyzG7xGm0or45MOTHs5gaQoAuZY",
  authDomain: "dotaciones-por-linea.firebaseapp.com",
  projectId: "dotaciones-por-linea",
  storageBucket: "dotaciones-por-linea.firebasestorage.app",
  messagingSenderId: "215438701711",
  appId: "1:215438701711:web:348bf6caf3476bedcaacfa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };