import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyCdlwClDhdfT5OVn3yktt6IwuTQP-W6LwU",
    authDomain: "docs-rizkyadisatria.firebaseapp.com",
    projectId: "docs-rizkyadisatria",
    storageBucket: "docs-rizkyadisatria.appspot.com",
    messagingSenderId: "162432214109",
    appId: "1:162432214109:web:98047f98884c4bb4d219b4"
};

const app = !firebase.apps.length 
    ? firebase.initializeApp(firebaseConfig) 
    : firebase.app()

const db = app.firestore()
export {db}