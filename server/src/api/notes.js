const { Router } = require('express');

const router = Router();
const Trip = require('../models/trip');

router.get('/', async (req, res, next) => {
  try {
    const tripId = req.query.trip_id;
    const trip = await Trip.find({ trip_id: tripId });
    res.json(trip);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const tripId = req.body.trip_id;

    const noteObj = { title: req.body.title, content: req.body.content };
    const trip = await Trip.findOne({ _id: tripId });
    const { notes } = trip;
    notes.push(noteObj);
    trip.notes = notes;
    const savedTrip = await trip.save();

    res.json(savedTrip);
  } catch (error) {
    if (error.constructor.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

router.post('/update', async (req, res, next) => {
  try {
    const noteObj = { title: req.body.title, content: req.body.content };
    const noteIndex = req.query.note_index;
    const tripId = req.body.trip_id;
    const trip = await Trip.findOne({ _id: tripId });

    const { notes } = trip;
    notes[noteIndex] = noteObj;
    await trip.save();

    res.json(trip);
  } catch (error) {
    if (error.constructor.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

router.post('/delete', async (req, res, next) => {
  try {
    const { noteIndex } = req.body;

    const tripId = req.body.trip_id;

    const trip = await Trip.findOne({ _id: tripId });

    const { notes } = trip;
    notes.splice(noteIndex, 1);

    trip.notes = notes;

    await trip.save();
    res.json(200);
  } catch (error) {
    if (error.constructor.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
