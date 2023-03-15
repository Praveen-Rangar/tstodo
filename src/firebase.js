import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNDd6Wt_hWhrFi962BVPGaahqrnB5d9gE",
  authDomain: "real-todo-f9ce3.firebaseapp.com",
  projectId: "real-todo-f9ce3",
  storageBucket: "real-todo-f9ce3.appspot.com",
  messagingSenderId: "852183923017",
  appId: "1:852183923017:web:f85407a437b18612fb8298",
  measurementId: "G-FCM3PSP79N",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
