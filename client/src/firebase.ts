

// /src/firebase.ts
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD0SBMgnfS738j7KUQpelIhq3W6KYwUg6M",
  authDomain: "streamflow-app-32ba1.firebaseapp.com",
  projectId: "streamflow-app-32ba1",
  storageBucket: "streamflow-app-32ba1.firebasestorage.app",
  messagingSenderId: "165546856438",
  appId: "1:165546856438:web:663c104df7002705b801d7"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
