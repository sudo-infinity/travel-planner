import React from "react";
import { updateNote } from "../api/note";


const EditNoteButton = ({ formState, noteIndex }) => {

  const EditNote = async (formState, budgetId) => {
    await updateNote(formState, budgetId);
  };

  const handleFormSubmit = async (event) => {
    try {
      EditNote(formState, noteIndex);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      className="btn btn-outline-secondary btn-block py-3"
      onClick={handleFormSubmit}
    >
      Update
    </button>
  );
};

export default EditNoteButton;
