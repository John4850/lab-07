const request = require('superagent');

//url and key

const BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;

// api service methods we want to expose:
module.exports = {
    getLatLng(search){
        // if we wanted to do a string concat
        // const url = `${BASE_URL}?address=${search}&key=${GEOCODE_API_KEY}`;

        return request
            .get(BASE_URL)
            .query({ address: search })
            .query({ key: GEOCODE_API_KEY })
            .then(res => {
                return toLocation(res.body, search);
            });
    }
};

// Help functions for transforming data

function toLocation(geoData, search) {
    const firstResult = geoData.results[0];
    const geometry = firstResult.geometry;

    return {
        search_query: search,
        formatted_query: firstResult.formatted_address,
        latitude: geometry.location.lat,
        longitude: geometry.location.lng
    };
}