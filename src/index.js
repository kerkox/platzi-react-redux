import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/iconos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/App';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import reduxThonk from 'redux-thunk';

import reducers from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(reduxThonk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

