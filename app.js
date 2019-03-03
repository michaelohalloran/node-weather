require("dotenv").config();

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const address = process.argv[2];

if (!address) {
	console.log("Address required");
} else {
	// geocode("Colorado Springs", (err, data) => {
	geocode(address, (err, { lat, lng }) => {
		if (err) {
			return console.log("Geocode Error: ", err);
		}
		// console.log("Geocode Data: ", data);
		forecast(lat, lng, (error, forecastData) => {
			// console.log("data received from geocode: ", data);
			if (error) {
				return console.log("Forecast Error", error);
			}
			console.log("Forecast Data", forecastData);
		});
	});
}
