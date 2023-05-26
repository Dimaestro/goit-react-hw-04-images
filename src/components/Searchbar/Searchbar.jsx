import { Component } from 'react';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';


class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }
  
  state = {
    findValue: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({[name]: value.toLowerCase()});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { findValue } = this.state;
    
    if (findValue.trim() === '') {
      toast.error('Please enter image name!')
      return;
    }

    this.props.onSubmit(findValue.trim());
    this.setState({ findValue: '' });
  }

  render() {
    const {findValue} = this.state;
    return (
      <header className={styles.searchbar}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.button}>
            <span><FaSearch size={24}/></span>
          </button>

          <input
            className={styles.input}
            type="text"
            name='findValue'
            value={findValue}
            onChange={this.handleChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
