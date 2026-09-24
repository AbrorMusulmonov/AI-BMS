import { initializeApp } from "firebase/app";

import {
    getDatabase
} from "firebase/database";


// Firebase Console -> Project Settings -> Web App
// shu qiymatlarni qo'yasiz

const firebaseConfig = {
  apiKey: "AIzaSyBdgyhgzl4w7rnsfa4CdMXwtyXo6pxLI6I",
  authDomain: "ai-bms-a7857.firebaseapp.com",
  databaseURL: "https://ai-bms-a7857-default-rtdb.firebaseio.com",
  projectId: "ai-bms-a7857",
  storageBucket: "ai-bms-a7857.firebasestorage.app",
  messagingSenderId: "1034951984065",
  appId: "1:1034951984065:web:84becaf1f4fcbdf478a540"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);


// Realtime Database

export const database = getDatabase(app);


export default app;