import React from 'react';
import PropTypes from 'prop-types';
import ProgressiveImage from 'react-progressive-image';
import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ image, imageModal }) {
  return (
    <li className={styles.item}>
      <ProgressiveImage src={image.webformatURL} placeholder={image.previewURL}>
        {(src) => (
          <img
            src={src}
            alt={image.tags}
            data-image={image.largeImageURL}
            className={styles.image}
            onClick={imageModal}
          />
        )}
      </ProgressiveImage>
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  imageModal: PropTypes.func.isRequired,
};
