  import React, { useEffect, useState }  from "react";
  import ImageGallery from "react-image-gallery";
  // import Gallery from 'react-image-gallery';
  import ItineraryCard from "../components/ItineraryCard";
  import BudgetCard from "../components/BudgetCard";
  // import FactCard from "../components/FactCard";
  import ImageUploadForm from "../components/ImageUploadForm";
  import { useParams } from "react-router-dom";
  import { getTrip } from "../api/trips";
  import { getBudgets } from "../api/budget";
  // import AddFact from "../components/AddFact";
  import "../style/background.css";
  import AddItinerary from "../components/AddItinerary";
  import AddBudget from "../components/AddBudget";
  import { getItineraries } from "../api/itinerary";

  const Trip = () => {
    const { tripId } = useParams();
    const [ images, setImages ] = useState([]);
    const [ itineraries, setItineraries ] = useState([]);
    const [ budgets, setBudgets ] = useState([]);

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
    };

    useEffect(() => {
      thisTripItinerariesAndBudgets();
    }, []);

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
                { images.length>0 && (
                <ImageGallery items={images} renderItem={renderCustomItem} renderThumbInner={renderCustomThumbnail} />
                )}
              <ImageUploadForm tripId={tripId}/>
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
                {/* <AddFact /> */}
                {/* <FactCard facts={facts} tripId={tripId} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Trip;
