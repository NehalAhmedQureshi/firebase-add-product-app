import { auth, createUserWithEmailAndPassword ,collection ,db,addDoc } from './firebase.js'
let signupForm = document.querySelector('.signupForm')
const showPassword = document.querySelector("#showPassword") 
const password = document.querySelector("#password")
const errorMsg = document.querySelector("#error")

showPassword.addEventListener("click" , (event) => {
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

        const result = await createUserWithEmailAndPassword(auth, email, password)
        console.log("🚀 ~ signupForm.addEventListener ~ result:", result)
        swal({
            title: "Woohoo!",
            text: "User Successfully SignUp!",
            type: "success",
            confirmButtonText: "Ok"
          });

        // getting unique id
        const userId = Date.now();
        window.location = "./dashboard.html"
     } catch (error) {
        console.log(error);
        
        errorMsg.innerHTML = "Email Already Exists!"
        swal({
            title: "Error!",
            text: "User Already exist!",
            type: "error",
            confirmButtonText: "Ok"
          });
    }
})