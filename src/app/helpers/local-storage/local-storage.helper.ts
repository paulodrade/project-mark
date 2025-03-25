import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageHelper {
  
  private _cachePrefix = 'PM'; // Prefix used to namespace keys in localStorage
  
  constructor() {
    // Automatically executes cleanup of expired items when the service is initialized
    this.clearExpires();
  }
  
  /**
   * Removes expired items from localStorage.
   * Iterates through all items in localStorage, checks their expiration, and removes them if expired.
   */
  clearExpires() {
    
    const toRemove = []; // Array to store keys of items to be removed
    const currentDate = new Date().getTime(); // Current date in milliseconds
    
    for (let i = 0, j = localStorage.length; i < j; i++) {
      const key = <string>localStorage.key(i); // Retrieves the key at index `i`
      const value = localStorage.getItem(key); // Retrieves the value associated with the key
      
      // Checks if the value is in JSON format (to avoid conflicts with other applications)
      if (value && value[0] === '{' && value.slice(-1) === '}') {
        const current = JSON.parse(value); // Parses the JSON string back into an object
        
        // Checks if the item has an "expires" key and if it is expired
        if (current.expires && current.expires <= currentDate) {
          toRemove.push(<never>key); // Adds the key to the list of items to be removed
        }
      }
    }
    
    // Removes all expired items from localStorage
    for (let i = toRemove.length - 1; i >= 0; i--) {
      localStorage.removeItem(toRemove[i]);
    }
  }
  
  /**
   * Adds an item to localStorage with an expiration time.
   * @param key - The key under which the item will be stored.
   * @param value - The value to be stored.
   * @param minutes - The expiration time in minutes (default is 5 minutes).
   */
  set(key: string, value: any, minutes: number = 5) {
    const expiresAt = new Date().getTime() + (60000 * minutes); // Calculates the expiration timestamp
    
    // Stores the item in localStorage with the prefix and expiration metadata
    localStorage.setItem([this._cachePrefix, key].join('-'), JSON.stringify({
      'value': value,
      'expires': expiresAt
    }));
  }
  
  /**
   * Retrieves an item from localStorage if it has not expired.
   * Automatically cleans up expired items before attempting to retrieve the value.
   * @param key - The key of the item to retrieve.
   * @returns The value of the item if it exists and has not expired, otherwise undefined.
   */
  get(key: string) {
    this.clearExpires(); // Cleans up expired items before retrieving the value
    
    const value = localStorage.getItem([this._cachePrefix, key].join('-')); // Retrieves the item with the prefixed key
    
    if (value && value[0] === '{' && value.slice(-1) === '}') {
      const current = JSON.parse(value); // Parses the JSON string back into an object
      return current.value; // Returns the stored value
    }
  }
}