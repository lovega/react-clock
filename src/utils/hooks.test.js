import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { useOnClickOutside } from './hooks';
import PropTypes from 'prop-types';

const ComponentClick = ({ id }) => {
  const ref = useRef();
  useOnClickOutside(ref, () => '');
  return (
    <div id={id} ref={ref}>
      ComponentClick
    </div>
  );
};

ComponentClick.propTypes = {
  id: PropTypes.any,
};

const Component = () => {
  return (
    <div>
      <span id={'el1'}>Component</span>
      <ComponentClick id={'el2'} />
    </div>
  );
};

describe('Basic Hooks test', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    jest.clearAllMocks();
    container.remove();
    container = null;
  });

  it('Fn useOnClickOutside', () => {
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    act(() => {
      ReactDOM.render(<Component />, container);
    });
    const el1 = document.querySelector('#el1');
    const el2 = document.querySelector('#el2');
    expect(el1).not.toBeNull();
    expect(el2).not.toBeNull();
    map.mousedown({
      target: el1,
    });
    map.mousedown({
      target: el2,
    });
    ReactDOM.unmountComponentAtNode(container);
  });
});
