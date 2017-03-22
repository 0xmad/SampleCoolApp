'use strict';

import {combineReducers} from 'redux';
import errors from './errors';
import * as ActionTypes from '../action/action-types';

const selectedOwner = (state = 'tmbrlkV', action) => {
  switch (action.type) {
  case ActionTypes.SELECT_OWNER:
    return Object.assign({}, state, {
      selectedGist: action.payload,
    });
  default:
    return state;
  }
};

export const initialState = {
  gists: [],
  loading: true,
};

const gists = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.LOAD_GISTS:
    return Object.assign({}, state, {
      owner: action.payload.owner,
      count: action.payload.count,
      loading: true,
    });
  case ActionTypes.CREATE_GIST:
    return Object.assign({}, state, {
      loading: true,
    });
  case ActionTypes.CREATED_GIST:
    return Object.assign({}, state, {
      gists: [...state.gists, action.payload],
      loading: false,
    });
  case ActionTypes.RECEIVE_GISTS: {
    const flags = {};
    return Object.assign({}, state, {
      gists: [...state.gists, ...action.payload].filter(gist => {
        if (flags[gist.id]) return false;
        flags[gist.id] = true;
        return true;
      }),
      loading: false,
    });
  }
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  gists,
  selectedOwner,
  errors,
});

export default rootReducer;