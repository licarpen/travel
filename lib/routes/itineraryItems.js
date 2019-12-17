const { Router } = require('express');
const Trip = require('../models/Trip');
const ItineraryItem = require('../models/ItineraryItem');
const fetchWoeid = require('../middleware/fetch-woeid');

module.exports = Router()
  .post('/', fetchWoeid, (req, res) => {
    ItineraryItem
      .create({ ...req.body, woeid: req.woeid })
      .then(item => res.send(item));
  })

  .delete('/:id', (req, res) => {
    Promise.all([
      ItineraryItem.findByIdAndDelete(req.params.id),
      ItineraryItem.deleteMany({ tripId: req.params.id })
    ])
      .then(([item]) => res.send(item));
  });
