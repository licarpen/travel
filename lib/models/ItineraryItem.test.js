const ItineraryItem = require('./ItineraryItem');
const Trip = require('./Trip');

let trip;
let itineraryItem;

describe('Itinerary Item model', () => {
  beforeEach(() => {
    trip = new Trip({
      name: 'Ton Sai, Thailand',
      lat: 345,
      long: 390

    });
  });
  it('has a required activity', () => {
    itineraryItem = new ItineraryItem({
      tripId: trip._id
    });
    const { errors } = itineraryItem.validateSync();
    expect(errors.activity.message).toEqual('Path `activity` is required.');
  });
  it('has a required cost', () => {
    itineraryItem = new ItineraryItem({
      tripId: trip._id
    });
    const { errors } = itineraryItem.validateSync();
    expect(errors.cost.message).toEqual('Path `cost` is required.');
  });
});
