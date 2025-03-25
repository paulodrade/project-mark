import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesComponent } from './pages.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LocationsService } from '@pm-api/services';
import { RouterHelper, RouterObjectInterface } from '@pm-helpers';
import { LocationListComponent } from '@pm-features';
import { of, Subscription } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PagesComponent', () => {
  let component: PagesComponent;
  let fixture: ComponentFixture<PagesComponent>;
  let locationsServiceSpy: jasmine.SpyObj<LocationsService>;
  let routerHelperSpy: jasmine.SpyObj<RouterHelper>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const locationsServiceMock = jasmine.createSpyObj('LocationsService', ['getLocations']);
    const routerHelperMock = jasmine.createSpyObj('RouterHelper', ['onRouteChange']);
    const matDialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [PagesComponent],
      providers: [
        { provide: LocationsService, useValue: locationsServiceMock },
        { provide: RouterHelper, useValue: routerHelperMock },
        { provide: MatDialog, useValue: matDialogMock },
      ],
      schemas: [NO_ERRORS_SCHEMA], // Ignore template errors for simplicity
    }).compileComponents();

    fixture = TestBed.createComponent(PagesComponent);
    component = fixture.componentInstance;

    locationsServiceSpy = TestBed.inject(LocationsService) as jasmine.SpyObj<LocationsService>;
    routerHelperSpy = TestBed.inject(RouterHelper) as jasmine.SpyObj<RouterHelper>;
    matDialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  afterEach(() => {
    component.ngOnDestroy(); // Ensure cleanup
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize listLocations with data from LocationsService', () => {
    const mockLocations = [{ id: '1', name: 'Location 1' }] as any;
    locationsServiceSpy.getLocations.and.returnValue(mockLocations);

    component = fixture.componentInstance;
    expect(component.listLocations).toEqual(mockLocations);
    expect(locationsServiceSpy.getLocations).toHaveBeenCalled();
  });

  it('should open LocationListComponent dialog if currentLocationId is not set', () => {
    const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogSpy.open.and.returnValue(mockDialogRef);

    routerHelperSpy.onRouteChange.and.returnValue(
      of(<RouterObjectInterface>{ url: '/some-url', params: {} })
    );

    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(matDialogSpy.open).toHaveBeenCalledWith(LocationListComponent, {
      disableClose: true,
    });
  });

  it('should close the dialog if currentLocationId is set', () => {
    const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogSpy.open.and.returnValue(mockDialogRef);

    routerHelperSpy.onRouteChange.and.returnValue(
      of(<RouterObjectInterface>{ url: '/some-url', params: { location: '123' } })
    );

    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should update isDesktop on window resize', () => {
    // @ts-ignore
    spyOn(window, 'innerWidth').and.returnValue(1024);
    component.onResizeWindow();
    expect(component.isDesktop).toBeTrue();

    // @ts-ignore
    spyOn(window, 'innerWidth').and.returnValue(500);
    component.onResizeWindow();
    expect(component.isDesktop).toBeFalse();
  });

  it('should clean up subscriptions and event listeners on destroy', () => {
    spyOn(window, 'removeEventListener');
    component.onRouteChangeSubscription = new Subscription();
    spyOn(component.onRouteChangeSubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(window.removeEventListener).toHaveBeenCalledWith(
      'resize',
      component.onResizeWindow
    );
    expect(component.onRouteChangeSubscription.unsubscribe).toHaveBeenCalled();
  });
});