'use strict';

import {combineReducers} from 'redux';
import * as ActionTypes from '../action/action-types';

const selectedGist = (state = 'potherca', action) => {
  switch (action.type) {
  case ActionTypes.SELECT_GIST:
    return action.payload;
  default:
    return state;
  }
};

const gists = (state = [], action) => {
  switch (action.type) {
  case ActionTypes.CREATE_GIST:
    return [...state, action.payload];
  case ActionTypes.RECEIVE_GISTS:
    return action.payload;
  case ActionTypes.GET_REPOSITORY_INFO:
    return action.payload;
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  gists,
  selectedGist,
});

export default rootReducer;