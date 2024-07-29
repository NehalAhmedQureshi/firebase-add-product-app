// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDd_n0rKlO5mb5gHlYygvYlkZjA0o9smqc",
    authDomain: "app-auth-7b39b.firebaseapp.com",
    projectId: "app-auth-7b39b",
    storageBucket: "app-auth-7b39b.appspot.com",
    messagingSenderId: "802933619924",
    appId: "1:802933619924:web:7e64ca0186fc2848fb8f41",
    measurementId: "G-WB5QM2G9PT"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);

  export {getAuth,auth ,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged, signOut}
