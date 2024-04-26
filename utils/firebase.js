// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdxaC5b5bJuQeHcw1Uz3WzMBSxOW8QgUU",
  authDomain: "uwdorm.firebaseapp.com",
  projectId: "uwdorm",
  storageBucket: "uwdorm.appspot.com",
  messagingSenderId: "839607319783",
  appId: "1:839607319783:web:a0981427733e660206b642",
  measurementId: "G-HBSKEQ65LC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
