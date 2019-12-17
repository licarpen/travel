const { getWoeid } = require('../services/getWoeid');

module.exports = (req, res, next) => {
  try {const { city } = req.body;
    getWoeid(city)
      .then(woeid => {
        req.woeid = woeid;
        next();
      });
  }
  catch(error) { 
    error.status = 400;
    next(error);
  }
};
