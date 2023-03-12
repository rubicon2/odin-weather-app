import { subscribe } from '../modules/pubsub';
import * as Weather from '../modules/weatherData';

// Main DOM Elements
let background = null;
let backgroundSun = null;
let backgroundClouds = null;
let backgroundRain = null;
let backgroundSnow = null;

let overlay = null;
let locationName = null;
let weatherDescription = null;
let avgTemp = null;
let windSpeed = null;
let humidity = null;

// Side DOM Elements
let minTemp = null;
let maxTemp = null;

subscribe('onWeatherDataResponse', refreshDom);
subscribe('onWeatherDataError', showError);

function showError() {}

// Updates information in existing elements
function refreshDom(weatherData) {
  locationName.innerText = Weather.getLocationName(weatherData);
  weatherDescription.innerText = Weather.getDescription(weatherData);

  avgTemp.innerText = Weather.getAvgTemp(weatherData);
  minTemp.innerText = Weather.getMinTemp(weatherData);
  maxTemp.innerText = Weather.getMaxTemp(weatherData);

  windSpeed.innerText = Weather.getWindSpeed(weatherData);
  humidity.innerText = Weather.getHumidity(weatherData);
}

// Creates elements on page load
function createDomElements(parent) {
  background = document.createElement('div');
  background.classList.add('weatherInfo', 'background');
  parent.appendChild(background);

  overlay = document.createElement('div');
  overlay.classList.add('weatherInfo', 'overlay');
  background.appendChild(overlay);

  locationName = document.createElement('div');
  locationName.classList.add('weatherInfo', 'locationName');
  overlay.appendChild(locationName);

  weatherDescription = document.createElement('div');
  weatherDescription.classList.add('weatherInfo', 'weatherDescription');
  overlay.appendChild(weatherDescription);

  avgTemp = document.createElement('div');
  avgTemp.classList.add('weatherInfo', 'avgTemp');
  overlay.appendChild(avgTemp);

  windSpeed = document.createElement('div');
  windSpeed.classList.add('weatherInfo', 'windSpeed');
  overlay.appendChild(windSpeed);

  humidity = document.createElement('div');
  humidity.classList.add('weatherInfo', 'humidity');
  overlay.appendChild(humidity);

  minTemp = document.createElement('div');
  minTemp.classList.add('weatherInfo', 'minTemp');
  overlay.appendChild(minTemp);

  maxTemp = document.createElement('div');
  maxTemp.classList.add('weatherInfo', 'maxTemp');
  overlay.appendChild(maxTemp);
}

function createSwitchingBackground(parent) {
  // Different images for each type of weather - sunny, cloudy, rainy, snowing
}

function fadeOut() {
  overlay.classList.add('invisible');
}

function fadeIn() {
  overlay.classList.remove('invisible');
}

export { createDomElements, fadeIn, fadeOut };
