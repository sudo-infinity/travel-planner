import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditItineraryButton from "./EditItineraryButton";
import AddItineraryButton from "./AddItineraryButton";
import { getTrip } from "../api/trips";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function ItineraryForm({
  trip_id,
  itineraryId,
  title,
  htmlContent,
}) {
  const { tripId } = useParams();
  const [ trip, setTrip ] = useState();

  const thisTrip = async () => {
    const trip = await getTrip(tripId);
    setTrip(trip[0]);
  };

  useEffect(() => {
    thisTrip();
  }, []);

  const [formState, setFormState] = useState({
    trip_id: trip_id ? trip_id : tripId ,
    title: title ? title : "",
    htmlContent: htmlContent ? htmlContent : "",
  });

  const handleHtmlChange = (html) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        htmlContent: html,
      };
  });
    
  };

  // Conditionally render the button depending if editing or adding a new Itinerary
  let button;
  if (itineraryId) {
    button = <EditItineraryButton formState={formState} itineraryId={itineraryId} />;
    console.log(itineraryId);
  } else {
    button = <AddItineraryButton formState={formState} />;
    console.log("Add Itinerary", formState);
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
    <div>
      <h3>New Itinerary for somewhere to {trip?.title}</h3>
      <form className="flex-row justify-center justify-space-between-md align-center">
        <div className="form-group pb-2">
          <label htmlFor="name">Itinerary Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Give it a title e.g. 'Plan A'"
            value={formState.title}
            onChange={handleChange}
            onFocus={resetValidation}
            onBlur={validation}
          />
          <div className="valid-feedback">Looks Good</div>
          <div className="invalid-feedback">
            Hey! Get back here.. This field is required.
          </div>
        </div>

        <div className="form-group pb-2 mb-5">
          <label htmlFor="name">Itinerary</label>
            <ReactQuill value={formState.htmlContent} onChange={handleHtmlChange} style={{height: '30vh',}}/>
          <div className="valid-feedback">Oh how lovely!</div>
          <div className="invalid-feedback">Tell me more..</div>
        </div>
        <div>
        {button}
        </div>
      </form>
    </div>
  );
}
