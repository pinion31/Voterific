import React from 'react';
import 'babel-polyfill';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import {Redirect, Route} from 'react-router';
import {BrowserRouter, Switch, HashRouter, history} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import Dashboard from './components/Dashboard';
import SitePolls from './components/SitePolls';
import Poll from './components/Poll';
import {Provider} from 'react-redux';
import {logOut} from './actions/actionCreators';

import {store} from './store/UserStore';

const NoMatch = () => <h2>This page does not exist! Please go back!</h2>;

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
      <LinkContainer to="/">
        <NavItem onClick = {() => {store.dispatch(logOut());}}>Log Out</NavItem>
      </LinkContainer>
      <LinkContainer to="/login">
        <NavItem>Log In</NavItem>
      </LinkContainer>
      <LinkContainer to="/signUp">
        <NavItem>Sign Up</NavItem>
      </LinkContainer>
       <NavItem onClick = {()=> {console.dir(store.getState());}}>Print</NavItem>
    </Nav>
  </Navbar>
);

const Main = () => (
  <main>
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={SitePolls} />
        <Route path="/poll/:name/:id" component={Poll} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </Provider>
  </main>
);


const RoutedApp = () => (
  <div>
      <Header />
      <Main />
  </div>

);

 ReactDOM.render(
   <HashRouter>
   <RoutedApp/>
   </HashRouter>,
   document.getElementById('app')
  );

if (module.hot) {
  module.hot.accept();
}


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
/*
const users =
[{
  username:'Chris',
  password:'moon',
  email:'pinion31@gmail.com',
  polls:[{
    question:'Which band is better?', choices: [{choice:'Pearl Jam', votes:0}, {choice:'Nirvana', votes:0},
  {choice:'The Beatles', votes:0}], url:"", owner:'Chris'}],
},
{
  username:'Nicole',
  password:'lucy',
  email:'utatci0@hotmail.com',
  polls:[{
    question:'Which pets are better?', choices: [{choice:'Cats', votes:0}, {choice:'Dogs', votes:0},
  {choice:'Gerbils', votes:0}], url:"", owner:'Nicole'}],
}];

let initialState = {
  userStore:
    {currentUser:{users},
     sitePolls:[
      {
        question:'Which pets are better?', choices: [{choice:'Cats', votes:0}, {choice:'Dogs', votes:0},
        {choice:'Gerbils', votes:0}], url:"", owner:'Nicole'
      }
    ]}
  };


const store = createStore(rootReducer, initialState);*/