import React, {Component} from 'react';
import 'whatwg-fetch';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Row, Col, Button} from 'react-bootstrap';
import {answerPoll} from '../actions/userActions';

class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pollData: {}
    };

    this.loadPoll = this.loadPoll.bind(this);
    this.answerPoll = this.answerPoll.bind(this);
  }

  componentDidMount() {
    this.loadPoll();
  }

  loadPoll() {
    this.props.polls.map((poll) => {
      if (poll._id === this.props.match.params.id) {
        this.setState({
          pollData: poll,
        });
      }
    });
  }

  answerPoll(e) {
    this.state.pollData.choices.map((choice) => {
      if (choice.choice === e.target.name) {
        choice.votes++;
      }
    });

    this.props.answerPoll(this.props.user, this.state.pollData, () => {
        this.props.history.push(`/PollResults/${this.state.pollData._id}`);
    });
  }

  render() {
    if (this.state.pollData.choices) {
      return (
        <div className="poll">
          <Row>
            <Col>
              <div className="question">
                <h1>{this.state.pollData.question}</h1>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6} mdOffset={3} sm={6} smOffset={3} xs={6} xsOffset={3} lg={6} lgOffset={3}>
              <div className="answers">
                {this.state.pollData.choices.map((choice, key) => (
                  <Button bsSize="large" bsStyle="primary" name={choice.choice} onClick={this.answerPoll} key={key}>{choice.choice}</Button>
                ))
                }
              </div>
            </Col>
          </Row>
        </div>
      );
    } else {
      return null;
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
  return bindActionCreators ({
    answerPoll,
  }, dispatch);
}
Poll.propTypes = {
  pollData: React.PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps) (Poll);
