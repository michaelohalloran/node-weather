const request = require("request");

const forecast = (lat, lng, callback) => {
	// console.log("forecast lat, lng", lat, lng);
	const url = `https://api.darksky.net/forecast/${process.env.SECRET_KEY}/${lat},${lng}?units=us`;
	// console.log("forecast url ", url);
	request({ url, json: true }, (err, res) => {
		if (err) {
			callback("Network error: ", err);
		} else if (res.body.error) {
			callback("URL error: ", err);
		} else {
			const data = res.body;
			const { temperature, precipProbability } = data.currently;
			const summary = data.daily.data[0].summary;
			callback(undefined, {
				temperature,
				precipProbability,
				summary
			});
		}
	});
};

module.exports = forecast;
