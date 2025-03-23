import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: 'home',
  loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
}, {
  path: '**',
  redirectTo: 'home'
}];
