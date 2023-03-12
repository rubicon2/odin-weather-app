import { publish } from './pubsub';

const apiKey = '0fac7d4b4e17c4f5be1a76d39bd58f27';
// Can be metric or imperial. If set to anything else, api will give kelvins
let locationName = 'London';
let measurementUnits = 'metric';

function setMeasurementUnits(units) {
  measurementUnits = units;
  getWeatherData(locationName, measurementUnits);
}

function getLocationName(weatherData) {
  return weatherData.name;
}

function getDescription(weatherData) {
  return weatherData.weather[0].main;
}

function getAvgTemp(weatherData) {
  return weatherData.main.temp;
}

function getMinTemp(weatherData) {
  return weatherData.main.temp_min;
}

function getMaxTemp(weatherData) {
  return weatherData.main.temp_max;
}

function getWindSpeed(weatherData) {
  return weatherData.wind.speed;
}

function getHumidity(weatherData) {
  return weatherData.main.humidity;
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
  setMeasurementUnits,
  getLocationName,
  getDescription,
  getAvgTemp,
  getMinTemp,
  getMaxTemp,
  getWindSpeed,
  getHumidity,
  getWeatherData,
};
