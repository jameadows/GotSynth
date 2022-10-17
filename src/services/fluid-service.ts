import {WebSocketSubject} from "rxjs/webSocket";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

function statusMsg(msg: string) {
  console.log(msg);
}

export class FluidService extends AudioWorkletNode {
  static WorkletModule = '/assets/js/fluid-worklet.js';
  static WorkletClass = 'fluid-worklet';

  constructor(
    context: AudioContext,
    params: AudioWorkletNodeOptions = {},) {
    super(context, FluidService.WorkletClass, params);
    this.port.onmessage = (event) => {
      switch (event.data.type) {
        case 'status':
          statusMsg('render-process: ' + event.data.msg);
          break;
        default:
          statusMsg('capture-process: Unknown message received');
      }
    }

    let initParams = {
      outputChannelCount: [2],
      numberOfInputs: 0,
      numberOfOutputs: 1,
      latencyHint: 'playback',
      parameterData: params
    };
  }

}

@Injectable({
  providedIn: 'root'
})
export class FLuidDeployer {
  private fluidService!: FluidService | undefined;


  constructor() {
  }

  public stopFluidService(): void {
    if (this.fluidService) {
      this.fluidService.disconnect();
      this.fluidService.port.postMessage({type: 'stop'});
    }
  }

  public startFluidService(): Observable<FluidService> {
    const subject = new ReplaySubject<FluidService>();
    this.startAudioProcessor(subject);
    return subject.asObservable();
  }

  private startAudioProcessor(subject: Subject<FluidService>): void {

    let context: AudioContext = new AudioContext({sampleRate: 48000});
    context.audioWorklet.addModule('/assets/js/libfluidsynth-2.2.1.js').then(() =>
      context.audioWorklet.addModule(FluidService.WorkletModule).then(() => {
        let instance = new FluidService(context, {
          numberOfInputs: 0,
          numberOfOutputs: 1,
          outputChannelCount: [2]
        });

        return instance;
      }).then(instance => {
        // @ts-ignore
        // instance.port.postMessage({type: 'module', module: AudioWorkletGlobalScope.wasmModule})
        instance.connect(context.destination);
        subject.next(instance);
      }).catch(err => subject.error(err)));
  }
}
