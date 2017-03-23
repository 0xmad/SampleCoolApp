'use strict';

import React from 'react';
import {Button, Textfield} from 'react-mdl';
import {Spinner} from 'react-mdl';
import './styles.css';

const InputSection = () => (
  <section className="inputSection">
    <Textfield
      label="Description"
      name="description"
      floatingLabel
      required/>
    <Textfield
      type="email"
      label="Email"
      floatingLabel
      required
      pattern="^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
    />
    <section>
      <input className="fileSection" type="file" name="files" multiple required/>
    </section>
  </section>
);

export default class CreateGistModal extends React.PureComponent {
  handleSubmit(e) {
    e.preventDefault();
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
      <form className="modalForm"
            onSubmit={this.handleSubmit.bind(this)}
            ref={input => this.input = input}>
        <InputSection/>
        <Button type="submit"
                disabled={this.props.loading}
                colored
                raised>Submit</Button>
        {this.props.loading && <Spinner className="spinner" singleColor/>}
      </form>
    );
  }
}

CreateGistModal.propTypes = {
  handleClose: React.PropTypes.func.isRequired,
};