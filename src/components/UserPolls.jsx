import React from 'react';
import {Component} from 'react';
import {Row, Button, Glyphicon} from 'react-bootstrap';
//import {deletePoll} from '../actions/actionCreators';
import {connect} from 'react-redux';
import {HOST} from '../constants/actionTypes';
import PollContainer from './PollContainer';

class UserPolls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: [{question: 'No Polls Created'}], // default if no polls created by current user
    };

    this.retrievePolls = this.retrievePolls.bind(this);
  }

  componentDidMount() {
    //this.retrievePolls();
  }
/*
  getFormattedLink(poll, key) {
    if (poll.owner) {
      return (
        <div key={key}>
          <Row>
            <div className="questionContainer">
              <a key={key} href={`${HOST}${poll.owner}/${poll.id}`}>
                <div className="pollContainer">
                  {poll.question}
                </div>
              </a>
              <Button className="dashBoardButton deletePollButton" bsStyle="danger" onClick={() => { this.deleteAPoll(poll.id, poll.owner); }}>{'Delete  '}<Glyphicon className="trash" glyph="trash" /> </Button>
            </div>
          </Row>
        </div>
      );
    }

    return <div key={key}> <h1 key={key} className="noPolls">{poll.question}</h1></div>;
  }
*/
  deleteAPoll(id, owner) {
    store.dispatch(deletePoll(id, owner, this.retrievePolls));
  }

  retrievePolls() {
    const storedPolls = store.getState().currentUser.polls;

    if (storedPolls.length > 0) { // currentUser has created polls, it will retrieve existing polls
      this.setState({
        polls: storedPolls,

      });
    } else {
      this.setState({
        polls: [{question: 'No Polls Created'}],

      });
    }
  }
/*
  render() {
    return (
      <div>
        { this.state.polls.map((poll, key) => this.getFormattedLink(poll, key))
        }
      </div>
    );
  }*/

  render() {
    const hasPolls = this.props.polls;

    if (hasPolls) {
      return (
        <div>
          {this.props.polls.map((poll, key) => {
            return <PollContainer key={key} poll={poll} />;
          })
          }
        </div>
      );
    } else {
      return (
        <h1>No Polls Created </h1>
      );

    }

  }
}

function mapStateToProps(state) {
  return {
    polls: state.user.polls
  };
}

/*
UserPolls.propTypes = {
  polls: React.PropTypes.array,
};
*/
export default connect(mapStateToProps, null) (UserPolls);

