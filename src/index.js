function refreshWeather(response){
  let temperatureElement = document.querySelector(`#current-temperature`);
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector(`#current-city`);
  let conditionElement = document.querySelector(`#condition`);
  let windElement = document.querySelector(`#wind`);
  let wind = response.data.wind.speed;
  let humidityElement = document.querySelector(`#humidity`);
  let dayTimeElement = document.querySelector(`#current-date`);
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector(`#icon`);

  dayTimeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;
  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  conditionElement.innerHTML = response.data.condition.description;
  windElement.innerHTML = `${Math.round(wind)}mph`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  getForecast(response.data.city);
}

function formatDate(date){
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  if (minutes < 10){
  minutes = `0${minutes}`;
  }
  if (hours < 10){
  hours = `0${hours}`;
  }
return `${day} ${hours}:${minutes}`;
}

function searchCity(city){
let apiKey = `01dd2bca25c0t00b3d253f443e0of791`;
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event){
  event.preventDefault();
  let searchInput = document.querySelector(`#search-entry`);
  let cityElement = document.querySelector(`#current-city`);
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector(`#search-form`);
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Boston");

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    return days[date.getDay()];
}


function getForecast(city){
    let apiKey = `01dd2bca25c0t00b3d253f443e0of791`;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
axios(apiUrl).then(displayForecast);
}

function displayForecast(response){
        console.log(response.data);

let forecastElement = document.querySelector("#forecast");
let forecastHtml = "";

response.data.daily.forEach(function(day, index){
    if (index < 5){
forecastHtml = 
forecastHtml + `
          <div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <div ><img src="${day.condition.icon_url}"class="weather-forecast-icon"/></div>
            <div class="weather-forecast-temperature">
              <div class="weather-forecast-temperature-max">
              <strong>${Math.round(day.temperature.maximum)}℉</strong>
              </div>
              <div class="weather-forecast-temperature-min">${Math.round(day.temperature.minimum)}℉</div>
            </div>
        </div>
        `;
    }
        });
        forecastElement.innerHTML = forecastHtml;
}
