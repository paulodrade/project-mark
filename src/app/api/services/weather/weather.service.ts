import { Injectable } from '@angular/core';
import { ResourcesHelper } from '@mp-helpers';
import {
  Observable,
  Observer
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  constructor(
    private resourcesHelper: ResourcesHelper
  ) { }
  
  getTodayWeather(params) {
    
    return new Observable((observer: Observer<any>) => {
      this.resourcesHelper.get({
        api: 'openweather',
        path: 'weather',
        params
      }).subscribe({
        next: (response => {
          observer.next(response);
        }),
        error: (error => {
          observer.error(error);
        })
      });
    });
    
  }
  
  getForecastWeather(params) {
    return new Observable((observer: Observer<any>) => {
      this.resourcesHelper.get({
        api: 'openweather',
        path: 'forecast',
        params
      }).subscribe({
        next: (response => {
          observer.next(response);
        }),
        error: (error => {
          observer.error(error);
        })
      });
    });
    
  }
  
}
