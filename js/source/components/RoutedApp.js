import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import {Redirect, Route} from 'react-router';
import {BrowserRouter, Switch, HashRouter, history} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import {Provider} from 'react-redux';
import {store} from '../store/UserStore';
import Login from './Login';
import SignUp from './SignUp';
import PollResults from './PollResults';
import Dashboard from './Dashboard';
import SitePolls from './SitePolls';
import Poll from './Poll';
import {logOut} from '../actions/actionCreators';

const NoMatch = () => <h2>This page does not exist! Please go back!</h2>;

//code to pass new props to components (used above)
 //<Route exact path="/login" render={() => <Login navBarRender= {() => {console.log('loggedIn')}} />} />

class RoutedApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      header: <Navbar/>,
      main: this.getMainContent(),
    };

    this.updateHeader = this.updateHeader.bind(this);
  }

  componentDidMount() {
    this.updateHeader();
  }

  updateHeader() {
    this.setState({
      header: this.getDynamicHeader(store.getState().currentUser.loggedIn || false), //refactor getState
    });

  }

  getMainContent() {
    return  <main>
    <Provider store={store}>
      <Switch>
        <Route exact path="/allPolls" component={SitePolls} />
        <Route path="/poll/:name/:id" component={Poll} />
        <Route path="/results/:name/:id" component={PollResults} />
        <Route exact path="/" render={(props) => <Login navBarRender= {this.updateHeader} {...props} />} />
        <Route exact path="/signUp" render={(props) => <SignUp navBarRender= {this.updateHeader} {...props} />} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </Provider>
  </main>

  }

  getDynamicHeader(loggedIn) {
     if (loggedIn) {
     return <Navbar id='navBar'>
        <Navbar.Header>
          <Navbar.Brand className="navItem">Voterific</Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <LinkContainer to="/Dashboard">
           <NavItem className="navItem">Home</NavItem>
          </LinkContainer>
          <LinkContainer to="/allPolls">
           <NavItem>All Polls</NavItem>
          </LinkContainer>
        </Nav>
        <Nav pullRight>
          <LinkContainer to="/">
            <NavItem onClick = {() => {store.dispatch(logOut(this.updateHeader));}}>Log Out</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>

    }
    else {
      return <Navbar>
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
          <LinkContainer to="/signUp">
            <NavItem>Sign Up</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    }
  }

  render() {
   return <div>
      {this.state.header}
      {this.state.main}
  </div>
  }
}

RoutedApp.propTypes = {
  header: React.PropTypes.any.isRequired,
  main: React.PropTypes.func.isRequired,
}

export default RoutedApp
