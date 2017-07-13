import 'whatwg-fetch';
import { history } from 'react-router';


export const addPoll = (state, action) => {
  let newState = Object.assign({}, state);
  newState.currentUser.polls.push(action.poll);
  newState.currentUser.counter++;

    fetch('/addPoll', {
    method:'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(action.poll),
   }).then(response => {
      if (response.ok) {
        action.callback(action.url);
        store.getState().currentUser = newState.currentUser;
      }

    }).catch(err => {
      console.log('Error in sending data to server:' + err.message);
    });

    fetch('/addPollToAll', {
    method:'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(action.poll),
   }).then(response => {
      if (response.ok) {
      }
    }).catch(err => {
      console.log('Error in sending data to server:' + err.message);
    });

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

  //database changes
  fetch('/deletePollForUsers', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(action)})
    .then ((response) => {
      action.callback();
    })
    .catch(err => {
    if (err) return err;
    });


  fetch('/deletePollForAll', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(action)})
    .then ((response) => {

    })
    .catch(err => {
    if (err) return err;
    });

  return newState.currentUser;

};

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

export const logOut = (state, callback) => {
  let newState = Object.assign({}, state);
  let userToLogOut = {name:newState.currentUser.name}; //retrieve user's name to send off to db
  newState.currentUser = {}; //no more current user

  fetch('/logOut', {
    method:'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(userToLogOut),
   }).then(response => {
      if (response.ok) {
        callback();
      }

    }).catch(err => {
      console.log('Error in sending data to server:' + err.message);
    });

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
          creds.callback(); //redirect to dashboard
          return newState.currentUser;
        }
        else if (user.response === 'Invalid Password') {
          //TODO: alert invalid password
          console.log('Invalid Password');

        }
        else if (user.response === 'Invalid User') {
          //TODO: alert invalid User
          console.log('Invalid User');

        }
    })
      .catch(err => {
        console.log('Error in sending data to server:' + err.message);
    });
};

export const addNewUser = (state, username,userEmail, pw, callback) => {
  let newState = Object.assign({}, state);

  let user = {name:username,email:userEmail,password:pw, polls:[], loggedIn:true, counter:1};

  // send new user to server
  fetch('/addUser', {
    method:'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(user),
   }).then(response => {
        callback(response.ok);
        newState.currentUser = user;
        store.getState().currentUser = newState.currentUser; //need to refactor this
        return newState.currentUser;
    }).catch(err => {
      console.log('Error in sending data to server:' + err.message); //alert for error
    });


};



