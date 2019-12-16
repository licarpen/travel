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
        activity: 'deep sea bouldering',
        cost: 4
      });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a trip', () => {
    return request(app)
      .post('/api/v1/trips')
      .send({
        
      })
  })
});
