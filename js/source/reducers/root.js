import {userReducer} from './userReducer';
import {pollReducer} from './pollReducer';

export const rootReducer = (state, action) => {
  return Object.assign({}, state, {currentUser:userReducer(state,
    action), sitePolls:pollReducer(state.sitePolls, action)
  });
}