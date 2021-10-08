import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDfkvFKP2lmnLy2BBvEJ4zdrxBUwddx_oY",
  authDomain: "homework2-d7b70.firebaseapp.com",
  projectId: "homework2-d7b70",
  storageBucket: "homework2-d7b70.appspot.com",
  messagingSenderId: "221957692008",
  appId: "1:221957692008:web:d8a1a1c079069ea76479dd",
  measurementId: "G-KWCXLBQJ30"
};


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
const apiKey = firebaseConfig.apiKey;
const storage = firebase.storage();
export { firestore, auth, apiKey, storage};
