import "./index.css";
import React, { Component } from "react";
import Header from "../Header";
import { Link as RouterLink } from "react-router-dom";

class HomeContent extends Component {
  render() {
    return (
      <div>
        <div className="home" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/bitcoin.jpg'})`}} >
          <div><h1 className="description">Welcome to Bit Corner</h1></div>
        </div>
      </div>
    );
  }
}
export default function Home() {
  return (
    <div>
      <Header>
        <RouterLink
          color="inherit"
          to="/login"
          className="MuiButton-text MuiButton-root MuiButton-colorInherit"
          style={{ textDecoration: "none" }}
        >
          Sign Up / Sign In
        </RouterLink>
      </Header>
      <HomeContent />
    </div>
  );
}
