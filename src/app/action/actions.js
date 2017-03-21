'use strict';

import * as ActionTypes from './action-types';
import * as Errors from './errors';
import YesterdayDateFormatter from '../utils/date-formatter';
import fetchWithRetry from '../utils/fetch-with-retry';

const githubAPI = 'https://api.github.com';
const owner = 'tmbrlkV';
const headers = new Headers({
  'Content-Type': 'application/json',
  'Accept': 'application/vnd.github.v3+json',
  'Authorization': 'token YOUR-TOKEN',
});

export const createGist = (gist) => {
  return dispatch => {
    return fetchWithRetry(`${githubAPI}/gists`, {method: 'POST', headers, body: JSON.stringify(gist)})
      .then(response => {
        // noinspection JSUnresolvedVariable
        if (!response.ok) {
          // noinspection JSUnresolvedFunction
          response.json().then(json => {
            dispatch(Errors.createGistFailed(json));
          });
          return;
        }
        // noinspection JSUnresolvedFunction
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

const perPage = 100;

const fetchGists = (user = owner, count) => {
  return dispatch => {
    const sinceYesterday = `since=${YesterdayDateFormatter(new Date()).toISOString()}`;
    const perPageCount = `page=${count}&per_page=${perPage}`;
    return fetchWithRetry(`${githubAPI}/gists/public?${perPageCount}&${sinceYesterday}`, {method: 'GET', headers})
      .then(response => {
        // noinspection JSUnresolvedVariable
        if (!response.ok) {
          // noinspection JSUnresolvedFunction
          response.json().then(json => {
            dispatch(Errors.createGistFailed(json));
          });
        }
        // noinspection JSUnresolvedFunction
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

export const fetchGistsIfNeeded = (owner, page) => {
  return (dispatch, getState) => {
    if (shouldFetch(getState())) {
      return dispatch(fetchGists(owner, page));
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
