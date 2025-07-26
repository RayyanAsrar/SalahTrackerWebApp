import {
  handleSignOut,
  monitorAuthState,
  fetchAndDisplayUser
} from "./authHandler.js";

import {
  doc,
  setDoc,

  getDoc,
  auth,
  db
} from "./firebase.js";




// ----------------------
// SIGN OUT BUTTON
// ----------------------
const signOutBtn = document.getElementById("signOutBtn");
signOutBtn && signOutBtn.addEventListener("click", handleSignOut);

// ----------------------
// DISPLAY USER INFO
// ----------------------
monitorAuthState(
  async (user) => {
    await fetchAndDisplayUser();
    await loadTodayPrayerStatus(); // <- load saved namaz if any
  },
  () => {
    window.location.replace("../index.html");
  }
);

// ----------------------
// SET TODAY'S DATE
// ----------------------
const getFormattedDate = () => {
  const now = new Date();
  const options = { day: "numeric", month: "long", year: "numeric" };
  return now.toLocaleDateString("en-US", options); // e.g., 23 July 2025
};
document.getElementById("today-date").textContent = getFormattedDate();

// ----------------------
// PRAYER TRACKING LOGIC
// ----------------------

// Format: "YYYY-MM-DD"
const getTodayDateKey = () => new Date().toISOString().split("T")[0];

// Save function to Firestore
const savePrayerStatus = async () => {
  const uid = auth.currentUser.uid;
  const today = getTodayDateKey();

  const prayerData = {
    fajr: document.getElementById("fajr-select").value,
    dhuhr: document.getElementById("dhuhr-select").value,
    asr: document.getElementById("asr-select").value,
    maghrib: document.getElementById("maghrib-select").value,
    isha: document.getElementById("isha-select").value,
    updatedAt: new Date()
  };

  try {
    await setDoc(doc(db, "users", uid, "prayers", today), prayerData);
    console.log("✅ Prayer data saved!");
  } catch (err) {
    console.error("❌ Error saving prayer data:", err);
  }
};

// Auto-save on dropdown change
["fajr", "dhuhr", "asr", "maghrib", "isha"].forEach((prayer) => {
  const select = document.getElementById(`${prayer}-select`);
  if (select) {
    select.addEventListener("change", savePrayerStatus);
  }
});

// Preload saved data (if any) when user visits
const loadTodayPrayerStatus = async () => {
  const uid = auth.currentUser.uid;
  const today = getTodayDateKey();

  try {
    const docRef = doc(db, "users", uid, "prayers", today);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      ["fajr", "dhuhr", "asr", "maghrib", "isha"].forEach((prayer) => {
        const select = document.getElementById(`${prayer}-select`);
        if (select && data[prayer]) {
          select.value = data[prayer];
        }
      });
    }
  } catch (err) {
    console.error("❌ Error loading today's prayer status:", err);
  }
};
