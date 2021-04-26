import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './containers/App';
import reducers from "./store/reducers/index";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
