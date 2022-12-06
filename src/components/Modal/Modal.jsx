import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import modalStyles from './Modal.module.css';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('root-modals');

const Modal = (props) => {
  useEffect(() => {
    const close = (evt) => {
      if (evt.key === 'Escape') {
        props.onClose();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [props]);
  return createPortal(
    <ModalOverlay onClose={props.onClose}>
      <div
        className={`${modalStyles.container} p-10`}
        onClick={(evt) => evt.stopPropagation()}
      >
        {props.title && (
          <h3 className={`${modalStyles.title} text text_type_main-large`}>
            {props.title}
          </h3>
        )}
        <button
          className={modalStyles.closeButton}
          onClick={props.onClose}
        ><CloseIcon type="primary" /></button>
        {props.children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.element,
};

export default Modal;
