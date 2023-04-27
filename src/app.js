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
}

let apiKey = "739473ae0tafe02b875bc88cd82o1460";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=milan&key=${apiKey}`;

axios.get(apiUrl).then(displayWeather);
