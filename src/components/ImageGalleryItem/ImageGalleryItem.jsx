import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({webformat, largeImage, onClick}) => {
  return (
    <li className={styles.galleryItem}>
      <img className={styles.image} src={webformat} alt="" onClick={onClick} data-largeimage={largeImage}/>
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformat: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ImageGalleryItem;
