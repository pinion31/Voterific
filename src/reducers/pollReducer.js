import {GET_ALL_POLLS} from '../constants/actionTypes';

export const pollReducer = (state = {polls: []}, action) => {
  switch(action.type) {
    case GET_ALL_POLLS:
      return [...state, ...action.payload];
    default:
      return state;
  }
};