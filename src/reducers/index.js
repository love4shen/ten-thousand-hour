import { combineReducers } from 'redux';
import goals from './goals';
import appInfo from './appInfo';

const tenKHApp = combineReducers({
  goals,
  appInfo,
})

export default tenKHApp;
