import { Injectable } from '@angular/core';

import { LocationInterface } from './location.interface';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  
  locations: LocationInterface[] = [
    {
      id: 'joinville',
      name: 'Joinville / SC (Brazil)',
      image: '/assets/images/places-photos/joinville.jpg',
      coordinates: {
        lat: -26.304760,
        lon: -48.845871
      }
    },
    {
      id: 'san-francisco',
      name: 'San Francisco / CA (USA)',
      image: '/assets/images/places-photos/san-francisco.jpg',
      coordinates: {
        lat: 37.780077,
        lon: -122.420162
      }
    },
    {
      id: 'urubici',
      name: 'Urubici / SC (Brazil)',
      image: '/assets/images/places-photos/urubici.jpg',
      coordinates: {
        lat: -28.006726,
        lon: -49.591561
      }
    }
  ];
  
  constructor() { }
  
  getLocations(): LocationInterface[] {
    return this.locations;
  }
  
  getLocationById(id: string): LocationInterface {
    return this.locations.filter(item => item.id === id)[0];
  }
  
}
