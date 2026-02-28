let apiKey = "b2a5adcct04b33178913oc335f405433";

function searchCity() {
  let city = document.getElementById("cityInput").value;

  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(refreshWeather).catch(showError);
}

function refreshWeather(response) {
  document.getElementById("cityName").innerHTML = response.data.city;

  document.getElementById("temperature").innerHTML = Math.round(
    response.data.temperature.current
  );

  document.getElementById("description").innerHTML =
    response.data.condition.description;

  document.getElementById("humidity").innerHTML =
    response.data.temperature.humidity + "%";

  document.getElementById("wind").innerHTML =
    Math.round(response.data.wind.speed) + " km/h";

  document.getElementById("weatherIcon").src = response.data.condition.icon_url;
}

function showError() {
  alert("City not found. Please try again.");
}

// Allow Enter key to search
document
  .getElementById("cityInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      searchCity();
    }
  });

// Load default city on page load
window.onload = function () {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Johannesburg&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
};
