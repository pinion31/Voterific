import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import PollCreator from './PollCreator';
import UserPolls from './UserPolls';
import PollLink from './PollLink';
import { Row, Col, Button } from 'react-bootstrap';


class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userContent: "",
      returnLink: this.returnPollLink.bind(this),

    };
  }

  _routeToNewPoll() {
      this.setState({
        userContent:<PollCreator returnLink= {this.state.returnLink} />,
        });
  }

  test1() {

  }

  _routeToExistingPolls() {
      this.setState({
        userContent:<UserPolls/>,
      });
  }

  //returns link to user poll
  returnPollLink(link="temp") {
      this.setState({
        userContent:<PollLink link={link} />,
      });
  }

  render() {
    return (
       <div>
       <div className='dashboard'>
         <h1 className='title'> Voterific </h1>
         <h2 className='subtitle'> What would you like to do today?</h2>
         <Button bsStyle="primary" onClick={this._routeToNewPoll.bind(this)}> Create New Poll </Button>
         <Button bsStyle="primary" onClick={this._routeToExistingPolls.bind(this)}> My Polls </Button>
       </div>
       {this.state.userContent}

       </div>

    );
  }

}

export default Dashboard
