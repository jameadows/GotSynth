import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Track} from "../classes/elements";
import {PercPatches} from "../classes/patches";
import {AppModule} from "../app.module";

@Component({
  selector: 'app-beat-track-ui',
  templateUrl: './beat-track-ui.component.html',
  styleUrls: ['./beat-track-ui.component.scss']
})
export class BeatTrackUIComponent implements OnInit {

  public drums = PercPatches;
  private _note = 35;

  get track(): Track {
    return this._track;
  }

  @Input()
  set track(value: Track) {
    this._track = value;
  }

  private _track!: Track;

  constructor() {
    this._track = new Track();
  }

  public programChange($event) {
    this.track.note = $event.currentTarget.value;
  }

  ngOnInit(): void {
  }

}
