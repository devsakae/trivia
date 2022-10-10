import { USER_LOGIN, ADD_SCORE } from '../actions';

const INITIAL_STATE = {
  nome: '',
  assertions: 0,
  score: 0,
  email: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return { ...state, ...action.payload };
  case ADD_SCORE:
    return { ...state,
      score: action.payload.score,
      assertions: action.payload.assertions };
  default:
    return state;
  }
};

export default playerReducer;
