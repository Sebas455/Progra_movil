// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBQx3fV0Bi66FUyqTBIzUic8JZJxGpGM2E",
    authDomain: "proyecto-767f7.firebaseapp.com",
    projectId: "proyecto-767f7",
    storageBucket: "proyecto-767f7.firebasestorage.app",
    messagingSenderId: "313544592516",
    appId: "1:313544592516:web:631980edd22623a14506d1",
    measurementId: "G-VD0Z2C24SC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);