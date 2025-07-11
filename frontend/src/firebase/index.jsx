import { initializeApp } from "firebase/app";  
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";  

const firebaseConfig = {
  apiKey: "AIzaSyD6W5XcknjxecS1wBgrYhThRdK6gWIfO1Y",
  authDomain: "myfitnessdawg-project.firebaseapp.com",
  projectId: "myfitnessdawg-project",
  storageBucket: "myfitnessdawg-project.firebasestorage.app",
  messagingSenderId: "91647088596",
  appId: "1:91647088596:web:ee7804e60fbc6b555ba841"
};
const app = initializeApp(firebaseConfig);  

export const auth = getAuth(app);
export const db = getFirestore(app);