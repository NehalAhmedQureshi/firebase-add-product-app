import { auth, createUserWithEmailAndPassword } from './firebase.js'
let signupForm = document.querySelector('.signupForm')

signupForm.addEventListener('submit', async (event) => {
    try {
        event.preventDefault()
        const email = event.target.children[0].value
        const password = event.target.children[2].value
        // console.log("🚀 ~ signupForm.addEventListener ~ email:", email.value)
        // console.log("🚀 ~ signupForm.addEventListener ~ password:", password.value)

        const result = await createUserWithEmailAndPassword(auth, email, password)
        console.log("🚀 ~ signupForm.addEventListener ~ result:", result)
        alert('Congratulation! You are register')
        window.location = "./login.html"
    } catch (error) {
        alert('error', error.message);
    }
})