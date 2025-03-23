import {
  Component,
  OnDestroy
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialog,
  MatDialogModule
} from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  MatTabLink,
  MatTabNav,
  MatTabNavPanel
} from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { IconComponent } from '@mp-components';
import { LocationListComponent } from '@mp-features';
import { RouterHelper } from '@mp-helpers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pm-pages',
  imports: [
    RouterModule,
    MatCardModule,
    MatSidenavModule,
    MatTabNav,
    MatTabLink,
    MatTabNavPanel,
    MatDialogModule,
    IconComponent,
    LocationListComponent
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent implements OnDestroy {
  
  isDesktop = false;
  activeTab = '';
  showModalLocations = false;
  
  onRouteChangeSubscription: Subscription;
  
  onResizeWindow = () => {
    this.isDesktop = window.innerWidth > 768;
  };
  
  constructor(
    private routerHelper: RouterHelper,
    public dialogRef: MatDialog
  ) {
    
    window.addEventListener('resize', this.onResizeWindow);
    
    let dialogInstance;
    
    this.routerHelper.onRouteChange().subscribe(({ params }) => {
      if (!params['location']) {
        dialogInstance = dialogRef.open(LocationListComponent);
      }
      else if (dialogInstance) {
        dialogInstance.close();
      }
    });
    
  }
  
  ngOnDestroy() {
    window.removeEventListener('resize', this.onResizeWindow);
    this.onRouteChangeSubscription.unsubscribe();
  }
  
}
