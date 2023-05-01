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

let date = now.getDate();
if (date < 10) {
  date = `0${date}`;
}

let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let month = months[now.getMonth()];
if (month < 10) {
  month = `0${month}`;
}

let year = now.getFullYear();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentTime = document.querySelector("#time");
currentTime.innerHTML = `${weekday}, ${date}/${month}/${year} <br />${hours}:${minutes}`;

function formatDay(timestamp) {
  let newDate = new Date(timestamp * 1000);
  let newDay = newDate.getDay();
  let allDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return allDays[newDay];
}

function displayForecast(response) {
  let fullForecast = response.data.daily;

  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  fullForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
        <div class="forecast-date">${formatDay(forecastDay.time)}</div>
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          alt=""
          width="42"
        />
        <div class="forecast-temperature">
          <span class="max">${Math.round(
            forecastDay.temperature.maximum
          )}°</span> <span class="min"> ${Math.round(
          forecastDay.temperature.minimum
        )}°</span>
        </div>
      </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  apiKey = "739473ae0tafe02b875bc88cd82o1460";
  apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}
`;
  axios.get(apiUrl).then(displayForecast);
}

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
  getForecast(response.data.coordinates);
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

search("Milan");
