import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { Searchbar } from './Searchbar';
import { Button } from './Button';
import { ImageGallery } from './ImageGallery ';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from './Loader';
import { Modal } from './Modal';

import css from '../index.css';

class App extends Component {


  render() {
    return (
      <div>
        {/* <h1>Phonebook</h1>
      <Form onInput={this.handleInputChange} />

      <h2>Contacts</h2>
      <section className={css.sectionStyle}>
        <Filter onSearch={this.handleSearch} value={this.state.filter} />
        <ContactList
          contacts={filterContacts}
          onDelete={this.handleDeleteContact}
        />
      </section> */}
      </div>
    );
  };
}

export default App;
