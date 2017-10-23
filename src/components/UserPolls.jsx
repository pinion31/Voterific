import React, {Component} from 'react';
import {deletePoll} from '../actions/userActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PollContainer from './PollContainer';

class UserPolls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: [{question: 'No Polls Created'}], // default if no polls created by current user
    };

    this.deletePoll = this.deletePoll.bind(this);
  }

  deletePoll(id, user) {  console.log('UserPolls 17', user);
    this.props.deletePoll({id, user});
  }

  render() {
    const hasPolls = this.props.polls;

    if (hasPolls.length > 0) {
      return (
        <div>
          {this.props.polls.map((poll, key) => {
            return <PollContainer key={key} poll={poll} deletePoll={this.deletePoll} />;
          })
          }
        </div>
      );
    } else {
      return (
        <h1 className="noPolls">No Polls Created </h1>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    polls: state.user.polls,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deletePoll
  }, dispatch);
}

UserPolls.propTypes = {
  polls: React.PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps) (UserPolls);

