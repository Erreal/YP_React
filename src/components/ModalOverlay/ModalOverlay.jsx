import React from 'react';
import modalOverlayStyles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {
  return (
    <aside className={modalOverlayStyles.overlay} onClick={props.onClose}>
      {props.children}
    </aside>
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default ModalOverlay;
