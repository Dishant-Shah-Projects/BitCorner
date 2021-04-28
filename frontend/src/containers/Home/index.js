import "./index.css";
import React, { Component } from "react";
import Header from '../Header'
import {Link as RouterLink} from 'react-router-dom';

class HomeContent extends Component {

  render() {

    return (
      <div>
        <h1>Welcome to Bit Corner</h1>
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
          class="MuiButton-text MuiButton-root MuiButton-colorInherit"
          style={{ textDecoration: "none" }}
        >
          Sign up
        </RouterLink>

        <RouterLink
          color="inherit"
          to="/login"
          class="MuiButton-text MuiButton-root MuiButton-colorInherit"
          style={{ textDecoration: "none" }}
        >
          Sign in
        </RouterLink>
      </Header>
      <HomeContent />
    </div>
  );
}
