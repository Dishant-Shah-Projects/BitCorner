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
import Loader from "./containers/Shared/Loader";
import Toast from "./containers/Shared/Toast";
import axios from "axios";

function App(props) {
  const { isLoggedIn, startLoader, stopLoader, setToastData } = props;
  React.useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        startLoader();
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        setToastData({
          severity: "success",
          message: response?.data?.successMessage
            ? response.data.successMessage
            : "Sucess",
        });
        stopLoader();
        return response;
      },
      (error) => {
        let message = error.response
          ? error.response?.data?.errorMessage
          : error?.message;

        if (message?.includes("constraint [USER_INFO.NICKNAME]")) {
          message = "This nickname is taken, try again with unique nickname";
        }
        setToastData({
          severity: "error",
          message: message,
        });
        stopLoader();
        return Promise.reject(error);
      }
    );
  });
  return (
    <div className="App">
      <Loader />
      <Toast />
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
const mapDispatchToProps = (dispatch) => {
  return {
    startLoader: () => {
      dispatch({ type: "START_LOADER" });
    },
    stopLoader: () => {
      dispatch({ type: "STOP_LOADER" });
    },
    clearToastData: () => {
      dispatch({ type: "CLEAR_TOAST_DATA" });
    },
    setToastData: (data) => {
      dispatch({ type: "SET_TOAST_DATA", payload: data });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
