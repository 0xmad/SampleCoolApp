'use strict';

import {connect} from 'react-redux';
import * as Actions from '../../action/actions';
import GistList from './GistTable';

const mapStateToProps = (state) => {
  const gists = state.gists;
  return {
    ownerLogin: state.selectedOwner,
    gists: gists.gists,
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