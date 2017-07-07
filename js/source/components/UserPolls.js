import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';

class UserPolls extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Poll One </h1>
        <h1>Poll Two </h1>
      </div>
    );
  }
}

export default UserPolls