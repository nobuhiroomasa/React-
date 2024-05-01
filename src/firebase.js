// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8JzKMohyk1TY2CEsxUW1SzYIYGkn33Ko",
  authDomain: "firebese-react-tutorial.firebaseapp.com",
  projectId: "firebese-react-tutorial",
  storageBucket: "firebese-react-tutorial.appspot.com",
  messagingSenderId: "540664121350",
  appId: "1:540664121350:web:49af1f6ae878763dc95b87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;