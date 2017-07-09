import 'whatwg-fetch';


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

export const addNewUser = (state, username,userEmail,pw) => {
  let newState = Object.assign({}, state);

  let user = {name:username,email:userEmail,password:pw};
  console.log("user.name.name =" + user.name.name);
  console.log("user.name =" + user.name);

  // send new user to server
  fetch('/addUser', {
    method:'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(user),
   }).then(response => {
      if (response.ok) {
        console.log('added User');
      }
    }).catch(err => {
      alert('Error in sending data to server:' + err.message);
    });

  return newState;

};

