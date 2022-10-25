
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBGIwGd4y6j7EY8_0CPD1_hJxwBD6Bx4Sc",
  authDomain: "pace-stock-broking.firebaseapp.com",
  projectId: "pace-stock-broking",
  storageBucket: "pace-stock-broking.appspot.com",
  messagingSenderId: "155940748388",
  appId: "1:155940748388:web:ce83609e917f0128213371"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()

export {app, auth};