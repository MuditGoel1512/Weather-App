let baseUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
let app_id = "&appid=376405ae4982e2e67689736bb0eecbf5";
let city = document.querySelector(".search-city");
let cityVal = city.value;
let btn = document.querySelector(".search-bar i");
let weatherIcon = document.querySelector(".weather-image");


function timestampToHoursMinutes(timestamp) {
    let date = new Date(timestamp * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let formattedHours = String(hours).padStart(2, '0');
    let formattedMinutes = String(minutes).padStart(2, '0');
    
    return `${formattedHours}:${formattedMinutes}`;
}

function secondsToHoursMinutes(seconds) {
    let hours = Math.floor(seconds / 3600);
    let remainingSeconds = seconds % 3600;
    let minutes = Math.floor(remainingSeconds / 60);
    let formattedHours = String(hours).padStart(2, '0');
    let formattedMinutes = String(minutes).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
}

const getWeather = async (URL) =>{
    let response = await fetch(URL);
    // console.log(response);
    let data = await response.json();
    console.log(data);
    // console.log(data.wind.speed);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML = `${Math.round(data.main.temp)}&deg;`;
    document.querySelector(".temperature-box .temperature").innerHTML = `${Math.round(data.main.temp)}&deg;C`;
    document.querySelector(".weather-type").innerHTML = data.weather[0].description;
    document.querySelector(".time").innerHTML = secondsToHoursMinutes(data.timezone);
    document.querySelector(".wind-speed").innerHTML = `${data.wind.speed} km/h`;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".pressure").innerHTML = `${data.main.pressure} mb`;
    document.querySelector(".sun-rise").innerHTML = `${timestampToHoursMinutes(data.sys.sunrise)} am`;
    document.querySelector(".sun-set").innerHTML = `${timestampToHoursMinutes(data.sys.sunset)} pm`;
    document.querySelector(".moon-rise").innerHTML = `${timestampToHoursMinutes(data.sys.sunset)} am`;
    document.querySelector(".moon-set").innerHTML = `${timestampToHoursMinutes(data.sys.sunrise)} pm`;
    document.querySelector(".feel").innerHTML = `${data.main.feels_like}&deg;`;
    document.querySelector(".visibility").innerHTML = data.visibility;
    console.log(data.weather[0].main);
    if(data.weather[0].main === "Haze" || data.weather[0].main === "mist"){
        weatherIcon.src = `images/mist.png`;
    }
    else if(data.weather[0].main == 'Clear'){
        weatherIcon.src = "images/clear.png";
    }
    else if(data.weather[0].main === "Clouds"){
        weatherIcon.src = `images/clouds.png`;
    }
    else if(data.weather[0].main === "Rain"){
        weatherIcon.src = `images/rain.png`;
    }
    else if(data.weather[0].main === "Snow"){
        weatherIcon.src = `images/snow.png`;
    }
}

getWeather("https://api.openweathermap.org/data/2.5/weather?units=metric&q=delhi&appid=376405ae4982e2e67689736bb0eecbf5");

btn.addEventListener("click", () =>{
    let city = document.querySelector(".search-city");
    let cityVal = city.value;
    
    const URL = `${baseUrl}&q=${cityVal}${app_id}`;
    console.log(URL);
    getWeather(URL);
})