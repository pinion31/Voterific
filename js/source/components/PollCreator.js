import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';

class PollCreator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      submitPoll:this.props.submitPoll,
    }
  }

  render() {
    return (<div>
      <h1>New Poll </h1>
      <h2>Name your poll </h2>
      <input type="text" name="nameOfPoll" placeholder="Question" />
      <h2>Choice</h2>
      <input type="text" name="option1" placeholder="option1" />
      <input type="text" name="option2" placeholder="option2" />
      <button>Add Choice </button>
      <button onClick={this.props.submitPoll}>Submit</button>
    </div>
    );
  }

}

export default PollCreator