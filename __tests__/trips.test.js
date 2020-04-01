require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Trip = require('../lib/models/Trip');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let thaiTrip;

  beforeEach(async() => {
    thaiTrip = await Trip
      .create({
        name: 'Ton Sai, Thailand',
        lat: 15.8700,
        long: 100.9925
      });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a trip', () => {
    return request(app)
      .post('/api/v1/trips')
      .send({
        name: 'Ton Sai, Thailand',
        lat: 15.8700,
        long: 100.9925
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          name: 'Ton Sai, Thailand',
          lat: 15.8700,
          long: 100.9925
        });
      });
  });
  it('gets all trips', async() => {
    await Trip.create({
      name: 'Kalymnos, Greece',
      lat: 130.8700,
      long: 90.9925
    });

    return request(app)
      .get('/api/v1/trips')
      .then(res => {
        expect(res.body).toContainEqual({
          __v: 0,
          _id: expect.any(String),
          name: 'Kalymnos, Greece',
          lat: 130.8700,
          long: 90.9925
        });
      });
  });
  it('gets a trip by id', () => {
    return request(app)
      .get(`/api/v1/trips/${thaiTrip.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          name: 'Ton Sai, Thailand',
          lat: 15.8700,
          long: 100.9925,
          itineraryItems: []
        });
      });
  });
  it('updates a recipe by id', () => {
    return request(app)
      .patch(`/api/v1/trips/${thaiTrip._id}`)
      .send({ name: 'Phuket, Thailand' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          name: 'Phuket, Thailand',
          lat: 15.8700,
          long: 100.9925,
        });
      });
  });
  it('deletes a recipe by id', () => {
    return request(app)
      .delete(`/api/v1/trips/${thaiTrip._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          name: 'Ton Sai, Thailand',
          lat: 15.8700,
          long: 100.9925,
        });
      });
  });
});

