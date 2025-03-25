import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { ResourcesHelper } from '@pm-helpers';
import { WeatherModel } from '@pm-api/models';
import { of } from 'rxjs';

describe('WeatherService', () => {
  let service: WeatherService;
  let resourcesHelperSpy: jasmine.SpyObj<ResourcesHelper>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ResourcesHelper', ['get']);

    TestBed.configureTestingModule({
      providers: [
        WeatherService,
        { provide: ResourcesHelper, useValue: spy }
      ]
    });

    service = TestBed.inject(WeatherService);
    resourcesHelperSpy = TestBed.inject(ResourcesHelper) as jasmine.SpyObj<ResourcesHelper>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTodayWeather', () => {
    it('should fetch today\'s weather and return a WeatherModel', (done) => {
      const mockResponse = { temp: 25, description: 'Sunny' };
      resourcesHelperSpy.get.and.returnValue(of(mockResponse));

      service.getTodayWeather({ lat: 51.5074, lon: -0.1278 }).subscribe((weather) => {
        expect(weather).toEqual(new WeatherModel(mockResponse));
        done();
      });

      expect(resourcesHelperSpy.get).toHaveBeenCalledWith({
        api: 'openweather',
        path: 'weather',
        params: { lat: 51.5074, lon: -0.1278 },
        cache: false
      });
    });
  });

  describe('getForecastWeather', () => {
    it('should fetch forecast weather and return an array of WeatherModel', (done) => {
      const mockResponse = {
        list: [
          { temp: 20, description: 'Cloudy' },
          { temp: 22, description: 'Partly Cloudy' }
        ]
      };
      resourcesHelperSpy.get.and.returnValue(of(mockResponse));

      service.getForecastWeather({ lat: 51.5074, lon: -0.1278 }).subscribe((forecast) => {
        expect(forecast).toEqual(mockResponse.list.map(item => new WeatherModel(item)));
        done();
      });

      expect(resourcesHelperSpy.get).toHaveBeenCalledWith({
        api: 'openweather',
        path: 'forecast',
        params: { lat: 51.5074, lon: -0.1278 }
      });
    });
  });
});
