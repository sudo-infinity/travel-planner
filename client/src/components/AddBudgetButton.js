import React from "react";
import { createBudget } from "../api/budget";


const AddBudgetButton = ({ formState, categories }) => {
  const addBudget = async () => {
    await createBudget(formState);
  };

  const handleFormSubmit = async (event) => {
    try {
        formState.categories = categories;
        formState.total = Number(categories.accommodation) + Number(categories.activities) + Number(categories.food) + Number(categories.transportation);
        addBudget(formState);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-grid">
      <button
        className="btn btn-outline-secondary py-3 col-md-3"
        onClick={handleFormSubmit}
      >
        Add Budget
      </button>
    </div>
  );
};

export default AddBudgetButton;
