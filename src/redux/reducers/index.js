import { combineReducers } from 'redux';
import playerReducer from './loginReducer';

const rootReducer = combineReducers({
  player: playerReducer,
});

export default rootReducer;
