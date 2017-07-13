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

    if (storedPolls) { //currentUser has created polls, it will retrieve existing polls
      this.setState({
       polls:storedPolls,

      });
    }
  }

  componentDidMount() {
    this.retrievePolls();
  }

  getFormattedLink(poll,key) {
    if (poll.owner) {
      return <div key={key}><a href={`http://localhost:8080/#/poll/${poll.owner}/${poll.id}`}>
            <h2  key={key}>{poll.question}</h2></a> </div>;
    }
    else {
      return <div key={key}> <h2 key={key}>{poll.question}</h2></div>;

    }
  }

  render() {
    return (
      <div>
        { this.state.polls.map((poll,key) => {
            return this.getFormattedLink(poll,key);
          })
        }
      </div>
    );
  }
}

export default UserPolls