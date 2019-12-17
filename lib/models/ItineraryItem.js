const mongoose = require('mongoose');
const getWeather = require('../services/getWeather');

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

schema.statics.populateWeather = async function() {
  const woeid = this.woeid;
  return await getWeather(woeid);
};

module.exports = mongoose.model('ItineraryItem', schema);
