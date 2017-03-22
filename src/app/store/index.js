'use strict';
/* global module */
/* global process */
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga';
import rootReducer from '../reducer';

const sagaMiddleware = createSagaMiddleware();
const configureStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      sagaMiddleware
    )
  );
  if (module.hot && process.env.NODE_ENV !== 'prod') {
    module.hot.accept('../reducer', () => {
      store.replaceReducer(initialState);
    });
  }
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;