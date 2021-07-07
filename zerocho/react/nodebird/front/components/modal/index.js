import React, { useCallback, useRef } from 'react';
import { Portal } from '../portal';
import styles from '../../styles/Modal.module.scss';
import { PropTypes } from 'prop-types';

const Modal = ({ setModalVisible, children }) => {
  const modalRef = useRef();
  const closeModal = useCallback((e) => {
    console.log('e', e.target);
    console.log('modalRef', modalRef.current);

    if (modalRef.current === e.target) {
      setModalVisible(false);
    }
  }, []);
  return (
    <Portal>
      <div
        ref={modalRef}
        className={styles.modalWrapper}
        onClick={closeModal}
        aria-hidden="true"
      >
        <div className={styles.children}>
          <div> children </div> {children}
        </div>
      </div>
    </Portal>
  );
};

Modal.propTypes = {
  setModalVisible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
