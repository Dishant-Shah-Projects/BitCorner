import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// Routes you cannot visit once you are logged in (like login and signup pages)
const AuthenticationRoute = ({ isLoggedIn, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn === false ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};
export default connect(mapStateToProps, null)(AuthenticationRoute);
