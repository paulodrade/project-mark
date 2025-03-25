import { Injectable } from '@angular/core';
import { LocationModel } from '@pm-api/models';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  
  locations: LocationModel[] = []; // Array to store the list of LocationModel
  
  constructor() {
    // Initializes the locations array with predefined location data
    const locations = [
      {
        id: 'joinville',
        name: 'Joinville / SC (Brazil)', // Name of the location
        image: '/assets/places-photos/joinville.jpg', // Path to the location's image
        coordinates: {
          lat: -26.304760, // Latitude of the location
          lon: -48.845871 // Longitude of the location
        }
      },
      {
        id: 'san-francisco',
        name: 'San Francisco / CA (USA)', // Name of the location
        image: '/assets/places-photos/san-francisco.jpg', // Path to the location's image
        coordinates: {
          lat: 37.780077, // Latitude of the location
          lon: -122.420162 // Longitude of the location
        }
      },
      {
        id: 'urubici',
        name: 'Urubici / SC (Brazil)', // Name of the location
        image: '/assets/places-photos/urubici.jpg', // Path to the location's image
        coordinates: {
          lat: -28.006726, // Latitude of the location
          lon: -49.591561 // Longitude of the location
        }
      }
    ];
    // Maps the raw location data into instances of LocationModel
    this.locations = locations.map(item => new LocationModel(item));
  }
  
  /**
   * Returns the list of all locations.
   * @returns An array of LocationModel instances.
   */
  getLocations(): LocationModel[] {
    return this.locations;
  }
  
  /**
   * Finds and returns a location by its ID.
   * @param id - The ID of the location to find.
   * @returns A LocationModel instance matching the given ID, or undefined if not found.
   */
  getLocationById(id: string): LocationModel {
    return this.locations.filter(item => item.id === id)[0];
  }
  
}