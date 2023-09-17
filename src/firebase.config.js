// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCGO0BlQQ8TmynxTYub98iFyi7dWCta_b0",
	authDomain: "iminent-ecommerce-app.firebaseapp.com",
	projectId: "iminent-ecommerce-app",
	storageBucket: "iminent-ecommerce-app.appspot.com",
	messagingSenderId: "108755080712",
	appId: "1:108755080712:web:b38c4735f4f080c47323bd",
	measurementId: "G-04DM3JD7EK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
