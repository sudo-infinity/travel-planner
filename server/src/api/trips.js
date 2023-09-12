const { Router } = require('express');

const router = Router();
const Trip = require('../models/trip');

router.get('/', async (req, res, next) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const trip = new Trip(req.body);
    const createdTrip = await trip.save();
    res.json(createdTrip);
  } catch (error) {
    if (error.constructor.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
