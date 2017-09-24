import {loginExistingUser, addNewUser, logOut} from '../actions/pollActions';
import { ADD_NEW_USER, LOGIN_EXISTING_USER, LOG_OUT} from '../constants/actionTypes';

export const userReducer = (state = {currentUser: {}}, action) => {
  switch (action.type) {
    case ADD_NEW_USER:
      return addNewUser(state, action.name, action.email, action.password, action.callback);
    case LOGIN_EXISTING_USER:
      return action.payload.response;
    case LOG_OUT:
      return logOut(state, action.callback);
    default:
      return state;
  }
};
