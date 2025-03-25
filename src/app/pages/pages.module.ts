import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatCard,
  MatCardContent
} from '@angular/material/card';
import {
  MatSidenavModule
} from '@angular/material/sidenav';
import {
  MatTabLink,
  MatTabNav,
  MatTabNavPanel
} from '@angular/material/tabs';
import { IconComponent } from '@pm-components'; 
import { LocationListComponent } from '@pm-features'; 

import { PagesRoutingModule } from './pages-routing.module'; 
import { PagesComponent } from './pages.component'; 

@NgModule({
  declarations: [PagesComponent], 
  imports: [
    CommonModule, 
    PagesRoutingModule, 
    MatCard, 
    MatCardContent, 
    LocationListComponent, 
    MatSidenavModule, 
    MatTabNav, 
    MatTabLink, 
    IconComponent, 
    MatTabNavPanel 
  ]
})
export class PagesModule {
  
}