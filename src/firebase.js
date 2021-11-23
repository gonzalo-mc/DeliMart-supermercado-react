import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPYcfMinFLRzycVkmvdBKdfnwaAjFGR1o",
  authDomain: "supermercado-react.firebaseapp.com",
  projectId: "supermercado-react",
  storageBucket: "supermercado-react.appspot.com",
  messagingSenderId: "638583417913",
  appId: "1:638583417913:web:a620c5eed0d871907db1e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
