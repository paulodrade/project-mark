// Interface that defines the structure of a location object
export interface LocationInterface {
  id: string; // Unique identifier for the location
  name: string; // Name of the location (e.g., city or region)
  image: string; // Path or URL to an image representing the location
  coordinates: { // Geographic coordinates of the location
    lat: number; // Latitude of the location
    lon: number; // Longitude of the location
  }
}