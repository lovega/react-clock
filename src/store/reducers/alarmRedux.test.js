import alarmRedux from './alarmRedux';

describe('Basic alarmRedux test', () => {
  it('Tests alarmRedux', () => {
    expect(alarmRedux([], { type: 'OTHER' })).not.toBeNull();
    expect(alarmRedux([], { type: 'FETCH_ALARM' })).not.toBeNull();
  });
});
