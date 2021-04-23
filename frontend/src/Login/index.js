import "./index.css";
import React, { Component } from "react";
// import GoogleLogin from "../Firebase/Components/GoogleLogin.js";
// import EmailIdLogin from "../Firebase/Components/EmailIdLogin";
import firebase from "../Firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};
export default class index extends Component {
  render() {
    return (
      <div style={{justifyContent:'center',flex:1}}>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
}
