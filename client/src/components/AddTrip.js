import React, { useState } from "react";
import Modal from "react-modal";
import TripForm from "./TripForm";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const AddTrip = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <span>
      <button
        type="button"
        className="grey-button btn-lg"
        onClick={openModal}
      >
        Add trip
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Trip"
      >
        <div className="row justify-content-md-center">
          <div className="col-m-12 text-center">
            <h4 className="fs-4">Add a new trip</h4>
            <TripForm />
            <button className="btn btn-outline-danger" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </span>
  );
};

export default AddTrip;
