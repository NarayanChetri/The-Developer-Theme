import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKkScl3rU7Z7n3RjZn9SApMXZyZUNoCvE",
  authDomain: "the-developer-theme-91293.firebaseapp.com",
  projectId: "the-developer-theme-91293",
  storageBucket: "the-developer-theme-91293",
  messagingSenderId: "823444930908",
  appId: "1:823444930908:web:d7b397f5dd30d13ef00199",
  measurementId: "G-RPJNBPHV08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
auth.languageCode = 'en';

// Initialize Google Auth Provider
const provider = new GoogleAuthProvider();

// Select HTML elements
const googleLogin = document.querySelector("#google-login-btn");
const logoutButton = document.querySelector("#logout-btn");
const userNameElement = document.querySelector("#user-name");

// Function to handle user login
function handleLogin(user) {
  // Store user data in localStorage
  localStorage.setItem('user', JSON.stringify(user));

  // Update UI
  googleLogin.style.display = "none";
  logoutButton.style.display = "block";
  userNameElement.innerText = `Welcome, ${user.displayName}`;
}

// Function to handle user logout
function handleLogout() {
  // Clear user data from localStorage
  localStorage.removeItem('user');

  // Update UI
  googleLogin.style.display = "block";
  logoutButton.style.display = "none";
  userNameElement.innerText = "";
}

// Check if user is already logged in
document.addEventListener("DOMContentLoaded", () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    handleLogin(user);  // Show user's name and logout button
  }
});

// Google Login
googleLogin.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);

      // Handle login and update UI
      handleLogin(user);
    })
    .catch((error) => {
      console.error("Error Code:", error.code);
      console.error("Error Message:", error.message);
    });
});

// Logout functionality
logoutButton.addEventListener("click", function () {
  signOut(auth)
    .then(() => {
      // Handle logout and update UI
      handleLogout();
    })
    .catch((error) => {
      console.error("Logout Error:", error.message);
    });
});
