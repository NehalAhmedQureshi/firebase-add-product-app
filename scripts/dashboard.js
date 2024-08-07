
//  import firebase function form ./firebase.js
import { getAuth, signOut, onAuthStateChanged, collection, db, addDoc, serverTimestamp, getDocs, ref, uploadBytes, getDownloadURL, onSnapshot, storage } from "./firebase.js";

// get elements from html file
const emailDiv = document.querySelector(".email")
let btn = document.querySelector('#signoutBtn')
const addProductForm = document.querySelector("#addProductForm")
const wrap = document.querySelector(".wrap")
const showButton = document.querySelector("#show")
const addItemForm = document.querySelector(".addItems")
const hamburger = document.querySelector(".hamburger")
const right = document.querySelector(".right")
const imgInput = document.querySelector("#img")


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
    console.log(user);
    localStorage.setItem("userEmail", user.email)
    if (user) {
        console.log(user.uid);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const userEmail = user.email;
        // console.log("🚀 ~ onAuthStateChanged ~ uid:", userEmail)
        emailDiv.innerHTML = userEmail
        // ...
    } else {
        // User is signed out
        // ...
        console.log('SignOut');
        window.location = "./login.html"
        localStorage.removeItem("userEmail")
    }

    // sign out function on click button
    btn.addEventListener('click', async () => {

        try {
            await signOut(auth)
            console.log("SignOut Successfully!")
            localStorage.removeItem("userEmail")
            window.location = "./login.html"
        } catch (error) {
            console.log('error => ', error);
        }
    })
});

// getting user email

const userId = localStorage.getItem("userEmail")
console.log("🚀 ~ userId:", userId)

// create document reference
if (userId == null ) {
    alert("hello")
}
const myCollectionRef = collection(db, `${userId}-products`)

// add event listnere on product add form 
addProductForm.addEventListener("submit", async (event) => {

    // stop page refreshing on adding event listnere
    event.preventDefault()

    const gif = document.createElement("img")
    gif.setAttribute("src" , "https://cdn.pixabay.com/animation/2024/04/02/07/57/07-57-40-974_512.gif")
    gif.setAttribute("width" , "45px")

    event.target.children[6].innerHTML = ""
    event.target.children[6].appendChild(gif)

    // send img to storage box
    const myFile = imgInput.files[0];
    // storage referance 
    const storageRef = ref(storage, myFile.name);
    // we are uploading the file here to the storage bucket
    const imgSnapShot = await uploadBytes(storageRef, myFile);
    // get the download url of the file
    const imgUrl = await getDownloadURL(storageRef);

    // getting input by event target
    const productName = event.target.children[1]
    const productType = event.target.children[2]
    const productImg = event.target.children[3]
    const productDescription = event.target.children[4]
    const productPrice = event.target.children[5]
    const product = {
        productName: productName.value,
        productType: productType.value,
        productDescription: productDescription.value,
        productPrice: Number(productPrice.value),
        createdAt: serverTimestamp(),
        productImg: imgUrl,
    }
    addProductForm.reset()
    event.target.children[6].innerHTML = "Add"
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
    console.log("🚀 ~ querySnapshot.forEach ~ img:", img)

    // date converted to "1 day ago | 20 min ago" (optional)
    const date1 = product.createdAt
        ? dateFns.formatDistance(product.createdAt?.toDate(), new Date(), {
            addSuffix: true, // true means ago add karna hy
        })
        : "";

    // make card
    const card = document.createElement("div")
    card.setAttribute("class", "card")

    const duration = document.createElement("div")
    duration.setAttribute("class", "duration")

    const imgDiv = document.createElement("div")
    imgDiv.setAttribute("class", "img")
    const imgDivInner = document.createElement("img")
    imgDivInner.setAttribute("alt", "no image")
    imgDivInner.setAttribute("src" , img)
    imgDiv.appendChild(imgDivInner)

    const nameDiv = document.createElement("div")
    nameDiv.setAttribute("class", "name")

    const descDiv = document.createElement("div")
    descDiv.setAttribute("class", "description")

    const priceDiv = document.createElement("div")
    priceDiv.setAttribute("class", "price")

    const BuyDiv = document.createElement("div")
    BuyDiv.setAttribute("class", "buyNow")

    wrap.appendChild(card)
    card.appendChild(duration)
    card.appendChild(imgDiv)
    card.appendChild(nameDiv)
    card.appendChild(descDiv)
    card.appendChild(priceDiv)
    card.appendChild(BuyDiv)

    nameDiv.innerHTML = prName
    descDiv.innerHTML = description
    priceDiv.innerHTML = `Rs ${price}`
    BuyDiv.innerHTML = "Buy Now"
    duration.innerHTML = date1
});

// working 2

onSnapshot(myCollectionRef, (doc) => {
    wrap.innerHTML = "";

    doc.docs.forEach((eachDoc, index) => {
        console.log("🚀 ~ doc.docs.forEach ~ index:", index)
        const product = eachDoc.data();

        //   set date order 
        const date1 = product.createdAt
            ? dateFns.formatDistance(product.createdAt?.toDate(), new Date(), {
                addSuffix: true, // true means ago add karna hy
            })
            : "";

        // make card
        const card = document.createElement("div")
        card.setAttribute("class", "card")

        const duration = document.createElement("div")
        duration.setAttribute("class", "duration")

        const imgDiv = document.createElement("div")
        imgDiv.setAttribute("class", "img")
        const imgDivInner = document.createElement("img")
        imgDivInner.setAttribute("alt", "no image")
        imgDivInner.setAttribute("src", product.productImg)
        imgDiv.appendChild(imgDivInner)

        const nameDiv = document.createElement("div")
        nameDiv.setAttribute("class", "name")

        const descDiv = document.createElement("div")
        descDiv.setAttribute("class", "description")

        const priceDiv = document.createElement("div")
        priceDiv.setAttribute("class", "price")

        const BuyDiv = document.createElement("div")
        BuyDiv.setAttribute("class", "buyNow")

        wrap.appendChild(card)
        card.appendChild(duration)
        card.appendChild(imgDiv)
        card.appendChild(nameDiv)
        card.appendChild(descDiv)
        card.appendChild(priceDiv)
        card.appendChild(BuyDiv)

        nameDiv.innerHTML = product.productName
        descDiv.innerHTML = product.productDescription
        priceDiv.innerHTML = `Rs ${product.productPrice}`
        BuyDiv.innerHTML = "Buy Now"
        duration.innerHTML = date1

    });
});

