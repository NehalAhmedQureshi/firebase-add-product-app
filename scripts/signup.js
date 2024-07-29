import { auth, createUserWithEmailAndPassword } from './firebase.js'
let signupForm = document.querySelector('.signupForm')
const showPassword = document.querySelector("#showPassword") 
const password = document.querySelector("#password")
const errorMsg = document.querySelector("#error")

showPassword.addEventListener("click" , (e) => {
    console.log(event.target.checked);
    if (event.target.checked) {
        password.type = "text"
        console.log("🚀 ~ showPassword.addEventListener ~ password:", password)
    } else {
        password.type = "password"
    }
} )

signupForm.addEventListener('submit', async (event) => {
    try {
        event.preventDefault()
        const email = document.querySelector("#email").value
        const password = document.querySelector("#password").value
        // console.log("🚀 ~ signupForm.addEventListener ~ email:", email.value)
        // console.log("🚀 ~ signupForm.addEventListener ~ password:", password.value)

        const result = await createUserWithEmailAndPassword(auth, email, password)
        console.log("🚀 ~ signupForm.addEventListener ~ result:", result)
        alert('Congratulation! You are register')
        window.location = "./login.html"
     } catch (error) {
        alert('error', error.message);
        errorMsg.innerHTML = "Invalid User Email or Password"
    }
})