const request = require('superagent');

const BASE_URL = 'https://www.eventbriteapi.com/v3/events/search?token=';
const EVENTS_API_KEY = process.env.EVENTS_API_KEY;

module.exports = {
    getEvents(lat, lng) {
        const url = `${BASE_URL}/${EVENTS_API_KEY}&location.latitude=${lat}&location.longitude=${lng}`;
        return request
            .get(url)
            .then(res => {
                return formatEvents(res.body);
            });
    }
};
function formatEvents(response) {
    const data = 
    /* EVENTBRITE DATA GOES HERE*/



    return data.map(formatDay)
}