import { Injectable } from '@angular/core';
import { WeatherModel } from '@pm-api/models';
import { ResourcesHelper } from '@pm-helpers';
import {
  interval,
  map,
  mergeMap,
  Observable,
  startWith
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  constructor(
    private resourcesHelper: ResourcesHelper // Helper to handle API requests and caching
  ) { }
  
  /**
   * Fetches the current weather data for a given location at regular intervals.
   * @param params - Object containing latitude and longitude of the location.
   * @param intervalInMinutes - Interval in minutes to fetch the data (default is 10 minutes).
   * @returns An observable emitting the current weather data as a WeatherModel.
   */
  getTodayWeather(params: { lat: number, lon: number }, intervalInMinutes = 10): Observable<WeatherModel> {
    return interval(intervalInMinutes * 60000).pipe( // Emits values at the specified interval
      startWith(0), // Starts immediately without waiting for the first interval
      mergeMap(() =>
        this.resourcesHelper.get({ // Makes an API request using the ResourcesHelper
          api: 'openweather', // Specifies the API to use
          path: 'weather', // Endpoint for current weather data
          params, // Location parameters (latitude and longitude)
          cache: false // Disables caching for real-time data
        }).pipe(
          map(response => new WeatherModel(response)) // Maps the API response to a WeatherModel instance
        )
      )
    );
  }
  
  /**
   * Fetches the weather forecast data for a given location.
   * @param params - Object containing latitude and longitude of the location.
   * @returns An observable emitting an array of WeatherModel instances representing the forecast data.
   */
  getForecastWeather(params: { lat: number, lon: number }): Observable<WeatherModel[]> {
    return this.resourcesHelper.get({ // Makes an API request using the ResourcesHelper
      api: 'openweather', // Specifies the API to use
      path: 'forecast', // Endpoint for weather forecast data
      params // Location parameters (latitude and longitude)
    }).pipe(
      map((response) => 
        response.list.map(item => new WeatherModel(item)) // Maps each forecast item to a WeatherModel instance
      )
    );
  }
  
}