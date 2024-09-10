function refreshWeather(response) {
  let temperatureEl = document.querySelector("#temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityEl = document.querySelector("#city");
  let descriptionEl = document.querySelector("#description");
  let humidityEl = document.querySelector("#humidity");
  let windEl = document.querySelector("#wind");
  let timeEl = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconEl = document.querySelector("#icon");

  timeEl.innerHTML = formatDate(date);
  cityEl.innerHTML = response.data.city;
  temperatureEl.innerHTML = temperature;
  descriptionEl.innerHTML = response.data.condition.description;
  humidityEl.innerHTML = response.data.temperature.humidity;
  windEl.innerHTML = response.data.wind.speed;
  iconEl.innerHTML = `<img
                src="${response.data.condition.icon_url}"
                alt="icon"
                class="weather-app-icon"
              />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "4obaa93faa4d0abd12t05933a7d742d3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormEl = document.querySelector("#search-form");
searchFormEl.addEventListener("submit", handleSearchSubmit);

searchCity("Norkem Park");

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "4obaa93faa4d0abd12t05933a7d742d3";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = " ";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `
            <div class="weather-forecast-day">
              <div class="weather-forecast-date">${formatDay(day.time)}</div>
              <div>
               <img  class="weather-forecast-icon" src="${
                 day.condition.icon_url
               }" />
              </div>
              <div class="weather-forecast-temperatures">
                <div class="weather-forecast-temperature">
                  <strong>${Math.round(day.temperature.maximum)}°</strong>
                </div>
                <div class="weather-forecast-temperature">
                  ${Math.round(day.temperature.minimum)}°
                </div>
              </div>
            </div>`;
    }
  });
  let forecastEl = document.querySelector("#forecast");
  forecastEl.innerHTML = forecastHtml;
}
