import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const Modal = ({ isVisible, header, footer, children, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = isVisible ? "hidden" : "unset";
  }, [isVisible]);

  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <>
      <div
        className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-opacity-50 bg-kappa-dark-gray"
        onClick={onClose}
      >
        <div
          className="w-3/4 max-w-[500px] bg-kappa-dark-gray rounded-xl p-4 shadow-xl border border-kappa-green drop-shadow"
          onClick={(event) => event.stopPropagation()}
        >
          {header && <>{header}</>}
          {children && <>{children}</>}
          {footer && <>{footer}</>}
        </div>
      </div>
    </>,
    document.body
  );
};

export default Modal;
