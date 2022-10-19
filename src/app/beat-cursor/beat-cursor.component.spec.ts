import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatCursorComponent } from './beat-cursor.component';

describe('BeatCursorComponent', () => {
  let component: BeatCursorComponent;
  let fixture: ComponentFixture<BeatCursorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeatCursorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatCursorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
