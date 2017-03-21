'use strict';

import {connect} from 'react-redux';
import * as Actions from '../../action/actions';
import GistList from './GistTable';

// noinspection JSUnresolvedVariable
const byTime = (a, b) => getLongTime(b.updated_at) - getLongTime(a.updated_at);
const getLongTime = (date) => new Date(date).getTime();

const mapStateToProps = (state) => {
  return {
    gists: state.gists.gists.concat().sort(byTime),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGists: (owner, count) => {
      dispatch(Actions.fetchGistsIfNeeded(owner, count));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GistList);