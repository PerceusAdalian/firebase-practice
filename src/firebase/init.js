import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvC5eyxarFxLGIqGGSpCziphYCeKRs5qk",
  authDomain: "dummy-b4d6d.firebaseapp.com",
  projectId: "dummy-b4d6d",
  storageBucket: "dummy-b4d6d.firebasestorage.app",
  messagingSenderId: "408213862133",
  appId: "1:408213862133:web:d1c25b468036505d79f7bc",
  measurementId: "G-N67WDTHD62"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getFirestore(app);
export { analytics };
export default app;