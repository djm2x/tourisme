import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSharedComponent } from './update-shared.component';

describe('UpdateSharedComponent', () => {
  let component: UpdateSharedComponent;
  let fixture: ComponentFixture<UpdateSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
