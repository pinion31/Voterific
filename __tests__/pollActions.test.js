/*
 currentUser: {
     name:'Chris',
     password:'moon',
     email:'pinion31@gmail.com',
     loggedIn:false,
     polls:[
      { question:'Which band is better?',
        choices: [
          {choice:'Pearl Jam', votes:0},
          {choice:'Nirvana', votes:0},
          {choice:'The Beatles', votes:0}],
        url:"",
        owner:'Chris'
      }
     ],
}
*/
import 'babel-polyfill';
//import {addPoll, deletePoll, answerPoll, logOut, loginExistingUser, addNewUser} from '../js/source/actions/pollActions';
//import sinon from 'sinon';
import {addPoll, deletePoll, answerPoll, logOut, loginExistingUser, addNewUser} from '../mod/pollActionsFrontEndOnly';
import {newUserWithOnePoll,initialState,newUserWithOnePollDeleted,newUserWithOutPolls,
    testPoll, testPoll2, newUserWithTwoPolls} from '../__mockData__/mockUserData';



let currentState = {currentUser:{}};

describe('addUser to db and make current user the new user', () => {
  test('new user is correctly added as current user', () => {
    currentState.currentUser = addNewUser(initialState, 'Chris','pinion31@gmail.com', 'moon', ()=>{});
    expect(currentState.currentUser)
    .toEqual(newUserWithOutPolls.currentUser);
  });
});

describe('add Poll', () => {
  test('poll is correctly added', () => {
    currentState.currentUser= addPoll(currentState, testPoll);
    expect(currentState.currentUser).toEqual(newUserWithOnePoll.currentUser);
  });
});

describe('add 2nd Poll', () => {
  test('2nd poll is correctly added', () => {
    currentState.currentUser = addPoll(currentState, testPoll2);
    expect(currentState.currentUser).toEqual(newUserWithTwoPolls.currentUser);
  });
});

describe('delete 2nd Poll', () => {
  test('2nd poll does not exist', () => {
    currentState.currentUser = deletePoll(currentState, testPoll2.poll);
    expect(currentState.currentUser).toEqual(newUserWithOnePollDeleted.currentUser);
  });
});

describe('log out', () => {
  test('current user is equal to {}', () => {
    currentState.currentUser = logOut(currentState, ()=>{});
    expect(currentState.currentUser).toEqual({});
  });
});