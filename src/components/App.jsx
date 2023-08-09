import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

// import css from '../components/Modal/Modal.css';
import style from './styles.module.css';

// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '37518101-4c8b383dea2a151ad4bc810e7';

class App extends Component {
  // зберігаємо дані, щоб відправити їх вище по дереву компонентів
  state = {
    name: '',
  };

  handleFormSubmit = name => {
    this.setState({ name });
  };

  render() {
    // const { showModal } = this.state;
    return (
      <div className={style.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery name={this.state.name} />
      </div>
    );
  }
}

export default App;
