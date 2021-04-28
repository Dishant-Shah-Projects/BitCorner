import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDwAzIK8JjeS6PAN8MAgmKKP7tjD13Jvgk",
  authDomain: "cmpe-275-bit-corner.firebaseapp.com",
  projectId: "cmpe-275-bit-corner",
  storageBucket: "cmpe-275-bit-corner.appspot.com",
  messagingSenderId: "768012487660",
  appId: "1:768012487660:web:97db6fb35bae1536bd0ec9"
};
firebase.initializeApp(firebaseConfig);
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// Initialize Firebase
export { firebase as default, googleAuthProvider };
