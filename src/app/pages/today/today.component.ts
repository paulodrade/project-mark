import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  LocationInterface,
  LocationsService,
  WeatherService
} from '@mp-api/services';
import { RouterHelper } from '@mp-helpers';

@Component({
  selector: 'pm-today',
  imports: [],
  templateUrl: './today.component.html',
  styleUrl: './today.component.scss'
})
export class TodayComponent implements OnInit, OnDestroy {
  
  currentLocation: LocationInterface;
  currentWeatherLocation = null;
  
  onRouteChangeSubscription;
  
  constructor(
    private locationsService: LocationsService,
    private routerHelper: RouterHelper,
    private weatherService: WeatherService,
  ) {
    
    this.routerHelper.onRouteChange().subscribe(({ params }) => {
      console.log('today.component->constructor(): params', params);
    });
  }
  
  ngOnInit() {
    const { params } = this.routerHelper.getRouteObject();
    console.log('today.component->ngOnInit(): params', params);
    
    if (params.location) {
      this.getTodayWeatherByLocation(params.location);
    }
  }
  
  ngOnDestroy() {
    this.onRouteChangeSubscription.unsubscribe();
  }
  
  getTodayWeatherByLocation(locationId: string) {
    this.currentLocation = this.locationsService.getLocationById(locationId);
    console.log('today.component->getTodayWeatherByLocation(): this.currentLocation', this.currentLocation);
    
    this.weatherService.getTodayWeather(this.currentLocation.coordinates).subscribe(weather => {
      console.log('today.component->getTodayWeatherByLocation(): weather', weather);
    });
    
  }
}
