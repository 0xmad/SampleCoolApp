'use strict';

/* global describe */
/* global it */
import chai from 'chai';
import {call, fork, put, select} from 'redux-saga/effects';
import {
  createGist,
  createGistApi,
  fetchGists,
  fetchGistsApi,
  startup
} from './index';
import * as Selectors from '../reducer/selectors';
import * as Actions from '../action/actions';

const expect = chai.expect;

describe('saga test', () => {
  it('fetchGists Saga', (done) => {
    const mockGists = [1, 2, 3];
    const owner = 'tmbrlkV';
    const generator = fetchGists(owner, 1);
    //noinspection JSUnresolvedVariable
    expect(generator.next().value).to.deep.equal(call(fetchGistsApi, owner, 1));
    //noinspection JSUnresolvedVariable
    expect(generator.next(mockGists).value).to.deep.equal(put(Actions.receiveGists(mockGists)));
    expect(generator.next().done).to.equal(true);
    done();
  });

  it('createGist Saga', (done) => {
    const mockGist = [1];
    const generator = createGist(mockGist);
    //noinspection JSUnresolvedVariable
    expect(generator.next().value).to.deep.equal(call(createGistApi, mockGist));
    //noinspection JSUnresolvedVariable
    expect(generator.next(mockGist).value).to.deep.equal(put(Actions.gistCreated(mockGist)));
    expect(generator.next().done).to.equal(true);
    done();
  });

  it('startup Saga', (done) => {
    const generator = startup();
    //noinspection JSUnresolvedVariable
    expect(generator.next().value).to.deep.equal(select(Selectors.selectedOwner));
    //noinspection JSUnresolvedVariable
    expect(generator.next().value).to.deep.equal(fork(fetchGists, undefined, 1));
    expect(generator.next().done).to.equal(true);
    done();
  });
});