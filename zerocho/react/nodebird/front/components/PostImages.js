import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import Modal from '../components/modal';

const PostImages = ({ image }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  //  const toggleModal = () => {
  //    setModalVisible(!isModalVisible);
  //  };
  return (
    <div>
      <img
        role="presentation"
        src={image.thumbnailUrl}
        alt={image.thumbnailUrl}
        onClick={() => setModalVisible(prev => !prev)}
      />
      {isModalVisible && (
        <Modal setModalVisible={setModalVisible}>
          <p> Modal text! </p>
          <img src={image.url} alt="" />
          <button onClick={() => setModalVisible(false)}> Close Modal </button>
        </Modal>
      )}
    </div>
  );
};

PostImages.propTypes = {
  image: PropTypes.object.isRequired,
};

export default PostImages;
