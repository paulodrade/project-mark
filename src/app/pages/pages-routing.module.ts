import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { PagesComponent } from './pages.component';

// Defines the routes for the Pages module
const routes: Routes = [{
  path: '', // Base path for the Pages module
  component: PagesComponent, // Main component for this route
  children: [ // Defines child routes under the PagesComponent
    {
      path: 'forecast/:location', // Route for the forecast page with a dynamic location parameter
      loadComponent: () => import('./forecast/forecast.component').then(m => m.ForecastComponent), // Lazy loads the ForecastComponent
      children: [] // Placeholder for potential future child routes
    },
    {
      path: '**', // Wildcard route to catch undefined paths
      redirectTo: 'forecast', // Redirects to the forecast route
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Configures the router with the defined routes for this module
  exports: [RouterModule] // Exports the RouterModule so it can be used in other parts of the application
})
export class PagesRoutingModule {
}