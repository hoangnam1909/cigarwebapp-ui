import { useEffect } from "react";
import ModalContent from "./ModalContent";

function Modal({ showModal, setShowModal, id, type, content }) {
  useEffect(() => {
    if (showModal == true) {
      document.getElementById(`modal-show-button-${id}`).click();
    }
  }, [showModal]);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        id={`modal-show-button-${id}`}
        data-bs-toggle="modal"
        data-bs-target={`#modal-${id}`}
      >
        Launch static backdrop modal
      </button>

      <div
        className={`modal fade modal-${id}`}
        id={`modal-${id}`}
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <ModalContent type={type} content={content} />
            </div>
            <div className="modal-footer py-1">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => setShowModal(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
