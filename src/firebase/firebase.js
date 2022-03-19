import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxRRn-GqVMK1sCRzVFRz-nrGAaqpXoG1I",
  authDomain: "tiny-house-73864.firebaseapp.com",
  projectId: "tiny-house-73864",
  storageBucket: "tiny-house-73864.appspot.com",
  messagingSenderId: "430947021120",
  appId: "1:430947021120:web:58d98ec82bf2bcc241caa5"
};

// Initialize Firebase app and its services
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(); // auth object. our portal to the firebase auth service
export const storage = getStorage();


