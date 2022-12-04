import React, { useEffect } from 'react';
import modalOverlayStyles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {
  useEffect(() => {
    const close = (evt) => {
      if (evt.keyCode === 27) {
        props.onClose();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [props]);
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
