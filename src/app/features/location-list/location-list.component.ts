import { Component } from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {
  MatList,
  MatListItem
} from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { LocationsService } from '@mp-api/services';
import { LocationInterface } from '@mp-api/services';

@Component({
  selector: 'pm-location-list',
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatList,
    MatListItem,
    RouterLink,
  ],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.scss'
})
export class LocationListComponent {
  
  locations: LocationInterface[] = [];
  
  constructor(private locationService: LocationsService) {
    this.locations = this.locationService.getLocations();
  }
}
