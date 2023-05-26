import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ modalImage, onClose }) => {
  const handleKeydown = (event) => {
    if (event.code === 'Escape') {
      onClose();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    }
  }, [])

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return createPortal(
      <div className={styles.overlay} onClick={handleBackdropClick}>
        <div className={styles.modal}>
          <img src={modalImage} alt="" />
        </div>
      </div>,
      modalRoot
    );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  modalImage: PropTypes.string.isRequired
}

export default Modal;