'use strict';

import React from 'react';

const Loader = (field) => (Wrapped) => {
  return class extends React.PureComponent {
    render() {
      return isEmpty(this.props[field]) ? <section>Loading...</section> : <Wrapped {...this.props}/>;
    }
  };
};

const isEmpty = (prop) => (
  prop === null || prop === undefined ||
  (prop.hasOwnProperty('length') && prop.length === 0) ||
  (prop.constructor === Object && Object.keys(prop).length === 0)
);

export default Loader;