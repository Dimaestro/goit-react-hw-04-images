import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <div className={styles.buttonContainer}>
            <button type="button" className={styles.button} onClick={onClick}>
              loadMore
            </button>
          </div>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Button;