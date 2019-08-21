//Environment variables from .env
require('dotenv').config();
// Dependencies 
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

//API Dependencies
const mapsApi = require('./lib/maps-api');
const weatherApi = require('./lib/weather-api');

// Setup
// make express app
const app = express();
// get da port
const PORT = process.env.PORT;

// use da apps
app.use(cors());
app.use(morgan('dev'));

// API Route
//      app.<verb>(<noun>. handler);
app.get('/location', (request, response) => {
    const search = request.query.search;
    mapsApi.getLatLng(search)
        .then(location => {
            response.json(location);
        })
        .catch(err => {
            response.status(500).json({
                error: err.message || err
            });
        });
});

app.get('/weather', (request, response) => {
    const latitude = request.query.latitude;
    const longitude = request.query.longitude;

    weatherApi.getForecast(latitude, longitude)
        .then(forecast => {
            response.json(forecast);
        })
        .catch(err =>{
            response.status(500).json({
                error: err.message || err
            });
        });
});
// Pull Da Lever!
app.listen(PORT, () => {
    console.log('The elves are working on PORT', PORT);
});
