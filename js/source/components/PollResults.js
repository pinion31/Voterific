import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import 'whatwg-fetch';

class PollResults extends Component {

  constructor(props) {
    super(props);
    this.state= {
      poll:{questions:"", choices:[{choice:"1",votes:"1"}]},
    }
    this.retrievePollData = this.retrievePollData.bind(this);
  }

  componentDidMount() {
    this.retrievePollData();
  }

  retrievePollData() {
     fetch(`/poll/${this.props.match.params.name}/${this.props.match.params.id}`)
    .then(result => {
      result.json().then(poll => {
        this.setState({
          poll:poll[0],
        });
      });
    }).
    catch(err => {
      if (err){return err};
    });
  }

  render() {
    return (
      <div>
      <h1> results</h1>
      <h2> {this.state.poll.question} </h2>
      {this.state.poll.choices.map((ch, key)=> {
         return <div key={key}>
            <p>{ch.choice}</p>
            <p>{ch.votes}</p>
          </div>
        })
      }
      </div>
    );

  }

}

export default PollResults