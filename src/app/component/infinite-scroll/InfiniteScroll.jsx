'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {topPosition, leftPosition} from '../../utils/position-utils';
import {Spinner, Cell, Grid} from 'react-mdl';

export default class InfiniteScroll extends React.Component {
  constructor(props) {
    super(props);
    this.scrollFunction = this.scrollListener.bind(this);
  }

  componentDidMount() {
    this.attachScrollListener();
  }

  componentDidUpdate() {
    this.attachScrollListener();
  }

  _findElement() {
    return this.props.elementIsScrollable ? ReactDOM.findDOMNode(this) : window;
  }

  attachScrollListener() {
    if (!this.props.hasMore || this.props.loadingMore) return;
    const el = this._findElement();
    el.addEventListener('scroll', this.scrollFunction, true);
    el.addEventListener('resize', this.scrollFunction, true);
    this.scrollListener();
  }

  _elScrollListener() {
    const el = ReactDOM.findDOMNode(this);

    if (this.props.horizontal) {
      const leftScrollPos = el.scrollLeft;
      const totalContainerWidth = el.scrollWidth;
      const containerFixedWidth = el.offsetWidth;
      const rightScrollPos = leftScrollPos + containerFixedWidth;

      return (totalContainerWidth - rightScrollPos);
    }

    const topScrollPos = el.scrollTop;
    const totalContainerHeight = el.scrollHeight;
    const containerFixedHeight = el.offsetHeight;
    const bottomScrollPos = topScrollPos + containerFixedHeight;
    return (totalContainerHeight - bottomScrollPos);
  }

  _windowScrollListener() {
    const el = ReactDOM.findDOMNode(this);

    if (this.props.horizontal) {
      const windowScrollLeft = (window.pageXOffset !== undefined) ? window.pageXOffset :
        (document.documentElement || document.body.parentNode || document.body).scrollLeft;
      const elTotalWidth = leftPosition(el) + el.offsetWidth;
      return elTotalWidth - windowScrollLeft - window.innerWidth;
    }

    const windowScrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset :
      (document.documentElement || document.body.parentNode || document.body).scrollTop;
    const elTotalHeight = topPosition(el) + el.offsetHeight;
    return elTotalHeight - windowScrollTop - window.innerHeight;
  }

  scrollListener() {
    // This is to prevent the upcoming logic from toggling a load more before
    // any data has been passed to the component
    if (this._totalItemsSize() <= 0) return;

    const bottomPosition = this.props.elementIsScrollable ? this._elScrollListener() : this._windowScrollListener();

    if (bottomPosition < Number(this.props.threshold)) {
      this.detachScrollListener();
      this.props.loadMore();
    }
  }

  detachScrollListener() {
    const el = this._findElement();
    el.removeEventListener('scroll', this.scrollFunction, true);
    el.removeEventListener('resize', this.scrollFunction, true);
  }

  _renderOptions() {
    return this.props.children.concat(this.props.items);
  }

  _totalItemsSize() {
    const childrenSize = (this.props.children.size) ? this.props.children.size : this.props.children.length;
    const itemSize = (this.props.items.size) ? this.props.items.size : this.props.items.length;
    return childrenSize + itemSize;
  }

  componentWillUnmount() {
    this.detachScrollListener();
  }

  renderLoader() {
    return this.props.loadingMore && this.props.showLoader && this.props.loader;
  }

  _assignHolderClass() {
    const additionalClass = (typeof this.props.className === 'function') ?
      this.props.className() : this.props.className;
    return 'redux-infinite-scroll ' + additionalClass;
  }

  _renderWithTransitions() {
    const allItems = this.props.children.concat(this.props.items);

    return (
      <ReactCSSTransitionGroup
        transitionName={this.props.transitionName}
        transitionEnter={this.props.transitionEnter}
        transitionEnterTimeout={this.props.transitionEnterTimeout}
        transitionLeave={this.props.transitionLeave}
        transitionLeaveTimeout={this.props.transitionLeaveTimeout}
        transitionAppear={this.props.transitionAppear}
        transitionAppearTimeout={this.props.transitionAppearTimeout}
      >
        {allItems}
      </ReactCSSTransitionGroup>
    );
  }

  render() {
    const Holder = this.props.holderType;

    return (
      <Holder className={ this._assignHolderClass() } style={{height: this.props.containerHeight, overflowY: 'scroll'}}>
        {this.props.animateItems ? this._renderWithTransitions() : this._renderOptions()}
        {this.renderLoader()}
      </Holder>
    );
  }
}

InfiniteScroll.propTypes = {
  elementIsScrollable: React.PropTypes.bool,
  containerHeight: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]),
  threshold: React.PropTypes.number,
  horizontal: React.PropTypes.bool,
  hasMore: React.PropTypes.bool,
  loadingMore: React.PropTypes.bool,
  loader: React.PropTypes.any,
  showLoader: React.PropTypes.bool,
  loadMore: React.PropTypes.func.isRequired,
  items: React.PropTypes.oneOfType([
    React.PropTypes.array
  ]),
  children: React.PropTypes.oneOfType([
    React.PropTypes.array
  ]),
  holderType: React.PropTypes.string,
  className: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.func
  ]),
  animateItems: React.PropTypes.bool,
  transitionName: React.PropTypes.string,
  transitionEnter: React.PropTypes.bool,
  transitionEnterTimeout: React.PropTypes.number,
  transitionLeave: React.PropTypes.bool,
  transitionLeaveTimeout: React.PropTypes.number,
  transitionAppear: React.PropTypes.bool,
  transitionAppearTimeout: React.PropTypes.number,
};

const loader =
  <Grid>
    <Cell col={6} align="middle" offset={6}>
      <Spinner singleColor/>
    </Cell>
  </Grid>;

InfiniteScroll.defaultProps = {
  className: '',
  elementIsScrollable: true,
  containerHeight: '100%',
  threshold: 100,
  horizontal: false,
  hasMore: true,
  loadingMore: false,
  loader: loader,
  showLoader: true,
  holderType: 'section',
  children: [],
  items: [],
  animateItems: false,
  transitionName: 'redux-infinite-scroll',
  transitionEnter: true,
  transitionEnterTimeout: 2000,
  transitionLeave: true,
  transitionLeaveTimeout: 1000,
  transitionAppear: true,
  transitionAppearTimeout: 2000
};