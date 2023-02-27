import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDOdCq9qbeaH0WomwFJwTglyUTYw3TsEcw",
  authDomain: "disneyplusclone-f5e5b.firebaseapp.com",
  projectId: "disneyplusclone-f5e5b",
  storageBucket: "disneyplusclone-f5e5b.appspot.com",
  messagingSenderId: "257003503929",
  appId: "1:257003503929:web:e3e6506757d10ff27068e8",
  measurementId: "G-S9QDC5R1SS"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;