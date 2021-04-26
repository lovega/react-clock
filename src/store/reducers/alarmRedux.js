import { FETCH_ALARM } from '../actions/index';

const alarmRedux = (state = [], action) => {
  switch (action.type) {
    case FETCH_ALARM:
      return action.payload;
    default:
      return state;
  }
};

export default alarmRedux;
