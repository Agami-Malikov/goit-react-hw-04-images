import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ close, children }) => {
  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => document.removeEventListener('keydown', closeModal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      close();
    }
  };
  return createPortal(
    <div className="overlay" onClick={closeModal}>
      <div className="modal">{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.defaultProps = {
  close: () => {},
};

Modal.propTypes = {
  close: PropTypes.func,
};


