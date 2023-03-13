import './style.css';
import { startPollingWeatherData } from './modules/weatherData';
import { createDomElements } from './dom/weatherDom';

const body = document.querySelector('body');

createDomElements(body);
startPollingWeatherData('Alaska');
