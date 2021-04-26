import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';
import { Simulate } from 'react-dom/test-utils';

describe('Basic Modal test', () => {
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
    ReactDOM.render(<Modal />, container);
    ReactDOM.unmountComponentAtNode(container);
  });

  it('Renders open', () => {
    ReactDOM.render(<Modal open />, container);
    ReactDOM.unmountComponentAtNode(container);
  });

  it('Renders onClose', () => {
    ReactDOM.render(<Modal onClose={jest.fn()} />, container);
    const button = document.querySelectorAll('button');
    expect(button[0]).not.toBeNull();
    Simulate.click(button[0]);
    expect(button[1]).not.toBeNull();
    Simulate.click(button[1]);
    ReactDOM.unmountComponentAtNode(container);
  });

  it('Renders onClose null', () => {
    ReactDOM.render(<Modal />, container);
    const button = document.querySelectorAll('button');
    expect(button[0]).not.toBeNull();
    Simulate.click(button[0]);
    expect(button[1]).not.toBeNull();
    Simulate.click(button[1]);
    ReactDOM.unmountComponentAtNode(container);
  });
});
