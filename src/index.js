function formatDate() {
  let currentTime = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentTime.getDay()];

  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let year = currentTime.getFullYear();

  let date = currentTime.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  let month = months[currentTime.getMonth()];

  let dayAndTimeElement = document.querySelector("#current-day");
  dayAndTimeElement.innerHTML = `${day},  ${hours}:${minutes} `;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = `${date}/${month}/${year} `;
}
formatDate();

//1
function displayWeatherConditons(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#sky"
  ).innerHTML = response.data.weather[0].description.toUpperCase();
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}
//2
function searchCity(city) {
  let apiKey = "f6b669c29af99bb3c457d949b0af81ab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherConditons);
  //console.log(apiUrl)--> always check
}

//3
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

//4 to button Current
function searchLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "f6b669c29af99bb3c457d949b0af81ab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherConditons);
}
//5  to button Current
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
//2
searchCity("Amsterdam");

//3
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//5 to button Current
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
