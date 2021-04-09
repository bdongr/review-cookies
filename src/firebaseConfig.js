import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyA2n3FSqqNj7FPYOf-p2Q3JuL8R5r9UUYE",
    authDomain: "manage-cookies.firebaseapp.com",
    databaseURL: "https://manage-cookies-default-rtdb.firebaseio.com",
    projectId: "manage-cookies",
    storageBucket: "manage-cookies.appspot.com",
    messagingSenderId: "535435720619",
    appId: "1:535435720619:web:867026549f9fbae63744ee",
    measurementId: "G-KYZ8B8PBQQ"
};

const fire = firebase.initializeApp(firebaseConfig)

export default fire;