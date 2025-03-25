import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 

@Component({
  selector: 'pm-root', 
  standalone: true, 
  templateUrl: './app.component.html', 
  imports: [
    RouterOutlet 
  ],
  styleUrl: './app.component.scss' 
})
export class AppComponent {
  
}