import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import {Link} from 'react-router-dom';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <h1> Voterific </h1>
        <h2> Find out what your friends think with custom polls</h2>
        Login: <br/>
        <input type="text" name="loginName" placeholder="username"></input> <br/>
        Password: <br/>
        <input type="text" name="password" placeholder="password"></input> <br/>
        <Link to="/dashboard"> Log In </Link>


      </div>
    )
  }
}

export default Login
