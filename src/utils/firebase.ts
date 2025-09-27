// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZwCCfBZsPgsMOM5TYUVWmJoNL0Resjh0",
  authDomain: "ms-notifications-f7815.firebaseapp.com",
  projectId: "ms-notifications-f7815",
  storageBucket: "ms-notifications-f7815.firebasestorage.app",
  messagingSenderId: "45865319023",
  appId: "1:45865319023:web:4742a050d9c323695eeb9a",
  measurementId: "G-VPM1JB84JT"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Mantener sesión persistente
setPersistence(auth, browserLocalPersistence);
