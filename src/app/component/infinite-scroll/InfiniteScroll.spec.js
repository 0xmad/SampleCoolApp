'use strict';
/* global describe */
/* global beforeEach */
/* global it */
/* global expect */
/* global jest */
import React from 'react';
import {shallow} from 'enzyme';
import InfiniteScroll from './InfiniteScroll';

//noinspection JSUnresolvedFunction
jest.unmock('./InfiniteScroll');

class Shell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: props.initialItems
    };
  }

  _loadMore() {
    const currentItems = this.state.items;
    const newItems = this.props.additionalItems;

    this.setState({
      items: currentItems.concat(newItems)
    });
  }

  _renderItems() {
    return this.state.items.map((item, index) => {
      return (
        <div key={index} style={{'height': this.props.itemHeight}}>{item}</div>
      );
    });
  }

  render() {
    return (
      <div className="scroll" style={{overflowY: 'scroll'}}>
        <InfiniteScroll containerHeight={this.props.containerHeight}
                        loadMore={this._loadMore.bind(this)}>
          {this._renderItems()}
        </InfiniteScroll>
      </div>
    );
  }
}

Shell.propTypes = {
  initialItems: React.PropTypes.array,
  itemHeight: React.PropTypes.string,
};


describe('InfiniteScroll', () => {

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('containerHeight', () => {
    it('defaults to 100%', () => {
      const reactElement = <InfiniteScroll
        loadMore={() => {
        }}
        items={[]}/>;
      const render = shallow(reactElement);
      //noinspection JSUnresolvedFunction
      expect(render.node.props.style.height).toEqual('100%');
    });

    it('should set the height of the div when given the correct props', () => {
      const reactElement = <InfiniteScroll
        containerHeight='500px'
        loadMore={() => {
        }}
        items={[]}/>;
      const render = shallow(reactElement);
      //noinspection JSUnresolvedFunction
      expect(render.node.props.style.height).toEqual('500px');
    });
  });

  describe('threshold default', () => {
    it('should not load more items at scroll of 100', (done) => {
      const reactElement = <Shell
        initialItems={['hi', 'hi', 'hi', 'hi']}
        additionalItems={['bye', 'bye']}
        itemHeight='100px'
        containerHeight='200px'
      />;
      const component = shallow(reactElement);
      const shellNode = component.node.props;
      shellNode.style['overflowY'] = 'scroll';

      const children = shellNode.children.props.children;
      //noinspection JSUnresolvedFunction
      expect(children.length).toEqual(4);
      component.find('.scroll').simulate('scroll', {deltaY: 100});
      //noinspection JSUnresolvedFunction
      expect(children.length).toEqual(4);

      setTimeout(() => {
        done();
      }, 0);

    });
  });
});