// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDABcyGYLNxxoqI3F-9xUDxGLBLsFfB5_k",
  authDomain: "task1-2ae19.firebaseapp.com",
  projectId: "task1-2ae19",
  storageBucket: "task1-2ae19.appspot.com",
  messagingSenderId: "886389044664",
  appId: "1:886389044664:web:6a511c840e01892077cb4d",
  measurementId: "G-BGXK5PV0LL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };
