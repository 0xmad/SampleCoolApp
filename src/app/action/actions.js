'use strict';

import * as ActionTypes from './action-types';
import fetchWithRetry from '../utils/fetch-with-retry';

const githubAPI = 'https://api.github.com';
const headers = new Headers({
  'Content-Type': 'application/json',
  'Accept': 'application/vnd.github.v3+json',
  'Authorization': 'token 321ef5ca3534c9cd47bbe2905e21824e16c044b6',
});

export const createGist = (gist) => {
  return dispatch => {
    // noinspection JSUnresolvedFunction
    return fetchWithRetry(`${githubAPI}/gists`, {method: 'POST', headers, body: JSON.stringify(gist)})
      .then(response => response.json())
      .then(json =>
        dispatch({
          type: ActionTypes.CREATE_GIST,
          payload: json,
        })
      );
  };
};

const fetchGists = (owner = 'potherca') => {
  return dispatch => {
    // dispatch(requestMessages(conversation));
    // noinspection JSUnresolvedFunction
    return fetchWithRetry(`${githubAPI}/users/${owner}/gists`, {method: 'GET', headers})
      .then(response => response.json())
      .catch(() => [])
      .then(json => dispatch(receiveGists(json)));
  };
};

const fetchRepositoryInfo = (repository, owner = 'potherca') => {
  return dispatch => {
    // noinspection JSUnresolvedFunction
    return fetch(`${githubAPI}/repos/${owner}/${repository}`, {method: 'GET', headers})
      .then(response => response.json())
      .then(json => dispatch(getRepositoryInfo(json)));
  };
};

const getRepositoryInfo = (json) => {
  return {
    type: ActionTypes.GET_REPOSITORY_INFO,
    payload: json,
  };
};

const receiveGists = (json) => {
  return {
    type: ActionTypes.RECEIVE_GISTS,
    payload: json,
  };
};

export const fetchGistsIfNeeded = (owner) => {
  return (dispatch, getState) => {
    if (shouldFetch(getState(), owner)) {
      return dispatch(fetchGists(owner));
    }
  };
};
export const fetchRepositoryInfoIfNeeded = (repository, owner) => {
  return (dispatch, getState) => {
    if (shouldFetch(getState(), owner)) {
      return dispatch(fetchRepositoryInfo(repository, owner));
    }
  };
};

const shouldFetch = (state, owner) => {
  // const gists = state.gistsByOwner[owner];
  // if (!gists) {
  return true;
  // } else if (gists.isFetching) {
  //   return false;
  // } else {
  //   return gists.didInvalidate;
  // }
};