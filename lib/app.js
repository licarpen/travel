const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/trips', require('./routes/trips'));
app.use('/api/v1/itineraryItems', require('./routes/itineraryItems'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
