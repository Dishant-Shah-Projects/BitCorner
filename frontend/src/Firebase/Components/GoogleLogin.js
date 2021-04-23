import firebase, { googleAuthProvider } from "../index";
import React, { Component } from "react";

export default class GoogleLogin extends Component {
  login = () => {
    firebase.auth().signInWithPopup(googleAuthProvider);
  };
  render() {
    return (
      <div>
        <button onClick={this.login}>Google</button>
      </div>
    );
  }
}
