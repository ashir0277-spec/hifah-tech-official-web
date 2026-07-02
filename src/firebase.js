import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZJtYRFntnBFJwgYqwgPHaZEkZORK06So",
  authDomain: "hifah-technologies-e1b8e.firebaseapp.com",
  projectId: "hifah-technologies-e1b8e",
  // storageBucket: "hifah-technologies-e1b8e.firebasestorage.app",
  storageBucket: "hifah-technologies.appspot.com",
  messagingSenderId: "108696043986",
  appId: "1:108696043986:web:482900662cef226019880b",
};
// Initialize Firebase
// BB3Pd4MJZBBhIL0kYYrVwchXaw2qBmjr3TMJD3g1wBh5dfQI08qboZajxZGfzLWU-N0Xjxvr4Lg8qAYZQJrAS-g
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
