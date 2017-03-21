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
      const files = {};
      // TODO: refactoring
      for (let file of this.input.files.files) {
        const reader = new FileReader();
        reader.onloadend = (event) => {
          const result = event.target.result;
          files[file.name] = {filename: file.name, content: result};
          if (Object.keys(files).length === this.input.files.files.length) {
            this.props.createGist({
              description,
              public: true,
              files: files
            });
            this.input.reset();
          }
        };
        reader.readAsText(file, 'UTF-8');
      }
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
        <button type="submit">Submit</button>
      </form>
    );
  }
}