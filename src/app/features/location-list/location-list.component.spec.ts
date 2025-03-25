import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LocationListComponent } from './location-list.component';
import { LocationsService } from '@pm-api/services';
import { LocationModel } from '@pm-api/models';
import { MatListItem, MatNavList } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { of } from 'rxjs';

describe('LocationListComponent', () => {
  let component: LocationListComponent;
  let fixture: ComponentFixture<LocationListComponent>;
  let locationsServiceSpy: jasmine.SpyObj<LocationsService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('LocationsService', ['getLocations']);

    await TestBed.configureTestingModule({
      imports: [
        MatListItem,
        MatNavList,
        RouterLink,
        RouterLinkActive,
      ],
      declarations: [LocationListComponent],
      providers: [
        { provide: LocationsService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationListComponent);
    component = fixture.componentInstance;
    locationsServiceSpy = TestBed.inject(LocationsService) as jasmine.SpyObj<LocationsService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch locations on initialization', () => {
    const mockLocations: LocationModel[] = [
      { id: 1, name: 'Location 1' },
      { id: 2, name: 'Location 2' }
    ].map(item => new LocationModel(item));
    locationsServiceSpy.getLocations.and.returnValue(mockLocations);

    fixture.detectChanges(); // Triggers ngOnInit

    expect(component.locations).toEqual(mockLocations);
    expect(locationsServiceSpy.getLocations).toHaveBeenCalled();
  });

  it('should render the list of locations', () => {
    const mockLocations: LocationModel[] = [
      { id: 1, name: 'Location 1' },
      { id: 2, name: 'Location 2' }
    ].map(item => new LocationModel(item));
    locationsServiceSpy.getLocations.and.returnValue(mockLocations);

    fixture.detectChanges(); // Triggers ngOnInit and updates the template

    const compiled = fixture.nativeElement as HTMLElement;
    const listItems = compiled.querySelectorAll('mat-list-item');

    expect(listItems.length).toBe(mockLocations.length);
    expect(listItems[0].textContent).toContain('Location 1');
    expect(listItems[1].textContent).toContain('Location 2');
  });
});