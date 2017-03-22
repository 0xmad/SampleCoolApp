'use strict';

import {connect} from 'react-redux';
import * as Actions from '../../action/actions';
import GistList from './GistTable';

// noinspection JSUnresolvedVariable
const byTime = (a, b) => getLongTime(b.updated_at) - getLongTime(a.updated_at);
const getLongTime = (date) => new Date(date).getTime();

const mapStateToProps = (state) => {
  const gists = state.gists;
  return {
    ownerLogin: state.selectedOwner,
    gists: gists.gists.concat().sort(byTime),
    loading: gists.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGists: (owner, count) => {
      dispatch(Actions.loadGists(owner, count));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GistList);