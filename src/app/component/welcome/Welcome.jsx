'use strict';

import React from 'react';
import CreateGistModal from '../create-gist-modal/CreateGistModalContainer';
import YesterdayDateFormatter from '../../utils/date-formatter';
import './styles.css';

export default class Welcome extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      yesterdayDate: YesterdayDateFormatter(new Date()),
      showModal: false,
    };
  }

  componentWillReceiveProps() {
    this.setState(Object.assign({}, this.state, {
      yesterdayDate: YesterdayDateFormatter(new Date())
    }));
  }

  render() {
    return (
      <header className="welcomeTitle">
        <h1>Showing Gists since yesterday, {this.state.yesterdayDate}</h1>
        <br/>
        <button
          className="createGistButton"
          onClick={() => this.setState(Object.assign({}, this.state, {
            showModal: !this.state.showModal,
          }))}>
          Create Gist
        </button>
        <CreateGistModal show={this.state.showModal}/>
      </header>
    );
  }
}