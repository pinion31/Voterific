import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import 'babel-polyfill';
import ReactDOM from 'react-dom';
import '../../sass/style.scss';
import RoutedApp from './components/RoutedApp';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/root';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const initialState = {currentUser:{}, polls:[]};
const middleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, initialState, middleware);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RoutedApp />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}

