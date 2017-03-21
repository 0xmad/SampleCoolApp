'use strict';

import React from 'react';
import GistRow from './GistRow';
import InfiniteScroll from '../infinite-scroll/InfiniteScroll';
import './styles.css';

export default class GistTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loadingMore: false
    };
  }

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

  _createData() {
    return this.props.gists.map(gist => <GistRow key={gist.id} gist={gist}/>);
  }

  _loadMore() {
    this.setState({loadingMore: true});
    const {selectedConversation} = this.props;
    this.props.fetchGists(selectedConversation);
    this.setState({loadingMore: false});
  }

  render() {
    return (
      <section className="gistTableContainer">
        <section className="gistTable">
          <TableHeader/>
          <InfiniteScroll
            loadMore={this._loadMore.bind(this)}
            hasMore={true}
            loadingMore={this.state.loadingMore}
            showLoader={true}
            threshold={50}
            containerHeight={200}
            animateItems={true}
            items={this._createData()}
          />
        </section>
      </section>
    );
  }
}

const TableHeader = () => (
  <section className="gistTableHeader">
    <span>User</span>
    <span>Description</span>
    <span>URL</span>
    <span>Last updated</span>
  </section>
);