import axios from 'axios';

const ALARM_URL =
  'https://raw.githubusercontent.com/medlabmg/developers-tests/master/frontend/alarm.json';

export const FETCH_ALARM = 'FETCH_ALARM';

export const fetchAlarm = () => async dispatch => {
  const response = await axios.get(ALARM_URL);
  dispatch({ type: FETCH_ALARM, payload: response.data });
};
