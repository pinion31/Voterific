import {createStore} from 'redux';
import {rootReducer} from '../reducers/root';

const initialState = {
  currentUser: {},
};

export const store = createStore(rootReducer, initialState);

window.store = store;

