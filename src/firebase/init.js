import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvC5eyxarFxLGIqGGSpCziphYCeKRs5qk",
  authDomain: "dummy-b4d6d.firebaseapp.com",
  projectId: "dummy-b4d6d",
  storageBucket: "dummy-b4d6d.firebasestorage.app",
  messagingSenderId: "408213862133",
  appId: "1:408213862133:web:9755b54cf6faac3079f7bc",
  measurementId: "G-TXQQF7L413"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);