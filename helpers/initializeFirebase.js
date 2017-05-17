import firebase from "firebase";

export default () => {
  try {
    firebase.initializeApp({
      authDomain: "TODO",
      apiKey: "TODO",
      databaseURL: "TODO",
    });
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error("Firebase initialization error", err.stack);
    }
  }
};
