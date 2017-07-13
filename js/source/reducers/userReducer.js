import {addPoll, deletePoll, answerPoll, loginExistingUser, addNewUser, logOut} from '../actions/pollActions';
import {ADD_POLL, DELETE_POLL, ADD_NEW_USER,LOGIN_EXISTING_USER,ANSWER_POLL,LOG_OUT} from '../constants/actionTypes';


export const userReducer = (state, action) => {
  switch(action.type) {
    case ADD_POLL:
      return addPoll(state,action);
    case DELETE_POLL:
      return deletePoll();
    case ADD_NEW_USER:
      return addNewUser(state, action.name, action.email, action.password, action.callback);
    case LOGIN_EXISTING_USER:
      return loginExistingUser(state, action);
    case ANSWER_POLL:
      return answerPoll(state, action);
    case LOG_OUT:
      return logOut(state,action.callback);
    default:
    return state;
  }
};