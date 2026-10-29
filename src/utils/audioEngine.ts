/**
 * Advanced Initial D Audio Engine
 * Features:
 * 1. Realistic 4A-GE 20V Silvertop Racing Engine with:
 *    - 4-cylinder combustion pulse synthesis (1-3-4-2 firing order)
 *    - ITB (Individual Throttle Body) intake roar with wave shaping & overdrive
 *    - Mechanical camshaft jitter & valve-train harmonics
 *    - Off-throttle exhaust crackles & overrun pops
 *    - 11,000 RPM spark-cut rev limiter (bap-bap-bap!)
 * 2. Japanese 80s Speed Chime (105 km/h ding-dong)
 * 3. Tire squeal & blow-off valve
 * 4. Multi-track Eurobeat Synthesizer & Jukebox:
 *    - "Running in the 90s" - Max Coveri
 *    - "Deja Vu" - Dave Rodgers
 *    - "Gas Gas Gas" - Manuel
 *    - "Space Boy" - Dave Rodgers
 */

export interface TrackInfo {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  stage: string;
  durationStr: string;
  youtubeId: string;
}

export const INITIAL_D_TRACKS: TrackInfo[] = [
  {
    id: 'rage-your-dream',
    title: 'Rage your Dream',
    artist: 'm.o.v.e',
    bpm: 142,
    stage: 'First Stage (Ep. 1–14 Ending & Downhill Finale)',
    durationStr: '4:35',
    youtubeId: 'jfLWWUm4o_U'
  },
  {
    id: 'around-the-world',
    title: 'around the world',
    artist: 'm.o.v.e',
    bpm: 148,
    stage: 'First Stage (Ep. 1–14 Opening 1)',
    durationStr: '5:14',
    youtubeId: '67K6oXHyf_Q'
  },
  {
    id: 'gamble-rumble',
    title: 'Gamble Rumble',
    artist: 'm.o.v.e',
    bpm: 154,
    stage: 'Third Stage Movie Theme & Final Battle',
    durationStr: '4:28',
    youtubeId: 'OPzrqry998s'
  },
  {
    id: 'break-in2-the-nite',
    title: 'BREAK IN2 THE NITE',
    artist: 'm.o.v.e',
    bpm: 150,
    stage: 'First Stage (Ep. 15–26 Opening 2)',
    durationStr: '4:39',
    youtubeId: '7OkzGLgyyCw'
  },
  {
    id: 'running-in-the-90s',
    title: 'Running in the 90s',
    artist: 'Max Coveri',
    bpm: 160,
    stage: 'First Stage (Ep. 4 - Akina Hairpin Battle)',
    durationStr: '4:46',
    youtubeId: 'bjJp_v6bE0g'
  },
  {
    id: 'deja-vu',
    title: 'Deja Vu',
    artist: 'Dave Rodgers',
    bpm: 155,
    stage: 'Second Stage (Ep. 13 - Blind Attack)',
    durationStr: '4:24',
    youtubeId: 'dv13gl0a-FA'
  }
];

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  // Realistic Engine Nodes
  private masterEngineGain: GainNode | null = null;
  private itbDistortion: WaveShaperNode | null = null;
  private intakeFilter: BiquadFilterNode | null = null;
  private exhaustFilter: BiquadFilterNode | null = null;
  private cylinderOscs: OscillatorNode[] = [];
  private cylinderGains: GainNode[] = [];
  private subRumbleOsc: OscillatorNode | null = null;
  private mechanicalNoise: AudioBufferSourceNode | null = null;
  private isEngineRunning: boolean = false;
  private currentRpm: number = 900;
  private targetRpm: number = 900;
  private engineLoopTimer: number | null = null;

  // Chime timer
  private chimeInterval: number | null = null;

  // Eurobeat Sequencer
  private currentTrackIndex: number = 0;
  private isEurobeatPlaying: boolean = false;
  private eurobeatTimer: number | null = null;
  private eurobeatGain: GainNode | null = null;
  private stepCount: number = 0;
  private onTrackChangeCallback: ((track: TrackInfo, isPlaying: boolean) => void) | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Distortion curve for intake/exhaust growl
  private makeDistortionCurve(amount: number = 30): Float32Array {
    const k = typeof amount === 'number' ? amount : 50;
    const nSamples = 44100;
    const curve = new Float32Array(nSamples);
    const deg = Math.PI / 180;
    for (let i = 0; i < nSamples; ++i) {
      const x = (i * 2) / nSamples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopEngine();
      this.stopEurobeat();
      this.stopChime();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * REALISTIC 4A-GE TWIN CAM 20-VALVE ENGINE START
   */
  public startEngine(initialRpm: number = 1000) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    if (this.isEngineRunning) {
      this.updateRPM(initialRpm);
      return;
    }

    try {
      const now = this.ctx.currentTime;
      this.currentRpm = initialRpm;
      this.targetRpm = initialRpm;

      // Master engine volume
      this.masterEngineGain = this.ctx.createGain();
      this.masterEngineGain.gain.setValueAtTime(0.01, now);
      this.masterEngineGain.gain.exponentialRampToValueAtTime(0.28, now + 0.1);

      // Overdrive distortion for ITB bark
      this.itbDistortion = this.ctx.createWaveShaper();
      this.itbDistortion.curve = this.makeDistortionCurve(22) as unknown as Float32Array<ArrayBuffer>;
      this.itbDistortion.oversample = '4x';

      // ITB Intake Air Filter (opens up as RPM climbs)
      this.intakeFilter = this.ctx.createBiquadFilter();
      this.intakeFilter.type = 'lowpass';
      this.intakeFilter.frequency.setValueAtTime(450, now);
      this.intakeFilter.Q.setValueAtTime(3.5, now);

      // Exhaust manifold resonance filter
      this.exhaustFilter = this.ctx.createBiquadFilter();
      this.exhaustFilter.type = 'bandpass';
      this.exhaustFilter.frequency.setValueAtTime(380, now);
      this.exhaustFilter.Q.setValueAtTime(2.2, now);

      // 4 Firing Cylinders with staggered harmonics (1-3-4-2)
      this.cylinderOscs = [];
      this.cylinderGains = [];

      const oscTypes: OscillatorType[] = ['sawtooth', 'triangle', 'sawtooth', 'square'];
      const harmonicMultipliers = [1, 2, 3, 4];

      for (let i = 0; i < 4; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = oscTypes[i];
        gain.gain.setValueAtTime(0.07 / (i + 1), now);

        osc.connect(gain);
        gain.connect(this.itbDistortion);
        this.cylinderOscs.push(osc);
        this.cylinderGains.push(gain);
        osc.start(now);
      }

      // Sub-harmonic low end rumble (chassis vibration)
      this.subRumbleOsc = this.ctx.createOscillator();
      this.subRumbleOsc.type = 'sine';
      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.12, now);
      this.subRumbleOsc.connect(subGain);
      subGain.connect(this.masterEngineGain);
      this.subRumbleOsc.start(now);

      // Routing: distortion -> intakeFilter -> exhaustFilter -> masterEngineGain -> destination
      this.itbDistortion.connect(this.intakeFilter);
      this.intakeFilter.connect(this.exhaustFilter);
      this.exhaustFilter.connect(this.masterEngineGain);
      this.masterEngineGain.connect(this.ctx.destination);

      this.isEngineRunning = true;
      this.updateRPM(initialRpm);

      // Mechanical jitter loop
      this.startEngineJitterLoop();
    } catch {
      // Audio autoplay policy fallback
    }
  }

  private startEngineJitterLoop() {
    if (this.engineLoopTimer) clearInterval(this.engineLoopTimer);

    this.engineLoopTimer = window.setInterval(() => {
      if (!this.isEngineRunning || !this.ctx) return;
      const now = this.ctx.currentTime;

      // Realistic 4-cylinder firing frequency: (RPM / 60) * 2 pulses per revolution
      const baseFreq = (this.currentRpm / 60) * 2;
      // Camshaft vibration micro-jitter
      const jitter = (Math.random() - 0.5) * 2.2;

      // Update cylinder frequencies
      const mults = [1, 2, 2.5, 4];
      this.cylinderOscs.forEach((osc, idx) => {
        const freq = Math.max(20, (baseFreq * mults[idx]) + jitter);
        osc.frequency.setTargetAtTime(freq, now, 0.03);
      });

      if (this.subRumbleOsc) {
        this.subRumbleOsc.frequency.setTargetAtTime(Math.max(25, baseFreq * 0.5), now, 0.05);
      }

      // Open intake filter on high RPM
      if (this.intakeFilter) {
        const targetCutoff = 350 + (this.currentRpm / 11000) * 3200;
        this.intakeFilter.frequency.setTargetAtTime(targetCutoff, now, 0.05);
      }

      if (this.exhaustFilter) {
        const exhaustFreq = 300 + (this.currentRpm / 11000) * 1800;
        this.exhaustFilter.frequency.setTargetAtTime(exhaustFreq, now, 0.05);
      }

      // Spark-Cut Rev Limiter at >10,400 RPM
      if (this.currentRpm >= 10400) {
        if (Math.random() > 0.45) {
          this.triggerSparkCutPop();
        }
      }
    }, 40);
  }

  public updateRPM(rpm: number) {
    if (!this.isEngineRunning || !this.ctx) return;
    this.targetRpm = Math.max(850, Math.min(11200, rpm));
    // Smooth RPM interpolation
    this.currentRpm = this.currentRpm + (this.targetRpm - this.currentRpm) * 0.4;
  }

  /**
   * Spark-cut pop / Flame backfire at rev-limiter or downshift
   */
  public triggerSparkCutPop() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // White noise blast for the exhaust pop
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.05);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const popFilter = this.ctx.createBiquadFilter();
      popFilter.type = 'lowpass';
      popFilter.frequency.setValueAtTime(900, now);

      const popGain = this.ctx.createGain();
      popGain.gain.setValueAtTime(0.4, now);
      popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      noise.connect(popFilter);
      popFilter.connect(popGain);
      popGain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.06);
    } catch {}
  }

  public stopEngine() {
    if (!this.isEngineRunning || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      if (this.masterEngineGain) {
        this.masterEngineGain.gain.setValueAtTime(this.masterEngineGain.gain.value, now);
        this.masterEngineGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      }
      if (this.engineLoopTimer) {
        clearInterval(this.engineLoopTimer);
        this.engineLoopTimer = null;
      }
      setTimeout(() => {
        try {
          this.cylinderOscs.forEach((o) => {
            o.stop();
            o.disconnect();
          });
          this.cylinderOscs = [];
          this.subRumbleOsc?.stop();
          this.subRumbleOsc?.disconnect();
          this.subRumbleOsc = null;
        } catch {}
        this.isEngineRunning = false;
      }, 130);
    } catch {
      this.isEngineRunning = false;
    }
  }

  /**
   * Initial D Turbo Blow-Off Valve (BOV) with Wastegate Compressor Flutter ("PSSSHHH-tsu-tsu-tsu")
   */
  public playBlowOffValve(volume: number = 0.35) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const duration = 0.45;
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Create high-pressure air rush with flutter modulation
      for (let i = 0; i < bufferSize; i++) {
        const t = i / this.ctx.sampleRate;
        // 14Hz flutter modulation (compressor surge flutter)
        const flutter = 0.6 + 0.4 * Math.sin(2 * Math.PI * 14 * t);
        const decay = Math.exp(-t * 6.5);
        data[i] = (Math.random() * 2 - 1) * flutter * decay;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(3400, now);
      bandpass.frequency.exponentialRampToValueAtTime(1400, now + duration);
      bandpass.Q.setValueAtTime(3.8, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noise.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + duration);
    } catch {}
  }

  /**
   * Mechanical Gear Shifter Clack (Dog-box transmission gate engagement)
   */
  public playGearShiftClack() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Metallic clunk
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.05);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);
      filter.Q.setValueAtTime(5, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {}
  }

  /**
   * Complete Gear Shift Action (Clutch-in -> Mechanical Clack -> Blow-off Valve -> Exhaust Pop)
   */
  public triggerGearShift(isUpShift: boolean = true) {
    this.playGearShiftClack();
    if (isUpShift) {
      setTimeout(() => {
        this.playBlowOffValve(0.38);
        this.triggerSparkCutPop();
      }, 40);
    } else {
      // Downshift heel & toe throttle blip
      setTimeout(() => {
        this.triggerSparkCutPop();
      }, 30);
    }
  }

  /**
   * Japanese 80s Speed Warning Chime (105+ km/h Ding-Dong)
   */
  public triggerSpeedChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // High bell (G5 ~ 784 Hz)
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(783.99, now);
    gain1.gain.setValueAtTime(0.14, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.4);

    // Low bell (D5 ~ 587 Hz)
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(587.33, now + 0.18);
    gain2.gain.setValueAtTime(0.14, now + 0.18);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(now + 0.18);
    osc2.stop(now + 0.65);
  }

  public startChimeLoop() {
    if (this.chimeInterval) return;
    this.triggerSpeedChime();
    this.chimeInterval = window.setInterval(() => {
      this.triggerSpeedChime();
    }, 1100);
  }

  public stopChime() {
    if (this.chimeInterval) {
      clearInterval(this.chimeInterval);
      this.chimeInterval = null;
    }
  }

  public playTireSqueal(durationMs: number = 700) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * (durationMs / 1000));
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(1600, now);
      bandpass.frequency.exponentialRampToValueAtTime(1050, now + durationMs / 1000);
      bandpass.Q.setValueAtTime(9, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + durationMs / 1000);

      noise.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + durationMs / 1000);
    } catch {}
  }

  /**
   * INITIAL D EUROBEAT JUKEBOX ENGINE
   */
  public registerTrackListener(cb: (track: TrackInfo, isPlaying: boolean) => void) {
    this.onTrackChangeCallback = cb;
  }

  public getCurrentTrack(): TrackInfo {
    return INITIAL_D_TRACKS[this.currentTrackIndex];
  }

  public getIsEurobeatPlaying(): boolean {
    return this.isEurobeatPlaying;
  }

  public toggleEurobeat(): boolean {
    if (this.isEurobeatPlaying) {
      this.stopEurobeat();
      return false;
    } else {
      this.startEurobeat();
      return true;
    }
  }

  public nextTrack(): TrackInfo {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % INITIAL_D_TRACKS.length;
    if (this.isEurobeatPlaying) {
      this.stopEurobeat();
      this.startEurobeat();
    }
    const track = INITIAL_D_TRACKS[this.currentTrackIndex];
    this.onTrackChangeCallback?.(track, this.isEurobeatPlaying);
    return track;
  }

  public prevTrack(): TrackInfo {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + INITIAL_D_TRACKS.length) % INITIAL_D_TRACKS.length;
    if (this.isEurobeatPlaying) {
      this.stopEurobeat();
      this.startEurobeat();
    }
    const track = INITIAL_D_TRACKS[this.currentTrackIndex];
    this.onTrackChangeCallback?.(track, this.isEurobeatPlaying);
    return track;
  }

  public selectTrack(index: number): TrackInfo {
    this.currentTrackIndex = index % INITIAL_D_TRACKS.length;
    if (this.isEurobeatPlaying) {
      this.stopEurobeat();
      this.startEurobeat();
    }
    const track = INITIAL_D_TRACKS[this.currentTrackIndex];
    this.onTrackChangeCallback?.(track, this.isEurobeatPlaying);
    return track;
  }

  public startEurobeat() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    this.isEurobeatPlaying = true;

    const track = INITIAL_D_TRACKS[this.currentTrackIndex];
    this.onTrackChangeCallback?.(track, true);

    const bpm = track.bpm;
    const stepTime = (60 / bpm) / 4; // 16th note
    this.stepCount = 0;

    // Melody & Bassline definitions for each track
    // 0: Running in the 90s (D minor)
    // 1: Deja Vu (A minor / F major)
    // 2: Gas Gas Gas (F# minor / A major)
    // 3: Space Boy (E minor)
    const trackMelodies: { bass: number[]; lead: number[] }[] = [
      {
        // Running in the 90s
        bass: [146.83, 146.83, 174.61, 174.61, 130.81, 130.81, 196.00, 196.00], // D3, F3, C3, G3
        lead: [587.33, 698.46, 783.99, 880.00, 783.99, 698.46, 659.25, 587.33]  // D5, F5, G5, A5...
      },
      {
        // Deja Vu
        bass: [220.00, 220.00, 174.61, 174.61, 196.00, 196.00, 164.81, 164.81], // A3, F3, G3, E3
        lead: [440.00, 523.25, 493.88, 440.00, 392.00, 440.00, 329.63, 440.00]  // "Deja Vu! I've just been in this place..."
      },
      {
        // Gas Gas Gas
        bass: [185.00, 185.00, 220.00, 220.00, 246.94, 246.94, 220.00, 185.00], // F#3, A3, B3...
        lead: [740.00, 880.00, 987.77, 1108.73, 987.77, 880.00, 740.00, 880.00] // "Gas, gas, gas! Gonna step on the gas!"
      },
      {
        // Space Boy
        bass: [164.81, 164.81, 220.00, 220.00, 196.00, 196.00, 146.83, 146.83], // E3, A3, G3, D3
        lead: [659.25, 783.99, 880.00, 987.77, 880.00, 783.99, 659.25, 587.33]
      }
    ];

    const currentNotes = trackMelodies[this.currentTrackIndex] || trackMelodies[0];

    this.eurobeatTimer = window.setInterval(() => {
      if (!this.isEurobeatPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const step = this.stepCount;

      // 1. Kick Drum (steps 0, 4, 8, 12 in 16-step bar)
      if (step % 4 === 0) {
        const kickOsc = this.ctx.createOscillator();
        const kickGain = this.ctx.createGain();
        kickOsc.frequency.setValueAtTime(160, now);
        kickOsc.frequency.exponentialRampToValueAtTime(38, now + 0.09);
        kickGain.gain.setValueAtTime(0.45, now);
        kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        kickOsc.connect(kickGain);
        kickGain.connect(this.ctx.destination);
        kickOsc.start(now);
        kickOsc.stop(now + 0.12);
      }

      // 2. Snare / Clack (steps 4, 12)
      if (step % 8 === 4) {
        const snareNoise = this.ctx.createBufferSource();
        const bSize = Math.floor(this.ctx.sampleRate * 0.09);
        const b = this.ctx.createBuffer(1, bSize, this.ctx.sampleRate);
        const d = b.getChannelData(0);
        for (let i = 0; i < bSize; i++) d[i] = Math.random() * 2 - 1;
        snareNoise.buffer = b;
        const sFilter = this.ctx.createBiquadFilter();
        sFilter.type = 'highpass';
        sFilter.frequency.setValueAtTime(1200, now);
        const sGain = this.ctx.createGain();
        sGain.gain.setValueAtTime(0.25, now);
        sGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        snareNoise.connect(sFilter);
        sFilter.connect(sGain);
        sGain.connect(this.ctx.destination);
        snareNoise.start(now);
        snareNoise.stop(now + 0.09);
      }

      // 3. Hi-hat (every 16th offbeat)
      if (step % 2 === 1) {
        const hatOsc = this.ctx.createOscillator();
        const hatGain = this.ctx.createGain();
        hatOsc.type = 'sawtooth';
        hatOsc.frequency.setValueAtTime(7500, now);
        hatGain.gain.setValueAtTime(0.08, now);
        hatGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        hatOsc.connect(hatGain);
        hatGain.connect(this.ctx.destination);
        hatOsc.start(now);
        hatOsc.stop(now + 0.04);
      }

      // 4. Rolling 16th Octave Sawtooth Bassline
      const bassIndex = Math.floor(step / 2) % currentNotes.bass.length;
      const octaveMult = (step % 2 === 1) ? 2 : 1; // Octave gallop typical of Eurobeat
      const bassFreq = currentNotes.bass[bassIndex] * octaveMult;

      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bassOsc.type = 'sawtooth';
      bassOsc.frequency.setValueAtTime(bassFreq, now);

      const bassFilter = this.ctx.createBiquadFilter();
      bassFilter.type = 'lowpass';
      bassFilter.frequency.setValueAtTime(800, now);

      bassGain.gain.setValueAtTime(0.18, now);
      bassGain.gain.exponentialRampToValueAtTime(0.01, now + stepTime * 0.85);

      bassOsc.connect(bassFilter);
      bassFilter.connect(bassGain);
      bassGain.connect(this.ctx.destination);
      bassOsc.start(now);
      bassOsc.stop(now + stepTime * 0.85);

      // 5. 90s Eurobeat Synth Brass Lead Stabs
      if (step % 2 === 0) {
        const leadIndex = Math.floor(step / 4) % currentNotes.lead.length;
        const leadFreq = currentNotes.lead[leadIndex];

        // Dual detuned saw for thick Eurobeat brass
        const leadOsc1 = this.ctx.createOscillator();
        const leadOsc2 = this.ctx.createOscillator();
        const leadGain = this.ctx.createGain();

        leadOsc1.type = 'sawtooth';
        leadOsc2.type = 'sawtooth';
        leadOsc1.frequency.setValueAtTime(leadFreq, now);
        leadOsc2.frequency.setValueAtTime(leadFreq * 1.008, now); // Detune +8 cents

        const leadFilter = this.ctx.createBiquadFilter();
        leadFilter.type = 'lowpass';
        leadFilter.frequency.setValueAtTime(2600, now);
        leadFilter.frequency.exponentialRampToValueAtTime(1100, now + stepTime * 1.6);

        leadGain.gain.setValueAtTime(0.12, now);
        leadGain.gain.exponentialRampToValueAtTime(0.001, now + stepTime * 1.8);

        leadOsc1.connect(leadFilter);
        leadOsc2.connect(leadFilter);
        leadFilter.connect(leadGain);
        leadGain.connect(this.ctx.destination);

        leadOsc1.start(now);
        leadOsc2.start(now);
        leadOsc1.stop(now + stepTime * 1.8);
        leadOsc2.stop(now + stepTime * 1.8);
      }

      this.stepCount = (this.stepCount + 1) % 64;
    }, stepTime * 1000);
  }

  public stopEurobeat() {
    this.isEurobeatPlaying = false;
    if (this.eurobeatTimer) {
      clearInterval(this.eurobeatTimer);
      this.eurobeatTimer = null;
    }
    const track = INITIAL_D_TRACKS[this.currentTrackIndex];
    this.onTrackChangeCallback?.(track, false);
  }
}

export const audioEngine = new AudioEngine();
