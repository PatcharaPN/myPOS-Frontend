import React, { ReactNode } from "react";
import "./Modal.scss";

type ModalProps = {
  header?: string;
  children: ReactNode;
  onClose?: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, header }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <div className="flex-btn">
            <h2>{header}</h2>
          </div>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};
export default Modal;
