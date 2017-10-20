import {addNewUser} from '../actions/userActions';
import {ADD_NEW_USER, LOGIN_EXISTING_USER, LOG_OUT} from '../constants/actionTypes';


export const userReducer = (state = {user: {}}, action) => {
  switch(action.type) {
    case ADD_NEW_USER:
      return action.payload;
    default:
      return state;
  }
};


