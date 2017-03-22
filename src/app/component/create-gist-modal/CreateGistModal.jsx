'use strict';

import React from 'react';
import './styles.css';

const InputSection = () => (
  <section className="inputSection">
    <label htmlFor="description">Description:</label>
    <input id="description" placeholder="Description" name="description" required/>
    <label htmlFor="email">Email:</label>
    <input id="email" type="email" placeholder="Email" required pattern="^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
    <input type="file" name="files" multiple required/>
  </section>
);

export default class CreateGistModal extends React.PureComponent {
  handleSubmit() {
    if (this.input.checkValidity()) {
      const description = this.input.description.value;
      const createdGist = {
        description,
      };
      const files = {};
      for (let file of this.input.files.files) {
        const reader = new FileReader();
        reader.onloadend = (event) => {
          files[file.name] = {filename: file.name, content: event.target.result};
          this.createGist(files, createdGist);
        };
        reader.readAsText(file, 'UTF-8');
      }
    }
  }

  createGist(files, createdGist) {
    if (Object.keys(files).length === this.input.files.files.length) {
      this.props.createGist(Object.assign({}, createdGist, {
        public: true,
        files: files,
      }));
      this.input.reset();
    }
  }

  render() {
    return (
      this.props.show &&
      <form className="modalForm"
            onSubmit={(e) => {
              e.preventDefault();
              this.handleSubmit(e);
            }}
            ref={input => this.input = input}>
        <InputSection/>
        <button type="submit" disabled={this.props.loading}>Submit</button>
        {this.props.loading && <section>Loading gists...</section>}
      </form>
    );
  }
}