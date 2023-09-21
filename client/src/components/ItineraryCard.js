import React from "react";
import EditItinerary from "./EditItinerary";
import DeleteItinerary from "./DeleteItinerary";

const ItineraryCard = ({ tripId, itineraries }) => {
  return (
    <div>
      {itineraries.map((itinerary) => (
        <div
          className="card my-3 border-success"
          style={{height: "300px"}}
          key={itinerary._id}
        >
          <div className="card-body">
            <h5 className="card-title">{itinerary.title}</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div dangerouslySetInnerHTML={{ __html: itinerary.htmlContent }} 
                style={{height: "110px",
                overflowX: "hidden",
                overflowY: "auto",
                textAlign:"justify",}}/>
              </li>
            </ul>
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="col">
                <DeleteItinerary itineraryId={itinerary._id}/>
              </div>
              <div className="col text-end">
                <EditItinerary
                  tripId={tripId}
                  itineraryId={itinerary._id}
                  title={itinerary.title}
                  htmlContent={itinerary.htmlContent}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryCard;
