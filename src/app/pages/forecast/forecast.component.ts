import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import {
  LocationModel,
  WeatherModel
} from '@pm-api/models';
import {
  LocationsService,
  WeatherService
} from '@pm-api/services';
import {
  WeatherCardComponent,
  WeatherForecastComponent
} from '@pm-features';
import { RouterHelper } from '@pm-helpers';

@Component({
  selector: 'pm-forecast',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinner,
    WeatherCardComponent,
    WeatherForecastComponent
  ],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss'
})
export class ForecastComponent implements OnInit, OnDestroy {
  
  @ViewChild('weatherContainer') weatherContainer: ElementRef; // Reference to the weather container element in the template
  
  currentLocation: LocationModel; // Stores the current location data
  todayWeather: WeatherModel; // Stores today's weather data
  forecastWeather: WeatherModel[] = []; // Stores the weather forecast data
  
  onRouteChangeSubscription$; // Subscription to listen for route changes
  
  constructor(
    private locationsService: LocationsService,
    private routerHelper: RouterHelper,
    private weatherService: WeatherService,
  ) {
    // Subscribes to route changes and fetches weather data when the location changes
    this.onRouteChangeSubscription$ = this.routerHelper.onRouteChange().subscribe(({ params }) => {
      if (params.location) {
        this.getWeatherByLocation(params.location); // Fetch weather data for the new location
      }
    });
  }
  
  ngOnInit() {
    // Retrieves the current route parameters on initialization
    const { params } = this.routerHelper.getRouteObject();
    
    if (params.location) {
      this.getWeatherByLocation(params.location); // Fetch weather data for the location in the route
    }
  }
  
  ngOnDestroy() {
    // Unsubscribes from the route change listener to prevent memory leaks
    this.onRouteChangeSubscription$.unsubscribe();
  }
  
  /**
   * Fetches weather data for a given location ID.
   * @param locationId - The ID of the location to fetch weather data for.
   */
  getWeatherByLocation(locationId: string) {
    
    // Retrieves the location data by ID
    this.currentLocation = this.locationsService.getLocationById(locationId);
    
    // Fetches today's weather data for the location
    this.weatherService.getTodayWeather(this.currentLocation.coordinates).subscribe(weather => {
      this.todayWeather = weather; // Updates the `todayWeather` property with the fetched data
    });
    
    // Fetches the weather forecast data for the location
    this.weatherService.getForecastWeather(this.currentLocation.coordinates).subscribe(forecast => {
      this.forecastWeather = forecast; // Updates the `forecastWeather` property with the fetched data
    });
  }
}
