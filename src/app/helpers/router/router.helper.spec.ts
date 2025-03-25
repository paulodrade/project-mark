import { TestBed } from '@angular/core/testing';
import { RouterHelper } from './router.helper';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { of, Subject } from 'rxjs';

describe('RouterHelper', () => {
  let service: RouterHelper;
  let routerMock: any;
  let activatedRouteMock: any;
  let routerEventsSubject: Subject<any>;

  beforeEach(() => {
    routerEventsSubject = new Subject();

    routerMock = {
      url: '/test-route',
      events: routerEventsSubject.asObservable()
    };

    activatedRouteMock = {
      root: {
        snapshot: {
          params: { id: '123' },
          queryParams: { search: 'test' },
          data: { title: 'Test Title' },
          fragment: 'section1'
        },
        firstChild: null
      }
    };

    TestBed.configureTestingModule({
      providers: [
        RouterHelper,
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    });

    service = TestBed.inject(RouterHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('_getNextedRouteParam', () => {
    it('should throw an error if paramType is not provided', () => {
      expect(() => (service as any)._getNextedRouteParam(null)).toThrowError("'paramType' must be provided");
    });

    it('should return params recursively', () => {
      const result = (service as any)._getNextedRouteParam('params');
      expect(result).toEqual({ id: '123' });
    });

    it('should return queryParams recursively', () => {
      const result = (service as any)._getNextedRouteParam('queryParams');
      expect(result).toEqual({ search: 'test' });
    });

    it('should return data recursively', () => {
      const result = (service as any)._getNextedRouteParam('data');
      expect(result).toEqual({ title: 'Test Title' });
    });

    it('should return fragment recursively', () => {
      const result = (service as any)._getNextedRouteParam('fragment');
      expect(result).toEqual('section1');
    });
  });

  describe('getRouteObject', () => {
    it('should return the route object with url, params, queryParams, data, and fragment', () => {
      const result = service.getRouteObject();
      expect(result).toEqual({
        url: '/test-route',
        fragment: 'section1',
        params: { id: '123' },
        queryParams: { search: 'test' },
        data: { title: 'Test Title' }
      });
    });
  });

  describe('onRouteChange', () => {
    it('should emit the route object on NavigationEnd event', (done) => {
      service.onRouteChange().subscribe((routeObject) => {
        expect(routeObject).toEqual({
          url: '/test-route',
          fragment: 'section1',
          params: { id: '123' },
          queryParams: { search: 'test' },
          data: { title: 'Test Title' }
        });
        done();
      });

      routerEventsSubject.next(new NavigationEnd(1, '/test-route', '/test-route'));
    });
  });
});