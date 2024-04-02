// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD05zBi4X60kh-tv4aDEfA2VOLzYak4b-0",
  authDomain: "user-email-password-auth-3bc55.firebaseapp.com",
  projectId: "user-email-password-auth-3bc55",
  storageBucket: "user-email-password-auth-3bc55.appspot.com",
  messagingSenderId: "238274464664",
  appId: "1:238274464664:web:35f819eedbb8750939f9ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;