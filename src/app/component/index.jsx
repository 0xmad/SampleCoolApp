'use strict';

import {connect} from 'react-redux';
import React from 'react';
import Welcome from './welcome/WelcomeContainer';
import GistTable from './gist-table/GistTableContainer';

// TODO: stars?, tests, refactoring + material + internationalization
const Root = (props) => {
  return (
    <section>
      <Welcome/>
      {props.errors && <div>There is an error: {props.errors.errorMessage}</div>}
      <GistTable/>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    errors: state.errors.error,
  };
};

export default connect(mapStateToProps)(Root);