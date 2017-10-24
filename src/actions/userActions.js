import axios from 'axios';
import {ADD_NEW_USER, LOGIN_USER, LOG_OUT_USER, ADD_POLL, DELETE_POLL, ANSWER_POLL} from '../constants/actionTypes';


export const addNewUser = (user, callback) => (
  (dispatch) => {
    axios.post('/users/addUser', user)
      .then((res) => {
        if (res.data.name !== 'invalid') {
          callback();
          dispatch({type: ADD_NEW_USER, payload: res.data});
        } else {
          alert('Error adding user'); // need to replace with error callback
        }
      }).catch((err) => {
        throw err;
      });
  }
);

export const loginUser = (user, callback) => (
  (dispatch) => {
    axios.post('/users/loginUser', user)
      .then((res) => {
        callback(res.data);
        dispatch({type: LOGIN_USER, payload: res.data});
      }).catch((err) => {
        throw err;
      });
  }
);

export const logOutUser = () => (
  {type: LOG_OUT_USER, payload: {user: null, loggedIn: false}}
);

// poll arg format: {
//  payload: {question: String, choices: Array, id: Number,
//  owner: String}
export const addPoll = (user, poll, callback) => (
  (dispatch) => {
    axios.post('/polls/addPoll', {user, poll})
      .then((res) => {
        dispatch({type: ADD_POLL, payload: res.data});
        callback(res.data._id);
      });
  }
);

export const answerPoll = (user, poll, callback) => (
  (dispatch) => {
    axios.post('/polls/answerPollForUsers', {user, poll})
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
