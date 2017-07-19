import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import {deletePoll} from '../actions/actionCreators';
import { Row, Col, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import {HOST} from '../constants/actionTypes';

class UserPolls extends Component {

  constructor(props) {
    super(props);
    this.state = {
      polls: [{question:'No Polls Created'}], //default if no polls created by current user

    }

    this.retrievePolls = this.retrievePolls.bind(this);
  }

  retrievePolls() {
    let storedPolls = store.getState().currentUser.polls;

    if (storedPolls.length > 0) { //currentUser has created polls, it will retrieve existing polls
      this.setState({
       polls:storedPolls,

      });
    }
    else {
      this.setState({
       polls:[{question:'No Polls Created'}],

      });
    }
  }

  componentDidMount() {
    this.retrievePolls();
  }

  deleteAPoll(id, owner) {
    store.dispatch(deletePoll(id, owner, this.retrievePolls));
  }

  getFormattedLink(poll,key) {
    if (poll.owner) {
      return (
       <div>
         <Row>
          <Col xs={8} xsOffset={1} sm={8} smOffset={1} md={8} mdOffset={1} lg={8} lgOffset={1} >
              <a key={key}  href={`${HOST}${poll.owner}/${poll.id}`}>
                <div className="pollContainer">
                  {poll.question}
                </div>
              </a>
          </Col>
          <Col xs={3} sm={3} md={3} lg={3}>
              <Button className="dashBoardButton deletePollButton" bsStyle="primary" onClick={()=> {this.deleteAPoll(poll.id, poll.owner);}}>Delete</Button>
          </Col>
        </Row>
       </div>
      );
    }
    else {
      return <div key={key}> <h1 key={key} className="noPolls">{poll.question}</h1></div>;

    }
  }

  render() {
    return (
      <div>
        { this.state.polls.map((poll,key) => {
            return this.getFormattedLink(poll,key);
          })
        }
      </div>
    );
  }
}

UserPolls.propTypes = {
     polls: React.PropTypes.array.isRequired,
}

export default UserPolls

