import React from "react";
import EditBudget from "./EditBudget";
import DeleteBudget from "./DeleteBudget";

const BudgetCard = ({ tripId, budgets }) => {
  return (
    <div>
      {budgets.map((budget) => (
        <div
          className="card my-3 border-success"
          style={{height: "300px"}}
          key={budget._id}
        >
          <div className="card-body">
            <h5 className="card-title">{budget.total}/- {budget.currency}</h5>
            <ul className="list-group list-group-flush" 
            style={{height: "180px",
                overflowX: "hidden",
                overflowY: "auto",
                textAlign:"justify",}}>
              <li className="list-group-item">Food Budget: {budget.categories.food}/-</li>
              <li className="list-group-item">Accommodation Budget: {budget.categories.accommodation}/-</li>
              <li className="list-group-item">Transportation Budget: {budget.categories.transportation}/-</li>
              <li className="list-group-item">Activities Budget: {budget.categories.activities}/-</li>
            </ul>
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="col">
                <DeleteBudget budgetId={budget._id}/>
              </div>
              <div className="col text-end">
                <EditBudget
                  tripId={tripId}
                  budgetId={budget._id}
                  title={budget.title}
                  currency={budget.currency}
                  categories={budget.categories}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BudgetCard;
