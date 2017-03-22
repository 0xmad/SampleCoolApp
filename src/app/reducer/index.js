'use strict';

import {combineReducers} from 'redux';
import errors from './errors';
import gists from './gists';
import {SELECT_OWNER} from '../action/action-types';

const selectedOwner = (state = 'tmbrlkV', action) => {
  switch (action.type) {
  case SELECT_OWNER:
    return Object.assign({}, state, {
      selectedGist: action.payload,
    });
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  gists,
  selectedOwner,
  errors,
});

export default rootReducer;