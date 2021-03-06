import React, {Component} from 'react';
import {Row, Col, Button, FormGroup, FormControl, Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addNewUser} from '../actions/userActions';
import {INVALID_NAME, INVALID_EMAIL, INVALID_PASSWORD_LENGTH} from '../constants/messages';

/** Component handles creation of new users**/
export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: {name: '', email: '', password: '', polls: []},
      showingValidation: false,
      validationMessage: null,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.verifyInput = this.verifyInput.bind(this);
    this.dismissValidation = this.dismissValidation.bind(this);
  }

 /**
   * keeps user state updated as user enters username, password and email for account creation
   * @param event - onChange event object passed from form
   * this.state.newUser will be submitted to db as new user
   */
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
  /**
   * Displays error message as Alert component if user enters invalid info in field
   * during account creation
   * @param {String} message - Error message to be displayed if error occurs
   * @return {Component} - Alert component with message string
   */
  getAlertMessage(message) {
    return (<Alert className="alertMessage" bsStyle="danger" onDismiss={this.dismissValidation}>
      {message} </Alert>);
  }

  /**
   * If new user info passes verification, info is sent to db to create new user
   * via props func, addNewUser. User is then redirected to Dashboard
   * @param {Event} e - onSubmit Event
   */
  handleSubmit(e) {
    e.preventDefault();

    if (this.verifyInput(this.state.newUser)) { // if user credentials pass verification
      this.props.addNewUser({type: 'ADD_NEW_USER', payload: this.state.newUser}, () => {
        this.props.history.push('/Dashboard');
      });
    }
  }

  /**
   * Removes error message once user enters new info into a field.
   *
   */
  dismissValidation() {
    this.setState({
      showingValidation: false,
      validationMessage: null,
    });
  }

    /**
   * Verifuy user has entered info in all fields and input is valid.
   * Function will prevent account creation unless info passes verification
   * @param {Obj} userInfo - new user obj (format: {name: String, email: String, password: String})
   * @return {Boolean} - false if fails verification, true otherwise
   */
  verifyInput(userInfo) {
    const {name, email, password} = userInfo;

    if (name.length === 0) {
      const alert = this.getAlertMessage(INVALID_NAME);

      this.setState({
        validationMessage: alert,
        showingValidation: true,
      });

      return false;
    }

    // verify email as valid email
    if (!email.match(/^[a-zA-Z0-9.]+[@][a-zA-Z0-9]+[.][a-zA-Z]{2,3}$/)) {
      const alert = this.getAlertMessage(INVALID_EMAIL);

      this.setState({
        validationMessage: alert,
        showingValidation: true,
      });

      return false;
    }

    if (!password.match(/[a-zA-Z0-9!$%#&*^.@?]{8}/)) { // verify password
      const alert = this.getAlertMessage(INVALID_PASSWORD_LENGTH);

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
              <h1 className="titleLogin">Voterific</h1>
              <h2 className="subtitleLogin">Create polls and have your friends vote.</h2>
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
                  type="password"
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
