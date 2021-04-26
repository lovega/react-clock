import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Simulate } from 'react-dom/test-utils';

jest.mock('../components/Clock/Clock', () => props => (
  <button
    id="clock"
    onClick={() => {
      props.onChange('7:00');
      props.onChange('8:00');
      props.onChange('8:01:01');
      props.onChange();
    }}
  ></button>
));

jest.mock('../components/Modal/Modal', () => props => (
  <button id="modal" onClick={() => props.onClose()}></button>
));

jest.mock('moment', () => {
  return () => jest.requireActual('moment')('2020-01-01T08:01:01.000Z');
});

const data = [
  { message: 'message', active: false },
  { time: '8:00', message: 'message', active: true },
  { time: '8:01:01', message: 'message', active: true },
  { time: '8:01:02', message: 'message', active: false },
];

const mockStore = configureMockStore([thunk]);
const Component = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

let store;
const mockStore1 = () => {
  store = mockStore({
    alarm: data,
    fetchAlarm: () => data,
  });
};
const mockStore2 = () => {
  store = mockStore({
    alarm: null,
    fetchAlarm: () => null,
  });
};
const mockStore3 = () => {
  store = mockStore({
    alarm: [{ time: '8:01:01', message: 'message', active: true }],
    fetchAlarm: () => [{ time: '8:01:01', message: 'message', active: true }],
  });
};

describe('Basic App test', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    container = null;
    jest.clearAllMocks();
  });

  it('Renders without crashing', () => {
    mockStore1();
    ReactDOM.render(<Component store={store} />, container);
    ReactDOM.unmountComponentAtNode(container);
  });

  it('Renders Clock', () => {
    mockStore1();
    ReactDOM.render(<Component store={store} />, container);
    const button = document.getElementById('clock');
    expect(button).not.toBeNull();
    Simulate.click(button);
    ReactDOM.unmountComponentAtNode(container);
  });

  it('Renders Clock 2', () => {
    mockStore2();
    ReactDOM.render(<Component store={store} />, container);
    const button = document.getElementById('clock');
    expect(button).not.toBeNull();
    Simulate.click(button);
    ReactDOM.unmountComponentAtNode(container);
  });

  it('Renders Clock 3', () => {
    mockStore3();
    ReactDOM.render(<Component store={store} />, container);
    const button = document.getElementById('clock');
    expect(button).not.toBeNull();
    Simulate.click(button);
    ReactDOM.unmountComponentAtNode(container);
  });

  it('Renders Modal', () => {
    mockStore1();
    ReactDOM.render(<Component store={store} />, container);
    const button = document.getElementById('modal');
    expect(button).not.toBeNull();
    Simulate.click(button);
    ReactDOM.unmountComponentAtNode(container);
  });

  it('Renders Button', () => {
    mockStore1();
    ReactDOM.render(<Component store={store} />, container);
    const button = document.querySelectorAll('button');
    expect(button[0]).not.toBeNull();
    Simulate.click(button[0]);
    ReactDOM.unmountComponentAtNode(container);
  });
});
