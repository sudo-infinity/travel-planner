const mongoose = require('mongoose');

mongoose.connect(
  process.env.DATABASE_URL || 'mongodb://127.0.0.1/travel-planner',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

module.exports = mongoose.connection;
