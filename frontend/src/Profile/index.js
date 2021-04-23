import "./index.css";
import React, { Component } from "react";
import Signout from "../Firebase/Components/Signout";
import { connect } from "react-redux";

class index extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>Profile Page</h1>
        {user.displayName && <h2>{user.displayName}</h2>}
        {user.photoURL && <img src={user.photoURL} />}
        <Signout />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};
export default connect(mapStateToProps, null)(index);
