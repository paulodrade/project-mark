import { Component } from '@angular/core';
import {
  MatListItem,
  MatNavList
} from '@angular/material/list';
import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';
import { LocationModel } from '@pm-api/models';
import { LocationsService } from '@pm-api/services';

@Component({
  selector: 'pm-location-list',
  standalone: true,
  imports: [
    MatListItem,
    RouterLink,
    MatNavList,
    RouterLinkActive,
  ],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.scss'
})
export class LocationListComponent {
  
  locations: LocationModel[] = []; // Array to store the list of LocationModel
  
  constructor(private locationService: LocationsService) {
    // Fetches the list of locations from the LocationsService and assigns it to the `locations` array
    this.locations = this.locationService.getLocations();
  }
}