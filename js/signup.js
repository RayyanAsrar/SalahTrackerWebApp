import {
    auth,
    createUserWithEmailAndPassword,
    db,
    doc, 
    setDoc,
    getAuth,
} from "./firebase.js";
let inpName = document.getElementById('name')
let email = document.getElementById('email')
let password = document.getElementById('password')
let signUpBtn = document.getElementById('signUpBtn')

let saveUserToDb=async(uid,fullName,email)=>{
await setDoc(doc(db, "users", uid), {
  name: fullName,
  email: email,
  
});
}

const signUpFunc = async () => {
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;
        const userUid = user.uid;

        await saveUserToDb(userUid, inpName.value, email.value);

        window.location.replace("../index.html");

    } catch (error) {
        console.error("Error during sign up:", error.message);
        
    }
};

signUpBtn.addEventListener("click", signUpFunc);