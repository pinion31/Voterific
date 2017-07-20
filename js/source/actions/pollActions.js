import 'whatwg-fetch';
/*  global store:true */


//* ***********ADDING AND DELETING POLLS********

export const addPoll = (state, action) => {
  const newState = Object.assign({}, state);
  newState.currentUser.polls.push(action.poll);
  newState.currentUser.counter++;

  fetch('/addPoll', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(action.poll),
  }).then((response) => {
    if (response.ok) {
      action.callback(action.url);
      store.getState().currentUser = newState.currentUser;
    }
  }).catch(err => `Error in sending data to server:${err.message}`);


  fetch('/addPollToAll', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(action.poll),
  }).catch(err => `Error in sending data to server:${err.message}`);

  return newState.currentUser;
};

export const deletePoll = (state, action) => {
  const newState = Object.assign({}, state);

  // local changes
  newState.currentUser.polls = newState.currentUser.polls.filter((poll) => {
    if (poll.id !== action.id) {
      return poll;
    }
  });

  // database changes
  fetch('/deletePollForUsers', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(action)})
    .then(() => {
      action.callback();
    })
    .catch((err) => {
      if (err) return err;
    });


  fetch('/deletePollForAll', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(action)})
    .catch((err) => {
      if (err) return err;
    });

  return newState.currentUser;
};

//* *******ANSWERING POLLS***********************

export const answerPoll = (state, action) => {
  // action.answer
  // action.name, action.id

  fetch('/answerPollForUsers', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(action)})
    .catch((err) => {
      if (err) return err;
    });


  fetch('/answerPollForAll', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(action)})
    .then((response) => {
      if (response.ok) {
        action.callback();
      }
    })
    .catch((err) => {
      if (err) return err;
    });

  return state.currentUser;
};

//* *****LOGGING IN AND OUT***************

export const logOut = (state, callback) => {
  const newState = Object.assign({}, state);
  const userToLogOut = {name: newState.currentUser.name}; // retrieve user's name to send off to db
  newState.currentUser = {}; // no more current user

  fetch('/logOut', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(userToLogOut),
  }).then((response) => {
    if (response.ok) {
      callback();
    }
  }).catch(err => `Error in sending data to server:${err.message}`);

  return newState.currentUser;
};

export const loginExistingUser = (state, creds) => {
  const newState = Object.assign({}, state);

  fetch('/logIn', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(creds.user),
  })
    .then(res => res.json())
    .then((user) => {
      if (user.login === 'success') {
        newState.currentUser = user.response;
        // need to refactor and figure out issue below; happens below too
        store.getState().currentUser = newState.currentUser;
        creds.callback(user); // redirect to dashboard
        return newState.currentUser;
      } else if (user.response === 'Invalid Password') {
        creds.callback(user);
      } else if (user.response === 'Invalid User') {
        creds.callback(user);
      }
    })
    .catch(err => `Error in sending data to server:${err.message}`);
};

//* ***********ADDING NEW USER*******************

export const addNewUser = (state, username, userEmail, pw, callback) => {
  const newState = Object.assign({}, state);

  const user = {
    name: username,
    email: userEmail,
    password: pw,
    polls: [],
    loggedIn: true,
    counter: 1
  };

  // send new user to server
  fetch('/addUser', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user),
  }).then((response) => {
    if (response.status === 201) {
      newState.currentUser = user;
      store.getState().currentUser = newState.currentUser; // need to refactor this
      callback(response.ok);
    } else if (response.status === 400) {
      alert('User already exists. Please choose another name.');
    }
    return newState.currentUser;
  }).catch(err => `Error in sending data to server:${err.message}`); // alert for error
};

