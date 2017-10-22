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
