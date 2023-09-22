import React, { useState } from "react";
import Modal from "react-modal";
import ItineraryForm from "./ItineraryForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

const EditItinerary = ({ tripId, itineraryId, title, htmlContent}) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <FontAwesomeIcon
        icon={faPencil}
        type="button"
        className="btn"
        onClick={openModal}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit plan"
      >
        <ItineraryForm
          itineraryId={itineraryId}
          title={title}
          tripId={tripId}
          htmlContent={htmlContent}
        />
        <button className="btn" onClick={closeModal}>
          close
        </button>
      </Modal>
    </div>
  );
};

export default EditItinerary;
