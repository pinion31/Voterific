import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';

class PollLink extends Component {

  constructor(props) {
    super(props);
    this.state = {
      link:"",
    }
  }

  render() {
    return (
      <div>
       <p> {`Your new poll can be found at:`} </p>
       <a href={`http://localhost:8080/#/${this.props.link}`}>
       <h1> {`http://localhost:8080/#/${this.props.link}`} </h1>
       </a>
    </div>
    );
  }



}

export default PollLink