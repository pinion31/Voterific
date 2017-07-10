import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';

class UserPolls extends Component {

  constructor(props) {
    super(props);
    this.state = {
      polls: [{question:'No Polls Created'}], //default if no polls created by current user

    }
  }

  retrievePolls() {
    let storedPolls = store.getState().currentUser.polls;

    if (storedPolls.length > 0) { //currentUser has created polls, it will retrieve existing polls
      this.setState({
       polls:storedPolls,
      });
    }
  }

  componentDidMount() {
    this.retrievePolls();
  }

  render() {
    return (
      <div>
        {this.state.polls.map((poll,key) => {
            return <h1 key={key}> {poll.question} </h1>;
        })
        }
      </div>
    );
  }
}

export default UserPolls