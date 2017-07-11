import {ADD_POLL, DELETE_POLL, ADD_NEW_USER,LOGIN_EXISTING_USER,ANSWER_POLL, LOG_OUT} from '../constants/actionTypes';

export const addPoll = (newPoll, callback, url) => ({
  type: ADD_POLL,
  poll: newPoll,
  callback,
  url,
});

export const logOut = () => ({
  type: LOG_OUT,
})

export const deletePoll = () => ({
  type: DELETE_POLL,
});

export const addNewUser = (user, redirect) => ({
  type: ADD_NEW_USER,
  name: user.name,
  email: user.email,
  password: user.password,
  callback:redirect, //callback redirect user to dashboard upon successful user add
});

export const loginExistingUser = (user, callback) => ({
  type: LOGIN_EXISTING_USER,
  user,
  callback,
});

export const answerPoll = () => ({
  type: ANSWER_POLL,
});