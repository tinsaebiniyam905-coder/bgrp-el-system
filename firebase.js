// ✅ Firebase App
import { 
  initializeApp, 
  getApps 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// ✅ Firestore
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  doc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ✅ Auth
import { 
  getAuth, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// 🔐 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyD2lXdRT34nG2_mmLhgn1Wt7hOT6IF6z7E",
  authDomain: "election-police-report-sys.firebaseapp.com",
  projectId: "election-police-report-sys",
  storageBucket: "election-police-report-sys.firebasestorage.app",
  messagingSenderId: "832289330129",
  appId: "1:832289330129:web:7944e2b6e4aa0c82ca86f0"
};


// 🚀 Initialize Firebase (SAFE - prevents duplicate error)
const app = getApps().length === 0 
  ? initializeApp(firebaseConfig) 
  : getApps()[0];


// 🔥 Services
const db = getFirestore(app);
const auth = getAuth(app);


// 📦 Export everything (clean + complete)
export { 
  db, 
  auth, 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  doc, 
  onSnapshot,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};
