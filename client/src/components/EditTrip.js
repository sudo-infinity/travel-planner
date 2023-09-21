import React, { useState } from "react";
import Modal from "react-modal";
import TripForm from "./TripForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

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

const EditTrip = ({
  tripId,
  title,
  latitude,
  longitude,
  description,
  location,
  startDate,
  endDate,
  userId,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <span className="mx-2">
      <FontAwesomeIcon
        icon={faPencil}
        type="button"
        className="btn btn-outline-dark"
        onClick={openModal}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit trip"
        style={customStyles}
      >
        <div className="row justify-content-md-center">
          <div className="col-m-12 text-center">
            <h4 className="fs-4">Edit This Trip</h4>
            <TripForm
              tripId={tripId}
              title={title}
              description={description}
              location={location}
              startDate={startDate}
              endDate={endDate}
              userId={userId}
              latitude={latitude}
              longitude={longitude}
            />
            <button className="btn btn-outline-danger" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </span>
  );
};

export default EditTrip;
