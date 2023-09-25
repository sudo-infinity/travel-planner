import React, { useEffect, useState }  from "react";
import ImageGallery from "react-image-gallery";
import ItineraryCard from "../components/ItineraryCard";
import BudgetCard from "../components/BudgetCard";
import NoteCard from "../components/NoteCard";
import ImageUploadForm from "../components/ImageUploadForm";
import { useParams } from "react-router-dom";
import { getTrip } from "../api/trips";
import { getBudgets } from "../api/budget";
import "../style/background.css";
import AddItinerary from "../components/AddItinerary";
import AddBudget from "../components/AddBudget";
import AddNote from "../components/AddNote";
import { getItineraries } from "../api/itinerary";
import WeatherCard from "../components/WeatherCard";
import ForecastCard from "../components/ForecastCard";

const Trip = () => {
  const { tripId } = useParams();
  const [ images, setImages ] = useState([]);
  const [ itineraries, setItineraries ] = useState([]);
  const [ budgets, setBudgets ] = useState([]);
  const [ trip, setTrip ] = useState();
  const [ notes, setNotes ] = useState();
  const [ location, setLocation ] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [units, setUnits] = React.useState('metric');

  

  useEffect(() => {
    const thisTripItinerariesAndBudgets = async () => {
      const itineraries = await getItineraries(tripId);
      const convertedItineraries = Array.isArray(itineraries) ? itineraries : [itineraries];
      setItineraries(convertedItineraries);
      
      const budgets = await getBudgets(tripId);
      const convertedBudgets = Array.isArray(budgets) ? budgets : [budgets];
      setBudgets(convertedBudgets);
      const trip = await getTrip(tripId);
  
      const images = trip[0].images
      const convertedImages = Array.isArray(images) ? images : [images];
      const imagesArray = convertedImages.map(imageObj => ({
        original: `http://localhost:1337/${imageObj.imageUrl}`,
        thumbnail: `http://localhost:1337/${imageObj.imageUrl}`,
      }));
      setImages(imagesArray);
      setNotes(trip[0].notes);
      setTrip(trip[0]);
  
      setLocation((prevState) => {
        return {
          ...prevState,
          longitude: trip[0].longitude,
          latitude: trip[0].latitude,
        };
      });
    };

    thisTripItinerariesAndBudgets();
  }, [tripId]);

  const renderCustomItem = (item) => {
    return (
      <div className="image-gallery-image">
        <img
          src={item.original}
          alt={item.description}
          srcSet={item.srcSet}
          sizes={item.sizes}
          onLoad={(event) => handleImageLoad(event)}
          crossOrigin="anonymous"
        />
      </div>
    );
  };


  const renderCustomThumbnail = (item) => {
    return (
      <span>
        <div className="image-gallery-thumbnail-inner">
          <img  style={{width:'100%'}}
            src={item.thumbnail}
            alt={item.description}
            onLoad={(event) => handleImageLoad(event)}
            crossOrigin="anonymous"
          />
        </div>
      </span>
    );
  };

  const handleImageLoad = (event) => {
    console.log('Image loaded', event.target);
  };

  return (
    <div className="">
      <div className="">
        <div className="container mt-3">
          <div className="row row-eq-height mb-5">
            <div className="col-md-12 text-center">
            <div>
              <h1 className="mb-2">{trip?.title}</h1>
              { images.length>0 && (
                <ImageGallery items={images} renderItem={renderCustomItem} renderThumbInner={renderCustomThumbnail} />
              )}
              <ImageUploadForm tripId={tripId}/>
            </div>
            </div>
            <div className="col-md-12">
              <div className="m-auto mb-5 mt-4 h-auto w-full overflow-hidden rounded-lg shadow-lg md:w-3/5 lg:w-1/2">
                  <WeatherCard location={location} units={units} />
                  <ForecastCard location={location} units={units} />
              </div>
            </div>
            <div className="col-md-4">
              <h3 className="">Itinerary</h3>
              <AddItinerary/>
              <ItineraryCard itineraries={itineraries} tripId={tripId} />
            </div>
            <div className="col-md-4">
              <h3 className="">Budget</h3>
              <AddBudget tripId={tripId} />
              <BudgetCard budgets={budgets} tripId={tripId} />
            </div>
            <div className="col-md-4">
              <h3 className="">Notes</h3>
              <AddNote />
              {notes && (
                <NoteCard notes={notes} tripId={tripId} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trip;
