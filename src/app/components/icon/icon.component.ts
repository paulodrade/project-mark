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

interface MpIconsNamesAvailability {
  'globe_location_pin';
}

type MpIcons = keyof MpIconsNamesAvailability;

@Component({
  selector: 'pm-icon',
  imports: [
    MatIcon
  ],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent implements OnChanges, AfterViewInit {
  
  @Input() icon: MpIcons;
  @Input() color: string = '#000';
  
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private hostElement: ElementRef
  ) {
    this.matIconRegistry.addSvgIcon(
      'globe_location_pin',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/icons/globe_location_pin.svg'
      )
    );
  }
  
  ngAfterViewInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['color']) {
      this.changeIconColor(changes['color'].currentValue);
    }
  }
  
  changeIconColor(color: string) {
    const { nativeElement } = this.hostElement;
    
    const interval = setInterval(() => {
      if (nativeElement.querySelector('svg')) {
        nativeElement.querySelector('svg').setAttribute('fill', 'red');
        clearInterval(interval);
      }
    }, 10);
    
  }
  
}
