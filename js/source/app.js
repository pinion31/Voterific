import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import 'babel-polyfill';
import ReactDOM from 'react-dom';
import '../../sass/style.scss';
import RoutedApp from './components/RoutedApp';

ReactDOM.render(
  <BrowserRouter>
    <RoutedApp />
  </BrowserRouter>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}

