import { subscribe } from '../modules/pubsub';
import * as Weather from '../modules/weatherData';

import sunImg from '../img/backgrounds/sunny.jpg';
import cloudsImg from '../img/backgrounds/clouds.jpg';
import rainImg from '../img/backgrounds/rain.jpg';
import snowImg from '../img/backgrounds/snow.jpg';

import searchIconSrc from '../img/icons/search.svg';
import temperatureIconSrc from '../img/icons/thermometer.svg';

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

subscribe('onWeatherDataResponse', refreshDom);
subscribe('onWeatherDataError', showError);

function showError(error) {
  clearInfo();
  locationName.innerText = 'Location not found';
}

function clearInfo() {
  document.querySelectorAll('.weatherInfo').forEach((e) => (e.innerText = ''));
}

// Updates information in existing elements
function refreshDom(weatherData) {
  setBackground(weatherData);

  locationName.innerText = Weather.getLocationName(weatherData);
  locationTime.innerText = Weather.getLocationTime(weatherData);
  weatherDescription.innerText = Weather.getDescription(weatherData);

  avgTemp.innerText = Weather.getAvgTemp(weatherData);

  windSpeed.innerText = 'Wind: ' + Weather.getWindSpeed(weatherData);
}

// Creates elements on page load
function createDomElements(parent) {
  createSearchBar(parent);
  let contentContainer = createElement(parent, 'div', '', ['contentContainer']);

  background = createSwitchingBackground(contentContainer);

  overlay = createElement(contentContainer, 'div', '', ['overlay']);

  let main = createElement(overlay, 'div', '', ['mainInfo']);
  locationName = createElement(main, 'div', '', [
    'weatherInfo',
    'locationName',
  ]);
  locationTime = createElement(main, 'div', '', [
    'weatherInfo',
    'locationTime',
  ]);
  weatherDescription = createElement(main, 'div', '', [
    'weatherInfo',
    'weatherDescription',
  ]);
  avgTemp = createElement(main, 'div', '', ['weatherInfo', 'avgTemp']);
  windSpeed = createElement(main, 'div', '', ['weatherInfo', 'windSpeed']);
}

function createElement(parent, elementType, innerText, classList) {
  let element = document.createElement(elementType);
  classList.forEach((e) => element.classList.add(e));
  element.innerText = innerText;
  parent.appendChild(element);
  return element;
}

function createSearchBar(parent) {
  let form = document.createElement('form');
  parent.appendChild(form);

  let searchBar = createElement(form, 'div', '', ['searchBar']);

  let searchInputBackground = createElement(searchBar, 'div', '', [
    'searchInputBackground',
  ]);

  let locationSearchInputField = createElement(
    searchInputBackground,
    'input',
    '',
    ['locationSearchInput']
  );
  locationSearchInputField.type = 'text';
  locationSearchInputField.placeholder = 'Search for a location...';

  form.addEventListener('submit', search);

  let unitsIcon = document.createElement('img');
  unitsIcon.classList.add('unitChangeIcon');
  unitsIcon.src = temperatureIconSrc;
  searchInputBackground.appendChild(unitsIcon);

  unitsIcon.addEventListener('click', Weather.switchMeasurementUnits);

  let searchIcon = document.createElement('img');
  searchIcon.classList.add('locationSearchInputIcon');
  searchIcon.src = searchIconSrc;
  searchInputBackground.appendChild(searchIcon);

  searchIcon.addEventListener('click', search);

  function search(e) {
    e.preventDefault();
    Weather.startPollingWeatherData(locationSearchInputField.value);
  }

  return searchBar;
}

function setBackground(weatherData) {
  let weatherType = Weather.getWeatherType(weatherData).toLowerCase();
  let allBackgrounds = document.querySelectorAll('.backgroundContainer img');
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
  let backgroundContainer = createElement(parent, 'div', '', [
    'backgroundContainer',
  ]);
  // Different images for each type of weather - sunny, cloudy, rainy, snowing
  backgroundSun = document.createElement('img');
  backgroundSun.src = sunImg;
  backgroundSun.classList.add('invisible');
  backgroundContainer.appendChild(backgroundSun);

  backgroundClouds = document.createElement('img');
  backgroundClouds.src = cloudsImg;
  backgroundClouds.classList.add('invisible');
  backgroundContainer.appendChild(backgroundClouds);

  backgroundRain = document.createElement('img');
  backgroundRain.src = rainImg;
  backgroundRain.classList.add('invisible');
  backgroundContainer.appendChild(backgroundRain);

  backgroundSnow = document.createElement('img');
  backgroundSnow.src = snowImg;
  backgroundSnow.classList.add('invisible');
  backgroundContainer.appendChild(backgroundSnow);

  return backgroundContainer;
}

function fadeOut() {
  overlay.classList.add('invisible');
}

function fadeIn() {
  overlay.classList.remove('invisible');
}

export { createDomElements, fadeIn, fadeOut };
