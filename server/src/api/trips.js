const { Router } = require('express');
const upload = require('../mutlerConfig');

const router = Router();
const Trip = require('../models/trip');
const Sharing = require('../models/sharing');
const { User } = require('../models/User');

router.get('/', async (req, res, next) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    next(error);
  }
});

router.get('/user-trips', async (req, res, next) => {
  try {
    const userId = req.query.user_id;
    const userTrips = await Trip.find({ user_id: userId });
    const sharedTrips = await Sharing.find({ user_id: userId }).populate('trip_id');

    const trips = userTrips.concat(sharedTrips.map((sharing) => sharing.trip_id));

    res.json(trips);
  } catch (error) {
    if (error.constructor.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

router.get('/current-trip', async (req, res, next) => {
  try {
    const tripId = req.query.trip_id;
    const trip = await Trip.find({ _id: tripId });
    res.json(trip);
  } catch (error) {
    if (error.constructor.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

// create trip
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

router.post('/share-trip', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.userName });

    // eslint-disable-next-line no-underscore-dangle
    req.body.user_id = user._id;
    const sharing = new Sharing(req.body);
    const createdSharing = await sharing.save();
    res.json(createdSharing);
  } catch (error) {
    if (error.constructor.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

router.post('/shared-list', async (req, res, next) => {
  try {
    const sharings = await Sharing.find({ trip_id: req.body.id }).populate('user_id');
    res.json(sharings);
  } catch (error) {
    if (error.constructor.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

router.post('/remove-access', async (req, res, next) => {
  try {
    await Sharing.deleteOne({ user_id: req.body.user_id, trip_id: req.body.trip_id });
    res.status(200);
  } catch (error) {
    if (error.constructor.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

router.post('/upload', async (req, res) => {
  // add finding trip and then uploading images to it.
  const tripId = req.query.trip_id;

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: 'Image upload failed', error: err });
    }

    const imageUrls = req.files.map((file) => file.path);

    try {
      const trip = await Trip.findByIdAndUpdate(
        tripId,
        { $push: { images: { $each: imageUrls.map((imageUrl) => ({ imageUrl })) } } },
        { new: true },
      );

      if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
      }

      return res.json({ message: 'Images uploaded and trip updated successfully', imageUrls });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating trip', error });
    }
  });
});

router.post('/update', async (req, res, next) => {
  try {
    const updatedTrip = req.body;
    const trip = await Trip.findOne({ _id: req.body.tripId });
    await trip.updateOne(updatedTrip);
    const trips = await Trip.find({ user_id: req.body.userId });
    res.json(trips);
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
    await Trip.deleteOne({ _id: id });
    res.status(200);
  } catch (error) {
    if (error.constructor.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
