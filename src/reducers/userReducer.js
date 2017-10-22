import {ADD_NEW_USER, LOGIN_USER, LOG_OUT_USER} from '../constants/actionTypes';


export const userReducer = (state = {user: {}}, action) => {
  switch(action.type) {
    case ADD_NEW_USER:
      return action.payload;
    case LOGIN_USER:
      return action.payload;
    case LOG_OUT_USER:
      return action.payload;
    default:
      return state;
  }
};

