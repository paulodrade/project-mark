import { provideHttpClient } from '@angular/common/http'; 
import { ApplicationConfig } from '@angular/core'; 
import { provideAnimations } from '@angular/platform-browser/animations'; 
import { provideRouter } from '@angular/router'; 

import { routes } from './app.routes'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Configures the application's routing with the defined routes
    provideHttpClient(), // Registers the HttpClient service for dependency injection
    provideAnimations() // Enables Angular animations throughout the application
  ]
};