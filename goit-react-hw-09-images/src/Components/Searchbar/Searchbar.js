import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import { toast } from 'react-toastify';
import styles from './Searchbar.module.css';

export default class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.button = React.createRef();
  }

  state = {
    value: '',
  };

  handleInput = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const query = this.state.value.toLowerCase().trim();
    if (query === '') {
      toast.error('Please enter a query');
      this.button.current.blur();
      return;
    }
    this.props.getSearchQuery(query);
    this.setState({ value: '' });
    this.button.current.blur();
  };

  render() {
    return (
      <header className={styles.header}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.button} ref={this.button}>
            <IconContext.Provider value={{ size: '16px' }}>
              <FiSearch />
            </IconContext.Provider>
          </button>

          <input
            className={styles.input}
            type="text"
            value={this.state.value}
            placeholder="Search images and photos"
            onChange={this.handleInput}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  getSearchQuery: PropTypes.func.isRequired,
};
