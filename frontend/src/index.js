import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import firebase from "./containers/Firebase";
import { Provider } from "react-redux";
import store from "./reduxStrore/index";
import axios from "axios";

let hasAppRendered = false;

const Application = (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

const renderApp = () => {
  if (!hasAppRendered) {
    ReactDOM.render(Application, document.getElementById("root"));
    hasAppRendered = true;
  }
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("User loggeed in is: ", user);
    store.dispatch({ type: "SIGNIN", payload: user });
    console.log(user.getIdToken());
    const token = user.getIdToken();
    axios.defaults.headers.common["Authorization"] = `Bearer ${token["i"]}`;
  } else {
    store.dispatch({ type: "SIGNOUT", payload: null });
    axios.defaults.headers.common["Authorization"] = null;
  }
  renderApp();
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
