'use strict';

import YesterdayDateFormatter from '../utils/date-formatter';
import fetchWithRetry from '../utils/fetch-with-retry';

const githubAPI = 'https://api.github.com';
const owner = 'tmbrlkV';
const headers = new Headers({
  'Content-Type': 'application/json',
  'Accept': 'application/vnd.github.v3+json',
  // 'Authorization': 'token YOUR_TOKEN',
});

export const createGist = (gist) => {
  // noinspection JSUnresolvedFunction
  return fetchWithRetry(`${githubAPI}/gists`, {method: 'POST', headers, body: JSON.stringify(gist)})
    .then(response => response.json());
};

const perPage = 20;

export const fetchGists = (user = owner, count = 1) => {
  const sinceYesterday = `since=${YesterdayDateFormatter(new Date()).toISOString()}`;
  const perPageCount = `page=${count}&per_page=${perPage}`;
  // noinspection JSUnresolvedFunction
  return fetchWithRetry(`${githubAPI}/gists/public?${perPageCount}&${sinceYesterday}`, {method: 'GET', headers})
    .then(response => response.json());
};
