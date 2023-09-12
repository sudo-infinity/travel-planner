const mongoose = require('mongoose');
const dayjs = require('dayjs');

const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
  trim: true,
};

const requiredNumber = {
  type: Number,
  required: true,
};

const requiredDate = {
  type: Date,
  required: true,
  default: Date.now,
  get: (createdAt) => dayjs(createdAt).format('YYYY-MM-DD'),
};

const tripSchema = new Schema({
  title: requiredString,
  description: requiredString,
  location: requiredString,
  latitude: {
    ...requiredNumber,
    min: -90,
    max: 90,
  },
  longitude: {
    ...requiredNumber,
    min: -180,
    max: 180,
  },
  startDate: requiredDate,
  endDate: requiredDate,
//   plans: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Plan',
//     },
//   ],
//   facts: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Fact',
//     },
//   ],
}, {
  timestamps: true,
});

const trip = mongoose.model('trip', tripSchema);
module.exports = trip;
