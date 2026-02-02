import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCaiHsciUHa30tjhpa7rB5YLZtRo5jI47E",
  authDomain: "tony-dashboard.vercel.app",
  projectId: "tony-dashboard-2c421",
  storageBucket: "tony-dashboard-2c421.firebasestorage.app",
  messagingSenderId: "663903704914",
  appId: "1:663903704914:web:82007ec102af620d6bcc8b"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
export const db = getFirestore(app)

// Initialize Auth
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export default app
