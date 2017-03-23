'use strict';

import React from 'react';
import {Spinner, Grid, Cell} from 'react-mdl';

const LoaderWrapper = (field) => (Wrapped) => {
  return class extends React.PureComponent {
    render() {
      const loader =
        <Grid>
          <Cell col={6} align="middle" offset={6}>
            <Spinner singleColor/>
          </Cell>
        </Grid>;
      return isEmpty(this.props[field]) ? loader : <Wrapped {...this.props}/>;
    }
  };
};

const isEmpty = (prop) => (
  prop === null || prop === undefined ||
  (prop.hasOwnProperty('length') && prop.length === 0) ||
  (prop.constructor === Object && Object.keys(prop).length === 0)
);

export default LoaderWrapper;