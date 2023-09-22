import React, { useState } from "react";
import AddTripButton from "./AddTripButton";
import EditTripButton from "./EditTripButton";
import moment from "moment";

const TripForm = ({
  tripId,
  title,
  description,
  location,
  longitude,
  latitude,
  startDate,
  endDate,
  userId,
}) => {
  const user_id = localStorage.getItem('id');

  const [formState, setFormState] = useState({
    title: title ? title : "",
    description: description ? description : "",
    location: location ? location : "",
    longitude: longitude ? longitude : 0,
    latitude: latitude ? latitude : 0,
    startDate: startDate ? moment(startDate).utc().format('YYYY-MM-DD') : "",
    endDate: endDate ? moment(endDate).utc().format('YYYY-MM-DD') : "",
    user_id: userId ? userId : user_id,
  });

  let button;
  if (tripId) {
    button = <EditTripButton formState={formState} tripId={tripId} />;
  } else {
    button = <AddTripButton formState={formState} />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const resetValidation = (e) => {
    e.target.classList.remove("is-invalid");
    e.target.classList.remove("is-valid");
  };

  const validation = (e) => {
    if (e.target.value === "") {
      e.target.classList.add("is-invalid");
    } else {
      e.target.classList.add("is-valid");
    }
  };

  return (
    <div className="mx-3">
      <form className="m-3">
        <div className="mb-2">
          <label htmlFor="title" className="form-label">
            Trip Name
          </label>
          <input
            id="title"
            name="title"
            placeholder="Trip name"
            value={formState.title}
            className="form-control"
            onChange={handleChange}
            type="text"
            onFocus={resetValidation}
            onBlur={validation}
          />
          <div className="invalid-feedback">
            Hey! Get back here.. This field is required.
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="latitude" className="form-label">
            Latitude
          </label>
          <input
            id="latitude"
            name="latitude"
            placeholder="Latitude for the location"
            value={formState.latitude}
            className="form-control"
            onChange={handleChange}
            type="number"
            step="0.00000000000001"
            min='-90'
            max='90'
            onFocus={resetValidation}
            onBlur={validation}
          />
          <div className="invalid-feedback">
            Hey! Get back here.. This field is required.
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="longitude" className="form-label">
            Longitude
          </label>
          <input
            id="longitude"
            name="longitude"
            placeholder="Longitude for the location"
            value={formState.longitude}
            className="form-control"
            onChange={handleChange}
            type="number"
            step="0.00000000000001"
            min='-180'
            max='180'
            onFocus={resetValidation}
            onBlur={validation}
          />
          <div className="invalid-feedback">
            Hey! Get back here.. This field is required.
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="tripDesc" className="form-label">
            Description
          </label>
          <textarea
            id="tripDesc"
            name="description"
            placeholder="What's the occasion?"
            value={formState.description}
            className="form-control"
            onChange={handleChange}
            onFocus={resetValidation}
            onBlur={validation}
          ></textarea>
          <div className="invalid-feedback">Tell me more..</div>
        </div>
        <div className="mb-2">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="Where are you going?"
            value={formState.location}
            className="form-control"
            onChange={handleChange}
            onFocus={resetValidation}
            onBlur={validation}
          />
          <div className="invalid-feedback">
            You've got to be going somewhere..
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="startDate" className="form-label">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            name="startDate"
            value={formState.startDate}
            className="form-control"
            onChange={handleChange}
            onFocus={resetValidation}
            onBlur={validation}
          />
          <div className="invalid-feedback">Start date required..</div>
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            name="endDate"
            value={formState.endDate}
            className="form-control"
            onChange={handleChange}
            onFocus={resetValidation}
            onBlur={validation}
            disabled={formState.startDate ? false : true}
            min={formState.startDate}
          />
          <div className="invalid-feedback">End date required</div>
        </div>
        <div>{button}</div>
      </form>
    </div>
  );
};

export default TripForm;
