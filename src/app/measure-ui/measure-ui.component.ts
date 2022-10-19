import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Beat, Measure} from "../classes/elements";

@Component({
  selector: 'app-measure-ui',
  templateUrl: './measure-ui.component.html',
  styleUrls: ['./measure-ui.component.scss']
})
export class MeasureUIComponent implements OnInit, AfterViewInit {

  constructor() { }
  @Input()
  measure!:Measure;
  private _note;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

}
