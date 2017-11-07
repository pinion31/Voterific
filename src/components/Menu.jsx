import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logOutUser} from '../actions/userActions';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    this.props.logOutUser();
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
              <LinkContainer to="/Dashboard">
                <NavItem>Home</NavItem>
              </LinkContainer>
            </Nav>
            <Nav>
              <LinkContainer to="/AllPolls">
                <NavItem>All Polls</NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight>
              <LinkContainer to="/">
                <NavItem onClick={this.logOut}>Log Out</NavItem>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logOutUser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (Menu);
