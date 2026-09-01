// Web Audio API procedural sound synthesizer (Zero external MP3 dependencies)

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.volume = 0.7;
    this.soundPack = 'cherry-blue';
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.muted = muted;
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  setPack(packId) {
    if (packId) {
      this.soundPack = packId;
    }
  }

  getPack() {
    return this.soundPack;
  }

  // Keycap click with switchable acoustic profiles
  playKeyClick(overridePack = null) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const t = this.ctx.currentTime;
    const pack = overridePack || this.soundPack || 'cherry-blue';

    if (pack === 'ibm-model-m') {
      // Vintage IBM Model M: Heavy buckling spring impact + metallic ringing resonance
      const oscImpact = this.ctx.createOscillator();
      const oscPing = this.ctx.createOscillator();
      const gainImpact = this.ctx.createGain();
      const gainPing = this.ctx.createGain();

      // Heavy steel plate bottom-out impact
      oscImpact.type = 'triangle';
      oscImpact.frequency.setValueAtTime(460 + Math.random() * 40, t);
      oscImpact.frequency.exponentialRampToValueAtTime(110, t + 0.055);

      gainImpact.gain.setValueAtTime(0.4 * this.volume, t);
      gainImpact.gain.exponentialRampToValueAtTime(0.001, t + 0.055);

      oscImpact.connect(gainImpact);
      gainImpact.connect(this.ctx.destination);

      // Buckling spring high metallic ping
      oscPing.type = 'square';
      oscPing.frequency.setValueAtTime(1750 + Math.random() * 100, t);
      oscPing.frequency.exponentialRampToValueAtTime(800, t + 0.04);

      gainPing.gain.setValueAtTime(0.25 * this.volume, t);
      gainPing.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

      oscPing.connect(gainPing);
      gainPing.connect(this.ctx.destination);

      oscImpact.start(t);
      oscPing.start(t);
      oscImpact.stop(t + 0.055);
      oscPing.stop(t + 0.07);

    } else if (pack === 'gateron-brown') {
      // Tactile dampened bump: Soft rounded pop, gentle low-frequency dampening
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520 + Math.random() * 50, t);
      osc.frequency.exponentialRampToValueAtTime(140, t + 0.045);

      gain.gain.setValueAtTime(0.3 * this.volume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.045);

    } else if (pack === 'thocky') {
      // Thocky Lubed Linear: Deep, marbly acoustic thock on premium POM stems
      const oscSub = this.ctx.createOscillator();
      const oscBody = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Deep sub-bass thud
      oscSub.type = 'sine';
      oscSub.frequency.setValueAtTime(260 + Math.random() * 30, t);
      oscSub.frequency.exponentialRampToValueAtTime(55, t + 0.065);

      // Warm marble harmonic
      oscBody.type = 'triangle';
      oscBody.frequency.setValueAtTime(180, t);
      oscBody.frequency.exponentialRampToValueAtTime(70, t + 0.045);

      gain.gain.setValueAtTime(0.48 * this.volume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.065);

      oscSub.connect(gain);
      oscBody.connect(gain);
      gain.connect(this.ctx.destination);

      oscSub.start(t);
      oscBody.start(t);
      oscSub.stop(t + 0.065);
      oscBody.stop(t + 0.065);

    } else if (pack === 'chiptune') {
      // 8-bit arcade arpeggio blip: Staccato retro square wave jump
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(523.25, t); // C5
      osc.frequency.setValueAtTime(1046.5, t + 0.015); // C6

      gain.gain.setValueAtTime(0.22 * this.volume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.04);

    } else {
      // Default cherry-blue: Crisp dual click (high-frequency tactile snap + bottom-out)
      const oscSnap = this.ctx.createOscillator();
      const oscClick = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Sharp mechanical snap
      oscSnap.type = 'triangle';
      oscSnap.frequency.setValueAtTime(1600 + Math.random() * 150, t);
      oscSnap.frequency.exponentialRampToValueAtTime(450, t + 0.02);

      // Crisp acoustic click
      oscClick.type = 'sine';
      oscClick.frequency.setValueAtTime(850 + Math.random() * 100, t);
      oscClick.frequency.exponentialRampToValueAtTime(180, t + 0.035);

      gain.gain.setValueAtTime(0.35 * this.volume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

      oscSnap.connect(gain);
      oscClick.connect(gain);
      gain.connect(this.ctx.destination);

      oscSnap.start(t);
      oscClick.start(t);
      oscSnap.stop(t + 0.02);
      oscClick.stop(t + 0.035);
    }
  }

  // Error buzzer / wrong key sound
  playErrorBuzz() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, t);
    osc.frequency.linearRampToValueAtTime(110, t + 0.12);

    gain.gain.setValueAtTime(0.35 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.12);
  }

  playError() {
    this.playErrorBuzz();
  }

  // Success chime on completing a word or step
  playSuccessChime() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + i * 0.06);

      gain.gain.setValueAtTime(0, t + i * 0.06);
      gain.gain.linearRampToValueAtTime(0.3 * this.volume, t + i * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t + i * 0.06);
      osc.stop(t + i * 0.06 + 0.25);
    });
  }

  playSuccess() {
    this.playSuccessChime();
  }

  playWordSuccess() {
    this.playSuccessChime();
  }

  // Star pop sound effect (1 to 5 stars)
  playStarPop(starIndex = 1) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const notes = [440, 554.37, 659.25, 880, 1108.73];
    const freq = notes[Math.min(starIndex - 1, notes.length - 1)] || 880;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * 0.8, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.2, t + 0.1);

    gain.gain.setValueAtTime(0.35 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.2);
  }

  // Balloon pop / leap sound
  playBalloonPop() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, t);
    osc.frequency.exponentialRampToValueAtTime(1200, t + 0.08);

    gain.gain.setValueAtTime(0.3 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.08);
  }

  // Ninja Katana blade slash whoosh sound
  playBladeSlash() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // Resonant high-to-low sweep
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1800, t);
    osc.frequency.exponentialRampToValueAtTime(320, t + 0.09);

    gain.gain.setValueAtTime(0.28 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.09);
  }

  // Arcade laser beam / plasma ray shot
  playLaserBeam() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(1400, t);
    osc1.frequency.exponentialRampToValueAtTime(180, t + 0.12);

    osc2.type = 'square';
    osc2.frequency.setValueAtTime(950, t);
    osc2.frequency.exponentialRampToValueAtTime(120, t + 0.12);

    gain.gain.setValueAtTime(0.24 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 0.12);
    osc2.stop(t + 0.12);
  }

  // Monster hit impact sound
  playMonsterHit() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(280, t);
    osc.frequency.exponentialRampToValueAtTime(60, t + 0.1);

    gain.gain.setValueAtTime(0.35 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.1);
  }

  // Monster defeat explosion sound
  playMonsterDefeat() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    
    // Sub-bass impact
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(180, t);
    osc1.frequency.exponentialRampToValueAtTime(30, t + 0.35);

    gain1.gain.setValueAtTime(0.4 * this.volume, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(t);
    osc1.stop(t + 0.35);

    // Celebratory victory sparkle
    [880, 1174.66, 1760].forEach((freq, idx) => {
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      const startT = t + 0.1 + idx * 0.07;
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq, startT);

      gain2.gain.setValueAtTime(0.2 * this.volume, startT);
      gain2.gain.exponentialRampToValueAtTime(0.001, startT + 0.2);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(startT);
      osc2.stop(startT + 0.2);
    });
  }

  // Combo multiplier tier unlock chime
  playComboChime(multiplier = 2) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const baseNotes = [659.25, 783.99, 1046.50, 1318.51, 1567.98];
    const chords = baseNotes.slice(0, Math.min(5, Math.max(2, multiplier)));

    chords.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startT = t + idx * 0.05;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startT);

      gain.gain.setValueAtTime(0.22 * this.volume, startT);
      gain.gain.exponentialRampToValueAtTime(0.001, startT + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startT);
      osc.stop(startT + 0.22);
    });
  }

  // Critical hit popup sound
  playCriticalHit() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1320, t);
    osc.frequency.exponentialRampToValueAtTime(2640, t + 0.12);

    gain.gain.setValueAtTime(0.3 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.15);
  }

  // Slingshot twang / acorn shot
  playSlingshot() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.05);
    osc.frequency.exponentialRampToValueAtTime(110, t + 0.12);

    gain.gain.setValueAtTime(0.3 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.12);
  }

  // Apple drop into basket / wooden thud
  playAppleDrop() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(140, t + 0.09);

    gain.gain.setValueAtTime(0.35 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.09);
  }

  // Stone block hammer bash / crash
  playStoneBash() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(240, t);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.18);

    gain.gain.setValueAtTime(0.4 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.18);
  }

  // Chisel / Hammer strike on stone
  playChiselStrike() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(1200 + Math.random() * 300, t);
    osc1.frequency.exponentialRampToValueAtTime(300, t + 0.08);
    gain1.gain.setValueAtTime(0.3 * this.volume, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(t);
    osc1.stop(t + 0.08);

    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(280, t);
    osc2.frequency.exponentialRampToValueAtTime(60, t + 0.1);
    gain2.gain.setValueAtTime(0.35 * this.volume, t);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(t);
    osc2.stop(t + 0.1);
  }

  // Stone block crumbling and destruction physics sound
  playStoneCrumble() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.35);
    gain.gain.setValueAtTime(0.45 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.35);

    [0.05, 0.12, 0.2].forEach((offset, idx) => {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      const st = t + offset;
      o.type = 'triangle';
      o.frequency.setValueAtTime(450 - idx * 70, st);
      o.frequency.exponentialRampToValueAtTime(80, st + 0.08);
      g.gain.setValueAtTime(0.2 * this.volume, st);
      g.gain.exponentialRampToValueAtTime(0.001, st + 0.08);
      o.connect(g);
      g.connect(this.ctx.destination);
      o.start(st);
      o.stop(st + 0.08);
    });
  }

  // Underwater bubble burst / pop
  playBubbleBurst() {
    this.playBubblePop();
    this.playWaterSplash();
  }

  playBubblePop() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(550 + Math.random() * 150, t);
    osc.frequency.exponentialRampToValueAtTime(1500 + Math.random() * 200, t + 0.07);

    gain.gain.setValueAtTime(0.3 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.07);
  }

  // Water ripple splash
  playWaterSplash() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(700, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.12);
    gain.gain.setValueAtTime(0.25 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.12);
  }

  // Submarine / underwater sonar ping
  playSonarPing() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, t);
    osc.frequency.exponentialRampToValueAtTime(1380, t + 0.4);
    gain.gain.setValueAtTime(0.25 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.45);
  }

  // Rolling counter tick sound effect
  playCounterTick(pitch = 1) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600 * pitch, t);
    osc.frequency.exponentialRampToValueAtTime(1200 * pitch, t + 0.03);

    gain.gain.setValueAtTime(0.12 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.035);
  }

  // Interactive pawn hopping sound
  playAvatarHop() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(740, t + 0.09);
    osc.frequency.exponentialRampToValueAtTime(440, t + 0.16);

    gain.gain.setValueAtTime(0.28 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.18);
  }

  // Mystical glowing rune chime
  playRuneGlow(index = 0) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    const freq = notes[index % notes.length];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.linearRampToValueAtTime(freq * 1.05, t + 0.15);

    gain.gain.setValueAtTime(0.25 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.35);
  }

  // Giant stone mechanical gate rumble & unlocking chains
  playGateRumble() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Deep sub bass stone rumble
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(90, t);
    osc1.frequency.linearRampToValueAtTime(45, t + 0.6);
    gain1.gain.setValueAtTime(0.4 * this.volume, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(t);
    osc1.stop(t + 0.6);

    // Mechanical gear click / chain rattle
    [0.08, 0.18, 0.28, 0.4].forEach((offset, idx) => {
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      const st = t + offset;
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(700 + idx * 120, st);
      osc2.frequency.exponentialRampToValueAtTime(200, st + 0.05);
      gain2.gain.setValueAtTime(0.2 * this.volume, st);
      gain2.gain.exponentialRampToValueAtTime(0.001, st + 0.05);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(st);
      osc2.stop(st + 0.05);
    });
  }

  // Victory fanfare
  playVictoryFanfare() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const chords = [
      [523.25, 659.25, 783.99],
      [587.33, 739.99, 880.00],
      [659.25, 830.61, 987.77],
      [1046.50, 1318.51, 1567.98]
    ];

    chords.forEach((chord, step) => {
      const t = this.ctx.currentTime + step * 0.12;
      chord.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.18 * this.volume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.4);
      });
    });
  }

  playTada() {
    this.playVictoryFanfare();
  }

  playLevelComplete() {
    this.playVictoryFanfare();
  }
}

export const sound = new SoundEngine();
