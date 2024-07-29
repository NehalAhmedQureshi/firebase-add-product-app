import { auth, signInWithEmailAndPassword } from "./firebase.js"

const form = document.querySelector("#loginForm")

form.addEventListener('submit', async (event) => {
    try {
        event.preventDefault();
        const email = event.target.children[0].value
        const password = event.target.children[2].value

        const result = await signInWithEmailAndPassword(auth , email, password)
        console.log("🚀 ~ form.addEventListener ~ result:", result)
        alert('Congratulation! You are login successfully')
        window.location = "./dashboard.html"
    } catch (error) {
    console.log("🚀 ~ form.addEventListener ~ error:", error.message)
    }
})