import firebase from "../index";
import React, { Component } from "react";

export default class Signout extends Component {
  signout = () => {
    firebase.auth().signOut();
  };
  render() {
    return (
      <div>
        <button onClick={this.signout}>Signout</button>
      </div>
    );
  }
}
