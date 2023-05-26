import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import PixabayApi from '../../Api/pixabayApi';
import Button from 'components/Button';

const pixabayApi = new PixabayApi();

class App extends Component {
  state = {
    findName: '',
    images: [],
    showModal: false,
    modalImage: '',
    page: 1,
    loading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, findName } = this.state;
    console.log(prevProps, prevState);
    if (prevState.findName !== findName || prevState.page !== page) {
      this.setState({ loading: true });
      try {
        const {
          data: { hits: images },
        } = await pixabayApi.getImages(findName, page);

        if (images.length === 0) {
          toast.info('No images found');
          this.setState({ loading: false });
          return;
        }

        const dataImages = images.map(({ id, webformatURL, largeImageURL }) => {
          return {
            id: id,
            webformatURL: webformatURL,
            largeImageURL: largeImageURL,
          };
        });

        this.setState(prevState => ({
          images: [...prevState.images, ...dataImages],
          loading: false,
        }));
      } catch (err) {
        toast.error(err.message);
      }
    }
  }

  handleSabmit = value => {
    this.setState({
      findName: value,
      images: [],
      page: 1,
    });
  };

  toggleModal = event => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
    if (!this.state.showModal) {
      this.setState({ modalImage: event.target.dataset.largeimage });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, showModal, modalImage, loading } = this.state;

    return (
      <>
        <div className={styles.app}>
          <Searchbar onSubmit={this.handleSabmit} />
          <ImageGallery images={images} onClick={this.toggleModal} />
        </div>
        {images.length >= 12 && <Button onClick={this.loadMore} />}
        {loading && <Loader />}
        {showModal && (
          <Modal modalImage={modalImage} onClose={this.toggleModal} />
        )}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}

export default App;
