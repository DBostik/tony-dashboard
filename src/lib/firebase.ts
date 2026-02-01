import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCaiHsciUHa30tjhpa7rB5YLZtRo5jI47E",
  authDomain: "tony-dashboard-2c421.firebaseapp.com",
  projectId: "tony-dashboard-2c421",
  storageBucket: "tony-dashboard-2c421.firebasestorage.app",
  messagingSenderId: "663903704914",
  appId: "1:663903704914:web:82007ec102af620d6bcc8b"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
export const db = getFirestore(app)

export default app
