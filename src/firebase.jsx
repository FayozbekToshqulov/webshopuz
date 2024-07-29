import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB74HuZ2dmpdIk-yJJ3Fnx7i5mxevy1YRU",
  authDomain: "storege1-8ddbe.firebaseapp.com",
  projectId: "storege1-8ddbe",
  storageBucket: "storege1-8ddbe.appspot.com",
  messagingSenderId: "10245987054",
  appId: "1:10245987054:web:9eba2b5949c25a821d31ff",
  measurementId: "G-ZV7Y5FTMYY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const firestorege = getStorage(app);
