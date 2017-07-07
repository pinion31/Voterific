import {ADD_POLL, DELETE_POLL, ADD_NEW_USER,LOGIN_EXISTING_USER,ANSWER_POLL} from '../constants/actionTypes';

export const addPoll = () => ({
  type: ADD_POLL,
});

export const deletePoll = () => ({
  type: DELETE_POLL,
});

export const addNewUser = () => ({
  type: ADD_NEW_USER,
});

export const loginExistingUser = () => ({
  type: LOGIN_EXISTING_USER,
});

export const answerPoll = () => ({
  type: ANSWER_POLL,
});