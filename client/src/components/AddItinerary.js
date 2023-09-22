import React, { useState } from "react";
import Modal from "react-modal";
import ItineraryForm from "./ItineraryForm";

Modal.setAppElement("#root");

const AddItinerary = ({ category }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  console.log(category);

  return (
    <div className="d-grid">
      <button
        type="button"
        className="btn-lg grey-button"
        onClick={openModal}
      >
        Add New
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add visit"
      >
        <ItineraryForm/>
        <button
          type="button"
          className="btn btn-outline-danger my-2"
          onClick={closeModal}
        >
          close
        </button>
      </Modal>
    </div>
  );
};

export default AddItinerary;
