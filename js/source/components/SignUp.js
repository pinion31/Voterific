import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import {Link} from 'react-router-dom';

class SignUp extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <h1> Voterific </h1>
        <h2> Find out what your friends think with custom polls</h2>
        Name <br/>
        <input type="text" name="name"></input> <br/>
        Email <br/>
        <input type="text" name="email"></input> <br/>
        Password <br/>
        <input type="text" name="password"></input> <br/>
        <Link to="/dashboard"> Sign Up </Link>
      </div>
    )
  }

}

export default SignUp