
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth,GoogleAuthProvider,signInWithPopup } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKkScl3rU7Z7n3RjZn9SApMXZyZUNoCvE",
  authDomain: "the-developer-theme-91293.firebaseapp.com",
  projectId: "the-developer-theme-91293",
  storageBucket: "the-developer-theme-91293.appspot.com",
  messagingSenderId: "823444930908",
  appId: "1:823444930908:web:d7b397f5dd30d13ef00199",
  measurementId: "G-RPJNBPHV08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
auth.languageCode='en';
const provider=new GoogleAuthProvider();
const googleLogin = document.querySelector("#google-login-btn");
googleLogin.addEventListener("click",function(){

const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    console.log(user);
    window.location.href="../logged.html";
    
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;

  });
})