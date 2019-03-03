const request = require("request");

const geocode = (address, callback) => {
	const geocode_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env
		.MAP_TOKEN}&limit=1`;
	request({ url: geocode_url, json: true }, (err, res) => {
		if (err) {
			callback("Unable to connect to geocoding service");
		} else if (res.body.features.length === 0) {
			callback("No such city or location");
		} else {
			const geocode = res.body.features[0].center;
			const [ lat, lng ] = geocode;
			const place = res.body.features[0].place_name;
			callback(undefined, {
				lat,
				lng,
				place
			}); //first arg is error, which is undefined in this case (successful api call)
			// console.log(`Lat: ${lat}, Lng: ${lng}`);
		}
	});
};

module.exports = geocode;
