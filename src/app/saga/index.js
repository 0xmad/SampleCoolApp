'use strict';

import {take, put, call, fork} from 'redux-saga/effects';
import * as Api from '../api';
import * as ActionTypes from '../action/action-types';
import * as Actions from '../action/actions';


export function fetchGistsApi(owner, count) {
  return Api.fetchGists(owner, count);
}

export function* fetchGists(owner, count) {
  const gists = yield call(fetchGistsApi, owner, count);
  yield put(Actions.receiveGists(gists));
}

export function createGistApi(gist) {
  return Api.createGist(gist);
}

export function* createGist(gist) {
  const created = yield call(createGistApi, gist);
  yield put(Actions.createdGist(created));
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

const root = function* root() {
  yield [
    fork(watchGistsLoading),
    fork(watchGistCreation),
  ];
};

export default root;