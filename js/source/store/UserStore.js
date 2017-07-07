import {createStore} from 'redux';
import {rootReducer} from '../reducers/root';

/*
database schema is :
*/
const users =
[{
  username:'Chris',
  password:'moon',
  email:'pinion31@gmail.com',
  polls:[{
    question:'Which band is better?', choices: [{choice:'Pearl Jam', votes:0}, {choice:'Nirvana', votes:0},
  {choice:'The Beatles', votes:0}], url:""}],
},
{
  username:'Nicole',
  password:'lucy',
  email:'utatci0@hotmail.com',
  polls:[{
    question:'Which pets are better?', choices: [{choice:'Cats', votes:0}, {choice:'Dogs', votes:0},
  {choice:'Gerbils', votes:0}], url:""}],
}];

let initialState = {userStore:{currentUser:{users}, sitePolls:[]}};


export const store = createStore(rootReducer, initialState);

window.store = store;

