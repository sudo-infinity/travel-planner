import React from "react";
import { updateBudget } from "../api/budget";


const EditBudgetButton = ({ formState, budgetId, categories }) => {

  const EditBudget = async (formState, budgetId) => {
    await updateBudget(formState, budgetId);
  };

  const handleFormSubmit = async (event) => {
    try {
      formState.categories = categories;
      formState.total = Number(categories.accommodation) + Number(categories.activities) + Number(categories.food) + Number(categories.transportation);
      EditBudget(formState, budgetId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      className="btn btn-outline-secondary btn-block py-3"
      onClick={handleFormSubmit}
    >
      Update
    </button>
  );
};

export default EditBudgetButton;
