// src/reducers/index.js
import { combineReducers } from 'redux';
import componentReducer from './componentReducer';
import userReducer from './userReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  components: componentReducer,
  user: userReducer,
  auth: authReducer,
});

export default rootReducer;
