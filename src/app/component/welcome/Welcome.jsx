'use strict';

import React from 'react';
import CreateGistModal from '../create-gist-modal/CreateGistModalContainer';
import {Grid, Cell, Button, Dialog, DialogContent, DialogTitle, DialogActions} from 'react-mdl';
import {dateFormatter} from '../../utils/date-formatter';

export default class Welcome extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      yesterdayDate: dateFormatter(new Date()),
      showModal: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps() {
    this.setState(Object.assign({}, this.state, {
      yesterdayDate: dateFormatter(new Date())
    }));
  }

  handleClick() {
    this.setState(Object.assign({}, this.state, {
      showModal: !this.state.showModal,
    }));
  }

  render() {
    return (
      <header className="welcomeTitle">
        <Grid>
          <Cell col={11}>
            <h4>Showing Gists since yesterday, {this.state.yesterdayDate}</h4>
          </Cell>
          <Cell col={1}>
            <Button
              style={{
                marginTop: '24px',
                marginBottom: '16px'
              }}
              colored
              raised
              onClick={this.handleClick}>
              Create Gist
            </Button>
          </Cell>
        </Grid>
        <Dialog open={this.state.showModal}>
          <DialogTitle>Create Gist</DialogTitle>
          <DialogContent>
            <CreateGistModal handleClose={this.handleClick}/>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClick}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </header>
    );
  }
}