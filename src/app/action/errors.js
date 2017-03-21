'use strict';

import * as ErrorTypes from './error-types';

export const fetchGistsFailed = (error) => {
  return {
    type: ErrorTypes.FAILED_FETCH_GISTS,
    payload: {
      errorMessage: error.message,
    },
  };
};

export const createGistFailed = (error) => {
  return {
    type: ErrorTypes.FAILED_CREATE_GISTS,
    payload: {
      errorMessage: error.message,
    },
  };
};