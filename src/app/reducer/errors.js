'use strict';
import * as ErrorTypes from '../action/error-types';

const errors = (state = {}, action) => {
  switch (action.type) {
  case ErrorTypes.FAILED_FETCH_GISTS:
    return Object.assign({}, state, {
      error: action.payload,
    });
  case ErrorTypes.FAILED_CREATE_GISTS:
    return Object.assign({}, state, {
      error: action.payload,
    });
  default:
    return state;
  }
};

export default errors;