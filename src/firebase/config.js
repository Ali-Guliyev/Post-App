import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBShm2rBEqoyH-9XL5v6GtizoLCssmszJQ",
  authDomain: "postapp-v1.firebaseapp.com",
  projectId: "postapp-v1",
  storageBucket: "postapp-v1.appspot.com",
  messagingSenderId: "290723156029",
  appId: "1:290723156029:web:9ffc59f02452e501109a54",
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectStorage = firebase.storage();
const projectAuth = firebase.auth();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectStorage, projectAuth, timestamp };
