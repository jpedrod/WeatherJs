//API Key:ef70e742bfc31b0f41c011146b5ddc7f

//SELECT ELEMENTS
const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");

//app data
const weather = {};

weather.temperature = {
    unit : 'C'
}

//app const
const kelvin = 273;

//app var
var key = "ef70e742bfc31b0f41c011146b5ddc7f";

if ("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML     = "<p>O browser não suporta geolocalizaçao</p>"
}

//set user position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

//show erro 
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML     = `<p>${weather.message}</p>`;
}

//show erro 
function getWeather(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&&appid=${key}&lang=pt_br`;
    
    fetch(api).then(function(response){
        let data = response.json();
        return data;
    }).then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - kelvin);
        weather.description = data.weather[0].description;
        weather.icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weather.city = data.name;
        weather.contry = data.sys.country;
    }).then(function(){
        displayWeather();
    });
}

function displayWeather(){
    iconElement.innerHTML = `<img src='${weather.icon}'/>`
    tempElement.innerHTML = `${weather.temperature.value}°<span>C<span>`
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.contry}`;
}
