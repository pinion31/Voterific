import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        Login:
        <input type="text" name="loginName"></input>
        Password:
        <input type="text" name="password"></input>
      </div>
    )
  }
}

export default Login
