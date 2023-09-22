import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteTrip } from "../api/trips";


const DeleteTrip = ({ tripId }) => {
  console.log(tripId);

  const handleDelete = async (tripId) => {
    try {
      await deleteTrip(tripId);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <span className="mx-2">
      <FontAwesomeIcon
        className="btn btn-outline-danger"
        icon={faTrashCan}
        onClick={() => handleDelete(tripId)}
      />
    </span>
  );
};

export default DeleteTrip;
