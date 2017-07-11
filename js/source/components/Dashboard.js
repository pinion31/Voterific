import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import PollCreator from './PollCreator';
import UserPolls from './UserPolls';
import PollLink from './PollLink';


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
       <h1> Voterific </h1>
       <h2> What would you like to do today?</h2>
       <button onClick={this._routeToNewPoll.bind(this)}> Create New Poll </button>
       <button onClick={this._routeToExistingPolls.bind(this)}> My Polls </button>
       {this.state.userContent}

       </div>

    );
  }

}

export default Dashboard
