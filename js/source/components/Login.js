import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import {Link} from 'react-router-dom';
import {loginExistingUser} from '../actions/actionCreators';
import { Row, Col, Button, FormGroup, FormControl, ControlLabel, Alert } from 'react-bootstrap';


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cred: {name:'', password:''},
      navBar: this.props.navBarRender,
      showingValidation:false,
      validationMessage: null,
    };

    this.loginUser = this.loginUser.bind(this);
    this.handleInput = this.handleInput.bind(this);
    //this.showValidation = this.showValidation.bind(this);
    this.dismissValidation = this.dismissValidation.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
  }

  loginUser() {

    if (this.validateLogin(this.state.cred)) {
      store.dispatch(loginExistingUser(this.state.cred, (result) => {
            if (result.login === 'success') {
              this.props.history.push('/dashboard'); //redirects after successful user add
              this.state.navBar();
            }
            else  {
              let alert = this.getAlertMessage(result.response);

              this.setState ({
                validationMessage: alert,
                showingValidation:true,
              })
            }
      }));
    }
  }

  handleInput(event) {
    if (this.state.showingValidation) {
      this.dismissValidation();
    }

    let loginCreds = Object.assign({}, this.state.cred);
    loginCreds[event.target.name] = event.target.value;

    this.setState({
      cred:loginCreds,
    });

  }

  getAlertMessage(message) {
    return  <Alert className="alertMessage" bsStyle="danger" onDismiss={this.dismissValidation}>
                    {message} </Alert>
  }

  validateLogin(login) { //checks to make sure both fields have been entered by user

    if (login.name.length === 0) {
      let alert = this.getAlertMessage('Please enter a username');

      this.setState ({
        validationMessage: alert,
        showingValidation:true,
      })

      return false;
    }
    else if (login.password.length === 0) {
      let alert = this.getAlertMessage('Please enter a password');

      this.setState ({
        validationMessage: alert,
        showingValidation:true,
        })

      return false;
    }

    return true;
  }

  dismissValidation() {
    this.setState({
      showingValidation:false,
      validationMessage:null,
    })

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
      <FormGroup>
        <Col md={6} mdOffset={3} sm={6}  smOffset={3} xs={6}  xsOffset={3} lg={6} lgOffset={3}>
          {this.state.validationMessage}
        </Col>
      </FormGroup>
      </div>
    )
  }
}

Login.propTypes = {
  cred: React.PropTypes.object,
  navBar: React.PropTypes.func,
  showingValidation:React.PropTypes.bool,
  validationMessage: React.PropTypes.any,
}

export default Login
