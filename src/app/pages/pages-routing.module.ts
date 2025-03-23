import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

const routes: Routes = [{
  path: '',
  loadComponent: () => import('./pages.component').then(m => m.PagesComponent),
  children: [{
    path: ':location',
    children: [{
      path: 'today',
      loadComponent: () => import('./today/today.component').then(m => m.TodayComponent),
    }, {
      path: 'forecast',
      loadComponent: () => import('./forecast/forecast.component').then(m => m.ForecastComponent),
    }]
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
