import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCMkAH3lhliy5c0FSkQYUKtSIqVG2iO-8",
  authDomain: "desafiodesenvolvimentofinal.firebaseapp.com",
  projectId: "desafiodesenvolvimentofinal",
  storageBucket: "desafiodesenvolvimentofinal.appspot.com",
  messagingSenderId: "72851778633",
  appId: "1:72851778633:web:1fc5afce709ce77a3ae398"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export{ firebase };
