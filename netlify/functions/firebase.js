const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyCCABR8tEHrxP280JMczhIiuw8Fh3Lgr30",
  authDomain: "kiei-final-project-dbc73.firebaseapp.com",
  projectId: "kiei-final-project-dbc73",
  storageBucket: "kiei-final-project-dbc73.appspot.com",
  messagingSenderId: "985516584286",
  appId: "1:985516584286:web:7d90bf95ebd5ad0164f3cf"
} // replace

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase