import React, {Component} from 'react';
import {Route} from 'react-router';
import {Switch} from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Menu from './Menu';
import Dashboard from './Dashboard';
import Poll from './Poll';
import UserPolls from './UserPolls';
import SitePolls from './SitePolls';
import PollResults from './PollResults';
import {NO_MATCH} from '../constants/messages';

const NoMatch = () => <h2>{NO_MATCH}</h2>;

const Footer = () => (
  <div className="footer-style">
    <p>Copyright &copy; 2017 Chris Cantu. All Rights Reserved</p>
  </div>
);

const PageRouter = () => (
  <Switch>
    <Route exact path="/UserPolls" component={UserPolls} />
    <Route exact path="/AllPolls" component={SitePolls} />
    <Route exact path="/PollResults/:id" component={PollResults} />
    <Route path="/poll/:id" component={Poll} />
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
