import React, {Component} from 'react';
import {Row, Col, Button, FormGroup, FormControl, Alert} from 'react-bootstrap';
//import {loginExistingUser} from '../actions/actionCreators';

class Login extends Component {
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
              <Button bsStyle="primary" onClick={this.loginUser} block>Sign In</Button>
              <FormControl.Feedback />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Col md={6} mdOffset={3} sm={6} smOffset={3} xs={6} xsOffset={3} lg={6} lgOffset={3}>
            {/*this.state.validationMessage*/}
          </Col>
        </FormGroup>
      </div>
    );
  }
}

Login.propTypes = {

};

export default Login;
