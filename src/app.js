let now = new Date();

let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekday = weekdays[now.getDay()];

let date = ("0" + now.getDate()).slice(-2);

let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let month = ("0" + months[now.getMonth()]).slice(-2);

let year = now.getFullYear();

let hours = now.getHours();

let minutes = ("0" + now.getMinutes()).slice(-2);

let currentTime = document.querySelector("#time");
currentTime.innerHTML = `${weekday}, ${date}/${month}/${year} <br />${hours}:${minutes}`;

function displayWeather(response) {
  let number = document.querySelector("#number");
  number.innerHTML = Math.round(response.data.temperature.current);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  icon.setAttribute("alt", response.data.condition.description);
  celsiusTemperature = response.data.temperature.current;
}

function search(city) {
  let apiKey = "739473ae0tafe02b875bc88cd82o1460";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function changeToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let number = document.querySelector("#number");
  number.innerHTML = Math.round(fahrenheitTemperature);
}

function changeToCelsius(event) {
  event.preventDefault();
  let degrees = document.querySelector("#number");
  degrees.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeToFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeToCelsius);

let celsiusTemperature = null;

search("Milan");
