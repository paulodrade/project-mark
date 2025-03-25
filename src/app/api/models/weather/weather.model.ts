import {
  InfoWeatherInterface,
  MainWeatherInterface,
  WeatherInterface,
  WindWeatherInterface
} from './weather.interface';

// Mapping of weather condition codes to corresponding icon classes
const WeatherIcons = {
  '200': 'wi-thunderstorm',
  '201': 'wi-thunderstorm',
  '202': 'wi-thunderstorm',
  '210': 'wi-lightning',
  '211': 'wi-lightning',
  '212': 'wi-lightning',
  '221': 'wi-lightning',
  '230': 'wi-storm-showers',
  '231': 'wi-storm-showers',
  '232': 'wi-storm-showers',
  '300': 'wi-sprinkle',
  '301': 'wi-sprinkle',
  '302': 'wi-sprinkle',
  '310': 'wi-rain-mix',
  '311': 'wi-rain',
  '312': 'wi-rain',
  '313': 'wi-showers',
  '314': 'wi-rain',
  '321': 'wi-sprinkle',
  '500': 'wi-sprinkle',
  '501': 'wi-rain',
  '502': 'wi-rain',
  '503': 'wi-rain',
  '504': 'wi-rain',
  '511': 'wi-rain-mix',
  '520': 'wi-showers',
  '521': 'wi-showers',
  '522': 'wi-showers',
  '531': 'wi-storm-showers',
  '600': 'wi-snow',
  '601': 'wi-snow',
  '602': 'wi-sleet',
  '611': 'wi-rain-mix',
  '612': 'wi-rain-mix',
  '615': 'wi-rain-mix',
  '616': 'wi-rain-mix',
  '620': 'wi-rain-mix',
  '621': 'wi-snow',
  '622': 'wi-snow',
  '701': 'wi-showers',
  '711': 'wi-smoke',
  '721': 'wi-day-haze',
  '731': 'wi-dust',
  '741': 'wi-fog',
  '751': 'wi-sandstorm',
  '761': 'wi-dust',
  '762': 'wi-volcano',
  '771': 'wi-strong-wind',
  '781': 'wi-tornado',
  '800': 'wi-day-sunny',
  '801': 'wi-cloudy-gusts',
  '802': 'wi-cloudy-gusts',
  '803': 'wi-cloudy-gusts',
  '804': 'wi-cloudy',
  '900': 'wi-tornado',
  '901': 'wi-storm-showers',
  '902': 'wi-hurricane',
  '903': 'wi-snowflake-cold',
  '904': 'wi-hot',
  '905': 'wi-windy',
  '906': 'wi-hail',
  '951': 'wi-day-sunny',
  '952': 'wi-cloudy-gusts',
  '953': 'wi-cloudy-gusts',
  '954': 'wi-cloudy-gusts',
  '955': 'wi-cloudy-gusts',
  '956': 'wi-cloudy-gusts',
  '957': 'wi-cloudy-gusts',
  '958': 'wi-cloudy-gusts',
  '959': 'wi-cloudy-gusts',
  '960': 'wi-thunderstorm',
  '961': 'wi-thunderstorm',
  '962': 'wi-cloudy-gusts',
};

// Class representing a weather model, implementing the WeatherInterface
export class WeatherModel implements WeatherInterface {
  
  timestamp: Date; // The timestamp of the weather data
  main: MainWeatherInterface; // Main weather data (e.g., temperature, pressure)
  weather: InfoWeatherInterface; // Detailed weather information (e.g., description, icon)
  wind: WindWeatherInterface; // Wind data (e.g., speed, direction)
  
  constructor(data) {
    // Converts the timestamp from seconds to a JavaScript Date object
    this.timestamp = new Date(data.dt * 1000);
    
    // Assigns the main weather data
    this.main = data.main;
    
    // Assigns the first weather condition from the array
    this.weather = data.weather[0];
    
    // Assigns the wind data
    this.wind = data.wind;
    
    // Maps the weather condition ID to the corresponding icon class
    this.weather.icon = WeatherIcons[this.weather.id];
  }
}