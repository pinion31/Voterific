import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import {addPoll} from '../actions/actionCreators';




class PollCreator extends Component {

  constructor(props) {
    super(props);

    this.state = {
      returnPoll:this.props.returnLink,
      poll:{question:"", choices:[{choice:'', votes:0}, {choice:'', votes:0}],
           id:'', owner: store.getState().currentUser.name},
     // poll:{question:"", choices:[{choice:{'':0} },{choice:{'': 0}}],
       //     id:'', owner: store.getState().currentUser.name},
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
    return (<div>
      <h1>New Poll </h1>
      <h2>Name your poll </h2>

        <input type="text" name="question" placeholder="Question" onChange={this.setQuestion}/>
        <h2>Choice</h2>
        {this.state.poll.choices.map((choice, key) => {
            return <input type='text' key={key} name={key} placeholder='answer' onChange ={this.updateChoice}/>
          })
        }

        <button onClick={this.addNewChoiceSlot}>Add Choice </button>
        <button onClick={this.submitPoll} >Submit</button>
    </div>
    );
  }

}

export default PollCreator

