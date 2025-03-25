import { TestBed } from '@angular/core/testing';
import { ResourcesHelper } from './resources.helper';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LocalStorageHelper } from '@pm-helpers';
import { environment } from '@pm-environments/environment';

describe('ResourcesHelper', () => {
  let service: ResourcesHelper;
  let httpMock: HttpTestingController;
  let localStorageHelperSpy: jasmine.SpyObj<LocalStorageHelper>;

  beforeEach(() => {
    const localStorageHelperMock = jasmine.createSpyObj('LocalStorageHelper', ['get', 'set']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ResourcesHelper,
        { provide: LocalStorageHelper, useValue: localStorageHelperMock },
      ],
    });

    service = TestBed.inject(ResourcesHelper);
    httpMock = TestBed.inject(HttpTestingController);
    localStorageHelperSpy = TestBed.inject(LocalStorageHelper) as jasmine.SpyObj<LocalStorageHelper>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getDefaultParams', () => {
    it('should return default parameters for a given API', () => {
      environment.apisParams = {
        // @ts-ignore
        testApi: [
          { key: 'param1', value: 'value1' },
          { key: 'param2', value: 'value2' },
        ],
      };

      const params = service.getDefaultParams('testApi');
      expect(params).toEqual({ param1: 'value1', param2: 'value2' });
    });

    it('should return an empty object if no parameters are defined for the API', () => {
      // @ts-ignore
      environment.apisParams = {};
      const params = service.getDefaultParams('nonExistentApi');
      expect(params).toEqual({});
    });
  });

  describe('get', () => {
    const mockApiResponse = { data: 'testData' };
    const api = 'testApi';
    const path = 'testPath';
    const params = { key: 'value' };
    const cacheKey = `${path}?key=value`;

    beforeEach(() => {
      // @ts-ignore
      environment.apis = { testApi: 'http://testapi.com' };
    });

    it('should return cached data if available', (done) => {
      localStorageHelperSpy.get.and.returnValue(mockApiResponse);

      service.get({ api, path, params, cache: true }).subscribe((response) => {
        expect(response).toEqual(mockApiResponse);
        expect(localStorageHelperSpy.get).toHaveBeenCalledWith(cacheKey);
        done();
      });
    });

    it('should make an HTTP GET request if no cached data is available', (done) => {
      localStorageHelperSpy.get.and.returnValue(null);

      service.get({ api, path, params, cache: true }).subscribe((response) => {
        expect(response).toEqual(mockApiResponse);
        expect(localStorageHelperSpy.set).toHaveBeenCalledWith(cacheKey, mockApiResponse, 10);
        done();
      });

      const req = httpMock.expectOne('http://testapi.com/testPath?key=value');
      expect(req.request.method).toBe('GET');
      req.flush(mockApiResponse);
    });

    it('should not cache the response if caching is disabled', (done) => {
      service.get({ api, path, params, cache: false }).subscribe((response) => {
        expect(response).toEqual(mockApiResponse);
        expect(localStorageHelperSpy.set).not.toHaveBeenCalled();
        done();
      });

      const req = httpMock.expectOne('http://testapi.com/testPath?key=value');
      expect(req.request.method).toBe('GET');
      req.flush(mockApiResponse);
    });

    it('should handle HTTP errors', (done) => {
      const mockError = { status: 404, statusText: 'Not Found' };

      service.get({ api, path, params, cache: false }).subscribe({
        next: () => fail('Expected an error, but got a response'),
        error: (error) => {
          expect(error.status).toBe(404);
          done();
        },
      });

      const req = httpMock.expectOne('http://testapi.com/testPath?key=value');
      req.flush(null, mockError);
    });
  });
});