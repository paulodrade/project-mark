import { TestBed } from '@angular/core/testing';
import { LocationsService } from './locations.service';
import { LocationModel } from '@pm-api/models';

describe('LocationsService', () => {
  let service: LocationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationsService]
    });
    service = TestBed.inject(LocationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getLocations', () => {
    it('should return the list of locations', () => {
      const locations = service.getLocations();
      expect(locations.length).toBe(3);
      expect(locations[0]).toEqual(jasmine.any(LocationModel));
      expect(locations[0].id).toBe('joinville');
      expect(locations[1].id).toBe('san-francisco');
      expect(locations[2].id).toBe('urubici');
    });
  });

  describe('getLocationById', () => {
    it('should return the correct location by ID', () => {
      const location = service.getLocationById('san-francisco');
      expect(location).toBeTruthy();
      expect(location.id).toBe('san-francisco');
      expect(location.name).toBe('San Francisco / CA (USA)');
    });

    it('should return undefined if the location ID does not exist', () => {
      const location = service.getLocationById('non-existent-id');
      expect(location).toBeUndefined();
    });
  });
});