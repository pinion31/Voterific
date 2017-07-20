import {userReducer} from './userReducer';

export const rootReducer = (state, action) => Object.assign({}, state,
  {currentUser:
    userReducer(state, action)});
