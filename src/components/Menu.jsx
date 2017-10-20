import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.loggedIn) {
      return (
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand className="navItem">Voterific</Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight>
              <LinkContainer to="/">
                <NavItem>Log In</NavItem>
              </LinkContainer>
              <LinkContainer to="/SignUp">
                <NavItem>Sign Up</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar>
          {this.props.children}
        </div>
      );
    } else {
      return (
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand className="navItem">Voterific</Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <LinkContainer to="/allPolls">
                <NavItem>All Polls</NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight>
              <LinkContainer to="/">
                <NavItem>Log Out</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar>
          {this.props.children}
        </div>
      );
    }

  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
  };
}

export default connect(mapStateToProps, null) (Menu);
