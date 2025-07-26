import {
  auth,
    signInWithEmailAndPassword,
    db,
 
} from "./firebase.js";

let email = document.getElementById('email');
let password = document.getElementById('password');
let signInBtn = document.getElementById('signInBtn');

const LoginFunc = async () => { 
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        window.location.replace("html/dashboard.html");
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Login error:", errorCode, errorMessage);

        Toastify({
            text: "Incorrect Email or Password",
            duration: 3000,
            close: true,
            gravity: "bottom",
            position: "right",
            backgroundColor: "#dd2020ff",
            stopOnFocus: true,
        }).showToast();
    }
};

signInBtn.addEventListener("click", LoginFunc);
