import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import {
    getFirestore,
    doc, 
    setDoc,
     getDoc,
     updateDoc,
  onSnapshot,
  collection
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyCxVgtS1SM7Ti-spt6hnNcTI8yWSyK2Z_Q",
    authDomain: "salah-tracker-9c671.firebaseapp.com",
    projectId: "salah-tracker-9c671",
    storageBucket: "salah-tracker-9c671.firebasestorage.app",
    messagingSenderId: "902564079921",
    appId: "1:902564079921:web:892b967fda846d01ace810",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
    auth,
    db,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    doc, 
    setDoc,
    signOut,
  onAuthStateChanged,
  getDoc,
  updateDoc,
  onSnapshot,
  collection
};
