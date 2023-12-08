//Complete the Weather API Backend part using openweathermap api

// Progression 1: Create a function and fetch data using "fetch" from openweathermap api and display the data as given in reference image.

API_KEY = '725ce78d018f542d22bc4601873b8bc5'
const kelvin = 273.15;
const background = document.getElementById('background');
let container = document.getElementById('info-container');

let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

let currentDate = new Date();
let date = currentDate.toLocaleDateString('en-GB', options)

function geoCoder(city){
    fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {console.log(data);getWeather(data[0].lat,data[0].lon);})
        .catch((err) => alert('Enter Valid City Name'));
    }

const weatherImgObject = {
    clearSky: './images/clear-sky.jpg',
    brokenClouds: './images/broken-clouds.jpg',
    fewClouds: './images/few-clouds.jpg',
    mist: './images/mist.jpeg',
    rain: './images/rain.jpeg',
    scatteredClouds: './images/scattered-clouds.jpg',
    showerRain: './images/shower-rain.jpg',
    snow: './images/snow.jpeg',
    thunderstorm: './images/thunderstorm.jpeg',
    purple: './images/purple.jpg',
    red: './images/red.jpg',
}

const weatherIcons = {
    clearSky: 'https://openweathermap.org/img/wn/01d@2x.png',
    brokenClouds: 'https://openweathermap.org/img/wn/04d@2x.png',
    fewClouds: 'https://openweathermap.org/img/wn/02d@2x.png',
    mist: 'https://openweathermap.org/img/wn/50d@2x.png',
    rain: 'https://openweathermap.org/img/wn/10d@2x.png',
    scatteredClouds: 'https://openweathermap.org/img/wn/03d@2x.png',
    showerRain: 'https://openweathermap.org/img/wn/09d@2x.png',
    snow: 'https://openweathermap.org/img/wn/13d@2x.png',
    thunderstorm: 'https://openweathermap.org/img/wn/11d@2x.png',
}

const search = document.getElementById('search');

search.addEventListener('click', () => {
    const city = document.getElementById('city').value;
    geoCoder(city);
})

function getWeather(lat,lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {console.log(data); return data;})
        .then((data) => {
            let destination = `${data.name}, ${data.sys.country}`;
            let dateToDisplay = date;
            let tempf = data.main.feels_like - kelvin;
            let desc = data.weather[0].description;
            let min = data.main.temp_min - kelvin;
            let max = data.main.temp_max - kelvin;

            backgroundChange(desc)

            document.getElementById('destination').innerHTML = destination;
            document.getElementById('date').innerHTML = dateToDisplay;
            document.getElementById('temp-f').innerHTML = `${tempf.toFixed(0)}°C`;
            document.getElementById('desc').innerHTML = desc;
            document.getElementById('temp-s').innerHTML = `${min.toFixed(1)}°C / ${max.toFixed(1)}°C`;
            container.style.display = 'flex';            
        })
        .catch((err) => alert('Enter Valid City Name'));
    }


function backgroundChange(desc){
    if(desc == 'clear sky'){
        background.src = weatherImgObject.clearSky;
    }else if(desc == 'broken clouds'){
        background.src = weatherImgObject.brokenClouds;
    }else if(desc == 'few clouds'){
        background.src = weatherImgObject.fewClouds;
    }else if(desc == 'mist' || desc == 'haze' || desc == 'fog' || desc == 'smoke' || desc == 'dust' || desc == 'sand' || desc == 'ash' || desc == 'squall' || desc == 'tornado'){
        background.src = weatherImgObject.mist;
    }else if(desc == 'rain'){
        background.src = weatherImgObject.rain;
    }else if(desc == 'scattered clouds'){
        background.src = weatherImgObject.scatteredClouds;
    }else if(desc == 'shower rain'){
        background.src = weatherImgObject.showerRain;
    }else if(desc == 'snow'){
        background.src = weatherImgObject.snow;
    }else if(desc == 'thunderstorm'){
        background.src = weatherImgObject.thunderstorm;
    }else{
        background.src = weatherImgObject.red;
    }
}