const { Schema, model } = require('mongoose');

const itinerarySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  htmlContent: {
    type: String,
    required: true,
  },
  trip_id: {
    type: Schema.Types.ObjectId,
    ref: 'trip',
  },
});

const itinerary = model('itinerary', itinerarySchema);
module.exports = itinerary;
