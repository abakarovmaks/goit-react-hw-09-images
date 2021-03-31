import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import ProgressiveImage from 'react-progressive-image';
import PropTypes from 'prop-types';
import imageAPI from '../../services/pixabey-api';
import findSomething from '../../images/findSomething.png';
import errorPlaceholder from '../../images/error.jpg';
import Modal from '../Modal/Modal';
import ImageGallery from '../ImageGallery/ImageGallery';
import styles from './ImageGalleryView.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImageGalleryView extends Component {
  state = {
    images: null,
    totalSearchResults: null,
    error: null,
    status: Status.IDLE,
    modalIsOpen: false,
    imageInModal: '',
    activeImage: '',
  };

  componentDidUpdate(prevProps) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;
    const prevPage = prevProps.page;
    const nextPage = this.props.page;

    if (prevQuery !== nextQuery) {
      this.renderNewSearchQuery(nextQuery, nextPage);
    }

    if (prevPage !== nextPage && prevPage < nextPage) {
      this.renderMorePages(nextQuery, nextPage);
    }
  }

  updateImageAvialability = () => {
    if (this.state.images) {
      const result =
        this.state.totalSearchResults > this.state.images.length ? true : false;
      this.props.updateImageAvialability(result);
    } else {
      this.props.updateImageAvialability(false);
    }
  };

  renderNewSearchQuery = (nextQuery, nextPage) => {
    this.props.resetPage();
    this.setState({ images: null, status: Status.PENDING });
    this.props.updateImageAvialability(false);

    imageAPI
      .fetchImages(nextQuery, nextPage)
      .then((images) => {
        if (images.totalHits === 0) {
          toast.error(`No images for ${nextQuery}. Please try another query.`);
          this.setState({
            status: Status.REJECTED,
          });

          return;
        }
        if (images.hits.length === 0) {
          toast.error(`Oops! Please refresh page & try again.`);
          this.setState({
            status: Status.REJECTED,
          });

          return;
        }
        this.setState({
          images: images.hits,
          totalSearchResults: images.totalHits,
          status: Status.RESOLVED,
        });
      })
      .catch((error) => this.setState({ error, status: Status.REJECTED }))
      .finally((data) => {
        this.updateImageAvialability();
      });
  };

  renderMorePages = (nextQuery, nextPage) => {
    this.props.updateImageAvialability(false);

    imageAPI
      .fetchImages(nextQuery, nextPage)
      .then((images) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...images.hits],
        }));
      })
      .catch((error) => this.setState({ error, status: Status.REJECTED }))
      .finally((data) => {
        window.scrollTo({
          top: document.documentElement.scrollHeight - 1200,
          behavior: 'smooth',
        });
        this.updateImageAvialability();
      });
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      modalIsOpen: !prevState.modalIsOpen,
      imageInModal: '',
      activeImage: '',
    }));
  };

  imageModal = (e) => {
    this.toggleModal();
    this.setState((prevState) => ({
      imageInModal: prevState.imageInModal ? '' : e.target.dataset.image,
      activeImage: prevState.activeImage ? '' : e.target.src,
    }));
  };

  render() {
    const {
      status,
      modalIsOpen,
      imageInModal,
      activeImage,
      images,
    } = this.state;

    if (status === Status.IDLE) {
      return (
        <div>
          <img src={findSomething} alt="Please enter a query" />
        </div>
      );
    }

    if (status === Status.PENDING) {
      return (
        <Loader
          className={styles.spinner}
          type="Circles"
          color="orange"
          height={250}
          width={250}
          timeout={3000}
        />
      );
    }

    if (status === Status.REJECTED) {
      return (
        <div>
          <img src={errorPlaceholder} alt="error" />
        </div>
      );
    }

    if (status === Status.RESOLVED) {
      return (
        <>
          <ImageGallery images={images} imageModal={this.imageModal} />
          {modalIsOpen && (
            <Modal toggleModal={this.toggleModal}>
              <ProgressiveImage src={imageInModal} placeholder={activeImage}>
                {(src) => <img src={src} alt="" className={styles.image} />}
              </ProgressiveImage>
            </Modal>
          )}
        </>
      );
    }
  }
}

ImageGalleryView.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  resetPage: PropTypes.func.isRequired,
  updateImageAvialability: PropTypes.func.isRequired,
};
