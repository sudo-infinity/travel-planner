const { Router } = require('express');

const router = Router();
const Itinerary = require('../models/itinerary');

router.get('/', async (req, res, next) => {
  try {
    const tripId = req.query.trip_id;
    const itineraries = await Itinerary.find({ trip_id: tripId });
    res.json(itineraries);
  } catch (error) {
    next(error);
  }
});

// router.get('/user-trips', async (req, res, next) => {
//   try {
//     const userId = req.query.user_id;
//     const trips = await Trip.find({ user_id: userId });
//     res.json(trips);
//   } catch (error) {
//     if (error.constructor.name === 'ValidationError') {
//       res.status(422);
//     }
//     next(error);
//   }
// });

// router.get('/current-trip', async (req, res, next) => {
//   try {
//     const tripId = req.query.trip_id;
//     const trip = await Trip.find({ _id: tripId });
//     res.json(trip);
//   } catch (error) {
//     if (error.constructor.name === 'ValidationError') {
//       res.status(422);
//     }
//     next(error);
//   }
// });

// create trip
router.post('/', async (req, res, next) => {
  try {
    console.log("itinerary", req.body);
    const itinerary = new Itinerary(req.body);
    const createditinerary = await itinerary.save();
    res.json(createditinerary);
  } catch (error) {
    if (error.constructor.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

// router.post('/upload', async (req, res) => {
//   // add finding trip and then uploading images to it.
//   const tripId = req.query.trip_id;

//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ message: 'Image upload failed', error: err });
//     }

//     const imageUrls = req.files.map((file) => file.path);

//     try {
//       const trip = await Trip.findByIdAndUpdate(
//         tripId,
//         { $push: { images: { $each: imageUrls.map((imageUrl) => ({ imageUrl })) } } },
//         { new: true },
//       );

//       if (!trip) {
//         return res.status(404).json({ message: 'Trip not found' });
//       }

//       return res.json({ message: 'Images uploaded and trip updated successfully', imageUrls });
//     } catch (error) {
//       return res.status(500).json({ message: 'Error updating trip', error });
//     }
//   });
// });

router.post('/update', async (req, res, next) => {
  try {
    console.log("here with itinerary",req);
    const updatedItinerary = req.body;
    const itineraryId = req.query.itinerary_id;

    const itinerary = await Itinerary.findOne({ _id: itineraryId });
    await itinerary.updateOne(updatedItinerary);
    const itineraries = await Itinerary.find({ trip_id: req.body.trip_id });
    res.json(itineraries);
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
    await Itinerary.deleteOne({ _id: id });
    res.status(200);
  } catch (error) {
    if (error.constructor.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
