'use strict';

import React from 'react';
import './styles.css';

const File = () => (
  <section className="fileSection">
    <input placeholder="File name" name="fileName" required pattern="\S+"/>
    <textarea className="fileContentArea" placeholder="File content" name="content" required/>
  </section>
);

export default class CreateGistModal extends React.PureComponent {
  handleSubmit() {
    if (this.input.checkValidity()) {
      const description = this.input.description.value;
      const filename = this.input.fileName.value;
      const content = this.input.content.value;
      this.props.createGist({
        description,
        public: true,
        files: {
          file: {
            filename,
            content,
          },
        }
      });
      this.input.reset();
    }
  }

  render() {
    return (
      this.props.show &&
      <form
        className="modalForm"
        onSubmit={(e) => {
          e.preventDefault();
          this.handleSubmit();
        }}
        ref={input => this.input = input}>
        <label htmlFor="description">Description:</label>
        <input id="description" placeholder="Description" name="description" required/>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" placeholder="Email" required pattern="^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
        <File/>
        <button type="submit">Submit</button>
      </form>
    );
  }
}