function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityEl = document.querySelector("#city");
  cityEl.innerHTML = searchInput.value;
}

let searchFormEl = document.querySelector("#search-form");
searchFormEl.addEventListener("submit", handleSearchSubmit);
