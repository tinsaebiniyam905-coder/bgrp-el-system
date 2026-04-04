// ================= FULL SYSTEM (Firebase Based - No Backend Needed) =================

// ================= firebase.js =================
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2lXdRT34nG2_mmLhgn1Wt7hOT6IF6z7E",
  authDomain: "election-police-report-sys.firebaseapp.com",
  projectId: "election-police-report-sys",
  storageBucket: "election-police-report-sys.firebasestorage.app",
  messagingSenderId: "832289330129",
  appId: "1:832289330129:web:7944e2b6e4aa0c82ca86f0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, collection, addDoc, getDocs, updateDoc, doc, signInWithEmailAndPassword };


// ================= index.html =================

<!DOCTYPE html>
<html>
<head>
  <title>Election Police Report System</title>
</head>
<body>

<h2>Login</h2>
<input id="email" placeholder="email" />
<input id="password" type="password" placeholder="password" />
<button onclick="login()">Login</button>

<div id="wereda" style="display:none">
  <h3>Submit Report</h3>
  <input id="region" placeholder="Region"><br>
  <input id="zone" placeholder="Zone"><br>
  <input id="weredaInput" placeholder="Wereda"><br>
  <input id="station" placeholder="Station"><br>
  <input id="crime" placeholder="Crime Type"><br>
  <input id="weapon" placeholder="Weapon"><br>
  <input id="light" placeholder="Light Injured"><br>
  <input id="serious" placeholder="Serious Injured"><br>
  <input id="deaths" placeholder="Deaths"><br>
  <input id="male" placeholder="Male"><br>
  <input id="female" placeholder="Female"><br>
  <input id="caught" placeholder="Caught yes/no"><br>
  <input id="count" placeholder="Suspects Count"><br>
  <input id="desc" placeholder="Description"><br>
  <input id="date" placeholder="Date"><br>
  <input id="officer" placeholder="Officer Name"><br>
  <button onclick="submitReport()">Send</button>
</div>

<div id="police" style="display:none">
  <h3>Reports</h3>
  <button onclick="loadReports()">Load</button>
  <ul id="list"></ul>
</div>

<script type="module">
import { db, auth, collection, addDoc, getDocs, updateDoc, doc, signInWithEmailAndPassword } from "./firebase.js";

let role = "";

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = await signInWithEmailAndPassword(auth, email, password);

  // Simple role detection
  if (email.includes("wereda")) {
    role = "wereda";
    document.getElementById("wereda").style.display = "block";
  } else {
    role = "police";
    document.getElementById("police").style.display = "block";
  }
}

async function submitReport() {
  await addDoc(collection(db, "reports"), {
    region: region.value,
    zone: zone.value,
    wereda: weredaInput.value,
    station: station.value,
    crime_type: crime.value,
    weapon_type: weapon.value,
    injured_light: Number(light.value),
    injured_serious: Number(serious.value),
    deaths: Number(deaths.value),
    male: Number(male.value),
    female: Number(female.value),
    suspects_caught: caught.value,
    suspects_count: Number(count.value),
    description: desc.value,
    date: date.value,
    officer_name: officer.value,
    seen: false
  });

  alert("Report Sent");
}

async function loadReports() {
  const querySnapshot = await getDocs(collection(db, "reports"));

  list.innerHTML = "";

  querySnapshot.forEach((docItem) => {
    const data = docItem.data();

    const li = document.createElement("li");
    li.innerText = data.region + " - " + data.crime_type + " (" + (data.seen ? "Seen" : "New") + ")";

    li.onclick = async () => {
      await updateDoc(doc(db, "reports", docItem.id), {
        seen: true
      });
      alert("Marked as seen");
    };

    list.appendChild(li);
  });
}

window.login = login;
window.submitReport = submitReport;
window.loadReports = loadReports;

</script>

</body>
</html>


// ================= FIRESTORE RULES =================

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /reports/{reportId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null;
      allow update: if request.auth != null;
      allow delete: if false;
    }
  }
}
