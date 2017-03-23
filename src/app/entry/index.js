'use strict';

/* global module */
/* global process */
/* global require */

import 'babel-polyfill';
import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import Root from '../component';
import configureStore from '../store';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Root/>
  </Provider>,
  document.getElementById('root')
);

if (module.hot && process.env.NODE_ENV !== 'prod') {
  module.hot.accept('../component', () => {
    const NextApp = require('../component').default;
    ReactDOM.render(
      <Provider store={store}>
        <NextApp/>
      </Provider>,
      document.getElementById('root')
    );
  });
}