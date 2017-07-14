import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import {Link} from 'react-router-dom';
import {addNewUser} from '../actions/actionCreators';

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newUser:{name:'',email:'',password:''},
    }

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.verifyInput= this.verifyInput.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.verifyInput(this.state.newUser)) { //if user credentials pass verification
      store.dispatch(addNewUser(this.state.newUser, (userAddedSuccessful)=> {
        if (userAddedSuccessful) {
           this.props.history.push('/dashboard'); //redirects after successful user add
           this.props.navBarRender();
         }
         else {
          alert("Error adding user");
         }
    }));
    }
  }

  verifyInput(userInfo) {
    let {name, email, password} = userInfo;

    /*
    if (!password.match(/[a-zA-Z0-9!$%#&*\^\.@?]{8}/)) { //verify password
      alert("Password must be at least 8 characters.");
      return false;
    }

    //verify email as valid email
    if (!email.match(/^[a-zA-Z0-9\.]+[\@][a-zA-Z0-9]+[\.][a-zA-Z]{2,3}$/)) {
      alert("Please enter a valid email.");
      return false;
    }*/
    return true;
  }

  onChange(event) {
    const user = Object.assign({}, this.state.newUser);
    user[event.target.name] = event.target.value;

    this.setState({
      newUser:user,
    });

  }

  render() {
    return (
      <div>
        <h1> Voterific </h1>
        <h2> Create polls and have your friends vote</h2>

        <form onSubmit={this.handleSubmit}>
          <label> Name</label>
          <input type='text'id='name' name='name' onChange={this.onChange} required/>

          <label> Email</label>
          <input type='text' id='email' name='email' onChange={this.onChange} required/>

          <label> Password</label>
          <input type='text' id='password' name='password' onChange={this.onChange} required/>

          <button type='submit'> Sign Up</button>
        </form>
      </div>
    )
  }

}

export default SignUp