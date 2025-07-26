//THE CODE OF THIS FILE IS AI GENERATED
import {
  handleSignOut,
  monitorAuthState,
  fetchAndDisplayUser
} from "./authHandler.js";

import {
  db,
  auth,
  doc,
  updateDoc,
  onSnapshot,
  collection
} from "./firebase.js";


let signOutBtn = document.getElementById("signOutBtn");
signOutBtn && signOutBtn.addEventListener("click", handleSignOut);


const tbody = document.getElementById("history-table-body");



const formatFullDate = (dateString) => moment(dateString).format("Do MMMM YYYY");
const formatRelativeDate = (dateString) => moment(dateString).fromNow();
const cap = (str) => str.charAt(0).toUpperCase() + str.slice(1);



const createHistoryRow = (dateKey, data) => {
  const tr = document.createElement("tr");
  tr.className = "hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200";

  
  const dateTd = document.createElement("td");
  dateTd.className = "px-6 py-4 whitespace-nowrap";
  dateTd.innerHTML = `
    <div class="text-sm font-medium text-slate-900 dark:text-white">${formatFullDate(dateKey)}</div>
    <div class="text-sm text-slate-500 dark:text-slate-400">${formatRelativeDate(dateKey)}</div>
  `;
  tr.appendChild(dateTd);


  const prayers = ["fajr", "dhuhr", "asr", "maghrib", "isha"];
  prayers.forEach(prayer => {
    const td = document.createElement("td");
    td.className = "px-6 py-4 text-center";

    const select = document.createElement("select");
    select.className =
      "px-3 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded text-sm text-slate-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent";
    select.dataset.date = dateKey;
    select.dataset.prayer = prayer;

    const options = ["on-time", "by-jamaat", "missed", "qaza"];
    options.forEach(opt => {
      const option = document.createElement("option");
      option.value = opt;
      option.textContent = cap(opt.replace("-", " "));
      if (data[prayer] === opt) {
        option.selected = true;
      }
      select.appendChild(option);
    });


    select.addEventListener("change", async () => {
      const uid = auth.currentUser.uid;
      const docRef = doc(db, "users", uid, "prayers", dateKey);
      const field = select.dataset.prayer;
      const value = select.value;

      try {
        await updateDoc(docRef, { [field]: value });
        console.log(`✅ Updated ${field} for ${dateKey} to "${value}"`);
      } catch (error) {
        console.error("❌ Error updating prayer:", error.message);
      }
    });

    td.appendChild(select);
    tr.appendChild(td);
  });

  return tr;
};


const loadHistory = () => {
  monitorAuthState(
    async (user) => {
      await fetchAndDisplayUser();
      // Show loader
const loader = document.getElementById("fullscreen-loader");
const content = document.getElementById("main-content");
if (loader) loader.classList.remove("hidden");
if (content) content.classList.add("hidden");


      const uid = user.uid;
      const prayersRef = collection(db, "users", uid, "prayers");

      onSnapshot(prayersRef, (snapshot) => {
        const records = [];

        snapshot.forEach(doc => {
          records.push({ id: doc.id, data: doc.data() });
        });

       
        records.sort((a, b) => (a.id < b.id ? 1 : -1));

        
        tbody.innerHTML = "";

        
        records.forEach(record => {
          const row = createHistoryRow(record.id, record.data);
          tbody.appendChild(row);
        });
        
if (loader) loader.classList.add("hidden");
if (content) content.classList.remove("hidden");

      });
    },
    () => {
      window.location.replace("../index.html");
    }
  );
};

loadHistory();
