'use strict';

import React from 'react';
import {dateFormatter} from '../../utils/date-formatter';

export default class Gist extends React.PureComponent {
  render() {
    const {owner, html_url, description, updated_at} = this.props.gist;
    const updatedDate = new Date(updated_at);
    return (
      <tr>
        <td>{owner ? owner.login : 'Anonymous User'}</td>
        <td>{description}</td>
        <td><a target="_tab" href={html_url}>Github link</a></td>
        {/*<td>{this.props.getRepos(html_url.split('/').slice(-1).pop(), owner && owner.login.toLowerCase())}</td>*/}
        <td>{dateFormatter(updatedDate)}</td>
        <td>0</td>
      </tr>
    );
  }
}

Gist.propTypes = {
  gist: React.PropTypes.shape({
    owner: React.PropTypes.shape({
      login: React.PropTypes.string,
      starred_url: React.PropTypes.string,
    }),
    html_url: React.PropTypes.string,
  }),
  getRepos: React.PropTypes.func.isRequired,
};