import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

interface RouterObjectInterface {
  url: string,
  fragment: any,
  params: any,
  queryParams: any,
  data: any
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
   * Method to return the route "data|queryParams|params" recursively
   */
  private _getNextedRouteParam(paramType: string) {
    
    const returnParams = {};
    let countWhile = 0;
    
    if (!paramType) {
      throw new Error(`'paramType' must be provided`);
    }
    
    let currentChild: any = this.route.root;
    
    while (currentChild && countWhile < 100) {
      
      if (
        currentChild[paramType] ||
        (
          currentChild.snapshot &&
          currentChild.snapshot[paramType]
        )
      ) {
        
        let snapshot = {};
        
        if (currentChild.snapshot && currentChild.snapshot[paramType]) {
          snapshot = currentChild.snapshot[paramType];
        }
        else {
          snapshot = currentChild[paramType];
        }
        
        if (Array.isArray(snapshot) || typeof snapshot === 'object') {
          for (const i in snapshot) {
            returnParams[i] = snapshot[i];
          }
        }
        else {
          returnParams[paramType] = snapshot;
        }
      }
      
      currentChild = currentChild.firstChild;
      countWhile++;
    }
    
    return returnParams;
    
  }
  
  /**
   * This method is returning a Observable every time because we need to
   * the ability to unsubscribe within the component
   */
  onRouteChange(): Observable<RouterObjectInterface> {
    return new Observable(observer => {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          observer.next(this.getRouteObject());
        }
      });
    });
  }
  
  getRouteObject(): RouterObjectInterface {
    try {
      
      let url = decodeURIComponent(this.router.url);
      
      if (url.indexOf('#') > -1) {
        url = url.split('#')[0];
      }
      
      return {
        url,
        fragment: this._getNextedRouteParam('fragment'),
        params: this._getNextedRouteParam('params'),
        queryParams: this._getNextedRouteParam('queryParams'),
        data: this._getNextedRouteParam('data')
      };
      
    }
    catch (e) {
      throw e;
    }
  }
  
}
