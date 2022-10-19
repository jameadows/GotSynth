import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {BeatFrame} from "../classes/elements";
import {GlobalTime} from "../services/time-keeper.service";

@Component({
  selector: 'app-beat-frame-ui',
  templateUrl: './beat-frame-ui.component.html',
  styleUrls: ['./beat-frame-ui.component.scss']
})
export class BeatFrameUIComponent implements OnInit {
  @Input()
  frame!: BeatFrame;
  @ViewChild('cell')
  cell!: ElementRef;

  constructor() {
  }

  public handleClick(): void {
    this.frame.value = this.frame.value ? 0 : 127;
  }

  ngOnInit(): void {
    GlobalTime.getClockListener().subscribe(position => {
      if (position == this.frame.position) {
        this.cell.nativeElement.classList.add('active');
      } else if (this.cell.nativeElement.classList.contains('active')) {
        this.cell.nativeElement.classList.remove('active');
      }
    })
  }

}
