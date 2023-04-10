function getDayTimelet(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = date.getDay();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayTime = document.querySelector("h4");
  dayTime.innerHTML = `${days[day]} ${hours}:${minutes}`;
}

let date = new Date();
getDayTimelet(date);

//Default city display
function cityDefault(response) {
  let cityTalence = document.querySelector("#city-display");
  cityTalence.innerHTML = response.data.name;
  let tempDefault = document.querySelector("#temp-display");
  tempDefault.innerHTML = Math.round(response.data.main.temp);
  let describe = document.querySelector("h5");
  describe.innerHTML = response.data.weather[0].main;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind : ${Math.round(response.data.wind.speed)} m/sec`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity : ${response.data.main.humidity}%`;
}

let apiKey = "5ad50f38578ea124960c2b83a79f211e";
let units = "&units=metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Talence&appid=${apiKey}${units}`;

axios.get(apiUrl).then(cityDefault);

//Search and display information about the searched city
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city");
  city = city.value;
  city = city.trim().toLowerCase();

  let apiKey = "5ad50f38578ea124960c2b83a79f211e";
  let units = "&units=metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}${units}`;

  axios.get(apiUrl).then(function (response) {
    if (city === response.data.name.toLowerCase()) {
      let cityOutput = document.querySelector("#city-display");
      cityOutput.innerHTML = response.data.name;
      let temperature = response.data.main.temp;
      let tempOutput = document.querySelector("#temp-display");
      tempOutput.innerHTML = Math.round(temperature);
      let wind = document.querySelector("#wind");
      wind.innerHTML = `Wind : ${Math.round(response.data.wind.speed)} m/sec`;
      let describe = document.querySelector("h5");
      describe.innerHTML = response.data.weather[0].main;
      let humidity = document.querySelector("#humidity");
      humidity.innerHTML = `Humidity : ${response.data.main.humidity}%`;
    }
  });
}

let searchEngine = document.querySelector("#search-engin");
searchEngine.addEventListener("submit", searchCity);

//show geolocation
function showPosition(position) {
  let h1 = document.querySelector("#city-display");
  let lon = (h1.innerHTML = position);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);

// https://www.shecodes.io/demos/vanilla  -- check it out!
