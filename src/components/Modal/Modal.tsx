import React, { ReactNode } from "react";
import "./Modal.scss";
import { Icon } from "@iconify/react/dist/iconify.js";

type ModalProps = {
  header: string;
  children: ReactNode;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, onClose, header }) => {
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
