import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Route} from 'react-router';
import {Switch} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import Login from './Login';
import SignUp from './SignUp';
import Menu from './Menu';
import Dashboard from './Dashboard';

const NoMatch = () => <h2>This page does not exist! Please go back!</h2>;

const Footer = () => (
  <div className="footer-style">
    <p>Copyright &copy; 2017 Chris Cantu. All Rights Reserved</p>
  </div>
);

/*
const Menu = () => (<Navbar>
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
</Navbar>);*/

const PageRouter = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/SignUp" component={SignUp} />
    <Route exact path="/Dashboard" component={Dashboard} />
    <Route path="*" component={NoMatch} />
  </Switch>
);

class RoutedApp extends Component {
  render() {
    return (
      <div>
        <Menu>
          <PageRouter />
        </Menu>
      </div>
    );
  }
}

export default RoutedApp;
