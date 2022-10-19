import {Component, Input, OnInit} from '@angular/core';
import {Beat} from "../classes/elements";

@Component({
  selector: 'app-beat-ui',
  templateUrl: './beat-ui.component.html',
  styleUrls: ['./beat-ui.component.scss']
})
export class BeatUIComponent implements OnInit {
  @Input()
  beat!: Beat;
  private _note;

  constructor() {
  }


  ngOnInit(): void {
  }

}
