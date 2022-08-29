import { useState, useEffect } from 'react';
import { getImages } from './shared/api/images';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const App = () => {
  const [images, setImages] = useState({
    items: [],
    loading: false,
    error: null,
  });

  const [value, setValue] = useState('');

  const [modal, setModal] = useState({
    modalOpen: false,
    modalContent: {
      src: '',
    },
  });

  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchImages = async () => {
      setImages(prevImages => ({
        ...prevImages,
        loading: true,
        error: null,
      }));
      try {
        const data = await getImages(page, value);
        setImages(prevImages => ({
          ...prevImages,
          items: [...prevImages.items, ...data.hits],
          loading: false,
        }));
      } catch (error) {
        setImages(prevImages => ({
          ...prevImages,
          error,
        }));
      } finally {
        setImages(prevImages => ({
          ...prevImages,
          loading: false,
        }));
      }
    };
    if (value) {
      fetchImages();
    }
  }, [page, value]);

  const handleFormSubmit = value => {
    setValue(value);
    setImages(prevImages => ({
      ...prevImages,
      items: [],
    }));
    setPage(1);
  };

  const openModal = modalContent => {
    setModal({
      modalOpen: true,
      modalContent: {
        src: modalContent,
      },
    });
  };

  const close = () => {
    setModal(prevModal => ({
      ...prevModal,
      modalOpen: false,
    }));
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const { modalOpen, modalContent } = modal;
  const { items, loading, error } = images;

  return (
    <div className="app">
      <header className="searchbar">
        <Searchbar onSubmit={handleFormSubmit} />
      </header>

      {loading && <Loader />}
      {error && (
        <p>
          style={{ textAlign: 'Center', fontSize: '25px', fontWeight: '600' }}
          Не удалось загрузить изображения
        </p>
      )}

      {Boolean(items.length) && (
        <ImageGallery onClick={openModal} items={items} />
      )}

      {modalOpen && (
        <Modal close={close}>
          <img src={modalContent.src} alt="img"></img>
        </Modal>
      )}

      {items.length >= 12 && <Button onClick={loadMore} />}
    </div>
  );
};

export default App;
