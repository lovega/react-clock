import Index from './index.js';

jest.mock('react-dom', () => ({ render: jest.fn() }));

describe('Basic Index test', () => {
  it('renders without crashing', () => {
    expect(JSON.stringify(Index)).toMatchSnapshot();
  });
});
