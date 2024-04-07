const input = document.querySelector('input');
const button = document.querySelector('button');
const errorMessage = document.querySelector('p.error');
const cityName = document.querySelector('h2.city');
const img = document.querySelector('img');
const temperature = document.querySelector('p.temp');
const description = document.querySelector('p.description');
const feelsLike = document.querySelector('span.feels_like');
const pressure = document.querySelector('span.pressure');
const humidity = document.querySelector('span.humidity');
const wind_speed = document.querySelector('span.wind_speed');
const clouds = document.querySelector('span.clouds');
const visibility = document.querySelector('span.visibility');


const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=25fdc4e9ed531613d1a9ae680fa6d266';
const apiUnits = '&units=metric';
const apiLang = '&lang=pl';

//function getWeather() {
//    console.log('działa :) ');
//}
//button.addEventListener('click', getWeather);


function getWeather() {
    const apiCity = input.value
    const URL = apiLink + apiCity + apiKey + apiUnits + apiLang;
    console.log(URL);

    
    axios.get(URL).then((response) => {
        console.log(response.data);
        cityName.textContent = `${response.data.name}, ${response.data.sys.country}`;
        img.src=`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
        temperature.textContent = `${Math.round(response.data.main.temp)} °C`;
        description.textContent = `${response.data.weather[0].description}`;
        feelsLike.textContent = `${Math.round(response.data.main.feels_like)} °C`;
        pressure.textContent = `${response.data.main.pressure} hPa`;
        humidity.textContent = `${response.data.main.humidity} %`;
        wind_speed.textContent = `${Math.round(response.data.wind.speed * 3.6)} km/h`;
        clouds.textContent = `${response.data.clouds.all} %`;
        visibility.textContent = `${response.data.visibility / 1000} km`;
        errorMessage.textContent = '';

    }).catch((error) =>{
        console.log(error.response);
        errorMessage.textContent = `${error.response.data.message}`;
        img.src = '';
        [visibility, clouds, wind_speed, humidity, pressure, feelsLike, description, temperature, cityName].forEach((element)=>{
            element.textContent = '';
        })

    }).finally(()=>{
        input.value = '';
    })
}
button.addEventListener('click', getWeather);