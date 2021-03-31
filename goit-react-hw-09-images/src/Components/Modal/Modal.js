import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { FaWindowClose } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleModalCloseOnEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleModalCloseOnEsc);
  }

  handleModalCloseOnEsc = (e) => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.toggleModal();
    }
  };

  handleBtnClick = () => {
    this.props.toggleModal();
  };

  render() {
    return createPortal(
      <div className={styles.backdrop} onClick={this.handleBackdropClick}>
        <div className={styles.content}>
          <button className={styles.closeIcon} onClick={this.handleBtnClick}>
            <IconContext.Provider value={{ size: '50px' }}>
              <FaWindowClose />
            </IconContext.Provider>
          </button>
          {this.props.children}
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};
