import React from 'react';
import {Component} from 'react';
import 'whatwg-fetch';
import {connect} from 'react-redux';
import BarChart from './BarChart';

class PollResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poll: {questions: '', choices: [{choice: '1', votes: '1'}]},
    };
    this.retrievePollData = this.retrievePollData.bind(this);
  }

  componentDidMount() {
    this.retrievePollData();
  }

  retrievePollData() {
    this.props.polls.map(poll => {
      if (poll._id === this.props.match.params.id) {
        this.setState({
          poll,
        })
      }
    });
  }

  render() {
    return (
      <div>
        <h1 className="results"> Results</h1>
        <h2 className="resultQuestion"> {this.state.poll.question} </h2>
        <BarChart
          data={
            this.state.poll.choices.map(result => result.votes)
          }
          size={[(window.innerWidth / 4) * 2, 260]}
          choices={
            this.state.poll.choices.map(result => result.choice)
          }
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    polls: state.user.polls,
  };
}

PollResults.propTypes = {
  poll: React.PropTypes.object,
};

export default connect(mapStateToProps, null) (PollResults);

