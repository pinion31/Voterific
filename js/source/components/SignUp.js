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
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("1 " + this.state.newUser.name);
    console.log("2 " + this.state.newUser.email);
    console.log("3 " + this.state.newUser.password);
    store.dispatch(addNewUser(this.state.newUser));
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
        <h2> Find out what your friends think with custom polls</h2>

        <form onSubmit={this.handleSubmit}>
          <label> Name</label>
          <input type='text'id='name' name='name' onChange={this.onChange}/>

          <label> Email</label>
          <input type='text' id='email' name='email' onChange={this.onChange}/>

          <label> Password</label>
          <input type='text' id='password' name='password' onChange={this.onChange}/>

          <button type='submit' >Sign Up</button>
        </form>
      </div>
    )
  }

}

export default SignUp