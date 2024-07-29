import { getAuth, signOut, onAuthStateChanged, } from "./firebase.js";
const emailDiv = document.querySelector(".email")
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("🚀 ~ onAuthStateChanged ~ user:", user)
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const userEmail = user.email;
        console.log("🚀 ~ onAuthStateChanged ~ uid:", userEmail)
        emailDiv.innerHTML = userEmail
        // ...
    } else {
        // User is signed out
        // ...
        console.log('SignOut');
        window.location = "./login.html"
    }

    let btn = document.querySelector('#signoutBtn')

    btn.addEventListener('click' , async () => {

        try {
            await signOut(auth)
            console.log("SignOut Successfully!")
            // window.location = "./login.html"
        } catch (error) {
            console.log('error => ', error);
        }

    })

});