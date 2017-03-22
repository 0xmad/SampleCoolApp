'use strict';

import * as ActionTypes from './action-types';

export const receiveGists = (json) => {
  return {
    type: ActionTypes.RECEIVE_GISTS,
    payload: json,
  };
};

export const createGist = (gist) => {
  return {
    type: ActionTypes.CREATE_GIST,
    payload: gist,
  };
};

export const gistCreated = (gist) => {
  return {
    type: ActionTypes.GIST_CREATED,
    payload: gist,
  };
};

export const loadGists = (owner, count) => {
  return {
    type: ActionTypes.LOAD_GISTS,
    payload: {owner, count},
  };
};