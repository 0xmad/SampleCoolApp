'use strict';

import 'isomorphic-fetch';
import Promise from 'bluebird';

const fetchWithRetry = (url, options) => {
  const retries = options && options.retries || 3;
  // noinspection JSUnresolvedVariable
  const retryDelay = options && options.retryDelay || 5000;

  return new Promise((resolve, reject) => {
    const wrappedFetch = (retryCount) =>
      fetch(url, options)
        .then((response) => resolve(response))
        .catch((error) => retryCount > 0 && setTimeout(() => wrappedFetch(--retryCount), retryDelay) || reject(error));
    wrappedFetch(retries);
  });
};

export default fetchWithRetry;