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

function displayWeather(response) {
  let cityElement = document.querySelector("#location");
  let tempElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
   celsiusTemperature = response.data.main.temp;
   
}

function displayHumidity(response) {
  let humidityElement = document.querySelector("#Humidity");
  humidityElement.innerHTML = response.data.main.humidity;
}

function displayWindSpeed(response) {
  let windElement = document.querySelector("#WindSpeed");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

function search(city){
  let apiKey = "9fc74ee844c3def648338cc86ea0665b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather,displayHumidity,displayWindSpeed);  
}

  function handleSumbit(event){
    event.preventDefault();
    let cityInput = document.querySelector("#exampleDataList");
    search(cityInput.value);
  }

  function convertFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let tempElement = document.querySelector("#temperature");
  let sum = (celsiusTemperature * 9) / 5 + 32;
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

  let celsiusTemp = document.querySelector("#celsius-Link");
  celsiusTemp.addEventListener("click",convertCelsius,);

  let celsiusLink = document.querySelector("#celsius-Link");
celsiusLink.addEventListener("click",convertFahrenheit,);

  
let humidityButton = document.querySelector("#button1");
humidityButton.addEventListener("click", displayHumidity);

let windSpeedButton = document.querySelector("#button2");
windSpeedButton.addEventListener("click", displayWindSpeed);

let form = document.querySelector("#form");
form.addEventListener("submit",handleSumbit);

search("Pretoria"); 
  
