import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponceComponent } from './reponce.component';

describe('ReponceComponent', () => {
  let component: ReponceComponent;
  let fixture: ComponentFixture<ReponceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReponceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReponceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
