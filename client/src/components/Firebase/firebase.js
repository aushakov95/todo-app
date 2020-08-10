import firebase from "firebase";

const config = {
  apiKey:
    process.env.REACT_APP_FIREBASE_API_KEY ||
    process.env.PRODUCTION_FIREBASE_API_KEY,
  authDomain:
    process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ||
    "todos-app-145c3.firebaseapp.com",
  databaseURL:
    process.env.REACT_APP_FIREBASE_DATABASE_URL ||
    "https://todos-app-145c3.firebaseio.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "todos-app-145c3",
  storageBucket:
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ||
    "todos-app-145c3.appspot.com",
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "538749655285",
  appId:
    process.env.REACT_APP_FIREBASE_MESSAGING_APP_ID ||
    "1:538749655285:web:da44081b5e4c99f5b98dbc",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "KGQPFNTCMF",
};

const Firebase = () => {
  console.log(process.env.REACT_APP_FIREBASE_API_KEY);
  firebase.initializeApp(config);
  return firebase;
};

export default Firebase;
