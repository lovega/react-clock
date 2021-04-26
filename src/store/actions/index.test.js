import { fetchAlarm } from './index';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Basic actions test', () => {
  it('Tests fetchAlarm', async () => {
    const store = mockStore({});
    const dispatchedStore = store.dispatch(fetchAlarm());
    return dispatchedStore.then(() => {
      expect(store.getActions()).not.toBeNull();
    });
  });
});
