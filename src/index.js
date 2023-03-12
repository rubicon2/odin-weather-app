import './style.css';
import { getWeatherData } from './modules/weatherData';
import { createDomElements } from './dom/weatherDom';

const body = document.querySelector('body');

createDomElements(body);
getWeatherData('Alaska');
