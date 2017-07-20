export let initialState = {
  currentUser: {
     name:'',
     password:'',
     email:'',
     polls:[
      { question:'',
        choices: [
          {choice:'', votes:0}],
        id:"",
        owner:''
      }
     ],
     counter:1,
     loggedIn:true,
    }
};

export let newUserWithOutPolls = {
  currentUser: {
     name:'Chris',
     password:'moon',
     email:'pinion31@gmail.com',
     loggedIn:true,
     counter:1,
     polls:[],
  }
};

export let newUserWithOnePoll = {
  currentUser: {
     name:'Chris',
     password:'moon',
     email:'pinion31@gmail.com',
     loggedIn:true,
     polls:[
      { question:'Which band is better?',
        choices: [
          {choice:'Pearl Jam', votes:0},
          {choice:'Nirvana', votes:0},
          {choice:'The Beatles', votes:0}],
        id:1,
        owner:'Chris'
      }
     ],
     counter:2,
    }
};

export let newUserWithOnePollDeleted = {
  currentUser: {
     name:'Chris',
     password:'moon',
     email:'pinion31@gmail.com',
     loggedIn:true,
     polls:[
      { question:'Which band is better?',
        choices: [
          {choice:'Pearl Jam', votes:0},
          {choice:'Nirvana', votes:0},
          {choice:'The Beatles', votes:0}],
        id:1,
        owner:'Chris'
      }
     ],
     counter:3,
    }
};


export let testPoll = {poll:{ question:'Which band is better?',
        choices: [
          {choice:'Pearl Jam', votes:0},
          {choice:'Nirvana', votes:0},
          {choice:'The Beatles', votes:0}],
        id:1,
        owner:'Chris'
      }};

export let testPoll2 =  {poll:{ question:'Which is my favorite animal?',
        choices: [
          {choice:'cat', votes:0},
          {choice:'dog', votes:0},
          {choice:'snail', votes:0}],
        id:2,
        owner:'Chris'
      }};

export let newUserWithTwoPolls = {
  currentUser: {
     name:'Chris',
     password:'moon',
     email:'pinion31@gmail.com',
     loggedIn:true,
     counter:3,
     polls:[
      { question:'Which band is better?',
        choices: [
          {choice:'Pearl Jam', votes:0},
          {choice:'Nirvana', votes:0},
          {choice:'The Beatles', votes:0}],
        id:1,
        owner:'Chris'
      },
      { question:'Which is my favorite animal?',
        choices: [
          {choice:'cat', votes:0},
          {choice:'dog', votes:0},
          {choice:'snail', votes:0}],
        id:2,
        owner:'Chris'
      }
     ],
    }
};
