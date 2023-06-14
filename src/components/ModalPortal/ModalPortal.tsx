import { ReactNode } from "react";
import ReactDOM from "react-dom";

type ModalPortalProps = {
  children: ReactNode;
};

function ModalPortal(props: ModalPortalProps) {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    throw new Error(
      'AddProblemModal root element not found. Make sure to create an element with id="modal-root" in your HTML.'
    );
  }

  return ReactDOM.createPortal(props.children, modalRoot);
}

export default ModalPortal;
