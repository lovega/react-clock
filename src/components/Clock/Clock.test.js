import React, { useState as useStateMock } from 'react';
import ReactDOM from 'react-dom';
import Clock from './Clock';

jest.mock('moment-timezone', () => {
  return () =>
    jest.requireActual('moment-timezone')('2020-01-01T08:01:01.000Z');
});

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useState: jest
      .fn()
      .mockReturnValue([{ h: null, m: null, s: null }, () => {}]),
  };
});

const mockUseStateNull = () => {
  useStateMock.mockReset();
  useStateMock.mockReturnValue([{ h: null, m: null, s: null }, () => {}]);
};

const mockUseState = () => {
  useStateMock.mockReset();
  useStateMock.mockReturnValue([{ h: 8, m: 2, s: 12 }, () => {}]);
};

jest.useFakeTimers();

describe('Basic Clock test', () => {
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
    mockUseStateNull();
    ReactDOM.render(<Clock />, container);
    ReactDOM.unmountComponentAtNode(container);
  });

  it('Renders timezone and onChange', () => {
    mockUseStateNull();
    ReactDOM.render(
      <Clock timezone={'Europe/Madrid'} onChange={jest.fn()} />,
      container
    );
    ReactDOM.unmountComponentAtNode(container);
  });

  it('Renders interval', () => {
    mockUseState();
    ReactDOM.render(<Clock timezone={'America/New_York'} />, container);
    jest.advanceTimersByTime(1000);
    jest.runAllTimers();
    jest.advanceTimersByTime(1000);
    jest.runAllTimers();
    ReactDOM.unmountComponentAtNode(container);
  });
});
