const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  long: {
    type: Number,
    required: true
  }
});

tripSchema.virtual('itineraryItems', {
  ref: 'ItineraryItem',
  localField: '_id',
  foreignField: 'tripId'
});

module.exports = mongoose.model('Trip', tripSchema);
