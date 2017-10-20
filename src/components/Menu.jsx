import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
  }
}

export default Menu;
