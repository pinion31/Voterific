import React from 'react';
import 'babel-polyfill';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import {Redirect, Route} from 'react-router';
import {BrowserRouter, Switch, HashRouter} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import Dashboard from './components/Dashboard';
import SitePolls from './components/SitePolls';

const NoMatch = () => <p>No Match Found</p>;




const Header = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>Voterific</Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <LinkContainer to="/">
       <NavItem>Home</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <LinkContainer to="/login">
        <NavItem>Login</NavItem>
      </LinkContainer>
      <LinkContainer to="/signUp">
        <NavItem>Sign Up</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
);

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={SitePolls} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signUp" component={SignUp} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route path="*" component={NoMatch} />
    </Switch>
  </main>
);

/*

<Route exact path="/" render={() => {
        <Redirect to="/login"/>
      }}/>
const RoutedApp = () => (
  <BrowserRouter>
    <Redirect from="/" to="/login" />
    <Route path="/login" component={Login} />
    <Route path="/signUp" component={SignUp} />
    <Route path="*" component={NoMatch} />
  </BrowserRouter>
);*/

const RoutedApp = () => (
  <div>
    <Header />
    <Main />
  </div>

);


/*
ReactDOM.render(
  <div>
  <Header/>
  <h1> Find out what your friends think with custom polls</h1>
  <RoutedApp></RoutedApp>
  </div>,
  document.getElementById('app')
  );*/

 ReactDOM.render(
   <HashRouter>
   <RoutedApp/>
   </HashRouter>,
   document.getElementById('app')
  );

if (module.hot) {
  module.hot.accept();
}