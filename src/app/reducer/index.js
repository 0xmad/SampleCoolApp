'use strict';

import {combineReducers} from 'redux';
import errors from './errors';
import * as ActionTypes from '../action/action-types';

const selectedGist = (state = '', action) => {
  switch (action.type) {
  case ActionTypes.SELECT_GIST:
    return Object.assign({}, state, {
      selectedGist: action.payload,
    });
  default:
    return state;
  }
};

export const initialState = {
  gists: [],
};

const gists = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.CREATE_GIST:
    return Object.assign({}, state, {
      gists: [...state.gists, action.payload],
    });
  case ActionTypes.RECEIVE_GISTS:
    return Object.assign({}, state, {
      gists: action.payload,
    });
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  gists,
  selectedGist,
  errors,
});

export default rootReducer;