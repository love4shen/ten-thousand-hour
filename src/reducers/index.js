import { combineReducers } from 'redux';
import goals from './goals';
import appInfo from './appInfo';
import settings from './settings';

const tenKHApp = combineReducers({
  goals,
  appInfo,
  settings,
})

export default tenKHApp;
