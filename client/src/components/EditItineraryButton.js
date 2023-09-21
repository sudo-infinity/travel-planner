import React from "react";
import { updateItinerary } from "../api/itinerary";


const EditItineraryButton = ({ formState, itineraryId }) => {

  const EditItinerary = async (formState, itineraryId) => {
    await updateItinerary(formState, itineraryId);
  };

  const handleFormSubmit = async (event) => {
    try {
      EditItinerary(formState, itineraryId);
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

export default EditItineraryButton;
