import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import PollCreator from './PollCreator';
import UserPolls from './UserPolls';

const ReturnPollMessage = () => {

  return (
    <div>
    <p> Congratulations </p>
    </div>
  );
}

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      choice:'store',
      userContent: "",
      returnMessage: this.returnPollLink.bind(this),

    };
  }

  _routeToNewPoll() {
      this.setState({
        userContent:<PollCreator returnPollCallback= {this.state.returnMessage} />,
        });
  }

  _routeToExistingPolls() {
      this.setState({
        userContent:<UserPolls/>,
      });
  }

  //returns link to user poll
  returnPollLink() {
      console.log("hit");
      this.setState({
        userContent:<ReturnPollMessage />,
      });
  }

  render() {
    return (
        <div>
       <h1> Voterific </h1>
       <h2> What would you like to do today?</h2>
       <button onClick={this._routeToNewPoll.bind(this)}> New Poll </button>
       <button onClick={this._routeToExistingPolls.bind(this)}> My Polls </button>
       {this.state.userContent}

       </div>

    );
  }

}

export default Dashboard
