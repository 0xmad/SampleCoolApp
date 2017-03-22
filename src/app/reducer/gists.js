'use strict';

import * as ActionTypes from '../action/action-types';

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
  case ActionTypes.GIST_CREATED:
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

export default gists;