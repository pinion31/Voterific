import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import {addPoll} from '../actions/actionCreators';
import { Row, Col, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class PollCreator extends Component {

  constructor(props) {
    super(props);

    this.state = {
      returnPoll:this.props.returnLink,
      poll:{question:"", choices:[{choice:'', votes:0}, {choice:'', votes:0}],
           id:'', owner: store.getState().currentUser.name},
      counter: store.getState().currentUser.counter,
    }

    this.submitPoll = this.submitPoll.bind(this);
    this.addNewChoiceSlot = this.addNewChoiceSlot.bind(this);
    this.updateChoice = this.updateChoice.bind(this);
    this.setQuestion = this.setQuestion.bind(this);
  }

  submitPoll(e) {
    e.preventDefault();
    store.dispatch(addPoll(this.state.poll, this.state.returnPoll, `poll/${this.state.poll.owner}/${this.state.poll.id}`));

    this.setState({
      counter:store.getState().currentUser.counter,
    });

    //need to increment counter on currentUser then use that retrieve counter
  }

  setQuestion(event) {
    let newQuestion = this.state.poll.question;
    newQuestion = event.target.value;

    this.setState({
      poll: {question:newQuestion, choices: this.state.poll.choices,
            id:`${this.state.counter}`, owner: this.state.poll.owner},
    });
  }

  updateChoice(event) {
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

//temp
  printState() {
    console.dir(store.getState());
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
    </div>
    );
  }

}

export default PollCreator

