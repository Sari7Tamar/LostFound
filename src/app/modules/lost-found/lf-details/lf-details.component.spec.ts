import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LfDetailsComponent } from './lf-details.component';

describe('LfDetailsComponent', () => {
  let component: LfDetailsComponent;
  let fixture: ComponentFixture<LfDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LfDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LfDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
