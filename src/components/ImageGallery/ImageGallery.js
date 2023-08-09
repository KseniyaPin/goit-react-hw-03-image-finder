import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import Button from '../Button/Button';

// import fetchName from '../services/Img-api';
import css from './ImageGallery.module.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37518101-4c8b383dea2a151ad4bc810e7';

export class ImageGallery extends Component {
  state = {
    name: '',
    page: 1,
    error: null,
    status: 'idle', // 'idle' - запита ще немає
  };

  componentDidUpdate(prevProps, prevState) {
    const searchOptions = {
      q: this.props.name,
      per_page: 12,
      image_type: 'photo',
      page: this.state.page,
      orientation: 'horizontal',
    };

    if (prevProps.name !== this.props.name) {     
      this.setState({ status: 'pending' });
      fetch(
        `${BASE_URL}?q=${searchOptions.q}&page=${searchOptions.page}&key=${API_KEY}&image_type=${searchOptions.image_type}&orientation=${searchOptions.orientation}&per_page=${searchOptions.per_page}`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`No such pictures ${this.props.name}`)
          );
        })

      // fetchName
        .then(name =>
          this.setState({
            name: name,
            status: 'resolved',
          })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  onClickButtonMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });

    // this.fetch();
  };

  render() {
    // 'idle' - запиту ще немає
    if (this.state.status === 'idle') {
      return;
    }

    // 'pending' - пішов запит
    if (this.state.status === 'pending') {
      return <Loader />;
    }

    // 'rejected' - запит із помилкою
    if (this.state.status === 'rejected') {
      return <p>{this.state.error.message}</p>;
    }

    // 'resolved' - успішний запит
    if (this.state.status === 'resolved') {
      return (
        <>
          <ul className={css.ImageGallery}>
            {this.state.name.hits.map(elem => (
              <li key={elem.id} className={css.ImageGalleryItem}>
                <ImageGalleryItem name={elem} />
              </li>
            ))}
          </ul>

          {/* {this.state.name.hits.length < 12 ||
          this.state.name.total === this.state.name.hits.length ? null : (
            <Button onclick={this.onClickButtonMore} />
          )} */}

          {this.state.name.hits.length > 0 &&
            this.state.name.hits.length < this.state.name.total && (
              <Button onclick={this.onClickButtonMore} />
            )}
        </>
      );
    }
  }
}
