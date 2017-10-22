import {ADD_POLL, DELETE_POLL, ANSWER_POLL} from '../constants/actionTypes';

export const pollReducer = (state = {polls: []}, action) => {
  switch(action.type) {
    case ADD_POLL:
      console.log('pollReducer 6', action.payload);
      return [...state, action.payload];
    case DELETE_POLL:
      return [...state, ...action.payload];
    case ANSWER_POLL:
      return [...state, ...action.payload];
    default:
      return state;
  }
};