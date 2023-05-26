import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ images, onClick }) => {
  return (
    <>
      <ul className={styles.gallery}>
        {images.map(({ id, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              webformat={webformatURL}
              largeImage={largeImageURL}
              onClick={onClick}
            />
          );
        })}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired })),
  onClick: PropTypes.func.isRequired,
}
export default ImageGallery;
