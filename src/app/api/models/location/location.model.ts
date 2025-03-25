import { LocationInterface } from './location.interface';

// Class that implements the LocationInterface and represents a location model
export class LocationModel implements LocationInterface {
  
  id; // Unique identifier for the location
  name; // Name of the location (e.g., city or region)
  image; // Path or URL to an image representing the location
  coordinates; // Geographic coordinates of the location (latitude and longitude)
  
  constructor(data) {
    // Initializes the properties of the location model with the provided data
    this.id = data.id;
    this.name = data.name;
    this.image = data.image;
    this.coordinates = data.coordinates;
  }
  
}