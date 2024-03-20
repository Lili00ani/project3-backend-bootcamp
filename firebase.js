// Import the functions you need from the SDK
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase with the configuration
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the Firebase Storage service and export it for other modules
export const storage = getStorage(firebaseApp);
