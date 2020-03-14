import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapComponent } from './etap.component';

describe('EtapComponent', () => {
  let component: EtapComponent;
  let fixture: ComponentFixture<EtapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
