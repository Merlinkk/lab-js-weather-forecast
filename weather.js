//Complete the Weather API Backend part using openweathermap api

// Progression 1: Create a function and fetch data using "fetch" from openweathermap api and display the data as given in reference image.

API_KEY = '725ce78d018f542d22bc4601873b8bc5'
const kelvin = 273.15;
const background = document.getElementById('background');
let container = document.getElementById('info-container');
const ico = document.getElementById('ico');

let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

let currentDate = new Date();
let date = currentDate.toLocaleDateString('en-GB', options)

const cityInp = document.getElementById('city');

const loader = document.querySelector('.loader');

function geoCoder(city){
    fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {console.log(data);getWeather(data[0].lat,data[0].lon);})
        .catch((err) => {
            alert('Enter Valid City Name')
            loader.style.display = 'none';
        });
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
    container.style.display = 'none';            
    loader.style.display = 'block';
    geoCoder(city);
})

function getWeather(lat,lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {console.log(data); return data;})
        .then((data) => {
            loader.style.display = 'none';

            let destination = `${data.name}, ${data.sys.country}`;
            let dateToDisplay = date;
            let tempf = data.main.feels_like - kelvin;
            let desc = data.weather[0].description;
            let min = data.main.temp_min - kelvin;
            let max = data.main.temp_max - kelvin;

            backgroundChange(desc)
            icoRender(desc)

            document.getElementById('destination').innerHTML = destination;
            document.getElementById('date').innerHTML = dateToDisplay;
            document.getElementById('temp-f').innerHTML = `${tempf.toFixed(0)}°C`;
            document.getElementById('desc').innerHTML = desc;
            document.getElementById('temp-s').innerHTML = `${min.toFixed(1)}°C / ${max.toFixed(1)}°C`;
            container.style.display = 'flex';            
        })
        .catch((err) => {
            alert('Enter Valid City Name')
        });
    }


function backgroundChange(desc){
    if(desc == 'clear sky'){
        background.src = weatherImgObject.clearSky;
    }else if(desc == 'broken clouds'){
        background.src = weatherImgObject.brokenClouds;
    }else if(desc == 'few clouds' || desc == 'overcast clouds'){
        background.src = weatherImgObject.fewClouds;
    }else if(desc == 'mist' || desc == 'haze' || desc == 'fog' || desc == 'smoke' || desc == 'dust' || desc == 'sand' || desc == 'ash' || desc == 'squall' || desc == 'tornado'){
        background.src = weatherImgObject.mist;
    }else if(desc == 'rain' || desc == 'moderate rain' || desc == 'heavy intensity rain' || desc == 'very heavy rain' || desc == 'extreme rain' || desc == 'freezing rain' || desc == 'light intensity shower rain' || desc == 'heavy intensity shower rain' || desc == 'ragged shower rain'){
        background.src = weatherImgObject.rain;
    }else if(desc == 'scattered clouds'){
        background.src = weatherImgObject.scatteredClouds;
    }else if(desc == 'shower rain'|| desc == 'light rain' || desc == 'drizzle' || desc == 'light intensity drizzle' || desc == 'heavy intensity drizzle' || desc == 'light intensity drizzle rain' || desc == 'drizzle rain' || desc == 'heavy intensity drizzle rain' || desc == 'shower rain and drizzle' || desc == 'heavy shower rain and drizzle' || desc == 'shower drizzle'){
        background.src = weatherImgObject.showerRain;
    }else if(desc == 'snow' || desc == 'light snow' || desc == 'Heavy snow' || desc == 'Sleet' || desc == 'Light shower sleet' || desc == 'Shower sleet' || desc == 'Light rain and snow' || desc == 'Rain and snow' || desc == 'Light shower snow' || desc == 'Shower snow' || desc == 'Heavy shower snow'){
        background.src = weatherImgObject.snow;
    }else if(desc == 'thunderstorm' || desc == 'thunderstorm with light rain' || desc == 'thunderstorm with rain' || desc == 'thunderstorm with heavy rain' || desc == 'light thunderstorm' || desc == 'heavy thunderstorm' || desc == 'ragged thunderstorm' || desc == 'thunderstorm with light drizzle' || desc == 'thunderstorm with drizzle' || desc == 'thunderstorm with heavy drizzle'){
        background.src = weatherImgObject.thunderstorm;
    }else{
        background.src = weatherImgObject.red;
    }
}

function icoRender(desc){
    if(desc == 'clear sky'){
        ico.src = weatherIcons.clearSky;
    }else if(desc == 'broken clouds'){
        ico.src = weatherIcons.brokenClouds;
    }else if(desc == 'few clouds' || desc == 'overcast clouds'){
        ico.src = weatherIcons.fewClouds;
    }else if(desc == 'mist' || desc == 'haze' || desc == 'fog' || desc == 'smoke' || desc == 'dust' || desc == 'sand' || desc == 'ash' || desc == 'squall' || desc == 'tornado'){
        ico.src = weatherIcons.mist;
    }else if(desc == 'rain' || desc == 'moderate rain' || desc == 'heavy intensity rain' || desc == 'very heavy rain' || desc == 'extreme rain' || desc == 'freezing rain' || desc == 'light intensity shower rain' || desc == 'heavy intensity shower rain' || desc == 'ragged shower rain'){
        ico.src = weatherIcons.rain;
    }else if(desc == 'scattered clouds'){
        ico.src = weatherIcons.scatteredClouds;
    }else if(desc == 'shower rain'|| desc == 'light rain' || desc == 'drizzle' || desc == 'light intensity drizzle' || desc == 'heavy intensity drizzle' || desc == 'light intensity drizzle rain' || desc == 'drizzle rain' || desc == 'heavy intensity drizzle rain' || desc == 'shower rain and drizzle' || desc == 'heavy shower rain and drizzle' || desc == 'shower drizzle'){
        ico.src = weatherIcons.showerRain;
    }else if(desc == 'snow' || desc == 'light snow' || desc == 'Heavy snow' || desc == 'Sleet' || desc == 'Light shower sleet' || desc == 'Shower sleet' || desc == 'Light rain and snow' || desc == 'Rain and snow' || desc == 'Light shower snow' || desc == 'Shower snow' || desc == 'Heavy shower snow'){
        ico.src = weatherIcons.snow;
    }else if(desc == 'thunderstorm' || desc == 'thunderstorm with light rain' || desc == 'thunderstorm with rain' || desc == 'thunderstorm with heavy rain' || desc == 'light thunderstorm' || desc == 'heavy thunderstorm' || desc == 'ragged thunderstorm' || desc == 'thunderstorm with light drizzle' || desc == 'thunderstorm with drizzle' || desc == 'thunderstorm with heavy drizzle'){
        ico.src = weatherIcons.thunderstorm;
    }else{
        ico.style.display = 'none';
    }
}

cityInp.addEventListener('keydown', (e) => {
    if(e.key===`Enter`){
        e.preventDefault(); 
        const city = document.getElementById('city').value;
        geoCoder(city);
    }
})