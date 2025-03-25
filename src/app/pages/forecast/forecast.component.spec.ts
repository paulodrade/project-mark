import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForecastComponent } from './forecast.component';
import { LocationsService, WeatherService } from '@pm-api/services';
import { RouterHelper, RouterObjectInterface } from '@pm-helpers';
import { WeatherCardComponent, WeatherForecastComponent } from '@pm-features';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { LocationModel, WeatherModel } from '@pm-api/models';

describe('ForecastComponent', () => {
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;
  let locationsServiceSpy: jasmine.SpyObj<LocationsService>;
  let weatherServiceSpy: jasmine.SpyObj<WeatherService>;
  let routerHelperSpy: jasmine.SpyObj<RouterHelper>;

  beforeEach(async () => {
    const locationsServiceMock = jasmine.createSpyObj('LocationsService', ['getLocationById']);
    const weatherServiceMock = jasmine.createSpyObj('WeatherService', ['getTodayWeather', 'getForecastWeather']);
    const routerHelperMock = jasmine.createSpyObj('RouterHelper', ['onRouteChange', 'getRouteObject']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatProgressSpinner,
        WeatherCardComponent,
        WeatherForecastComponent,
      ],
      declarations: [ForecastComponent],
      providers: [
        { provide: LocationsService, useValue: locationsServiceMock },
        { provide: WeatherService, useValue: weatherServiceMock },
        { provide: RouterHelper, useValue: routerHelperMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ForecastComponent);
    component = fixture.componentInstance;

    locationsServiceSpy = TestBed.inject(LocationsService) as jasmine.SpyObj<LocationsService>;
    weatherServiceSpy = TestBed.inject(WeatherService) as jasmine.SpyObj<WeatherService>;
    routerHelperSpy = TestBed.inject(RouterHelper) as jasmine.SpyObj<RouterHelper>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch weather data on route change', () => {
    const mockLocation: LocationModel = new LocationModel({
      id: 'test-location',
      name: 'Test Location',
      coordinates: { lat: 10, lon: 20 },
    });
    const mockTodayWeather: WeatherModel = new WeatherModel({
      dt: 1680105600,
      main: { temp: 25 },
      weather: [{ id: '800', description: 'Sunny' }],
      wind: { speed: 10 },
    });
    const mockForecastWeather: WeatherModel[] = [
      new WeatherModel({
        dt: 1680105600,
        main: { temp: 20 },
        weather: [{ id: '801', description: 'Partly Cloudy' }],
        wind: { speed: 8 },
      }),
    ];

    locationsServiceSpy.getLocationById.and.returnValue(mockLocation);
    weatherServiceSpy.getTodayWeather.and.returnValue(of(mockTodayWeather));
    weatherServiceSpy.getForecastWeather.and.returnValue(of(mockForecastWeather));
    routerHelperSpy.onRouteChange.and.returnValue(
      of(<RouterObjectInterface>{ params: { location: 'test-location' } })
    );

    fixture.detectChanges();

    expect(locationsServiceSpy.getLocationById).toHaveBeenCalledWith('test-location');
    expect(weatherServiceSpy.getTodayWeather).toHaveBeenCalledWith(mockLocation.coordinates);
    expect(weatherServiceSpy.getForecastWeather).toHaveBeenCalledWith(mockLocation.coordinates);
    expect(component.todayWeather).toEqual(mockTodayWeather);
    expect(component.forecastWeather).toEqual(mockForecastWeather);
  });

  it('should fetch weather data on initialization', () => {
    const mockLocation: LocationModel = new LocationModel({
      id: 'test-location',
      name: 'Test Location',
      coordinates: { lat: 10, lon: 20 },
    });
    const mockTodayWeather: WeatherModel = new WeatherModel({
      dt: 1680105600,
      main: { temp: 25 },
      weather: [{ id: '800', description: 'Sunny' }],
      wind: { speed: 10 },
    });
    const mockForecastWeather: WeatherModel[] = [
      new WeatherModel({
        dt: 1680105600,
        main: { temp: 20 },
        weather: [{ id: '801', description: 'Partly Cloudy' }],
        wind: { speed: 8 },
      }),
    ];

    locationsServiceSpy.getLocationById.and.returnValue(mockLocation);
    weatherServiceSpy.getTodayWeather.and.returnValue(of(mockTodayWeather));
    weatherServiceSpy.getForecastWeather.and.returnValue(of(mockForecastWeather));
    routerHelperSpy.getRouteObject.and.returnValue(<RouterObjectInterface>{
      params: { location: 'test-location' },
    });

    component.ngOnInit();

    expect(locationsServiceSpy.getLocationById).toHaveBeenCalledWith('test-location');
    expect(weatherServiceSpy.getTodayWeather).toHaveBeenCalledWith(mockLocation.coordinates);
    expect(weatherServiceSpy.getForecastWeather).toHaveBeenCalledWith(mockLocation.coordinates);
    expect(component.todayWeather).toEqual(mockTodayWeather);
    expect(component.forecastWeather).toEqual(mockForecastWeather);
  });

  it('should unsubscribe from route changes on destroy', () => {
    const unsubscribeSpy = spyOn(component.onRouteChangeSubscription$, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});