
//  import firebase function form ./firebase.js
import { getAuth, signOut, onAuthStateChanged, collection, db, addDoc, serverTimestamp, getDocs, ref, uploadBytes, getDownloadURL  } from "./firebase.js";

// get elements from html file
const emailDiv = document.querySelector(".email")
let btn = document.querySelector('#signoutBtn')
const addProductForm = document.querySelector("#addProductForm")
const wrap = document.querySelector(".wrap")
const showButton = document.querySelector("#show")
const addItemForm = document.querySelector(".addItems")
const hamburger = document.querySelector(".hamburger")
const right = document.querySelector(".right")


// show products adding form
showButton.addEventListener("click", (e) => {
    e.preventDefault()
    if (addItemForm.style.transform == "translateY(0px)") {
        addItemForm.style.transform = "TranslateY(950px)"
    } else {
        addItemForm.style.transform = "TranslateY(0px)";
    }
    console.log("hello");
})

// set hamburger menu bar 
hamburger.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("active");

    if (right.style.transform == "translateX(0px)") {
        right.style.transform = "TranslateX(610px)"
        alert("i am here")
    } else {
        right.style.transform = "TranslateX(0px)"
    }
    console.log(hamburger);

})
// firebase auth setup
const auth = getAuth();


// check is user is log in or not
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

    // sign out function on click button
    btn.addEventListener('click', async () => {

        try {
            await signOut(auth)
            console.log("SignOut Successfully!")
            // window.location = "./login.html"
        } catch (error) {
            console.log('error => ', error);
        }
    })
});

// create document reference
const myCollectionRef = collection(db, "products")

// add event listnere on product add form 
addProductForm.addEventListener("submit", async (event) => {

    // stop page refreshing on adding event listnere
    event.preventDefault()

    // console event's target
    // console.log("event target => " , event.target.children);

    // getting input by event target
    const productName = event.target.children[1]
    const productType = event.target.children[2]
    const productImg = event.target.children[3]
    const productDescription = event.target.children[4]
    const productPrice = event.target.children[5]

    // console all input get by html classess
    // console.log("🚀 ~ addProductForm.addEventListener ~ productName:", productName)
    // console.log("🚀 ~ addProductForm.addEventListener ~ productType:", productType)
    // console.log("🚀 ~ addProductForm.addEventListener ~ productDescription:", productDescription)
    // console.log("🚀 ~ addProductForm.addEventListener ~ productPrice:", productPrice)

    const product = {
        productName: productName.value,
        productType: productType.value,
        productDescription: productDescription.value,
        productPrice: Number(productPrice.value),
        createdAt: serverTimestamp(),
        productImg: null,
    }

    // add try catch function
    try {
        const result = await addDoc(myCollectionRef, product);
        console.log("result => ", result);

    } catch (error) {
        console.log("error on document adding => ", error);

    }
})

//  get documents from firestore 
const querySnapshot = await getDocs(myCollectionRef)

querySnapshot.forEach((doc) => {
    const product = doc.data();
    // wrap = ""
    const prName = product.productName;
    const type = product.productType;
    const description = product.productDescription;
    const createTime = product.createdAt;
    const price = product.productPrice;
    const img = product.productImg;
 
    // make card
    const card = document.createElement("div")
    card.setAttribute("class" , "card")

    const duration = document.createElement("div")
    duration.setAttribute("class" , "duration")

    const imgDiv = document.createElement("div")
    imgDiv.setAttribute("class" , "img")
    const imgDivInner = document.createElement("img")
    imgDivInner.setAttribute("alt" , "no image")
    imgDiv.appendChild(imgDivInner)

    const nameDiv = document.createElement("div")
    nameDiv.setAttribute("class" , "name")

    const descDiv = document.createElement("div")
    descDiv.setAttribute("class" , "description")

    const priceDiv = document.createElement("div")
    priceDiv.setAttribute("class" , "price")

    const BuyDiv = document.createElement("div")
    BuyDiv.setAttribute("class" , "buyNow")

    wrap.appendChild(card)
    card.appendChild(duration)
    card.appendChild(imgDiv)
    card.appendChild(nameDiv)
    card.appendChild(descDiv)
    card.appendChild(priceDiv)
    card.appendChild(BuyDiv)

    nameDiv.innerHTML=prName
    descDiv.innerHTML= description
    priceDiv.innerHTML=price
    BuyDiv.innerHTML="Buy Now"
});

