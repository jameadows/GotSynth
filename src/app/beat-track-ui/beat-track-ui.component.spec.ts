import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatTrackUIComponent } from './beat-track-ui.component';

describe('BeatTrackUIComponent', () => {
  let component: BeatTrackUIComponent;
  let fixture: ComponentFixture<BeatTrackUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeatTrackUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatTrackUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
