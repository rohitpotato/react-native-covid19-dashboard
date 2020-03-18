import {combineReducers} from 'redux';
import allDataReducer from './allDataReducer';

export const rootReducer = combineReducers({
  data: allDataReducer,
});
