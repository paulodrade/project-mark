import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  MatIcon,
  MatIconRegistry
} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

// List of available icon names that can be used in the component
const MpIconsNamesAvailable  = [
  'globe_location_pin',
  'menu_open',
  'wi-thunderstorm',
  'wi-lightning',
  'wi-storm-showers',
  'wi-sprinkle',
  'wi-rain-mix',
  'wi-rain',
  'wi-showers',
  'wi-snow',
  'wi-sleet',
  'wi-smoke',
  'wi-day-haze',
  'wi-dust',
  'wi-fog',
  'wi-sandstorm',
  'wi-volcano',
  'wi-strong-wind',
  'wi-tornado',
  'wi-day-sunny',
  'wi-cloudy-gusts',
  'wi-cloudy',
  'wi-hurricane',
  'wi-snowflake-cold',
  'wi-hot',
  'wi-windy',
  'wi-hail'
];

@Component({
  selector: 'pm-icon', // Selector to use this component in templates
  imports: [
    MatIcon // Importing Angular Material's MatIcon module
  ],
  templateUrl: './icon.component.html',
  standalone: true,
  styleUrl: './icon.component.scss'
})
export class IconComponent implements OnChanges {
  
  @Input() icon: string; // The name of the icon to display
  @Input() color: string = '#000'; // The color of the icon (default is black)
  @Input() size: number = 24; // The size of the icon in pixels (default is 24px)
  
  constructor(
    private matIconRegistry: MatIconRegistry, 
    private domSanitizer: DomSanitizer, 
    private hostElement: ElementRef 
  ) {
    // Registers all available icons in the MatIconRegistry
    for(const i in MpIconsNamesAvailable) {
      this.matIconRegistry.addSvgIcon(
        MpIconsNamesAvailable[i],
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          `/assets/icons/${MpIconsNamesAvailable[i]}.svg` // Path to the SVG icon file
        )
      );
    }
  }
  
  ngOnChanges(changes: SimpleChanges) {
    // Detects changes to input properties and applies updates
    if (changes['color'] && changes['color'].currentValue) {
      this.changeIconColor(changes['color'].currentValue); // Updates the icon color if the 'color' input changes
    }
  }
  
  changeIconColor(color: string) {
    const { nativeElement } = this.hostElement;
    
    // Waits for the SVG element to be rendered and then updates its 'fill' attribute
    const interval = setInterval(() => {
      if (nativeElement.querySelector('svg')) {
        nativeElement.querySelector('svg').setAttribute('fill', color); // Sets the fill color of the SVG
        clearInterval(interval); // Stops the interval once the SVG is updated
      }
    }, 20);
  }
}