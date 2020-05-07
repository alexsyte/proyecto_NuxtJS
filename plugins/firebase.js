import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-auth'

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyATH7TgW8Y0lImbdPciqZMSX-vxUKeaQYM",
    authDomain: "proyectofinal-7d53a.firebaseapp.com",
    databaseURL: "https://proyectofinal-7d53a.firebaseio.com",
    projectId: "proyectofinal-7d53a",
    storageBucket: "proyectofinal-7d53a.appspot.com",
    messagingSenderId: "397594062650",
    appId: "1:397594062650:web:8a9faa5cebc41752c46a03",
    measurementId: "G-C4F80TWXZZ"
  }
  firebase.initializeApp(firebaseConfig)
}
const db = firebase.firestore()
export { db, firebase }
