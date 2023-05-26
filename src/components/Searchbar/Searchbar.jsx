import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [findValue, setFindValue] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setFindValue(value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (findValue.trim() === '') {
      toast.error('Please enter image name!')
      return;
    }

    onSubmit(findValue.trim());
    setFindValue('');
  }

  return (
    <header className={styles.searchbar}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <button type="submit" className={styles.button}>
            <span><FaSearch size={24}/></span>
          </button>

          <input
            className={styles.input}
            type="text"
            name='findValue'
            value={findValue}
            onChange={handleChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
  )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default Searchbar;
