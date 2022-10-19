import {Component, Input, OnInit} from '@angular/core';
import {Track} from "../classes/elements";

@Component({
  selector: 'app-beat-container',
  templateUrl: './beat-container.component.html',
  styleUrls: ['./beat-container.component.scss']
})
export class BeatContainerComponent implements OnInit {
  @Input()
  public tracks: Track[];

  constructor() {
    this.tracks = []
  }

  ngOnInit(): void {
  }

}
