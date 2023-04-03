import { FC } from 'react';
import modalOverlayStyles from './ModalOverlay.module.css';
import { IModalOverlay } from '../../utils/types';

export const ModalOverlay: FC<IModalOverlay> = (props) => {
  return (
    <aside className={modalOverlayStyles.overlay} onClick={props.onClose} data-test-id="modal-overlay">
      {props.children}
    </aside>
  );
};
