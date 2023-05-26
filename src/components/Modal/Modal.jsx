import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    modalImage: PropTypes.string.isRequired
  }
  
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = (event) => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  }

  handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  }
  
  render() {
    const {modalImage} = this.props;
    return createPortal(
      <div className={styles.overlay} onClick={this.handleBackdropClick}>
        <div className={styles.modal}>
          <img src={modalImage} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
