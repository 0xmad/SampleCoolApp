'use strict';

import * as ActionTypes from './action-types';
import * as Errors from './errors';
import fetchWithRetry from '../utils/fetch-with-retry';

const githubAPI = 'https://api.github.com';
// const owner = 'tmbrlkV';
const headers = new Headers({
  'Content-Type': 'application/json',
  'Accept': 'application/vnd.github.v3+json',
  'Authorization': 'token 321ef5ca3534c9cd47bbe2905e21824e16c044b6',
});

export const createGist = (gist) => {
  return dispatch => {
    // noinspection JSUnresolvedFunction
    return fetchWithRetry(`${githubAPI}/gists`, {method: 'POST', headers, body: JSON.stringify(gist)})
      .then(response => {
        if (!response.ok) {
          dispatch(Errors.createGistFailed());
          return;
        }
        return response.json();
      })
      .catch(() => dispatch(Errors.createGistFailed()))
      .then(json =>
        dispatch({
          type: ActionTypes.CREATE_GIST,
          payload: json,
        })
      );
  };
};

const fetchGists = () => {
  return dispatch => {
    // dispatch(requestMessages(conversation));
    // noinspection JSUnresolvedFunction
    return fetchWithRetry(`${githubAPI}/gists`, {method: 'GET', headers})
      .then(response => {
        if (!response.ok) {
          dispatch(Errors.fetchGistsFailed());
          return;
        }
        return response.json();
      })
      .catch(() => dispatch(Errors.fetchGistsFailed()))
      .then(json => dispatch(receiveGists(json)));
  };
};

const receiveGists = (json) => {
  return {
    type: ActionTypes.RECEIVE_GISTS,
    payload: json,
  };
};

export const fetchGistsIfNeeded = () => {
  return (dispatch, getState) => {
    if (shouldFetch(getState())) {
      return dispatch(fetchGists());
    }
  };
};

const shouldFetch = (state) => {
  // const gists = state.gistsByOwner[owner];
  return !!state;
  //   return false;
  // } else {
  //   return gists.didInvalidate;
  // }
};