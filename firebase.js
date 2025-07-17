// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6xAxUyEgXQnTxQ1JEWrsKJgRZicqa0Hc",
  authDomain: "phone-otp-95642.firebaseapp.com",
  projectId: "phone-otp-95642",
  storageBucket: "phone-otp-95642.firebasestorage.app",
  messagingSenderId: "676408528255",
  appId: "1:676408528255:web:8f09065936ff325d839e4a",
  measurementId: "G-B6J65033XF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);