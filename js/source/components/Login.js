import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import {Link} from 'react-router-dom';
import {loginExistingUser} from '../actions/actionCreators';
import { Row, Col, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';


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
      <div className="header">
          <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
          <h1 className="titleLogin"> Voterific </h1>
          <h2 className="subtitleLogin"> Find out what your friends think with custom polls.</h2>
          </Col>
          </Row>
      </div>
      <Row>
      <Col md={3} mdOffset={4} sm={6}  smOffset={3} xs={6}  xsOffset={3} lg={3} lgOffset={4}>
      <FormGroup>

        <FormControl
            name='name'
            type="text"
            placeholder="Username"
            onChange={this.handleInput}
        />
        <FormControl.Feedback />
      </FormGroup>
      </Col>
      </Row>
       <Row>
      <Col md={3} mdOffset={4} sm={6}  smOffset={3} xs={6}  xsOffset={3} lg={3} lgOffset={4}>
      <FormGroup>

        <FormControl
            name='password'
            type="password"
            placeholder="Password"
            onChange={this.handleInput}
        />
        <FormControl.Feedback />
      </FormGroup>
      </Col>
      </Row>
        <Row>
      <Col md={3} mdOffset={4} sm={6}  smOffset={3} xs={6}  xsOffset={3} lg={3} lgOffset={4}>
      <FormGroup>
        <Button bsStyle="primary" onClick={this.loginUser} block>Sign In</Button>
       <FormControl.Feedback />
      </FormGroup>
      </Col>
      </Row>
      </div>
    )
  }
}

export default Login
/*
 <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <h1> Voterific </h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <h2> Find out what your friends think with custom polls</h2>
        </Col>
      </Row>*/


/*
    <Row>
        <Col md={12} className="loginFields">
          <label>Password: </label>
          <input type="text" name="password" placeholder="password" onChange={this.handleInput}></input> <br/>

        </Col>
      </Row>
      <Row>
        <Col md={12} className="loginFields">
        <Button bsStyle="primary" onClick={this.loginUser}>Sign In</Button>
        </Col>
      </Row>   */