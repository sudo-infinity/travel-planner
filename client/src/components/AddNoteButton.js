import React from "react";
import { createNote } from "../api/note";


const AddNoteButton = ({ formState }) => {
  const addNote = async () => {
    await createNote(formState);
  };

  const handleFormSubmit = async (event) => {
    try {
        addNote(formState);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-grid">
      <button
        className="btn btn-outline-secondary py-3 col-md-3"
        onClick={handleFormSubmit}
      >
        Add Note
      </button>
    </div>
  );
};

export default AddNoteButton;
