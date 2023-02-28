import { useEffect, FC } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import modalStyles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IModal } from '../../utils/types';

const modalRoot = document.getElementById('root-modals');

export const Modal: FC<IModal> = (props) => {
  useEffect(() => {
    const close = (evt: { key: string }) => {
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
        <button className={modalStyles.closeButton} onClick={props.onClose}>
          <CloseIcon type="primary" />
        </button>
        {props.children}
      </div>
    </ModalOverlay>,
    modalRoot as HTMLElement
  );
};
