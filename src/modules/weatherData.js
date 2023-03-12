import { publish } from './pubsub';

const apiKey = '0fac7d4b4e17c4f5be1a76d39bd58f27';
// Can be metric or imperial. If set to anything else, api will give kelvins
let locationName = 'London';
let measurementUnits = 'metric';
let temperatureUnit = 'C';
let speedUnit = 'metres per second';

function switchMeasurementUnits() {
  measurementUnits = measurementUnits !== 'metric' ? 'metric' : 'imperial';
  if (measurementUnits === 'imperial') {
    temperatureUnit = 'F';
    speedUnit = 'miles per hour';
  } else if (measurementUnits === 'metric') {
    temperatureUnit = 'C';
    speedUnit = 'metres per second';
  }
  getWeatherData(locationName);
}

function getLocationName(weatherData) {
  return weatherData.name;
}

function getLocationTime(weatherData) {
  let nowInMillis = new Date().getTime() + weatherData.timezone * 1000;
  return new Date(nowInMillis).toLocaleTimeString('en-GB', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

function getDescription(weatherData) {
  return weatherData.weather[0].main;
}

function getAvgTemp(weatherData) {
  return `${weatherData.main.temp}${temperatureUnit}`;
}

function getMinTemp(weatherData) {
  return `${weatherData.main.temp_min}${temperatureUnit}`;
}

function getMaxTemp(weatherData) {
  return `${weatherData.main.temp_max}${temperatureUnit}`;
}

function getWindSpeed(weatherData) {
  return `${weatherData.wind.speed} ${speedUnit}`;
}

function getHumidity(weatherData) {
  return `${weatherData.main.humidity}%`;
}

async function getWeatherData(location) {
  locationName = location;
  try {
    publish('onWeatherDataFetch');
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}&units=${measurementUnits}`,
      { mode: 'cors' }
    );
    const weatherData = await response.json();
    publish('onWeatherDataResponse', weatherData);
  } catch (error) {
    console.error(error);
    publish('onWeatherDataError', error);
  }
}

export {
  switchMeasurementUnits,
  getLocationName,
  getLocationTime,
  getDescription,
  getAvgTemp,
  getMinTemp,
  getMaxTemp,
  getWindSpeed,
  getHumidity,
  getWeatherData,
};
