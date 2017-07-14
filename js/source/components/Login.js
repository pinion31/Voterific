import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import {Link} from 'react-router-dom';
import {loginExistingUser} from '../actions/actionCreators';


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cred: {name:'', password:''},
      navBar: this.props.navBarRender,
    };

    this.loginUser = this.loginUser.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  loginUser() {
    store.dispatch(loginExistingUser(this.state.cred, () => {
         this.props.history.push('/dashboard'); //redirects after successful user add
         console.log('hit1');
         this.state.navBar();
    }));
    //console.log("result is " + users);
  }

  handleInput(event) {
    let loginCreds = Object.assign({}, this.state.cred);
    loginCreds[event.target.name] = event.target.value;

    this.setState({
      cred:loginCreds,
    });

  }
  render() {
    return (
      <div>
        <h1> Voterific </h1>
        <h2> Find out what your friends think with custom polls</h2>
        <label>Login: </label>
        <input type="text" name="name" placeholder="username" onChange={this.handleInput} ></input> <br/>
        <label>Password: </label>
        <input type="text" name="password" placeholder="password" onChange={this.handleInput}></input> <br/>
        <button onClick={this.loginUser}>Sign In</button>
      </div>
    )
  }
}

export default Login

