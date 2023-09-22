import React from "react";
import { createTrip } from '../api/trips';

const AddTripButton = ({ formState }) => {

  const handleFormSubmit = async ()  => {
    try {
        await createTrip({ ...formState });
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <div className="d-grid">
      <button
        className="btn btn-outline-dark btn-block py-3"
        onClick={handleFormSubmit}
      >
        Add trip
      </button>
    </div>
  );
};

export default AddTripButton;
