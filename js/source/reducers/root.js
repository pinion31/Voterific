import {userReducer} from './userReducer';
import {pollReducer} from './pollReducer';
import {combineReducers} from 'redux';

export default combineReducers({currentUser: userReducer, polls: pollReducer});


