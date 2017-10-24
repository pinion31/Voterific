import React, {Component} from 'react';
import {Row, Col, Button, FormGroup, FormControl, Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loginUser} from '../actions/userActions';
import {INVALID_NAME, INVALID_PASSWORD} from '../constants/messages';
//import {loginExistingUser} from '../actions/actionCreators';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cred: {name: '', password: ''},
      showingValidation: false,
      validationMessage: null,
    };
    this.loginUser = this.loginUser.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.dismissValidation = this.dismissValidation.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
  }

  getAlertMessage(message) {
    return (<Alert className="alertMessage" bsStyle="danger" onDismiss={this.dismissValidation}>
      {message} </Alert>);
  }

  handleInput(event) {
    if (this.state.showingValidation) {
      this.dismissValidation();
    }

    const loginCreds = Object.assign({}, this.state.cred);
    loginCreds[event.target.name] = event.target.value;

    this.setState({
      cred: loginCreds,
    });
  }

  loginUser() {
    if (this.validateLogin(this.state.cred)) {
      this.props.loginUser(this.state.cred, (loggedIn) => {
        if (loggedIn) {
          this.props.history.push('/dashboard'); // redirects after successful user login
        } else {
          const alert = this.getAlertMessage(result.response);

          this.setState({
            validationMessage: alert,
            showingValidation: true,
          });
        }
       });
    }
  }

  validateLogin(login) { // checks to make sure both fields have been entered by user
    if (login.name.length === 0) {
      const alert = this.getAlertMessage(INVALID_NAME);

      this.setState({
        validationMessage: alert,
        showingValidation: true,
      });

      return false;
    } else if (login.password.length === 0) {
      const alert = this.getAlertMessage(INVALID_PASSWORD);

      this.setState({
        validationMessage: alert,
        showingValidation: true,
      });

      return false;
    }
    return true;
  }

  dismissValidation() {
    this.setState({
      showingValidation: false,
      validationMessage: null,
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
          <Col md={3} mdOffset={4} sm={6} smOffset={3} xs={6} xsOffset={3} lg={3} lgOffset={4}>
            <FormGroup>
              <FormControl
                name="name"
                type="text"
                placeholder="Username"
                onChange={this.handleInput}
              />
              <FormControl.Feedback />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={3} mdOffset={4} sm={6} smOffset={3} xs={6} xsOffset={3} lg={3} lgOffset={4}>
            <FormGroup>
              <FormControl
                name="password"
                type="password"
                placeholder="Password"
                onChange={this.handleInput}
              />
              <FormControl.Feedback />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={3} mdOffset={4} sm={6} smOffset={3} xs={6} xsOffset={3} lg={3} lgOffset={4}>
            <FormGroup>
              <Button bsStyle="primary" onClick={this.loginUser} block>Log In</Button>
              <FormControl.Feedback />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Col md={6} mdOffset={3} sm={6} smOffset={3} xs={6} xsOffset={3} lg={6} lgOffset={3}>
            {this.state.validationMessage}
          </Col>
        </FormGroup>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loginUser
  }, dispatch);
}

Login.propTypes = {

};

export default connect(mapStateToProps, mapDispatchToProps) (Login);
