import 'whatwg-fetch';
import { history } from 'react-router';


export const addPoll = () => {



};

export const deletePoll = () => {

};

export const answerPoll = () => {


};

export const loginExistingUser = (username,password) => {

    let newState = store.getState().userStore.currentUser[0];

    console.dir(newState);
    newState.forEach( users => {
      if (users.username === username && users.password === password) {
        users.loggedIn = true;
      }
    });

    return newState;
};

export const addNewUser = (state, username,userEmail, pw, callback) => {
  let newState = Object.assign({}, state);

  let user = {name:username,email:userEmail,password:pw, polls:[], loggedIn:true};

  // send new user to server
  fetch('/addUser', {
    method:'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(user),
   }).then(response => {
        callback(response.ok);
        newState.currentUser = user;

    }).catch(err => {
      alert('Error in sending data to server:' + err.message);
    });

    store.getState().currentUser = newState;
};



