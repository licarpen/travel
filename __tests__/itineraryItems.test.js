require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Trip = require('../lib/models/Trip');
const ItineraryItem = require('../lib/models/ItineraryItem');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let thaiTrip;
  let thaiItineraryItem;

  beforeEach(async() => {
    thaiTrip = await Trip
      .create({
        name: 'Ton Sai, Thailand',
        lat: 15.8700,
        long: 100.9925
      });

    thaiItineraryItem = await ItineraryItem
      .create({
        tripId: thaiTrip._id,
        activity: 'deep water soloing',
        cost: 4,
        city: 'Phuket',
        woeid: 1226113
      });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates an itinerary item', () => {
    return request(app)
      .post('/api/v1/itineraryItems')
      .send({
        tripId: thaiTrip._id,
        activity: 'deep water soloing',
        cost: 4,
        city: 'Phuket'
      })
      .then(res => {
        expect(res.body).toEqual({
          tripId: thaiTrip.id,
          activity: 'deep water soloing',
          city: 'Phuket',
          cost: 4,
          __v: 0,
          _id: expect.any(String),
          woeid: 1226113
        });
      });
  });
  it('deletes an itinerary item by id', () => {
    return request(app)
      .delete(`/api/v1/itineraryItems/${thaiItineraryItem._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tripId: thaiTrip._id.toString(),
          activity: 'deep water soloing',
          cost: 4,
          city: 'Phuket',
          __v: 0,
          woeid: 1226113
        });
      });
  });
});
