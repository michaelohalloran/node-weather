const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
