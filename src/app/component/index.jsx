'use strict';

import React from 'react';
import Welcome from './welcome/WelcomeContainer';
import GistTable from './gist-table/GistTableContainer';

// TODO: stars, file-upload, error-handling, saga, yesterday gists, tests, refactoring, infinite-scroll
const Root = () => {
  return (
    <section>
      <Welcome/>
      <GistTable/>
    </section>
  );
};

export default Root;