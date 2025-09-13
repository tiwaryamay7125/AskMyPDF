// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCPx0gmPXF88jGr6IcGqBwg-pf_LK5Y3jo",
    authDomain: "pdf-talk-2391e.firebaseapp.com",
    projectId: "pdf-talk-2391e",
    storageBucket: "pdf-talk-2391e.appspot.com",
    messagingSenderId: "426531771632",
    appId: "1:426531771632:web:a3d7dcc4030a357bb6de35",
    measurementId: "G-EME6ZMJ07Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);