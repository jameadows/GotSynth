import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-beat-cursor',
  templateUrl: './beat-cursor.component.html',
  styleUrls: ['./beat-cursor.component.scss']
})
export class BeatCursorComponent implements OnInit {
  @Input()
  public left = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

}
