import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditNoteButton from "./EditNoteButton";
import AddNoteButton from "./AddNoteButton";
import { getTrip } from "../api/trips";
import 'react-quill/dist/quill.snow.css';

export default function NoteForm({
  trip_id,
  noteIndex,
  title,
  content,
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
    content: content ? content : "",
  });

  // Conditionally render the button depending if editing or adding a new Budget
  let button;

  if (noteIndex !== undefined ) {
    button = <EditNoteButton formState={formState} noteIndex={noteIndex} />;
  } else {
    button = <AddNoteButton formState={formState} />;
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
      <h3>Let's make a Note</h3>
      <form className="flex-row justify-center justify-space-between-md align-center">
      <div className="form-group pb-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Enter title for note"
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
        <div className="form-group pb-2">
          <label htmlFor="name">Content</label>
          <input
            type="text"
            className="form-control"
            name="content"
            placeholder="Write note content area here."
            value={formState.content}
            onChange={handleChange}
            onFocus={resetValidation}
            onBlur={validation}
          />
          <div className="valid-feedback">Looks Good</div>
          <div className="invalid-feedback">
            Hey! Get back here.. This field is required.
          </div>
        </div>
        <div>
        {button}
        </div>
      </form>
    </div>
  );
}
