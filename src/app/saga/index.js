'use strict';

import {take, put, call, fork, select} from 'redux-saga/effects';
import * as Api from '../api';
import * as ActionTypes from '../action/action-types';
import * as Actions from '../action/actions';
import * as Selectors from '../reducer/selectors';
import * as Errors from '../action/errors';

export function fetchGistsApi(owner, count) {
  return Api.fetchGists(owner, count);
}

export function* fetchGists(owner, count) {
  const gists = yield call(fetchGistsApi, owner, count);
  if (gists.type !== 'error') {
    yield put(Actions.receiveGists(gists));
  } else {
    yield put(Errors.fetchGistsFailed(gists.error));
  }
}

export function createGistApi(gist) {
  return Api.createGist(gist);
}

export function* createGist(gist) {
  const created = yield call(createGistApi, gist);
  if (created.type !== 'error') {
    yield put(Actions.gistCreated(created));
  } else {
    yield put(Errors.createGistFailed(created.error));
  }
}

const cond = true;

function* watchGistsLoading() {
  while (cond) {
    const action = yield take(ActionTypes.LOAD_GISTS);
    yield fork(fetchGists, action.payload.owner, action.payload.count);
  }
}

function* watchGistCreation() {
  while (cond) {
    const action = yield take(ActionTypes.CREATE_GIST);
    yield fork(createGist, action.payload);
  }
}

export function* startup() {
  const selectedOwner = yield select(Selectors.selectedOwner);
  yield fork(fetchGists, selectedOwner, 1);
}

const root = function* root() {
  yield fork(startup);
  yield [
    fork(watchGistsLoading),
    fork(watchGistCreation),
  ];
};

export default root;