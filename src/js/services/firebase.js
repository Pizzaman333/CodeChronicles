// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxbIT-MIsnxUi05CHEbEqP075c77DpayQ",
  authDomain: "code-chronicles-dev-blogs.firebaseapp.com",
  projectId: "code-chronicles-dev-blogs",
  storageBucket: "code-chronicles-dev-blogs.firebasestorage.app",
  messagingSenderId: "492057821952",
  appId: "1:492057821952:web:08a0e559d7c31115c029e5",
  measurementId: "G-FZFNXQDPLZ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
