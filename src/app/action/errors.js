'use strict';

import * as ErrorTypes from './error-types';

export const fetchGistsFailed = () => {
  return {
    type: ErrorTypes.FAILED_FETCH_GISTS,
    payload: {
      errorMessage: 'Cannot fetch',
    },
  };
};

export const createGistFailed = () => {
  return {
    type: ErrorTypes.FAILED_CREATE_GISTS,
    payload: {
      errorMessage: 'Cannot create gist',
    },
  };
};