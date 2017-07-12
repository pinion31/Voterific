import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import 'whatwg-fetch';
import {answerPoll} from '../actions/actionCreators';

class Poll extends Component  {

  constructor(props) {
    super(props);
    this.state = {
      question:"",
      choices:[],
      owner:"",
      id: "",
    }

    this.loadPoll = this.loadPoll.bind(this);
    this.answerPoll = this.answerPoll.bind(this);
  }

  componentDidMount() {
    this.loadPoll();
  }

  loadPoll() {
   // console.dir(this.props.match.params);

    fetch(`/poll/${this.props.match.params.name}/${this.props.match.params.id}`)
    .then(result => {
      result.json().then(poll => {
       // console.dir(poll);
        this.setState({
          question:poll[0].question,
          choices: poll[0].choices,
        });
      });
    }).
    catch(err => {
      if (err){return err};
    });
  }

  answerPoll(e) {
    store.dispatch(answerPoll(e.target.name, this.props.match.params.name,this.props.match.params.id ));
  }

  render() {
    return (
      <div>
      <h1>{this.state.question}</h1>
      {this.state.choices.map((choice, key) => {
         // console.log(choice);
          return <button name={choice.choice} onClick={this.answerPoll} key={key}>{choice.choice}</button>
        })
      }
      </div>
    );
  }
}

export default Poll