import {ADD_POLL, DELETE_POLL, ADD_NEW_USER,LOGIN_EXISTING_USER,ANSWER_POLL} from '../constants/actionTypes';

export const addPoll = (newPoll) => ({
  type: ADD_POLL,
  poll: newPoll,
});

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

export const loginExistingUser = (user, pw) => ({
  type: LOGIN_EXISTING_USER,
  username: user,
  password:pw,
});

export const answerPoll = () => ({
  type: ANSWER_POLL,
});