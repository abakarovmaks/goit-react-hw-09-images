import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images, imageModal }) {
  return (
    <ul className={styles.gallery}>
      {images &&
        images.map((image) => {
          return (
            <ImageGalleryItem
              image={image}
              imageModal={imageModal}
              key={image.id}
            />
          );
        })}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  imageModal: PropTypes.func.isRequired,
};
