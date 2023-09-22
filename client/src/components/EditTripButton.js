import React from "react";
import { updateTrip } from "../api/trips";

const EditTripButton = ({ formState, tripId }) => {
  console.log("Here is the trip ID from edit trip button ", tripId);
  console.log(
    "Here is all the rest:",
    formState.title,
    formState.description,
    formState.location,
    formState.latitude,
    formState.longitude,
    formState.startDate,
    formState.endDate
  );

  const handleFormSubmit = async (event) => {
    try {
      formState.tripId = tripId;
      await updateTrip({...formState});
      console.log(formState);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="d-grid">
      <button
        className="btn btn-outline-dark btn-block py-3"
        onClick={handleFormSubmit}
      >
        Update trip
      </button>
    </div>
  );
};

export default EditTripButton;
