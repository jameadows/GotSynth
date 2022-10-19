import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatFrameUIComponent } from './beat-frame-ui.component';

describe('BeatFrameUIComponent', () => {
  let component: BeatFrameUIComponent;
  let fixture: ComponentFixture<BeatFrameUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeatFrameUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatFrameUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
