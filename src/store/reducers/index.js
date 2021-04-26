import { combineReducers } from 'redux';
import alarmRedux from './alarmRedux';

const rootReducer = combineReducers({
  alarm: alarmRedux,
});

export default rootReducer;
