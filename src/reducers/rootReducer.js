import {combineReducers} from 'redux';
import {userReducer} from './userReducer';
import {pollReducer} from './pollReducer';

export default combineReducers({user: userReducer, polls: pollReducer});