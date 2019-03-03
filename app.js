require("dotenv").config();

const request = require("request");
const geocode = require("./utils/geocode");

const url = `https://api.darksky.net/forecast/${process.env.SECRET_KEY}/37.8267,-122.4233?units=us`;
const geocode_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${process.env
	.MAP_TOKEN}&limit=1`;

request({ url, json: true }, (err, res) => {
	if (err) {
		console.log("Unable to connect to weather service");
	} else if (res.body.error) {
		//this would be e.g. a URL error rather than network/Wifi
		console.log(`${res.body.code}: ${res.body.error}`);
	} else {
		// const data = JSON.parse(res.body);
		const data = res.body; //json config now parses automatically
		const temp = data.currently.temperature;
		const precipChance = data.currently.precipProbability * 100;
		console.log(`Summary: ${data.daily.data[0].summary}`);
		console.log(`It is currently ${temp} degrees with a ${precipChance}% chance of rain`);
	}
});

// ***************************
// GEOCODING
// ***************************

// request({ url: geocode_url, json: true }, (err, res) => {
// 	if (err) {
// 		console.log(`Cannot reach geocoding service, error: ${err}`);
// 	} else if (res.body.features.length === 0) {
// 		console.log("Unable to process your query");
// 	} else {
// 		const geocode = res.body.features[0].center;
// 		const [ lat, lng ] = geocode;
// 		console.log(`Lat: ${lat}, Lng: ${lng}`);
// 	}
// });

// ***************************
// CALLBACKS
// ***************************

geocode("Philadelphia", (err, data) => {
	console.log(`Error: ${err}`);
	console.log("Data: ", data);
});
