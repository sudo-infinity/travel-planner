import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditBudgetButton from "./EditBudgetButton";
import AddBudgetButton from "./AddBudgetButton";
import { getTrip } from "../api/trips";
import 'react-quill/dist/quill.snow.css';

export default function BudgetForm({
  trip_id,
  total,
  currency,
  categories,
  budgetId,
}) {
  const { tripId } = useParams();
  const [ trip, setTrip ] = useState();
  const [ categoryObject, setCategoryObject ] = useState({
    accommodation: categories ? categories.accommodation : '',
    food: categories ? categories.food : '',
    activities: categories ? categories.activities : '',
    transportation: categories ? categories.transportation : '',
  });

  const thisTrip = async () => {
    const trip = await getTrip(tripId);
    setTrip(trip[0]);
  };

  useEffect(() => {
    thisTrip();
  }, []);

  const [formState, setFormState] = useState({
    trip_id: trip_id ? trip_id : tripId ,
    total: total ? total : 0,
    currency: currency ? currency : "",
    categories: categoryObject,
  });

  // Conditionally render the button depending if editing or adding a new Budget
  let button;
  if (budgetId) {
    button = <EditBudgetButton formState={formState} budgetId={budgetId} categories={categoryObject} />;
  } else {
    button = <AddBudgetButton formState={formState} categories={categoryObject}/>;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (event.target.name.includes('currency')) {
      setFormState((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
      });
    } else {
      setCategoryObject({
        ...categoryObject,
        [name]: value
      });
    };
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
      <h3>Let's make a budget</h3>
      <form className="flex-row justify-center justify-space-between-md align-center">
      <div className="form-group pb-2">
          <label htmlFor="name">Currency For this Budget</label>
          <input
            type="text"
            className="form-control"
            name="currency"
            placeholder="USD/EUR/INR etc."
            value={formState.currency}
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
          <label htmlFor="name">Accommodation Budget</label>
          <input
            type="number"
            className="form-control"
            name="accommodation"
            placeholder="Accommodation such as hotels, airbnb etc."
            value={categoryObject.accommodation}
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
          <label htmlFor="name">Food Budget</label>
          <input
            type="number"
            className="form-control"
            name="food"
            placeholder="Breakfast, dinner cost etc."
            value={categoryObject.food}
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
          <label htmlFor="name">Activities Budget</label>
          <input
            type="number"
            className="form-control"
            name="activities"
            placeholder="Sky diving, skiing, chair lift, etc."
            value={categoryObject.activities}
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
          <label htmlFor="name">Transportation Budget</label>
          <input
            type="number"
            className="form-control"
            name="transportation"
            placeholder="Car fuel, car rent, etc."
            value={categoryObject.transportation}
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
