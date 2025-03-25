import {
  Component,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { LocationModel } from '@pm-api/models';
import { LocationsService } from '@pm-api/services';
import { LocationListComponent } from '@pm-features';
import { RouterHelper } from '@pm-helpers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pm-pages', 
  templateUrl: './pages.component.html', 
  styleUrl: './pages.component.scss' 
})
export class PagesComponent implements OnDestroy {
  
  @ViewChild('drawer') drawer: MatDrawer; // Reference to the MatDrawer element in the template
  
  isDesktop = false; // Tracks whether the current view is desktop-sized
  listLocations: LocationModel[] = []; // Stores the list of available locations
  currentLocationId = ''; // Stores the current location ID from the route
  
  onRouteChangeSubscription: Subscription; // Subscription to listen for route changes
  
  // Function to handle window resize events and update the `isDesktop` property
  onResizeWindow = () => {
    this.isDesktop = window.innerWidth > 768; 
  };
  
  constructor(
    private locationsService: LocationsService, 
    private routerHelper: RouterHelper, 
    public dialogRef: MatDialog 
  ) {
    // Adds an event listener to handle window resize events
    window.addEventListener('resize', this.onResizeWindow);
    
    // Fetches the list of locations from the LocationsService
    this.listLocations = this.locationsService.getLocations();
    
    let dialogInstance; // Variable to store the dialog instance
    
    // Subscribes to route changes and handles location-based logic
    this.onRouteChangeSubscription = this.routerHelper.onRouteChange().subscribe(({ url, params }) => {
      console.log('pages.component->constructor(): url', url);
      
      // Closes the drawer with a slight delay to ensure smooth UI behavior
      setTimeout(() => {
        this.drawer.close();
      }, 50);
      
      // Updates the current location ID based on the route parameters
      this.currentLocationId = params['location'];
      console.log('pages.component->constructor(): this.currentLocationId', this.currentLocationId);
      
      // Opens the LocationListComponent dialog if no location ID is set
      if (!this.currentLocationId) {
        dialogInstance = dialogRef.open(LocationListComponent, { disableClose: true });
      }
      // Closes the dialog if a location ID is set
      else if (dialogInstance) {
        dialogInstance.close();
      }
    });
  }
  
  ngOnDestroy() {
    // Removes the window resize event listener to prevent memory leaks
    window.removeEventListener('resize', this.onResizeWindow);
    
    // Unsubscribes from the route change listener to prevent memory leaks
    this.onRouteChangeSubscription.unsubscribe();
  }
}