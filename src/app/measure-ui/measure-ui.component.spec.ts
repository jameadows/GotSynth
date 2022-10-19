import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureUIComponent } from './measure-ui.component';

describe('MeasureUIComponent', () => {
  let component: MeasureUIComponent;
  let fixture: ComponentFixture<MeasureUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasureUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
