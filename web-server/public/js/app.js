console.log("Loading client side JS");

const weatherForm = document.querySelector("form");
const userInput = document.querySelector("input");
const searchBtn = document.querySelector("button");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");

// fetch("http://puzzle.mead.io/puzzle").then((res) => res.json()).then((data) => console.log("data: ", data));
const getWeather = (address) => {
	messageOne.textContent = "Loading";
	fetch(`http://localhost:3000/weather?address=${address}`).then((res) => res.json()).then((data) => {
		if (data.error) {
			console.log("error: ", data.error);
			messageOne.innerHTML = "Error, not found";
			messageTwo.innerHTML = "";
		} else {
			console.log("data: ", data);
			const { place, forecastData: { temperature, summary } } = data;
			messageOne.innerHTML += ` ${place}`;
			messageTwo.innerHTML += ` ${temperature}.  ${summary}`;
		}
	});
};

// messageOne.textContent = "Location";

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();
	// console.log("userSearch: ", userInput.value);
	const location = userInput.value;
	getWeather(location);
	// const { place, forecastData: { temperature, summary } } = {} || getWeather(location);
	// messageOne.innerHTML += ` ${place}`;
	// messageTwo.innerHTML += ` ${temperature}.  ${summary}`;

	userInput.value = "";
});
