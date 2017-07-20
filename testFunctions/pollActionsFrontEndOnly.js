import 'whatwg-fetch';
import { history } from 'react-router';


//************ADDING AND DELETING POLLS********

export const addPoll = (state, action) => {
  let newState = Object.assign({}, state);
  action.poll.id = newState.currentUser.counter;
  newState.currentUser.polls.push(action.poll);
  newState.currentUser.counter++;





 return newState.currentUser;
};

export const deletePoll = (state, action) => {
  let newState = Object.assign({}, state);

  //local changes
    newState.currentUser.polls = newState.currentUser.polls.filter((poll) => {
    if (poll.id != action.id) {
      return poll;
    }
  });


  return newState.currentUser;

};

//********ANSWERING POLLS***********************

export const answerPoll = (state, action) => {
  //action.answer
  //action.name, action.id

  fetch('/answerPollForUsers', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(action)})
    .then ((response) => {

    })
    .catch(err => {
    if (err) return err;
    });


  fetch('/answerPollForAll', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(action)})
    .then ((response) => {
        if (response.ok) {
           action.callback();
        }
    })
    .catch(err => {
    if (err) return err;
    });

    return state.currentUser;

};

//******LOGGING IN AND OUT***************

export const logOut = (state, callback) => {
  let newState = Object.assign({}, state);
  let userToLogOut = {name:newState.currentUser.name}; //retrieve user's name to send off to db
  newState.currentUser = {}; //no more current user

 return newState.currentUser;
}

export const loginExistingUser = (state,creds) => {

    let newState = Object.assign({},state);

    fetch('/logIn', {
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(creds.user),
     })
      .then(res => res.json())
      .then(user => {
        if (user.login === 'success') {
          newState.currentUser = user.response;
          store.getState().currentUser = newState.currentUser; // need to refactor and figure out issue there; happens below too
          creds.callback(user); //redirect to dashboard
          return newState.currentUser;
        }
        else if (user.response === 'Invalid Password') {
          creds.callback(user);

        }
        else if (user.response === 'Invalid User') {
          creds.callback(user);

        }
    })
      .catch(err => {
        console.log('Error in sending data to server:' + err.message);
    });
};

//************ADDING NEW USER*******************

export const addNewUser = (state, username,userEmail, pw, callback) => {
  let newState = Object.assign({}, state);

  let user = {name:username,email:userEmail,password:pw, polls:[], loggedIn:true, counter:1};

    newState.currentUser = user;
    return newState.currentUser;
};



