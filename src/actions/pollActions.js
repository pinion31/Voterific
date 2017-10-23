import axios from 'axios';
import {GET_ALL_POLLS} from '../constants/actionTypes';

export const getAllPolls = () => (
  (dispatch) => {
    axios.get('/polls/getAllPolls')
      .then((res) => {
        dispatch({type: GET_ALL_POLLS, payload: res.data});
      });
  }
);

