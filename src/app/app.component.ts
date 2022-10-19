import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FLuidDeployer, FluidService} from "../services/fluid-service";

// const Module = require('./../assets/js/libfluidsynth-2.2.1')();
import {GMPatches, PercPatches} from "./classes/patches";
import {Measure, Track} from "./classes/elements";
import {GlobalTime, TimeKeeperService} from "./services/time-keeper.service";
import {SynthService} from "./services/synth.service";
import {AppModule} from "./app.module";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  get program(): number {
    return this._program;
  }

  set program(value: number) {
    this._program = value;
    this.synthService.setProgram(value, this.channel)
  }

  title = 'GotSynth';
  mod: any;
  public statusMsg = "";
  private _program = 0;
  public channel = 0;
  public patches = GMPatches;
  public drums = PercPatches;
  public tracks: Track[];
  private numTracks = 4;
  private numMeasures = 1;
  private beatsPerMeasure = 4;
  public synthService: SynthService;

  constructor(private http: HttpClient, private fluidDeployer: FLuidDeployer, private httpClient: HttpClient) {
    this.tracks = [];
    this.synthService = AppModule.injector.get(SynthService);
    this.synthService.percussionMode=true;
    // @ts-ignore
    /*
        window.Module['onRuntimeInitialized'] = () => {
          this.mod = window.Module;
          this.fluidReady = true;
          cd.detectChanges();
        }
    */
  }

  public programChange($event): void {
    this.synthService.programChange($event.target.value);
  }

  set percussionMode(value) {
    this.synthService.percussionMode = value;
  }

  get percussionMode(): boolean {
    return this.synthService.percussionMode;
  }

  noteRun(): void {
    let note = 50;
    let inc = 1;
    let id = setInterval(() => {
      this.playNote(note, 100, note * 2);
      note += inc;
      if (note > 62) {
        inc = -1;
      } else if (note < 50) {
        clearInterval(id);
      }
    }, 100);
  }

  playNote(note: number, duration: number, velocity = 127) {
    this.synthService.noteOn(note, velocity);
    setTimeout(() => this.synthService.noteOff(note), duration);
  }

  public randomNote(): void {
    const note = Math.floor(Math.random() * 80) + 20;
    const velocity = Math.floor(Math.random() * 100) + 27;
    this.playNote(note, 250, velocity);
  }


  ngAfterViewInit(): void {
    GlobalTime.getClockListener().subscribe({
      next: (position) => {
        if (position >= this.numMeasures * 16) {
          GlobalTime.clockStep = 0;
        }
      }
    });
    GlobalTime.stepDelay = 250;
  }

  public startBeats(): void {
    GlobalTime.startClock();
  }

  public stopBeats(): void {
    GlobalTime.stopClock();
  }

  ngOnInit(): void {
    for (let i = 0; i < this.numTracks; i++) {
      const track = new Track();
      for (let j = 0; j < this.numMeasures; j++) {
        track.measures.push(new Measure(this.beatsPerMeasure, j));
      }
      this.tracks.push(track);
    }
    this.synthService.start();
  }
}
