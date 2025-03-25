import {
  DatePipe,
  DecimalPipe
} from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  MatList,
  MatListItem,
  MatListItemLine
} from '@angular/material/list';
import { WeatherModel } from '@pm-api/models';
import { IconComponent } from '@pm-components';

@Component({
  selector: 'pm-weather-forecast',
  standalone: true,
  imports: [
    MatList,
    MatListItem,
    MatListItemLine,
    DatePipe,
    DecimalPipe,
    IconComponent,
  ],
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.scss' 
})
export class WeatherForecastComponent implements OnChanges {
  
  @Input() forecast: WeatherModel[]; // Input property to receive the weather forecast data
  @Input() hideToday = false; // Input property to determine whether to hide today's forecast
  
  // Array to group weather data by day
  listWeatherByDay: Array<{ timestamp?: Date, list?: WeatherModel[] }> = [];
  
  /**
   * Lifecycle hook that is triggered when input properties change.
   * Groups the forecast data by day and optionally excludes today's data.
   * @param changes - Object containing the changes to input properties.
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['forecast'] && changes['forecast'].currentValue && changes['forecast'].currentValue.length) {
      
      this.listWeatherByDay = []; // Reset the grouped weather data
      
      const forecast = changes['forecast'].currentValue; // Get the updated forecast data
      
      let currentList: { timestamp?: Date, list?: WeatherModel[] } = {}; // Temporary object to group data by day
      let lastDay = null; // Tracks the last processed day
      
      for (let item of forecast) {
        
        // Check if today's data should be excluded
        if (!this.hideToday || (this.hideToday && new Date().setHours(0, 0, 0, 0) !== new Date(item.timestamp).setHours(0, 0, 0, 0))) {
          
          // If the day changes, create a new group
          if (lastDay !== item.timestamp.getDate()) {
            currentList = {
              timestamp: item.timestamp, // Set the timestamp for the group
              list: [] // Initialize the list for the group
            };
            this.listWeatherByDay.push(currentList); // Add the group to the array
          }
          
          // Add the current item to the group
          if (currentList.list) {
            currentList.list.push(item);
          }
          
          lastDay = item.timestamp.getDate(); // Update the last processed day
        }
      }
      
      // Log the grouped weather data for debugging purposes
      console.log('weather-forecast.component->ngOnChanges(): this.listWeatherByDay', this.listWeatherByDay);
    }
  }
}