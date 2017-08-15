import React from 'react';
import {Component} from 'react';
import {Row, Col, Button, Glyphicon} from 'react-bootstrap';
import {deletePoll} from '../actions/actionCreators';
import {HOST} from '../constants/actionTypes';

class UserPolls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: [{question: 'No Polls Created'}], // default if no polls created by current user
    };

    this.retrievePolls = this.retrievePolls.bind(this);
  }

  componentDidMount() {
    this.retrievePolls();
  }

  getFormattedLink(poll, key) {
    if (poll.owner) {
      return (
        <div key={key}>
          <Row>
            <Col xs={5} xsOffset={1} sm={8} smOffset={1} md={8} mdOffset={1} lg={8} lgOffset={1} >
              <a key={key} href={`${HOST}${poll.owner}/${poll.id}`}>
                <div className="pollContainer">
                  {poll.question}
                </div>
              </a>
            </Col>
            <Col xs={3} sm={3} md={3} lg={3}>
              <Button className="dashBoardButton deletePollButton" bsStyle="danger" onClick={() => { this.deleteAPoll(poll.id, poll.owner); }}>{'Delete  '}<Glyphicon className="trash" glyph="trash" /> </Button>
            </Col>
          </Row>
        </div>
      );
    }

    return <div key={key}> <h1 key={key} className="noPolls">{poll.question}</h1></div>;
  }

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

  render() {
    return (
      <div>
        { this.state.polls.map((poll, key) => this.getFormattedLink(poll, key))
        }
      </div>
    );
  }
}

UserPolls.propTypes = {
  polls: React.PropTypes.array,
};

export default UserPolls;

