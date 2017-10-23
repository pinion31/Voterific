import {ADD_POLL, DELETE_POLL, ANSWER_POLL, GET_ALL_POLLS} from '../constants/actionTypes';

export const pollReducer = (state = {polls: []}, action) => {
  switch(action.type) {
    case ADD_POLL:
      return [...state, action.payload];
    case DELETE_POLL:
      return [action.payload];
    case ANSWER_POLL:
      return [...state, ...action.payload];
    case GET_ALL_POLLS:
      return [...state, ...action.payload];
    default:
      return state;
  }
};