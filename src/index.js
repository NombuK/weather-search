function refreshWeather(response) {
  let temperatureEl = document.querySelector("#temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityEl = document.querySelector("#city");

  cityEl.innerHTML = response.data.city;
  temperatureEl.innerHTML = temperature;
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
