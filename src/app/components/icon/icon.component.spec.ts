import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  let matIconRegistrySpy: jasmine.SpyObj<MatIconRegistry>;
  let domSanitizerSpy: jasmine.SpyObj<DomSanitizer>;

  beforeEach(async () => {
    const matIconRegistryMock = jasmine.createSpyObj('MatIconRegistry', ['addSvgIcon']);
    const domSanitizerMock = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustResourceUrl']);

    await TestBed.configureTestingModule({
      declarations: [IconComponent],
      providers: [
        { provide: MatIconRegistry, useValue: matIconRegistryMock },
        { provide: DomSanitizer, useValue: domSanitizerMock },
        { provide: ElementRef, useValue: { nativeElement: document.createElement('div') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    matIconRegistrySpy = TestBed.inject(MatIconRegistry) as jasmine.SpyObj<MatIconRegistry>;
    domSanitizerSpy = TestBed.inject(DomSanitizer) as jasmine.SpyObj<DomSanitizer>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should register all available icons on initialization', () => {
    expect(matIconRegistrySpy.addSvgIcon).toHaveBeenCalledTimes(27); // Total icons in MpIconsNamesAvailable
    expect(domSanitizerSpy.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith('/assets/icons/globe_location_pin.svg');
  });

  it('should update the icon color when the color input changes', () => {
    const nativeElement = fixture.debugElement.nativeElement;
    spyOn(nativeElement.querySelector('svg') || {}, 'setAttribute');

    component.icon = 'globe_location_pin';
    component.color = '#ff0000';
    component.ngOnChanges({
      color: {
        currentValue: '#ff0000',
        previousValue: '#000000',
        firstChange: false,
        isFirstChange: () => false
      }
    });

    fixture.detectChanges();

    const interval = setInterval(() => {
      expect(nativeElement.querySelector('svg').setAttribute).toHaveBeenCalledWith('fill', '#ff0000');
      clearInterval(interval);
    }, 10);
  });
});