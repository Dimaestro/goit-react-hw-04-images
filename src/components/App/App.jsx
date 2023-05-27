import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import PixabayApi from '../../Api/pixabayApi';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import Button from 'components/Button';

const pixabayApi = new PixabayApi();

const App = () => {
  const [findName, setFindName] = useState('');
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const {
          data: { hits: images }
        } = await pixabayApi.getImages(findName, page);

        if (images.length === 0) {
          toast.info('No images found');
          setLoading(false);
          return;
        }

        const dataImages = images.map(({ id, webformatURL, largeImageURL }) => {
          return {
            id: id,
            webformatURL: webformatURL,
            largeImageURL: largeImageURL,
          };
        });

        setImages(images => [...images, ...dataImages]);
        setLoading(false);

      } catch (err) {
        toast.error(err.message);
      }
    }
    
    if (findName) {
      load();
    }
    
  }, [findName, page]);

  const handleSabmit = value => {
    setFindName(value);
    setImages([]);
    setPage(1);
  };

  const toggleModal = event => {
    setShowModal(showModal => !showModal);

    if (!showModal) {
      setModalImage(event.target.dataset.largeimage);
    }
  };

  const loadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <>
      <div className={styles.app}>
        <Searchbar onSubmit={handleSabmit} />
        <ImageGallery images={images} onClick={toggleModal} />
      </div>
      {images.length >= 12 && <Button onClick={loadMore} />}
      {loading && <Loader />}
      {showModal && <Modal modalImage={modalImage} onClose={toggleModal} />}
      <ToastContainer autoClose={3000} />
    </>
  );
};

export default App;
