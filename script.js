let apiKey = "b2a5adcct04b33178913oc335f405433";

function searchCity() {
  let city = document.getElementById("cityInput").value;

  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather).catch(showError);
}

function updateWeather(response) {
  document.getElementById("cityName").innerHTML = response.data.city;
  document.getElementById("temperature").innerHTML =
    Math.round(response.data.temperature.current);
  document.getElementById("description").innerHTML =
    response.data.condition.description;
  document.getElementById("humidity").innerHTML =
    response.data.temperature.humidity + "%";
  document.getElementById("wind").innerHTML =
    Math.round(response.data.wind.speed) + " km/h";
  document.getElementById("weatherIcon").src =
    response.data.condition.icon_url;

  document.getElementById("dateTime").innerHTML =
    formatDate(response.data.time);

  getForecast(response.data.city);
}

function getForecast(city) {
  let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(forecastUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.getElementById("forecast");
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML += `
        <div class="day">
          <p>${formatDay(day.time)}</p>
          <img src="${day.condition.icon_url}" />
          <p>
            <span class="high">${Math.round(day.temperature.maximum)}°</span>
            <span class="low">${Math.round(day.temperature.minimum)}°</span>
          </p>
        </div>
      `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  return days[date.getDay()];
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return `${day} ${hours}:${minutes}`;
}

function showError() {
  alert("City not found. Please try again.");
}

document
  .getElementById("cityInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      searchCity();
    }
  });

window.onload = function () {
  searchCityDefault("Johannesburg");
};

function searchCityDefault(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}
