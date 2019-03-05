const request = require("request");

const geocode = (address, callback) => {
	const geocode_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env
		.MAP_TOKEN}&limit=1`;
	console.log("token: ", process.env);
	console.log("address: ", address);
	request({ url: geocode_url, json: true }, (err, { body }) => {
		console.log("body: ", body);
		if (err) {
			callback("Unable to connect to geocoding service");
		} else if (body.features.length === 0) {
			callback("No such city or location");
		} else {
			const geocode = body.features[0].center;
			const [ lng, lat ] = geocode;
			const place = body.features[0].place_name;
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
