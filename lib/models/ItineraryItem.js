const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  activity: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true,
    min: 0
  },
  woeid: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('ItineraryItem', schema);
