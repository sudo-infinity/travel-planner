import React, { useState } from "react";
import Modal from "react-modal";
import BudgetForm from "./BudgetForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

const EditBudget = ({ tripId, budgetId, total, categories, currency}) => {
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
        <BudgetForm
          budgetId={budgetId}
          total={total}
          tripId={tripId}
          currency={currency}
          categories={categories}
        />
        <button className="btn" onClick={closeModal}>
          close
        </button>
      </Modal>
    </div>
  );
};

export default EditBudget;
