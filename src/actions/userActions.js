import axios from 'axios';
import {ADD_POLL, DELETE_POLL, ADD_NEW_USER, LOGIN_EXISTING_USER, ANSWER_POLL, LOG_OUT} from '../constants/actionTypes';


export const addNewUser = (user, callback) => (
  (dispatch) => {
    axios.post('/users/addUser', user)
      .then((res) => {
        if (res.data !== 'invalid') {
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

