// Interface representing the main weather data (e.g., temperature, pressure, humidity)
export interface MainWeatherInterface {
  feels_like: number; // Perceived temperature
  grnd_level: number; // Atmospheric pressure at ground level (hPa)
  humidity: number; // Humidity percentage
  pressure: number; // Atmospheric pressure at sea level (hPa)
  sea_level: number; // Atmospheric pressure at sea level (hPa)
  temp: number; // Current temperature
  temp_max: number; // Maximum temperature
  temp_min: number; // Minimum temperature
}

// Interface representing detailed weather information (e.g., description, icon, ID)
export interface InfoWeatherInterface {
  description: string; // Weather condition description (e.g., "clear sky")
  icon: string; // Icon code representing the weather condition
  id: string; // Weather condition ID
  main: string; // Group of weather parameters (e.g., "Rain", "Clear")
}

// Interface representing wind data
export interface WindWeatherInterface {
  deg: number; // Wind direction in degrees
  speed: number; // Wind speed
}

// Interface representing the overall weather data structure
export interface WeatherInterface {
  timestamp?: Date; // Timestamp of the weather data
  main?: MainWeatherInterface; // Main weather data
  weather?: InfoWeatherInterface; // Detailed weather information
  wind?: WindWeatherInterface; // Wind data
}