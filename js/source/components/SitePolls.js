import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import 'whatwg-fetch';

class SitePolls extends Component {

  constructor(props) {
    super(props);
    this.state = {
      poll:[],
    }

    this.loadAllPolls = this.loadAllPolls.bind(this);
  }

  componentDidMount() {
    this.loadAllPolls();

  }

  loadAllPolls() {
    fetch('/getAllPolls')
    .then((response) => {
      response.json().then(poll => {
        this.setState({
          poll,
        });
      })
    }).catch(err => {
      console.log('Error in getting polls from server:' + err.message);
    });


  }

  render() {
    return (
      <div>
        <h1>Latest Polls </h1>
        {this.state.poll.map((result,key) => {
          return <div><a href={`http://localhost:8080/#/poll/${result.owner}/${result.id}`} key={key}>
            <h2  key={key}>{result.question}</h2></a> </div>;
          })
        }
      </div>
    );
  }

}

export default SitePolls