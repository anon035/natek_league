import React, { Component } from "react";
import Fetch from './Fetch';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    Fetch.login(e.target.username.value, e.target.password.value).catch(err =>
      console.log("Login failed", err)
    );
    this.forceUpdate();
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="ui form login-wrapper">
        <div className="field">
          <label>Username</label>
          <input type="text" name="username" placeholder="Username" />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" name="password" placeholder="Password" />
        </div>
        <button className="ui grey button" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default Login;
