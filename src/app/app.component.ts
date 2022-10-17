import {AfterViewInit, ChangeDetectorRef, Component, Input} from '@angular/core';
import {mergeMap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {FLuidDeployer, FluidService} from "../services/fluid-service";

// const Module = require('./../assets/js/libfluidsynth-2.2.1')();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'GotSynth';
  mod: any;
  @Input()
  public fluidReady: boolean = false;
  private fluidService!: FluidService;

  constructor(private http: HttpClient, private cd: ChangeDetectorRef, private fluidDeployer: FLuidDeployer, private httpClient: HttpClient) {
    // const prm = this.instantiateWasm("/assets/js/libfluidsynth-2.2.1",{})
    // @ts-ignore
    // window['Module']._new_fluid_settings();
    // var x=window.Module.instantiateAsync();
    console.log("");
    // @ts-ignore
    window.Module['onRuntimeInitialized'] = () => {
      this.mod = window.Module;
      this.fluidReady = true;
      cd.detectChanges();
    }
  }

  public doStart(): void {
    this.fluidDeployer.startFluidService().subscribe({
      next: instance => {
        this.fluidService = instance;
        console.log("Fluid worklet started");
        this.fsTest();
      }, error: err => console.error(err)
    });
  }

  public doStop(): void {
  }

  public fsTest(): void {
    try {
      this.mod.FS.mkdir('/sf');
    } catch (e) {
      console.error(e);
    }
    this.httpClient.get('/assets/Unison.sf2', {responseType: 'arraybuffer'}).subscribe(result => {
      this.fluidService.port.postMessage({type: 'load_soundbank', bank: result});
    });
    // this.mod.FS.mount()
    console.log();
  }

  noteRun(): void {
    let note = 60;
    let inc = 1;
    let id = setInterval(() => {
      this.playNote(note, 100);
      note += inc;
      if (note > 100) {
        inc = -1;
      } else if (note < 50) {
        clearInterval(id);
      }
    }, 100);
  }

  playNote(note: number, duration: number) {
    this.noteOn(note);
    setTimeout(() => this.noteOff(note), duration);
  }

  public noteOn(note = 60): void {
    this.fluidService.port.postMessage({type: 'note_on', note: note});
  }

  public noteOff(note = 60): void {
    this.fluidService.port.postMessage({type: 'note_off', note: note});
  }

  public doFluid() {
    const mod = window.Module
    const FLUID_FAILED = -1;


    const fluidSettings = mod._new_fluid_settings();
    const synth = mod._new_fluid_synth(fluidSettings);
    if (!synth) {
      console.error("Failed to create the synth!");
      return;
    }

    const sfPath = "sf/Unison.sf2";
    let length = mod.lengthBytesUTF8(sfPath) + 1;
    let pcStr = mod._malloc(length);
    mod.stringToUTF8(sfPath, pcStr, length);
    const sfont_id = mod._fluid_synth_sfload(synth, pcStr, 1);
    mod._free(pcStr);
    if (sfont_id == FLUID_FAILED) {
      console.error("Loading the SoundFont failed!");
      return;
    }

    const driver = this.makeWAString('audio.driver');
    const driverType = this.makeWAString("file");
    mod._fluid_settings_setstr(fluidSettings, driver, driverType);
    /*
        const adriver = this.mod._new_fluid_audio_driver(fluidSettings, synth);
        if (!adriver) {
          console.error("Failed to create the audio driver!");
          return;
        }
    */

    const array = new Int32Array(this.mod.asm.memory.buffer, 128, 256)
    const left = new Float32Array(this.mod.asm.memory.buffer, 1024 * 1024, 64 * 1024);
    const right = new Float32Array(this.mod.asm.memory.buffer, 1024 * 1024 * 2, 64 * 1024);
    array.set([left.byteOffset, right.byteOffset])


    for (let i = 0; i < 128; i++) {
      /* Generate a random key */
      let key = 60 + Math.floor(128 * Math.random());

      /* Play a note */
      this.mod._fluid_synth_noteon(synth, 0, key, 80);
      const result = this.mod._fluid_synth_process(synth, 48000, 0, null, 2, array.byteOffset);
      /* Sleep for 1 second */
      // sleep(1);

      /* Stop the note */
      this.mod._fluid_synth_noteoff(synth, 0, key);
    }

  }

  private makeWAString(input: string): number {
    const len = this.mod.lengthBytesUTF8(input) + 1;
    const pcStr = this.mod._malloc(len);
    this.mod.stringToUTF8(input, pcStr, len);
    return pcStr;
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    // const dog = window.Module._new_fluid_settings();
    console.log('view init');
  }
}
