import {Injectable} from '@angular/core';
import {FLuidDeployer, FluidService} from "../../services/fluid-service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SynthService {
  title = 'GotSynth';
  mod: any;
  private fluidService!: FluidService;
  public synthActive = false;
  private _program = 0;
  public channel = 0;
  public left = 0;

  constructor(private fluidDeployer: FLuidDeployer, private httpClient: HttpClient) {
  }

  public programChange(program): void {
    this._program = program;
  }

  set percussionMode(value) {
    this.channel = value ? 9 : 0;
  }

  get percussionMode(): boolean {
    return this.channel == 9;
  }

  public start(): void {
    // this.statusMsg = "Loading synthesizer module";
    this.fluidDeployer.startFluidService().subscribe({
      next: instance => {
        this.fluidService = instance;
        this.fetchSoundbank();
      }, error: err => {
        console.error(err);
        alert("Failed to start synthesizer module");
      }
    });
  }

  public stop():
    void {
  }

  public fetchSoundbank(): void {
    this.httpClient.get(document.baseURI + 'assets/Unison.sf2', {responseType: 'arraybuffer'}).subscribe(result => {
      this.fluidService.port.postMessage({type: 'load_soundbank', bank: result});
      this.setProgram(this._program, this.channel);
      this.synthActive = true;
    });
  }

  public noteOn(note: number, velocity: number, channel: number = this.channel): void {
    if (this.fluidService.context.state != 'running') {
      this.fluidService.context['resume']();
    }
    this.fluidService.port.postMessage({type: 'note_on', note: note, velocity: velocity, channel: channel});
  }

  public noteOff(note: number, channel: number = this.channel): void {
    this.fluidService.port.postMessage({type: 'note_off', note: note, channel: channel});
  }

  public setProgram(program: number, channel: number = this.channel) {
    console.log(`set program ${program} on channel ${channel}`);
    this.fluidService.port.postMessage({type: 'program_change', program: program, channel: channel});
  }

}
