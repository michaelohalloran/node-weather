require("dotenv").config();
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//PATHS for Express config
// console.log("dirname: ", __dirname);
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars and views location
app.set("view engine", "hbs"); //tells Express to look in views folder for assets
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static path
app.use(express.static(publicDir));

app.get("", (req, res) => {
	res.render("index", {
		//this is index.hbs
		title: "Weather App",
		name: "Bob Smith"
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About page",
		name: "Patrick McMullen"
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help page",
		name: "Scott Jones"
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		msg: "Help article not found"
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "Must provide address"
		});
	}

	geocode(req.query.address, (err, { lat, lng, place } = {}) => {
		if (err) {
			return res.send({ err });
		}
		// console.log("Geocode Data: ", data);
		forecast(lat, lng, (error, forecastData) => {
			// console.log("data received from geocode: ", data);
			if (error) {
				return res.send({ error });
			}
			return res.send({
				forecastData,
				place,
				address: req.query.address
			});
		});
	});

	// res.send({
	// 	forecast: 'Sunny',
	// 	location: 'CO Springs',
	// 	address: req.query.address
	// });
});

app.get("/products", (req, res) => {
	//localhost:3000/products/?search=mySearchTerm -> mySearchTerm is the value of req.query.search
	if (!req.query.search) {
		//use return to stop function execution and prevent error with code outside the if (same end result as using if/else)
		return res.send({
			error: "Must provide search term"
		});
	}
	console.log("req.query.search ", req.query.search);
	res.send({
		products: []
	});
});

//match anything (*) not already matched
app.get("*", (req, res) => {
	res.render("404", {
		msg: "Page not found"
	});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
