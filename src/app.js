import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import '../sass/style.scss';
import RoutedApp from './components/RoutedApp';
import store from './store/Store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RoutedApp />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}