import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDB0LAe02N09SOyA-OTN7zTWkAjVPn2Lhw",
    authDomain: "facebook-messenger-clone-44516.firebaseapp.com",
    projectId: "facebook-messenger-clone-44516",
    storageBucket: "facebook-messenger-clone-44516.appspot.com",
    messagingSenderId: "616043168854",
    appId: "1:616043168854:web:8de47d1bbeea03628c27f7"
});

const db = firebaseApp.firestore();
export default db;