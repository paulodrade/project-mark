import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherCardComponent } from './weather-card.component';
import { LocationModel, WeatherModel } from '@pm-api/models';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { IconComponent } from '@pm-components';
import { DecimalPipe } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('WeatherCardComponent', () => {
  let component: WeatherCardComponent;
  let fixture: ComponentFixture<WeatherCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCard,
        MatCardContent,
        MatGridList,
        MatGridTile,
        IconComponent,
        DecimalPipe
      ],
      declarations: [WeatherCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherCardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display location name', () => {
    const mockLocation: LocationModel = {
      id: 'joinville',
      name: 'Joinville / SC (Brazil)',
      image: '/assets/places-photos/joinville.jpg',
      coordinates: { lat: -26.304760, lon: -48.845871 }
    };
    component.location = mockLocation;

    fixture.detectChanges();

    const locationNameElement = fixture.debugElement.query(By.css('.location-name'));
    expect(locationNameElement.nativeElement.textContent).toContain(mockLocation.name);
  });

  it('should display weather information', () => {
    const mockWeather: WeatherModel = new WeatherModel({
      dt: 1680105600,
      main: { temp: 25 },
      weather: [{ id: '800', description: 'Sunny' }],
      wind: { speed: 10 }
    });
    component.weather = mockWeather;

    fixture.detectChanges();

    const temperatureElement = fixture.debugElement.query(By.css('.temperature'));
    const descriptionElement = fixture.debugElement.query(By.css('.description'));

    expect(temperatureElement.nativeElement.textContent).toContain('25');
    expect(descriptionElement.nativeElement.textContent).toContain('Sunny');
  });

  it('should render the weather icon', () => {
    const mockWeather: WeatherModel = new WeatherModel({
      dt: 1680105600,
      main: { temp: 25 },
      weather: [{ id: '800', description: 'Sunny' }],
      wind: { speed: 10 }
    });
    component.weather = mockWeather;

    fixture.detectChanges();

    const iconComponent = fixture.debugElement.query(By.directive(IconComponent));
    expect(iconComponent).toBeTruthy();
    expect(iconComponent.componentInstance.icon).toBe(mockWeather.weather.icon);
  });
});