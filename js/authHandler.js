
import {
    auth,
    signOut,
    onAuthStateChanged,
    getDoc,
    doc,
    db,

} from "./firebase.js";

const fetchAndDisplayUser = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const uid = user.uid;
    const userDocRef = doc(db, "users", uid);
    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
        const userData = userSnap.data();

    
        const emailEl = document.getElementById("display-email");
        const nameEl = document.getElementById("display-name");
        const loader = document.getElementById("fullscreen-loader");
        const content = document.getElementById("main-content");

        if (emailEl) emailEl.textContent = userData.email;
        if (nameEl) nameEl.textContent = userData.name;

        if (loader) loader.classList.add("hidden");
        if (content) content.classList.remove("hidden");
    } else {
        console.log(" No user document found.");
    }
};

const handleSignOut = async () => {
    try {
        await signOut(auth);
        window.location.replace("../index.html");
    } catch (error) {
        console.error("Sign-out error:", error.message);
    }
};

const monitorAuthState = (callbackIfLoggedIn, callbackIfLoggedOut) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            callbackIfLoggedIn(user);
        } else {
            callbackIfLoggedOut();
        }
    });
};

export { handleSignOut, monitorAuthState, fetchAndDisplayUser }