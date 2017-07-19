import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import 'whatwg-fetch';
import {answerPoll} from '../actions/actionCreators';
import { Row, Col, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class Poll extends Component  {

  constructor(props) {
    super(props);
    this.state = {
      question:"",
      choices:[],
      owner:"",
      id: "",
    };

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
    store.dispatch(answerPoll(e.target.name, this.props.match.params.name,this.props.match.params.id,
      ()=>{
         this.props.history.push(`/results/${this.props.match.params.name}/${this.props.match.params.id}`);
      })
    );

  }

  render() {
    return (
      <div className="poll">
      <Row>
        <Col>
            <div className="question">
              <h1>{this.state.question}</h1>
            </div>
        </Col>
      </Row>
      <Row>
        <Col md={6} mdOffset={3} sm={6}  smOffset={3} xs={6}  xsOffset={3} lg={6} lgOffset={3}>
          <div className="answers">
          {this.state.choices.map((choice, key) => {
              return (

                  <Button bsSize="large" bsStyle="primary" name={choice.choice} onClick={this.answerPoll} key={key}>{choice.choice}</Button>

              );
            })
          }
          </div>
        </Col>
      </Row>
      </div>
    );
  }
}

Poll.propTypes = {
  question: React.PropTypes.string.isRequired,
  choices: React.PropTypes.array.isRequired,
  owner: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
}

export default Poll