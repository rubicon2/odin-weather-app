import { subscribe } from '../modules/pubsub';
import * as Weather from '../modules/weatherData';

import sunImg from '../img/backgrounds/sunny.jpg';
import cloudsImg from '../img/backgrounds/clouds.jpg';
import rainImg from '../img/backgrounds/rain.jpg';
import snowImg from '../img/backgrounds/snow.jpg';

// Main DOM Elements
let background = null;
let backgroundSun = null;
let backgroundClouds = null;
let backgroundRain = null;
let backgroundSnow = null;

let overlay = null;
let locationName = null;
let locationTime = null;
let weatherDescription = null;
let avgTemp = null;
let windSpeed = null;
let humidity = null;

let locationInput = null;
let unitSelect = null;

// Side DOM Elements
let minTemp = null;
let maxTemp = null;

subscribe('onWeatherDataResponse', refreshDom);
subscribe('onWeatherDataError', showError);

function showError(error) {
  clearInfo();
  locationName.innerText = 'Location not found';
}

function clearInfo() {
  locationName.innerText = '';
  locationTime.innerText = '';
  weatherDescription.innerText = '';
  avgTemp.innerText = '';
  windSpeed.innerText = '';
  humidity.innerText = '';
  minTemp.innerText = '';
  maxTemp.innerText = '';
}

// Updates information in existing elements
function refreshDom(weatherData) {
  setBackground(weatherData);

  locationName.innerText = Weather.getLocationName(weatherData);
  locationTime.innerText = Weather.getLocationTime(weatherData);
  weatherDescription.innerText = Weather.getDescription(weatherData);

  avgTemp.innerText = Weather.getAvgTemp(weatherData);
  minTemp.innerText = 'Min: ' + Weather.getMinTemp(weatherData);
  maxTemp.innerText = 'Max: ' + Weather.getMaxTemp(weatherData);

  windSpeed.innerText = 'Wind: ' + Weather.getWindSpeed(weatherData);
  humidity.innerText = 'Humidity: ' + Weather.getHumidity(weatherData);
}

// Creates elements on page load
function createDomElements(parent) {
  background = document.createElement('div');
  background.classList.add('background');
  parent.appendChild(background);

  createSwitchingBackground(background);

  overlay = document.createElement('div');
  overlay.classList.add('overlay');
  background.appendChild(overlay);

  let main = document.createElement('div');
  main.classList.add('mainInfo');
  overlay.append(main);

  locationName = document.createElement('div');
  locationName.classList.add('locationName');
  main.appendChild(locationName);

  locationTime = document.createElement('div');
  locationTime.classList.add('locationTime');
  main.appendChild(locationTime);

  weatherDescription = document.createElement('div');
  weatherDescription.classList.add('weatherDescription');
  main.appendChild(weatherDescription);

  avgTemp = document.createElement('div');
  avgTemp.classList.add('avgTemp');
  main.appendChild(avgTemp);

  windSpeed = document.createElement('div');
  windSpeed.classList.add('windSpeed');
  main.appendChild(windSpeed);

  let sideInfo = document.createElement('div');
  sideInfo.classList.add('sideInfo');
  overlay.appendChild(sideInfo);

  humidity = document.createElement('div');
  humidity.classList.add('humidity');
  sideInfo.appendChild(humidity);

  minTemp = document.createElement('div');
  minTemp.classList.add('minTemp');
  sideInfo.appendChild(minTemp);

  maxTemp = document.createElement('div');
  maxTemp.classList.add('maxTemp');
  sideInfo.appendChild(maxTemp);

  unitSelect = createUnitSelect(overlay);

  locationInput = document.createElement('input');
  locationInput.type = 'text';
  locationInput.value = 'Sapporo';
  overlay.appendChild(locationInput);

  let searchButton = document.createElement('button');
  searchButton.classList.add('searchButton');
  searchButton.type = 'button';
  searchButton.innerText = 'Go!';
  overlay.appendChild(searchButton);

  searchButton.addEventListener('click', () => {
    Weather.startPollingWeatherData(locationInput.value);
  });
}

function createUnitSelect(parent) {
  let units = document.createElement('div');
  units.classList.add('unitSelect');
  units.innerText = 'Switch units';

  units.addEventListener('click', Weather.switchMeasurementUnits);

  parent.appendChild(units);
  return units;
}

function setBackground(weatherData) {
  let weatherType = Weather.getWeatherType(weatherData).toLowerCase();
  let allBackgrounds = document.querySelectorAll('.background img');
  allBackgrounds.forEach((e) => e.classList.add('invisible'));
  switch (weatherType) {
    case 'clouds':
      backgroundClouds.classList.remove('invisible');
      break;
    case 'rain':
      backgroundRain.classList.remove('invisible');
      break;
    case 'snow':
      backgroundSnow.classList.remove('invisible');
      break;
    default:
      backgroundSun.classList.remove('invisible');
  }
}

function createSwitchingBackground(parent) {
  // Different images for each type of weather - sunny, cloudy, rainy, snowing
  backgroundSun = document.createElement('img');
  backgroundSun.src = sunImg;
  backgroundSun.classList.add('invisible');
  parent.appendChild(backgroundSun);

  backgroundClouds = document.createElement('img');
  backgroundClouds.src = cloudsImg;
  backgroundClouds.classList.add('invisible');
  parent.appendChild(backgroundClouds);

  backgroundRain = document.createElement('img');
  backgroundRain.src = rainImg;
  backgroundRain.classList.add('invisible');
  parent.appendChild(backgroundRain);

  backgroundSnow = document.createElement('img');
  backgroundSnow.src = snowImg;
  backgroundSnow.classList.add('invisible');
  parent.appendChild(backgroundSnow);
}

function fadeOut() {
  overlay.classList.add('invisible');
}

function fadeIn() {
  overlay.classList.remove('invisible');
}

export { createDomElements, fadeIn, fadeOut };
