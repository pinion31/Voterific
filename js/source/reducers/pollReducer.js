import {ADD_POLL, DELETE_POLL, ANSWER_POLL} from '../constants/actionTypes';

export const pollReducer = (state = {polls: []}, action) => {
  switch (action.type) {
    case ADD_POLL:
      return {polls: [...state.games, ...action.payload]};
    case DELETE_POLL:
      return {polls: [...state.games, ...action.payload]};
    case ANSWER_POLL:
      return {polls: [...state.games, ...action.payload]};
    default:
      return state;
  }
};
