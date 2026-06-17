import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBEUHICLM_3ynHWwnrvVSZuGd34ti590lk",
  authDomain: "recoverpro-7591d.firebaseapp.com",
  projectId: "recoverpro-7591d",
  storageBucket: "recoverpro-7591d.firebasestorage.app",
  messagingSenderId: "793303842896",
  appId: "1:793303842896:web:c5c0dfc443cd3ec11f9155"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// -----------------------------------------------------
// 1. CHECK GOOGLE REDIRECT RESULT (लॉगिन के बाद डैशबोर्ड पर भेजने के लिए)
// -----------------------------------------------------
getRedirectResult(auth).then((result) => {
    if (result !== null) {
        window.location.href = "dashboard.html";
    }
}).catch((error) => {
    console.error("Google Login Error:", error);
});

// -----------------------------------------------------
// 2. REGISTER FORM LOGIC 
// -----------------------------------------------------
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Account created successfully!");
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    });
}

// -----------------------------------------------------
// 3. LOGIN FORM LOGIC 
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
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                alert("Error: Invalid Email or Password!");
            });
    });
}

// -----------------------------------------------------
// 4. GOOGLE SIGN-IN LOGIC (मोबाइल फ्रेंडली - Redirect)
// -----------------------------------------------------
const googleBtn = document.getElementById('googleLoginBtn');
if (googleBtn) {
    googleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        signInWithRedirect(auth, googleProvider);
    });
}
