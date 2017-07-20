import React from 'react';
import {HashRouter} from 'react-router-dom';
import 'babel-polyfill';
import ReactDOM from 'react-dom';
import '../../sass/style.scss';
import RoutedApp from './components/RoutedApp';

ReactDOM.render(
  <HashRouter>
    <RoutedApp />
  </HashRouter>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}

