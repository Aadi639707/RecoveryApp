// Firebase SDKs को इम्पोर्ट करना (CDN Modules का इस्तेमाल करके)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// तुम्हारी Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEUHICLM_3ynHWwnrvVSZuGd34ti590lk",
  authDomain: "recoverpro-7591d.firebaseapp.com",
  projectId: "recoverpro-7591d",
  storageBucket: "recoverpro-7591d.firebasestorage.app",
  messagingSenderId: "793303842896",
  appId: "1:793303842896:web:c5c0dfc443cd3ec11f9155"
};

// Firebase को इनिशियलाइज़ करना
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// -----------------------------------------------------
// 1. REGISTER FORM LOGIC (नया अकाउंट बनाने के लिए)
// -----------------------------------------------------
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault(); // पेज को रिलोड होने से रोकना
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Account created successfully!");
                window.location.href = "dashboard.html"; // डैशबोर्ड पर भेजें
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    });
}

// -----------------------------------------------------
// 2. LOGIN FORM LOGIC (पुराने यूज़र के लिए)
// -----------------------------------------------------
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Login successful!");
                window.location.href = "dashboard.html"; // डैशबोर्ड पर भेजें
            })
            .catch((error) => {
                alert("Error: Invalid Email or Password!");
            });
    });
}

// -----------------------------------------------------
// 3. GOOGLE SIGN-IN LOGIC (एक क्लिक लॉगिन के लिए)
// -----------------------------------------------------
const googleBtn = document.getElementById('googleLoginBtn');
if (googleBtn) {
    googleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                alert("Google Login Successful!");
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                alert("Google Login Error: " + error.message);
            });
    });
}
