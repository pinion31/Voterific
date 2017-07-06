import React from 'react';
import 'babel-polyfill';
import ReactDOM from 'react-dom';
//import 'babel-polyfill';
import Login from './components/Login';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';

const Header = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>Voterific</Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem>Place</NavItem>
      <NavItem>Place</NavItem>
    </Nav>
    <Nav pullRight>
      <NavItem>Login</NavItem>
      <NavItem>Sign Up</NavItem>
    </Nav>
  </Navbar>
);

ReactDOM.render(
  <div>
  <Header/>
  <Login></Login>
  </div>,
  document.getElementById('app')
  );

if (module.hot) {
  module.hot.accept();
}