'use strict';

import React from 'react';
import Gist from './GistRow';
import LoaderWrapper from '../wrapper/LoaderWrapper';
import './styles.css';

const TableContent = LoaderWrapper('gists')(({gists, fetchRepositoryInfo}) => {
  return (
    <table className="gistTable">
      <thead>
      <tr>
        <th>User</th>
        <th>Description</th>
        <th>URL</th>
        <th>Last updated</th>
        <th>Stars</th>
      </tr>
      </thead>
      <tbody>
      {gists.map(gist => <Gist key={gist.id} gist={gist} getRepos={fetchRepositoryInfo}/>)}
      </tbody>
    </table>
  );
});

export default class GistTable extends React.PureComponent {
  componentDidMount() {
    const {selectedConversation} = this.props;
    this.props.fetchGists(selectedConversation);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedGist !== this.props.selectedGist) {
      const {selectedGist} = nextProps;
      this.props.fetchGists(selectedGist);
    }
  }

  render() {
    return (
      <section className="gistTableContainer">
        <TableContent
          gists={this.props.gists}
          fetchRepositoryInfo={this.props.fetchRepositoryInfo}/>
      </section>
    );
  }
}