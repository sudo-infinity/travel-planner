import React, { useState } from "react";
import Modal from "react-modal";
import NoteForm from "./NoteForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

const EditNote = ({ tripId, noteIndex, title, content}) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      zIndex: 10000,
    },
  };

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
        style={customStyles}
      >
        <NoteForm
          noteIndex={noteIndex}
          title={title}
          tripId={tripId}
          content={content}
        />
        <button className="btn" onClick={closeModal}>
          close
        </button>
      </Modal>
    </div>
  );
};

export default EditNote;
