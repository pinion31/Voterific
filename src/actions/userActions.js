import axios from 'axios';
import {ADD_POLL, DELETE_POLL, ADD_NEW_USER, LOGIN_USER, ANSWER_POLL, LOG_OUT_USER} from '../constants/actionTypes';


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

