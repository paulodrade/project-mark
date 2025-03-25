import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { environment } from '@pm-environments/environment'; 
import { LocalStorageHelper } from '@pm-helpers'; 
import {
  Observable,
  Observer
} from 'rxjs';

// Interface defining the parameters for the `get` method
interface ResourceParamsInterface { 
  api: string; // The name of the API to call
  path: string; // The endpoint path for the API
  params?: any; // Query parameters for the request
  cache?: boolean; // Whether to cache the response
  cacheExpiresInMinutes?: number; // Cache expiration time in minutes
};

@Injectable({
  providedIn: 'root'
})
export class ResourcesHelper {
  
  constructor(
    private http: HttpClient, 
    private localStorageHelper: LocalStorageHelper, 
  ) { }
  
  /**
   * Retrieves default parameters for a specific API.
   * @param api - The name of the API to retrieve default parameters for.
   * @returns An object containing the default parameters for the API.
   */
  getDefaultParams(api: string) {
    const params = {};
    
    // Checks if the API has predefined parameters in the environment configuration
    if (environment.apisParams[api]) {
      for (let i in environment.apisParams[api]) {
        params[environment.apisParams[api][i].key] = environment.apisParams[api][i].value;
      }
    }
    
    return params;
  }
  
  /**
   * Makes an HTTP GET request to the specified API endpoint.
   * Supports caching the response in localStorage.
   * @param api - The name of the API to call.
   * @param path - The endpoint path for the API.
   * @param params - Query parameters for the request.
   * @param cache - Whether to cache the response (default: true).
   * @param cacheExpiresInMinutes - Cache expiration time in minutes (default: 10).
   * @returns An Observable that emits the API response.
   */
  get({ api, path, params = {}, cache = true, cacheExpiresInMinutes = 10 }: ResourceParamsInterface) {
    return new Observable((observer: Observer<any>) => {
      
      // Merges default parameters with the provided parameters
      params = { ...params, ...this.getDefaultParams(api) };
      
      // Constructs the full URL for the API request
      const url = new URL(`${environment.apis[api]}/${path}`);
      url.search = new URLSearchParams(params).toString();
      
      // Generates a unique cache key based on the endpoint and query parameters
      const cacheKey = `${path}${url.search}`;
      
      if (cache) {
        // Attempts to retrieve the response from localStorage
        const response = this.localStorageHelper.get(cacheKey);
        
        if (response) {
          observer.next(response); // Emits the cached response
          return; // Stops further execution
        }
      }
      
      // Makes an HTTP GET request if no cached response is found
      this.http.get(url.href).subscribe({
        next: (response: any) => {
          if (cache) {
            // Stores the response in localStorage with an expiration time
            this.localStorageHelper.set(cacheKey, response, cacheExpiresInMinutes);
          }
          
          observer.next(response); // Emits the API response
        },
        error: (error: any) => observer.error(error), // Emits an error if the request fails
      });
    });
  }
}