import React, { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { listTrips } from '../api/trips';
import TripForm from '../components/PopUpTripForm';
import 'mapbox-gl/dist/mapbox-gl.css';

const TripMap = () => {
  const [ trips, setTrips ] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addTripLocation, setAddTripLocation] = useState(null);
  const [viewPort, setViewPort ] = useState({
    latitude: 39,
    longitude: 34,
    zoom: 3,
  });

  const getTrips = async () => {
    const tripList = await listTrips();
    const tripArray = Array.isArray(tripList) ? tripList : [tripList];
    setTrips(tripArray);
  };

  useEffect(() => {
    getTrips();
  }, []);

  const showAddMarkerPopup = (event) => {
    const longitude = event.lngLat.lng;
    const latitude = event.lngLat.lat;
    setAddTripLocation({
      latitude,
      longitude,
    });
  };

  return <Map
  mapLib={import('mapbox-gl')}
  mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
  initialViewState={viewPort}
  onViewportChange={setViewPort}
  style={{width: '100vw', height: '100vh'}}
  onDblClick={showAddMarkerPopup}
  mapStyle="mapbox://styles/mapbox/streets-v9"
>
  {
      trips.map(trip => (
        <React.Fragment key={trip._id}>
          <Marker
            latitude={trip.latitude}
            longitude={trip.longitude}
          >
            <div
              onClick={() => setShowPopup({
                // ...showPopup,
                [trip._id]: true,
              })}
            >
              <svg
                className="marker yellow"
                style={{
                  height: `${6 * viewPort.zoom}px`,
                  width: `${6 * viewPort.zoom}px`,
                }}
                version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                <g>
                  <g>
                    <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                      c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                      c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                  </g>
                </g>
              </svg>
            </div>
          </Marker>
          {
            showPopup[trip._id] ? (
              <Popup
                latitude={trip.latitude}
                longitude={trip.longitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                onClose={() => setShowPopup({})}
                anchor="top" >
                <div className="popup">
                  <h3>{trip.title}</h3>
                  <p>{trip.description}</p>
                  <small>Trip Dates: {new Date(trip.startDate).toLocaleDateString()} to {new Date(trip.endDate).toLocaleDateString()}  </small>
                  {trip.image && <img src={trip.image} alt={trip.title} />}
                </div>
              </Popup>
            ) : null
          }
        </React.Fragment>
      ))
    }
    {
      addTripLocation ? (
        <>
        <Marker
          latitude={addTripLocation.latitude}
          longitude={addTripLocation.longitude}
        >
          <div>
            <svg
              className="marker red"
              style={{
                height: `${6 * viewPort.zoom}px`,
                width: `${6 * viewPort.zoom}px`,
              }}
              version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
              <g>
                <g>
                  <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                    c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                    c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                </g>
              </g>
            </svg>
          </div>
        </Marker>
        <Popup
          latitude={addTripLocation.latitude}
          longitude={addTripLocation.longitude}
          closeButton={true}
          closeOnClick={false}
          dynamicPosition={true}
          onClose={() => setAddTripLocation(null)}
          anchor="top" >
          <div className="popup">
            <TripForm onClose={() => {
              setAddTripLocation(null);
              getTrips();
            }} location={addTripLocation} />
          </div>
        </Popup>
        </>
      ) : null
    }
</Map>;
}

export default TripMap;