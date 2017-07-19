import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import {addPoll} from '../actions/actionCreators';
import { Row, Col, Button, FormGroup, FormControl, ControlLabel, Alert } from 'react-bootstrap';

class PollCreator extends Component {

  constructor(props) {
    super(props);

    this.state = {
      returnPoll:this.props.returnLink,
      poll:{question:"", choices:[{choice:'', votes:0}, {choice:'', votes:0}],
           id:'', owner: store.getState().currentUser.name},
      counter: store.getState().currentUser.counter,
      showingValidation:false,
      validationMessage: null,
    }

    this.submitPoll = this.submitPoll.bind(this);
    this.addNewChoiceSlot = this.addNewChoiceSlot.bind(this);
    this.updateChoice = this.updateChoice.bind(this);
    this.setQuestion = this.setQuestion.bind(this);
    this.dismissValidation = this.dismissValidation.bind(this);
    this.validatePoll = this.validatePoll.bind(this);
    this.checkChoiceForRedundancy = this.checkChoiceForRedundancy.bind(this);
  }

  //****VALIDATION FUNCTIONS***************

  checkChoiceForRedundancy() {
    let pollChoices = Array.from(this.state.poll.choices);
    let hasNoDuplicates = true;

    pollChoices.map((choiceOne,keyOne) => {
        pollChoices.map((choiceTwo,keyTwo) => {
          if ((choiceOne.choice === choiceTwo.choice) && (keyOne != keyTwo)) {
            hasNoDuplicates = false;
          }
        });
    });

    if (!hasNoDuplicates) {
      let alert = this.getAlertMessage("Your Poll Contains Duplicate Choices.");

      this.setState ({
          validationMessage: alert,
          showingValidation:true,
        });
    }

    return hasNoDuplicates;




    /*
    let newChoice = event.target.value;
    let redundant = false;

    this.poll.choices.map(choice => {
      if (choice.choice === newChoice) {
        redundant = true;
      }
    });

    if (redundant) {
      let alert = this.getAlertMessage("Duplicate Choice");

      this.setState ({
          validationMessage: alert,
          showingValidation:true,
        });
    }*/
  }

  dismissValidation() {
    this.setState({
      showingValidation:false,
      validationMessage:null,
    })
  }

  getAlertMessage(message) {
    return  <Alert className="alertMessage" bsStyle="danger" onDismiss={this.dismissValidation}>
                    {message} </Alert>
  }

  //checks to see if user filled out all fields
  validatePoll() {
    if (this.state.poll.question.length === 0) {
      let alert = this.getAlertMessage("Please enter a question");

      this.setState ({
        validationMessage: alert,
        showingValidation:true,
      });

      return false;
    }
    else  {
      let allValidChoices = true;

      this.state.poll.choices.map(choice => {
        if (choice.choice.length === 0) {
          allValidChoices  = false;
        }
      });

      if (!allValidChoices) {
        let alert = this.getAlertMessage("One or more choices are blank.");

        this.setState ({
          validationMessage: alert,
          showingValidation:true,
        });
      }

      return allValidChoices;
    }
    return true;
  }

  //******HANDLE USER INFO FUNCTIONS********************

  submitPoll(e) {
    e.preventDefault();

    if (this.validatePoll() && this.checkChoiceForRedundancy()) {
      store.dispatch(addPoll(this.state.poll, this.state.returnPoll, `poll/${this.state.poll.owner}/${this.state.poll.id}`));

      this.setState({
        counter:store.getState().currentUser.counter,
      });
    }
  }

  //updates local question info with user input
  setQuestion(event) {
    if (this.state.showingValidation) {
      this.dismissValidation();
    }

    let newQuestion = this.state.poll.question;
    newQuestion = event.target.value;

    this.setState({
      poll: {question:newQuestion, choices: this.state.poll.choices,
            id:`${this.state.counter}`, owner: this.state.poll.owner},
    });
  }

  //updates local choice info with user input
  updateChoice(event) {

   if (this.state.showingValidation) {
      this.dismissValidation();
    }

   let currentChoices = this.state.poll.choices;
   let newChoice = event.target.value;

   if (currentChoices[+event.target.name]) {
      currentChoices[+event.target.name] = {choice:newChoice, votes:0};

   }

   this.setState({
       poll: {question: this.state.poll.question, choices: currentChoices,
            id:`${this.state.counter}`, owner: this.state.poll.owner},
   });
  }

  addNewChoiceSlot(e) {
    e.preventDefault();
    let currentChoices = this.state.poll.choices;
    currentChoices.push({choice:"", votes:0});

    this.setState({
       poll: {question: this.state.poll.question, choices: currentChoices,
            id:`${this.state.counter}`, owner: this.state.poll.owner},
   });

  }

  render() {
    return (<div className="pollCreator">
      <div className="pollQuestion">
        <Row>
          <Col md={6} mdOffset={3} sm={6}  smOffset={3} xs={6}  xsOffset={3} lg={6} lgOffset={3}>
            <h2 className="titleText">What Is Your Poll Question?</h2>
          </Col>
        </Row>
        <Row>
        <Col md={6} mdOffset={3} sm={6}  smOffset={3} xs={6}  xsOffset={3} lg={6} lgOffset={3}>
          <FormGroup>
            <FormControl
                name="question"
                type="text"
                placeholder="Question"
                onChange={this.setQuestion}
            />
            <FormControl.Feedback />
          </FormGroup>
        </Col>
        </Row>
      </div>
       <Row>
        <Col md={6} mdOffset={3} sm={6}  smOffset={3} xs={6}  xsOffset={3} lg={6} lgOffset={3}>
          <h2 className="titleText">Answer Choices</h2>
        </Col>
      </Row>
      <Row>
        <Col md={4} mdOffset={4} sm={6}  smOffset={3} xs={6}  xsOffset={3} lg={4} lgOffset={4}>
          {this.state.poll.choices.map((choice, key) => {
            return  <FormGroup key={key}>
                      <FormControl
                          name={key}
                          type="text"
                          placeholder="Answer"
                          onChange ={this.updateChoice}
                      />
                      <FormControl.Feedback />
                    </FormGroup>
           })
          }
      </Col>
      </Row>
      <Row>
        <Col md={4} mdOffset={4} sm={6}  smOffset={3} xs={6}  xsOffset={3} lg={4} lgOffset={4}>
          <Button className="addChoice" bsStyle="primary" onClick={this.addNewChoiceSlot} className="addChoice">Add Choice</Button>
        </Col>
      </Row>
      <Row>
        <Col md={4} mdOffset={4} sm={6}  smOffset={3} xs={6}  xsOffset={3} lg={4} lgOffset={4}>
          <Button bsStyle="primary" onClick={this.submitPoll} block>Add Poll</Button>
        </Col>
      </Row>
      <FormGroup>
        <Col md={6} mdOffset={3} sm={6}  smOffset={3} xs={6}  xsOffset={3} lg={6} lgOffset={3}>
          {this.state.validationMessage}
        </Col>
      </FormGroup>
    </div>
    );
  }

}

PollCreator.propTypes = {
  returnPoll: React.PropTypes.func,
  poll: React.PropTypes.object,
  counter: React.PropTypes.number,
  showingValidation:React.PropTypes.bool,
  validationMessage: React.PropTypes.any,

}

export default PollCreator

