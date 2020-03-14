import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEtapComponent } from './add-etap.component';

describe('AddEtapComponent', () => {
  let component: AddEtapComponent;
  let fixture: ComponentFixture<AddEtapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEtapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEtapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
