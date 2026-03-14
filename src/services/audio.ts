export const audio = {
  ctx: null as AudioContext | null,
  noiseBuffer: null as AudioBuffer | null,
  
  init() {
    try {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
          this.createNoise();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    } catch (e) {
      console.warn('AudioContext initialization failed', e);
    }
  },

  createNoise() {
    if (!this.ctx || this.noiseBuffer) return;
    const bufferSize = this.ctx.sampleRate * 2; // 2 seconds of noise
    this.noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1; // White noise
    }
  },

  playBreath(duration: number, type: 'inhale' | 'exhale') {
    if (!this.ctx || !this.noiseBuffer) return;
    try {
      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = this.noiseBuffer;
      noiseSource.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.Q.value = 1;

      const gain = this.ctx.createGain();

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      const now = this.ctx.currentTime;
      
      if (type === 'inhale') {
        filter.frequency.setValueAtTime(300, now);
        filter.frequency.exponentialRampToValueAtTime(1200, now + duration);
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.2, now + duration * 0.7);
        gain.gain.linearRampToValueAtTime(0, now + duration);
      } else {
        filter.frequency.setValueAtTime(1200, now);
        filter.frequency.exponentialRampToValueAtTime(300, now + duration);
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.15, now + duration * 0.2);
        gain.gain.linearRampToValueAtTime(0, now + duration);
      }

      noiseSource.start(now);
      noiseSource.stop(now + duration);
    } catch (e) {
      console.warn('Breath audio failed', e);
    }
  },

  playInhale(duration: number) {
    this.playBreath(duration, 'inhale');
  },

  playExhale(duration: number) {
    this.playBreath(duration, 'exhale');
  },

  playChime() {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const duration = 4;
      
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.value = 432;
      
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.value = 432 * 2.78; 

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);

      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.3, now + 0.05);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + duration);

      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(0.1, now + 0.05);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + duration / 2);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);
    } catch (e) {
      console.warn('Chime audio failed', e);
    }
  }
};
