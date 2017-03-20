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
      <form className="modalForm" ref={input => this.input = input}>
        <input placeholder="Description" name="description" required/>
        <input type="email" placeholder="Email" required/>
        <File/>
        <button onClick={(e) => {
          e.preventDefault();
          this.handleSubmit();
        }}>Submit
        </button>
      </form>
    );
  }
}