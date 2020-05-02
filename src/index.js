import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/iconos.css';

import App from './components/App';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import reduxThonk from 'redux-thunk';

import reducers from './reducers/index';

const store = createStore(reducers, {}, applyMiddleware(reduxThonk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

