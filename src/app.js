function formatDate(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
  if(hours<10){
    hours	= `0${hours}`
  }
  let minutes = date.getMinutes();
  if(minutes<10){
    minutes	= `0${minutes}`
  }
  let days = ["Sunday","Monday","Tuesday","Wednsday","Thursday","Friday","Saturday"];
  let day =days[date.getDay()];
  return`${day} ${hours}:${minutes}`
}

function formatDay(timestamp){
let date = new Date(timestamp);
 let hours = date.getHours();
  if(hours<10){
    hours	= `0${hours}`
  }
  let minutes = date.getMinutes();
  if(minutes<10){
    minutes	= `0${minutes}`
  }
  let days = ["Sunday","Monday","Tuesday","Wednsday","Thursday","Friday","Saturday"];
  let day =days[date.getDay()];
  return`${day} ${hours}:${minutes}`
}

function displayForecast(response){
let forecast = response.data.daily;

let forecastElement = document.querySelector("#weather-forecast");

let forecastHTML =`<div class="row">`;
forecast.forEach(function(forecastDay){
   forecastHTML = forecastHTML +
         ` <div class="col-3" >
            <div class="forecast-date">${formatDay(forecastDay.time*1000)}</div>
           <img src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" alt="" width="25"></img>
            <div class="weather-forecast-weather">
             <span class="forecast-temperature-max">${Math.round(forecastDay.temperature.maximum)}&deg;</span>
             <span class="forecast-temperature-min">${Math.round(forecastDay.temperature.minimum)}&deg;</span>
            </div>
          </div>
           `;
  });
  forecastHTML = forecastHTML + `<div>`;
  forecastElement.innerHTML = forecastHTML;
    
}

function getForecast(coordinates){
console.log(coordinates);
 let apiKey = "ff34aa210561032bc3252bb6a9do1e5t";
 let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
 axios.get(apiUrl).then(displayForecast);
 console.log(apiUrl);


}


function displayWeather(response) {
  let cityElement = document.querySelector("#location");
  let tempElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let humidityElement = document.querySelector("#Humidity");
  let windElement = document.querySelector("#WindSpeed");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.temperature.humidity;
  dateElement.innerHTML = formatDate(response.data.time* 1000);
  iconElement.setAttribute("src",`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(response.data.temperature.current);
  descriptionElement.innerHTML = response.data.condition.description;
   celsiusTemperature = Math.round(response.data.temperature.current);
   getForecast(response.data.coordinates)
   
}

function search(city){
  let apiKey = "ff34aa210561032bc3252bb6a9do1e5t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);  
}

  function handleSumbit(event){
    event.preventDefault();
    let cityInput = document.querySelector("#exampleDataList");
    search(cityInput.value);
  }

  function convertFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");

  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let sum = (celsiusTemperature * 9) / 5 + 32;
  tempElement.innerHTML= Math.round(sum);
}

  function convertCelsius(event){
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
      let tempElement = document.querySelector("#temperature");
      tempElement.innerHTML = Math.round(celsiusTemperature);
  }

  celsiusTemperature = null
 
  let fahrenheitLink = document.querySelector("#fahrenheit-Link");
fahrenheitLink.addEventListener("click", convertFahrenheit);
 
  let celsiusLink = document.querySelector("#celsius-Link");
celsiusLink.addEventListener("click",convertCelsius,);


let form = document.querySelector("#form");
form.addEventListener("submit",handleSumbit);

search("Pretoria"); 
displayForecast();
