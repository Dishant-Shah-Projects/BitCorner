import React, { Component } from "react";
import firebase from "../index";

export default class EmailIdLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        // let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorMessage);
      });
  };
  signup = (e) => {
    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        let errorMessage = error.message;
        alert(errorMessage);
      });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <div className="space">
            <label>Email :</label>
            <input
              name="email"
              required
              type="email"
              onChange={this.onInputChange}
            />
          </div>
          <div className="space">
            <label>Password :</label>
            <input
              name="password"
              required
              type="password"
              onChange={this.onInputChange}
            />
          </div>
          <div className="space">
            <button type="submit">Signin</button>
            {"                  "}
            <button type="button" onClick={this.signup}>
              Signup
            </button>
          </div>
          <br />
        </form>
      </div>
    );
  }
}
