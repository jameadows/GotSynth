import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatContainerComponent } from './beat-container.component';

describe('BeatFrameComponent', () => {
  let component: BeatContainerComponent;
  let fixture: ComponentFixture<BeatContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeatContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
