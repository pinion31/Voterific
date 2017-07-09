import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import {Link} from 'react-router-dom';
import {loginExistingUser} from '../actions/actionCreators';


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  loginUser() {
    let result = store.dispatch(loginExistingUser('Chris', 'moon'));

    //let users = Array.from(store.getStore());
    console.log("result is " + users);
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
        <button onClick={this.loginUser}>Sign In</button>
      </div>
    )
  }
}

export default Login
