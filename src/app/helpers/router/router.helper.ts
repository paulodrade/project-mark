import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

// Interface defining the structure of the router object returned by `getRouteObject`
export interface RouterObjectInterface {
  url: string, // The current URL of the route
  fragment: any, // The fragment (hash) of the route
  params: any, // The route parameters
  queryParams: any, // The query parameters of the route
  data: any // Additional data associated with the route
}

@Injectable({
  providedIn: 'root'
})
export class RouterHelper {
  
  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
  ) { }
  
  /**
   * Method to recursively retrieve route parameters, query parameters, or data.
   * @param paramType - The type of parameter to retrieve (e.g., 'params', 'queryParams', 'data', 'fragment').
   * @returns An object containing the merged parameters from all nested routes.
   */
  private _getNextedRouteParam(paramType: string) {
    
    const returnParams = {}; // Object to store the merged parameters
    let countWhile = 0; // Counter to prevent infinite loops
    
    if (!paramType) {
      throw new Error(`'paramType' must be provided`); // Ensures the parameter type is specified
    }
    
    let currentChild: any = this.route.root; // Start from the root of the route tree
    
    // Traverse through all child routes
    while (currentChild && countWhile < 100) {
      
      if (
        currentChild[paramType] || // Check if the parameter exists directly
        (
          currentChild.snapshot && // Or if it exists in the snapshot
          currentChild.snapshot[paramType]
        )
      ) {
        
        let snapshot = {};
        
        if (currentChild.snapshot && currentChild.snapshot[paramType]) {
          snapshot = currentChild.snapshot[paramType]; // Retrieve from snapshot if available
        }
        else {
          snapshot = currentChild[paramType]; // Otherwise, retrieve directly
        }
        
        // Merge the parameters into the return object
        if (Array.isArray(snapshot) || typeof snapshot === 'object') {
          for (const i in snapshot) {
            returnParams[i] = snapshot[i];
          }
        }
        else {
          returnParams[paramType] = snapshot;
        }
      }
      
      currentChild = currentChild.firstChild; // Move to the next child route
      countWhile++; // Increment the counter
    }
    
    return returnParams;

  }
  
  /**
   * Observes route changes and emits the current route object whenever the route changes.
   * @returns An Observable that emits a `RouterObjectInterface` on each route change.
   */
  onRouteChange(): Observable<RouterObjectInterface> {
    return new Observable(observer => {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) { // Trigger only on navigation end
          observer.next(this.getRouteObject()); // Emit the current route object
        }
      });
    });
  }
  
  /**
   * Retrieves the current route object, including URL, fragment, params, queryParams, and data.
   * @returns A `RouterObjectInterface` containing the current route information.
   */
  getRouteObject(): RouterObjectInterface {
    
    let url = decodeURIComponent(this.router.url); // Decode the current URL
      
    if (url.indexOf('#') > -1) {
      url = url.split('#')[0]; // Remove the fragment (hash) from the URL
    }
    
    return {
      url, // The current URL
      fragment: this._getNextedRouteParam('fragment'), // Retrieve the fragment
      params: this._getNextedRouteParam('params'), // Retrieve route parameters
      queryParams: this._getNextedRouteParam('queryParams'), // Retrieve query parameters
      data: this._getNextedRouteParam('data') // Retrieve route data
    };

  }
}