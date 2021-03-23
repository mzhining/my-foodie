import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBu6SY4kE9Da7RnSMYQkXNwUCcNEyKFvHM",
    authDomain: "my-foodie-b1438.firebaseapp.com",
    projectId: "my-foodie-b1438",
    storageBucket: "my-foodie-b1438.appspot.com",
    messagingSenderId: "927140628595",
    appId: "1:927140628595:web:100103824dab0224b30206",
    measurementId: "G-5Y8JTDNXHJ"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;