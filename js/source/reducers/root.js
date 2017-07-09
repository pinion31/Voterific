import {userReducer} from './userReducer';
/*
let initialState = [{
  username:'Chris',
  password:'moon',
  email:'pinion31@gmail.com',
  polls:[{
    question:'Which band is better?', choices: [{choice:'Pearl Jam', votes:0}, {choice:'Nirvana', votes:0},
  {choice:'The Beatles', votes:0}]}],
}];
*/
export const rootReducer = (state, action) => {
  return Object.assign({}, state, {userStore:userReducer(state.userStore,
    action),
  });
}