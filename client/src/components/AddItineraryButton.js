import React from "react";
import { createItinerary } from "../api/itinerary";


const AddItineraryButton = ({ formState }) => {
  const addItininerary = async () => {
    await createItinerary(formState);
  };

  const handleFormSubmit = async (event) => {
    try {
      const { data } = addItininerary({
        variables: { ...formState },
      });
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
        Add Itinerary Item
      </button>
    </div>
  );
};

export default AddItineraryButton;
