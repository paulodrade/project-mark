import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@mp-environments/environment';
import {
  Observable,
  Observer
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourcesHelper {
  
  private _defaultParams = {};
  
  constructor(
    private http: HttpClient,
  ) { }
  
  getDefaultParams(api: string) {
    
    const params = {};
    
    if (environment.apisParams[api]) {
      params[environment.apisParams[api].key] = environment.apisParams[api].value;
    }
    
    return params;
    
  }
  
  get({ api, path, params = {}, cache = true }) {
    
    return new Observable((observer: Observer<any>) => {
      
      params = { ...params, ...this.getDefaultParams(api) };
      console.log('resources.helper->get(): params', params);
      
      const url = new URL(`${environment.apis[api]}/${path}`);
      url.search = new URLSearchParams(params).toString();
      
      console.log('resources.helper->get(): url', url.href);
      
      this.http.get(url.href).subscribe({
        next: (response: any) => {
          
          if (cache) {
            window.localStorage.setItem(path, JSON.stringify(response));
          }
          
          observer.next(response);
        },
        error: (error: any) => observer.error(error),
      });
      
    });
    
  }
  
}
