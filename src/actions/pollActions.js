import axios from 'axios';
import {ADD_POLL, DELETE_POLL, ANSWER_POLL} from '../constants/actionTypes';

// poll arg format: {
//  payload: {question: String, choices: Array, id: Number,
//  owner: String}
export const addPoll = (poll, callback) => (
  (dispatch) => {
    axios.post('/polls/addPoll', poll)
      .then((res) => {
        dispatch({type: ADD_POLL, payload: res.data});
        callback(res.data._id);
      });
  }
);

export const answerPoll = (poll, callback) => (
  (dispatch) => {
    axios.post('/polls/answerPollForUsers', poll)
      .then((res) => {
        dispatch({type: ANSWER_POLL, payload: res.data});
        callback();
      });
  }
);

export const deletePoll = (pollToDelete) => (
  (dispatch) => {
    axios.post('/polls/deletePollForUsers', pollToDelete)
      .then((res) => {
        dispatch({type: DELETE_POLL, payload: res.data});
      });
  }
);
