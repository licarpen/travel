const superagent = require('superagent');

const getWoeid = (city) => {
  return superagent
    .get(`https://www.metaweather.com/api/location/search/?query=${city}`)
    .then(res => {
      const [{ woeid }] = res.body;
      return woeid;
    });
};

module.exports = { getWoeid };
