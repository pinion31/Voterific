import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import 'whatwg-fetch';
import BarChart from './BarChart';

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
      <h1 className="results"> Results</h1>
      <h2 className="resultQuestion"> {this.state.poll.question} </h2>
      <BarChart data={
       this.state.poll.choices.map((ch, key)=> ch.votes)
        } size={[(window.innerWidth/4) * 2,250]} choices= {
       this.state.poll.choices.map((ch, key)=> ch.choice)
        }
      />
      </div>
    );
  }

}

PollResults.propTypes = {
  poll:React.PropTypes.object,
}

export default PollResults

