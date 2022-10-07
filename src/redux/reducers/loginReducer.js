import { USER_LOGIN } from '../actions';

const INITIAL_STATE = { email: '', name: '' };

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return { ...state, ...action.payload };
  default:
    break;
  }
};

export default loginReducer;
