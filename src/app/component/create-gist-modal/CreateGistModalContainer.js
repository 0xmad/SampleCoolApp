'use strict';

import {connect} from 'react-redux';
import * as Actions from '../../action/actions';
import CreateGistModal from './CreateGistModal';

const mapStateToProps = (state) => {
  return {
    gists: state.gists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createGist: (gist) => {
      dispatch(Actions.createGist(gist));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGistModal);