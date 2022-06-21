import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCfxaxG9n5aSoUliPCVx4Or0W7YFMkRqIo",
  authDomain: "itss-24e58.firebaseapp.com",
  projectId: "itss-24e58",
  storageBucket: "itss-24e58.appspot.com",
  messagingSenderId: "633389147435",
  appId: "1:633389147435:web:fd4a1d8d186efb56d6116e",
  measurementId: "G-7M15J4M6VB"
}

firebase.initializeApp(firebaseConfig);