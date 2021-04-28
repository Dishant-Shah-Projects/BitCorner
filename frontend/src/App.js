import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";
import PageNotFound from "./PageNotFound";
import Home from "./containers/Home";
import User from "./containers/User/index";
import Login from "./containers/Login";
import PrivateRoute from "./PrivateRoute";
import AuthenticationRoute from "./AuthenticationRoute";
import { connect } from "react-redux";
import Signout from "./containers/Firebase/Components/Signout";

function App({ isLoggedIn }) {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={Home} exact={true} />
          {isLoggedIn ? (
            <PrivateRoute path="/" component={User} />
          ) : (
            <Route path="/" component={Home} exact={true} />
          )}
          <AuthenticationRoute path="/login" component={Login} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};
export default connect(mapStateToProps, null)(App);
