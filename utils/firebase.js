// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import firebase from "firebase/compat/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const app = firebase.initializeApp({
    apiKey: "AIzaSyAp2RCDf5ySYlpyKYVxqIOPvbE39YLSEHU",
    authDomain: "pugalbot-uf9j.firebaseapp.com",
    projectId: "pugalbot-uf9j",
    storageBucket: "pugalbot-uf9j.appspot.com",
    messagingSenderId: "634210299149",
    appId: "1:634210299149:web:fa9a82713419fa41f29444"
  });

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();

export  {db, auth};

