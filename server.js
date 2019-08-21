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
                error: err.message
            });
        });
});
//------------------------------------ BREAK EVERYTHING BELOW THIS LINE INTO SEPARATE FILES ----------------------


// node CJS "require" parses JSON into array/object
const geoData = require('./data/geo.json');
// helpers
function getLatLng(/* Location goes here*/) {
    // return hard coded for now, API will replace this
    return toLocation(geoData);
}
function toLocation(/* geodata */) {
    const firstResult = geoData.results[0];
    const geometry = firstResult.geometry;
    
    return {
        formatted_query: firstResult.formatted_address,
        latitude: geometry.location.lat,
        longitude: geometry.location.lng
    };
}
app.get('/weather', (request, response) => {
    try {
        const weather = request.query.weather;
        const result = getWeather(weather);
        response.status(200).json(result);

    }
    catch(err) {
        response.status(500).send('Sorry, the elves are on break and could not process your request');
    }
});





// Pull Da Lever!
app.listen(PORT, () => {
    console.log('The elves are working on PORT', PORT);
});
