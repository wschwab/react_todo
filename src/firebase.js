import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCqxI57-ZDqiAfYWMrpqDCSgOHrEg47omo",
    authDomain: "reacttodo-c6500.firebaseapp.com",
    databaseURL: "https://reacttodo-c6500.firebaseio.com",
    projectId: "reacttodo-c6500",
    storageBucket: "reacttodo-c6500.appspot.com",
    messagingSenderId: "789267445293",
    appId: "1:789267445293:web:923ad11c225aed0f0e2aa4"
})

export {firebaseConfig as firebase }
