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
        cost: 4
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
        cost: 4
      })
      .then(res => {
        expect(res.body).toEqual({
          tripId: thaiTrip._id,
          activity: 'deep water soloing',
          cost: 4,
          __v: 0,
          _id: expect.any(String)
        });
      });
  });
  it('gets all itinerary items', async() => {
    const itineraryItems = await ItineraryItem.create([
      { tripId: thaiTrip._id, activity: 'deep water soloing', cost: 4 },
      { tripId: thaiTrip._id, activity: 'thai massage', cost: 3 },
      { tripId: thaiTrip._id, activity: 'eating curry', cost: 2 },
    ]);
    return request(app)
      .get('/api/v1/itineraryItems')
      .then(res => {
        itineraryItems.forEach(item => {
          expect(res.body).toContainEqual(JSON.parse(JSON.stringify(item)));
        });
      });
  });
  it('gets an itinerary item by id', () => {
    return request(app)
      .get(`/api/v1/itineraryItems/${thaiItineraryItem._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tripId: thaiTrip._id,
          activity: 'deep water soloing',
          cost: 4,
          __v: 0
        });
      });
  });
  it('updates an itinerary item by id', () => {
    return request(app)
      .patch(`/api/v1/itineraryItems/${thaiItineraryItem._id}`)
      .send({ cost: 2 })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tripId: thaiTrip._id,
          activity: 'deep water soloing',
          cost: 2,
          __v: 0
        });
      });
  });
  it('deletes an itinerary item by id', () => {
    return request(app)
      .delete(`/api/v1/itineraryItems/${thaiItineraryItem._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tripId: thaiTrip._id,
          activity: 'deep water soloing',
          cost: 4,
          __v: 0
        });
      });
  });
});
