class FluidWorklet extends AudioWorkletProcessor {
  mod = AudioWorkletGlobalScope.wasmModule;
  leftBuffer;
  rightBuffer;
  pcmBuffers;
  synth;

  constructor(options) {
    super();
    this.initDone = false;
    this.active = true;


    this.port.onmessage = (event) => {
      switch (event.data.type) {
        case 'init':
          this.configureBuffers();
          break;
        case 'load_soundbank':
          this.loadSoundbank(event.data.bank);
          break;
        case 'note_on':
          this.mod._fluid_synth_noteon(this.synth, event.data.channel, event.data.note, event.data.velocity);
          break;
        case 'note_off':
          this.mod._fluid_synth_noteoff(this.synth, event.data.channel, event.data.note, event.data.velocity);
          break;
        case 'program_change':
          this.mod._fluid_synth_program_change(this.synth, event.data.channel, event.data.program);
          break;
        case 'stop':
          this.active = false;
          this.port.postMessage({type: 'stopped'});
          break;
        case 'data':
          break;
        case 'no_buffer':
          // Force stop buffering
          this.threshold = true;
          break;
        case 'sync':
          // force a buffer request
          break;
        default:
          console.log(`Unknown message received by Reader worklet: ${event.data.toString()}`);
          break;
      }
    };
  }

  configureBuffers() {
    if (this.initDone) {
      this.port.postMessage({type: 'init'});
      return;
    }

    try {
      this.pcmBuffers = new Int32Array(this.mod.asm.memory.buffer, 128, 2)
      this.leftBuffer = new Float32Array(this.mod.asm.memory.buffer, 1024, 128);
      this.rightBuffer = new Float32Array(this.mod.asm.memory.buffer, 2048, 128);
      this.pcmBuffers.set([this.leftBuffer.byteOffset, this.rightBuffer.byteOffset])
      const fluidSettings = this.mod._new_fluid_settings();
      this.synth = this.mod._new_fluid_synth(fluidSettings);
      if (!this.synth) {
        console.error("Failed to create the synth!");
        return;
      }
      this.initDone = true;
      this.port.postMessage({type: 'init'});
      console.log('Worklet config complete');
    } catch {
      console.error('Config not ready');
    }
  }

  loadSoundbank(sb_data) {
    const FLUID_FAILED = -1;
    const FS = this.mod.FS;

    try {
      FS.mkdir('/sf');
    } catch (e) {
      console.error(e);
    }
    const path = "/sf/sf.sf2";
    const fh = FS.open(path, "w");
    const data = new Uint8Array(sb_data);
    FS.write(fh, data, 0, data.length, 0);
    FS.close(fh);


    const sfPath = "/sf/sf.sf2";
    let length = this.mod.lengthBytesUTF8(sfPath) + 1;
    let pcStr = this.mod._malloc(length);
    this.mod.stringToUTF8(sfPath, pcStr, length);
    const sfont_id = this.mod._fluid_synth_sfload(this.synth, pcStr, 1);
    this.mod._free(pcStr);
    if (sfont_id == FLUID_FAILED) {
      console.error("Loading the SoundFont failed!");
      return;
    }

  }

  statusMsg(msg) {
    this.port.postMessage({type: 'status', msg: msg});
  }

  makeWAString(input) {
    const len = this.mod.lengthBytesUTF8(input) + 1;
    const pcStr = this.mod._malloc(len);
    this.mod.stringToUTF8(input, pcStr, len);
    return pcStr;
  }

  process(inputs, outputs, parameters) {
    if (this.initDone) {
      for (let i = 0; i < 128; i++) {
        this.leftBuffer[i] = this.rightBuffer[i] = 0;
      }
      const result = this.mod._fluid_synth_process(this.synth, 128, 0, null, 2, this.pcmBuffers.byteOffset);
      for (let i = 0; i < 128; i++) {
        outputs[0][0][i] = this.leftBuffer[i];
        outputs[0][1][i] = this.rightBuffer[i];
      }
    }

    return this.active;
  }

}

registerProcessor('fluid-worklet', FluidWorklet);
