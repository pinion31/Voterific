import React from 'react';
import {Component} from 'react';
import {Row, Col, Button, FormGroup, FormControl, Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addPoll} from '../actions/userActions';
import {INVALID_QUESTION, BLANK_CHOICES, DUPLICATE_CHOICES} from '../constants/messages';

class PollCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pollCreated: false,
      poll: {question: '',
        choices: [{choice: '', votes: 0}, {choice: '', votes: 0}],
        owner: this.props.user.user},
      showingValidation: false,
      validationMessage: null,
    };

    this.submitPoll = this.submitPoll.bind(this);
    this.addNewChoiceSlot = this.addNewChoiceSlot.bind(this);
    this.updateChoice = this.updateChoice.bind(this);
    this.setQuestion = this.setQuestion.bind(this);
    this.dismissValidation = this.dismissValidation.bind(this);
    this.validatePoll = this.validatePoll.bind(this);
    this.checkChoiceForRedundancy = this.checkChoiceForRedundancy.bind(this);
  }

  getAlertMessage(message) {
    return (<Alert className="alertMessage" bsStyle="danger" onDismiss={this.dismissValidation}>
      {message} </Alert>);
  }

  // updates local question info with user input
  setQuestion(event) {
    if (this.state.showingValidation) {
      this.dismissValidation();
    }

    let newQuestion = this.state.poll.question;
    newQuestion = event.target.value;

    this.setState({
      poll: {
        question: newQuestion,
        choices: this.state.poll.choices,
        owner: this.props.user.user
      },
    });
  }

  submitPoll(e) {
    e.preventDefault();

    if (this.validatePoll() && this.checkChoiceForRedundancy(this.state.poll.choices)) {
      this.props.addPoll(this.props.user, this.state.poll, () => {
        this.props.route();
      });
    }
  }

  dismissValidation() {
    this.setState({
      showingValidation: false,
      validationMessage: null,
    });
  }

  // checks to see if user filled out all fields
  validatePoll() {
    if (this.state.poll.question.length === 0) {
      const alert = this.getAlertMessage(INVALID_QUESTION);

      this.setState({
        validationMessage: alert,
        showingValidation: true,
      });

      return false;
    }

    let allValidChoices = true;

    this.state.poll.choices.map((choice) => {
      if (choice.choice.length === 0) {
        allValidChoices = false;
      }
    });

    if (!allValidChoices) {
      const alert = this.getAlertMessage(BLANK_CHOICES);

      this.setState({
        validationMessage: alert,
        showingValidation: true,
      });
    }

    return allValidChoices;
  }

  // ensures users cannot enter duplicate answer choices
  checkChoiceForRedundancy(choices) {
    const pollChoices = Array.from(choices);
    let hasNoDuplicates = true;

    pollChoices.map((choiceOne, keyOne) => {
      pollChoices.map((choiceTwo, keyTwo) => {
        if ((choiceOne.choice === choiceTwo.choice) && (keyOne !== keyTwo)) {
          hasNoDuplicates = false;
        }
      });
    });

    if (!hasNoDuplicates) {
      const alert = this.getAlertMessage(DUPLICATE_CHOICES);

      this.setState({
        validationMessage: alert,
        showingValidation: true,
      });
    }

    return hasNoDuplicates;
  }

  // updates local choice info with user input
  updateChoice(event) {
    if (this.state.showingValidation) {
      this.dismissValidation();
    }

    const currentChoices = this.state.poll.choices;
    const newChoice = event.target.value;

    if (currentChoices[+event.target.name]) {
      currentChoices[+event.target.name] = {choice: newChoice, votes: 0};
    }


    this.setState({
      poll: {
        question: this.state.poll.question,
        choices: currentChoices,
        owner: this.props.user.user
      },
    });
  }

  // add new choice space for user
  addNewChoiceSlot(e) {
    e.preventDefault();
    const currentChoices = this.state.poll.choices;
    currentChoices.push({choice: '', votes: 0});

    this.setState({
      poll: {
        question: this.state.poll.question,
        choices: currentChoices,
        owner: this.props.user.user
      },
    });
  }

  render() {
    return (<div className="pollCreator">
      <div className="pollQuestion">
        <Row>
          <Col md={6} mdOffset={3} sm={6} smOffset={3} xs={6} xsOffset={3} lg={6} lgOffset={3}>
            <h2 className="titleText">What Is Your Poll Question?</h2>
          </Col>
        </Row>
        <Row>
          <Col md={6} mdOffset={3} sm={6} smOffset={3} xs={6} xsOffset={3} lg={6} lgOffset={3}>
            <FormGroup>
              <FormControl
                name="question"
                type="text"
                placeholder="Question"
                onChange={this.setQuestion}
                maxLength="47"
              />
              <FormControl.Feedback />
            </FormGroup>
          </Col>
        </Row>
      </div>
      <Row>
        <Col md={6} mdOffset={3} sm={6} smOffset={3} xs={6} xsOffset={3} lg={6} lgOffset={3}>
          <h2 className="titleText">Answer Choices</h2>
        </Col>
      </Row>
      <Row>
        <Col md={4} mdOffset={4} sm={6} smOffset={3} xs={6} xsOffset={3} lg={4} lgOffset={4}>
          {this.state.poll.choices.map((choice, key) => (
            <FormGroup key={key}>
              <FormControl
                name={key}
                type="text"
                placeholder="Answer"
                onChange={this.updateChoice}
                maxLength="18"
              />
              <FormControl.Feedback />
            </FormGroup>))
          }
        </Col>
      </Row>
      <Row>
        <Col md={4} mdOffset={4} sm={6} smOffset={3} xs={6} xsOffset={3} lg={4} lgOffset={4}>
          <Button className="addChoice" bsStyle="danger" onClick={this.addNewChoiceSlot}>Add Choice</Button>
        </Col>
      </Row>
      <Row>
        <Col md={4} mdOffset={4} sm={6} smOffset={3} xs={6} xsOffset={3} lg={4} lgOffset={4}>
          <Button bsStyle="primary" onClick={this.submitPoll} block>Add Poll</Button>
        </Col>
      </Row>
      <FormGroup>
        <Col md={6} mdOffset={3} sm={6} smOffset={3} xs={6} xsOffset={3} lg={6} lgOffset={3}>
          {this.state.validationMessage}
        </Col>
      </FormGroup>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addPoll
  }, dispatch);
}

PollCreator.propTypes = {
  returnPoll: React.PropTypes.func,
  poll: React.PropTypes.object,
  counter: React.PropTypes.number,
  showingValidation: React.PropTypes.bool,
  validationMessage: React.PropTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps) (PollCreator);

