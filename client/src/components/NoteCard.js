import React from "react";
import EditNote from "./EditNote";
import DeleteNote from "./DeleteNote";

const NoteCard = ({ tripId, notes }) => {
  return (
    <div>
      {notes?.map((note) => (
        <div
          className="card my-3 border-success"
          style={{height: "300px"}}
          key={notes.indexOf(note)}
        >
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <ul className="list-group list-group-flush" 
            style={{height: "180px",
                overflowX: "hidden",
                overflowY: "auto",
                textAlign:"justify",}}>
              <li className="list-group-item">{note.content}</li>
            </ul>
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="col">
                <DeleteNote noteIndex={notes.indexOf(note)} tripId={tripId}/>
              </div>
              <div className="col text-end">
                <EditNote
                  tripId={tripId}
                  noteIndex={notes.indexOf(note)}
                  title={note.title}
                  content={note.content}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteCard;
