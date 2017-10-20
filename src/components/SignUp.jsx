import React, {Component} from 'react';
import {Row, Col, Button, FormGroup, FormControl, Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addNewUser} from '../actions/userActions';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: {name: '', email: '', password: ''},
      showingValidation: false,
      validationMessage: null,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.verifyInput = this.verifyInput.bind(this);
    this.dismissValidation = this.dismissValidation.bind(this);

  }

  onChange(event) {
    if (this.state.showingValidation) {
      this.dismissValidation();
    }

    const user = Object.assign({}, this.state.newUser);
    user[event.target.name] = event.target.value;

    this.setState({
      newUser: user,
    });
  }

  getAlertMessage(message) {
    return (<Alert className="alertMessage" bsStyle="danger" onDismiss={this.dismissValidation}>
      {message} </Alert>);
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.verifyInput(this.state.newUser)) { // if user credentials pass verification
      this.props.addNewUser({type: 'ADD_NEW_USER', payload: this.state.newUser}, () => {
        this.props.history.push('/Dashboard');
      });
    }
  }

  dismissValidation() {
    this.setState({
      showingValidation: false,
      validationMessage: null,
    });
  }

  verifyInput(userInfo) {
    const {name, email, password} = userInfo;

    if (name.length === 0) {
      const alert = this.getAlertMessage('Please enter a username.');

      this.setState({
        validationMessage: alert,
        showingValidation: true,
      });

      return false;
    }

    // verify email as valid email
    if (!email.match(/^[a-zA-Z0-9.]+[@][a-zA-Z0-9]+[.][a-zA-Z]{2,3}$/)) {
      const alert = this.getAlertMessage('Please enter a valid email.');

      this.setState({
        validationMessage: alert,
        showingValidation: true,
      });

      return false;
    }

    if (!password.match(/[a-zA-Z0-9!$%#&*^.@?]{8}/)) { // verify password
      const alert = this.getAlertMessage('Password must be at least 8 characters.');

      this.setState({
        validationMessage: alert,
        showingValidation: true,
      });

      return false;
    }

    return true;
  }

  render() {
    return (
      <div>
        <div className="header">
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <h1 className="titleLogin"> Voterific </h1>
              <h2 className="subtitleLogin"> Create polls and have your friends vote.</h2>
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
                onChange={this.onChange}
                maxLength="27"
              />
              <FormControl.Feedback />
            </FormGroup>
          </Col>
        </Row>
        <form onSubmit={this.handleSubmit}>
          <Row>
            <Col md={3} mdOffset={4} sm={6} smOffset={3} xs={6} xsOffset={3} lg={3} lgOffset={4}>
              <FormGroup>
                <FormControl
                  name="email"
                  type="text"
                  placeholder="Email"
                  onChange={this.onChange}
                  maxLength="27"
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
                  type="text"
                  placeholder="Password"
                  onChange={this.onChange}
                  maxLength="27"
                />
                <FormControl.Feedback />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3} mdOffset={4} sm={6} smOffset={3} xs={6} xsOffset={3} lg={3} lgOffset={4}>
              <FormGroup>
                <Button type="submit" bsStyle="primary" onClick={this.loginUser} block>Create Account</Button>
                <FormControl.Feedback />
              </FormGroup>
            </Col>
          </Row>
        </form>
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
    addNewUser,
  }, dispatch);
}

SignUp.propTypes = {
  newUser: React.PropTypes.object,
  showingValidation: React.PropTypes.bool,
  validationMessage: React.PropTypes.any,

};

export default connect(mapStateToProps, mapDispatchToProps) (SignUp);
