import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatUIComponent } from './beat-ui.component';

describe('BeatUIComponent', () => {
  let component: BeatUIComponent;
  let fixture: ComponentFixture<BeatUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeatUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
