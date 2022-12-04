import React from "react";
import { createPortal } from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import modalStyles from "./Modal.module.css";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("root-modals");

const Modal = (props) => {
  const cancelWindowClose = (evt) => {
    if (evt.target.tagName !== "BUTTON") {
      evt.stopPropagation();
    }
  };
  return createPortal(
    <>
      <ModalOverlay onClose={props.onClose}>
        <div
          className={`${modalStyles.container} p-10`}
          onClick={cancelWindowClose}
        >
          {props.title && (
            <h3 className={`${modalStyles.title} text text_type_main-large`}>
              {props.title}
            </h3>
          )}
          <button className={modalStyles.closeButton}></button>
          {props.children}
        </div>
      </ModalOverlay>
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.element,
};

export default Modal;
