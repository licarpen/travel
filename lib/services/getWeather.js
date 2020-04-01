const superagent = require('superagent');

const getWeather = (woeid) => {
  return superagent
    .get(`https://www.metaweather.com/api/location/${woeid}/`)
    .then(res => {
      const [{ consolidated_weather }] = res.body;
      return consolidated_weather;
    });
};

module.exports = { getWeather };
