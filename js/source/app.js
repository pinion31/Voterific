import React from 'react';
import 'babel-polyfill';
import '../../sass/style.scss';
import ReactDOM from 'react-dom';
import RoutedApp from './components/RoutedApp';
import {BrowserRouter, HashRouter, history} from 'react-router-dom';

 ReactDOM.render(
   <HashRouter>
   <RoutedApp/>
   </HashRouter>,
   document.getElementById('app')
  );

if (module.hot) {
  module.hot.accept();
}


/*
const users =
[{
  username:'Chris',
  password:'moon',
  email:'pinion31@gmail.com',
  polls:[{
    question:'Which band is better?', choices: [{choice:'Pearl Jam', votes:0}, {choice:'Nirvana', votes:0},
  {choice:'The Beatles', votes:0}], url:"", owner:'Chris'}],
},
{
  username:'Nicole',
  password:'lucy',
  email:'utatci0@hotmail.com',
  polls:[{
    question:'Which pets are better?', choices: [{choice:'Cats', votes:0}, {choice:'Dogs', votes:0},
  {choice:'Gerbils', votes:0}], url:"", owner:'Nicole'}],
}];

let initialState = {
  userStore:
    {currentUser:{users},
     sitePolls:[
      {
        question:'Which pets are better?', choices: [{choice:'Cats', votes:0}, {choice:'Dogs', votes:0},
        {choice:'Gerbils', votes:0}], url:"", owner:'Nicole'
      }
    ]}
  };


const store = createStore(rootReducer, initialState);*/