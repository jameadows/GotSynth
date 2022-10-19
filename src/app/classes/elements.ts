import {GlobalTime} from "../services/time-keeper.service";
import {SynthService} from "../services/synth.service";
import {AppModule} from "../app.module";

export class BeatFrame {
  get note(): number {
    return this._note;
  }

  set note(value: number) {
    this._note = value;
  }

  private synth: SynthService;

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }

  public position;
  private _value;
  public noteActive = false;
  private _note = 50;

  constructor(position = 0) {
    this.synth = AppModule.injector.get(SynthService);
    this.position = position;
    GlobalTime.getClockListener().subscribe(position => {
      if (position == this.position && this.value) {
        this.noteActive = true;
        this.synth.noteOn(this._note, this.value);
      } else if (this.noteActive) {
        this.synth.noteOff(this._note);
        this.noteActive = false;
      }
    });
  }
}

export class Beat {
  get note() {
    return this._note;
  }

  set note(value) {
    this._note = value;
    this.frames.forEach(frame => frame.note = this.note);
  }

  private position;
  private numFrames = 4;
  private _note;

  constructor(position = 0) {
    this.position = position;
    this._frames = [];
    for (let i = 0; i < this.numFrames; i++) {
      this._frames.push(new BeatFrame(this.position * this.numFrames + i));
    }
  }

  get frames(): BeatFrame[] {
    return this._frames;
  }

  private _frames: BeatFrame[] = new Array(this.numFrames);
}

export class Measure {
  get note() {
    return this._note;
  }

  set note(value) {
    this._note = value;
    this.beats.forEach(beat => beat.note = this.note);
  }

  private _beats!: Beat[];
  private position;
  private _note;

  constructor(numBeats = 0, postion = 0) {
    this.position = postion;
    this.numBeats = numBeats;
  }

  set numBeats(value) {
    this._beats = [];
    for (let i = 0; i < value; i++) {
      this.beats.push(new Beat(this.position * this.numBeats + i));
    }
  }

  get beats(): Beat[] {
    return this._beats;
  }

  get numBeats(): number {
    return this.beats.length;
  }

  public getBeat(index): Beat {
    return this.beats[index];
  }

  public setBeat(index, value: Beat) {
    this.beats[index] = value;
  }
}

export class Track {
  get note() {
    return this._note;
  }

  set note(value) {
    this._note = value;
    this.measures.forEach(measure => measure.note = this.note);
  }

  get measures(): Measure[] {
    return this._measures;
  }

  private _note;

  private _measures: Measure[];

  constructor() {
    this._measures = [];
  }
}
