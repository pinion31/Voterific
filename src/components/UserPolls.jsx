import React, {Component} from 'react';
import {deletePoll} from '../actions/userActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PollContainer from './PollContainer';
import {NO_POLLS} from '../constants/messages';

/* Component to display all polls created by current user*/
export class UserPolls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: [{question: NO_POLLS}], // default if no polls created by current user
    };

    this.deletePoll = this.deletePoll.bind(this);
  }

  /**
   * wrapper func to delete a poll via prop func, deletePoll
   * This func passed as callback to PollContainer component
   * @param {Number} id - id of poll to delete
   * @return {String} user - current user; sent to server for query purposes
   */
  deletePoll(id, user) {
    this.props.deletePoll({id, user});
  }

  render() {
    const hasPolls = this.props.polls;
    if (hasPolls.length > 0) {
      return (
        <div>
          {this.props.polls.map((poll) => {
            return <PollContainer key={poll._id} poll={poll} deletePoll={this.deletePoll} />;
          })
          }
        </div>
      );
    } else {
      return (
        <h1 className="noPolls">{NO_POLLS}</h1>
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

