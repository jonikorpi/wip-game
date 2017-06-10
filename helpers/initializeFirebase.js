import firebase from "firebase";

const initializeFirebase = () => {
  try {
    firebase.initializeApp({
      apiKey: "AIzaSyDAt3ItGVatyngNLyrio3uohdmton3TN9k",
      authDomain: "valtameri-ed9b2.firebaseapp.com",
      databaseURL: "https://valtameri-ed9b2.firebaseio.com",
      projectId: "valtameri-ed9b2",
    });
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error("Firebase initialization error", err.stack);
    }
  }
};

export default initializeFirebase;
