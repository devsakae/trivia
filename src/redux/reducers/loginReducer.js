import { USER_LOGIN } from '../actions';

const INITIAL_STATE = { email: '', nome: '' };

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default loginReducer;
