import { DecimalPipe } from '@angular/common';
import {
  Component,
  Input
} from '@angular/core';
import {
  MatCard,
  MatCardContent
} from '@angular/material/card';
import {
  MatGridList,
  MatGridTile
} from '@angular/material/grid-list';
import {
  LocationModel,
  WeatherModel
} from '@pm-api/models';
import { IconComponent } from '@pm-components';

@Component({
  standalone: true,
  selector: 'pm-weather-card',
  imports: [
    DecimalPipe, 
    MatCard,
    MatCardContent,
    MatGridList,
    MatGridTile,
    IconComponent,
  ],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss'
})
export class WeatherCardComponent {
  @Input() location: LocationModel; // Input property to receive location data
  @Input() weather: WeatherModel; // Input property to receive weather data
}