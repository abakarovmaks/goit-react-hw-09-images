import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

export default function Button({ updatePage }) {
  return (
    <button className={styles.button} onClick={updatePage}>
      Load more
    </button>
  );
}

Button.propTypes = {
  updatePage: PropTypes.func.isRequired,
};
