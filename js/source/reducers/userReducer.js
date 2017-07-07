import {addPoll, deletePoll, answerPoll, loginExistingUser, addNewUser} from '../actions/pollActions';
import {ADD_POLL, DELETE_POLL, ADD_NEW_USER,LOGIN_EXISTING_USER,ANSWER_POLL} from '../constants/actionTypes';


export const userReducer = (state, action) => {
  switch(action.type) {
    case ADD_POLL:
      return addPoll();
    case DELETE_POLL:
      return deletePoll();
    case ADD_NEW_USER:
      return addNewUser();
    case LOGIN_EXISTING_USER:
      return loginExistingUser();
    case ANSWER_POLL:
      return answerPoll();
    default:
    return state;
  }
};