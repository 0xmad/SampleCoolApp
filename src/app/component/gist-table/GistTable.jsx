'use strict';

import React from 'react';
import GistRow from './GistRow';
import InfiniteScroll from '../infinite-scroll/InfiniteScroll';
import LoaderWrapper from '../wrapper/LoaderWrapper';
import './styles.css';

const WrappedInfiniteScroll = LoaderWrapper('items')(InfiniteScroll);
const config = {gistCountInit: 1, gistCountIncrement: 1};
export default class GistTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loadingMore: false,
      gistCount: config.gistCountInit,
      previousGistsLength: 0,
    };
  }

  componentDidMount() {
    const {selectedGist} = this.props;
    this.props.fetchGists(selectedGist, this.state.gistCount);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedGist !== this.props.selectedGist) {
      const {selectedGist} = nextProps;
      this.props.fetchGists(selectedGist, this.state.gistCount);
    }
    this.setState({loadingMore: false, previousGistsLength: this.props.gists.length});
  }

  _createData() {
    return this.props.gists.map((gist, index) => <GistRow key={index} gist={gist}/>);
  }

  _loadMore() {
    this.setState({
      loadingMore: true,
      gistCount: this.state.gistCount + config.gistCountIncrement,
    }, () => {
      const {selectedGist} = this.props;
      this.props.fetchGists(selectedGist, this.state.gistCount);
    });
  }

  render() {
    return (
      <section className="gistTableContainer">
        <section className="gistTable">
          <TableHeader/>
          <WrappedInfiniteScroll
            loadMore={this._loadMore.bind(this)}
            hasMore={this.props.gists.length >= this.state.gistCount}
            loadingMore={this.state.loadingMore}
            showLoader={true}
            threshold={50}
            containerHeight={600}
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