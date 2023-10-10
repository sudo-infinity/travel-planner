const { Schema, model } = require('mongoose');

const sharingSchema = new Schema({
  permissions: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  trip_id: {
    type: Schema.Types.ObjectId,
    ref: 'trip',
  },
});

const sharing = model('sharing', sharingSchema);
module.exports = sharing;
