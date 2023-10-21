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
  let humidityElement = document.querySelector("#Humidity");
  let windElement = document.querySelector("#WindSpeed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
}

function search(city){
  let apiKey = "9fc74ee844c3def648338cc86ea0665b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);  
}



  function handleSumbit(event){
    event.preventDefault();
    let cityInput = document.querySelector("#exampleDataList");
    search(cityInput.value)
   
  }

let form = document.querySelector("#form");
form.addEventListener("submit",handleSumbit);


