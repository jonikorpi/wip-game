import Rebase from "re-base";
import firebase from "firebase";

const app =
  firebase.apps[0] ||
  firebase.initializeApp({
    apiKey: "AIzaSyDAt3ItGVatyngNLyrio3uohdmton3TN9k",
    authDomain: "valtameri-ed9b2.firebaseapp.com",
    databaseURL: "https://valtameri-ed9b2.firebaseio.com",
    projectId: "valtameri-ed9b2",
  });

const db = firebase.database(app);
const base = Rebase.createClass(db);

export default base;
