const { Router } = require('express');

const router = Router();
const Budget = require('../models/budget');

router.get('/', async (req, res, next) => {
  try {
    const tripId = req.query.trip_id;
    const budgets = await Budget.find({ trip_id: tripId });
    res.json(budgets);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const budget = new Budget(req.body);
    const createdBudget = await budget.save();
    res.json(createdBudget);
  } catch (error) {
    if (error.constructor.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

router.post('/update', async (req, res, next) => {
  try {
    const updatedBudget = req.body;
    const budgetId = req.query.budget_id;

    const budget = await Budget.findOne({ _id: budgetId });
    await budget.updateOne(updatedBudget);
    const budgets = await Budget.find({ trip_id: req.body.trip_id });
    res.json(budgets);
  } catch (error) {
    if (error.constructor.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

router.post('/delete', async (req, res, next) => {
  try {
    const { id } = req.body;
    await Budget.deleteOne({ _id: id });
    res.status(200);
  } catch (error) {
    if (error.constructor.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
