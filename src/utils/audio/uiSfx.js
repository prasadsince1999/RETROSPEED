// RETROSPEED UI & Milestone Sound Effects

export function playErrorBuzz(ctx, volume) {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(160, t);
  osc.frequency.linearRampToValueAtTime(110, t + 0.12);

  gain.gain.setValueAtTime(0.35 * volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.12);
}

export function playSuccessChime(ctx, volume) {
  const t = ctx.currentTime;
  [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, t + i * 0.06);

    gain.gain.setValueAtTime(0, t + i * 0.06);
    gain.gain.linearRampToValueAtTime(0.3 * volume, t + i * 0.06 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t + i * 0.06);
    osc.stop(t + i * 0.06 + 0.25);
  });
}

export function playStarPop(ctx, volume, starIndex = 1) {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  const notes = [440, 554.37, 659.25, 880, 1108.73];
  const freq = notes[Math.min(starIndex - 1, notes.length - 1)] || 880;

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq * 0.8, t);
  osc.frequency.exponentialRampToValueAtTime(freq * 1.2, t + 0.1);

  gain.gain.setValueAtTime(0.35 * volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.2);
}

export function playComboChime(ctx, volume, multiplier = 2) {
  const t = ctx.currentTime;
  const baseNotes = [659.25, 783.99, 1046.50, 1318.51, 1567.98];
  const chords = baseNotes.slice(0, Math.min(5, Math.max(2, multiplier)));

  chords.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const startT = t + idx * 0.05;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startT);

    gain.gain.setValueAtTime(0.22 * volume, startT);
    gain.gain.exponentialRampToValueAtTime(0.001, startT + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startT);
    osc.stop(startT + 0.22);
  });
}

export function playCriticalHit(ctx, volume) {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(1320, t);
  osc.frequency.exponentialRampToValueAtTime(2640, t + 0.12);

  gain.gain.setValueAtTime(0.3 * volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.15);
}

export function playCounterTick(ctx, volume, pitch = 1) {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(600 * pitch, t);
  osc.frequency.exponentialRampToValueAtTime(1200 * pitch, t + 0.03);

  gain.gain.setValueAtTime(0.12 * volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.035);
}

export function playAvatarHop(ctx, volume) {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(320, t);
  osc.frequency.exponentialRampToValueAtTime(740, t + 0.09);
  osc.frequency.exponentialRampToValueAtTime(440, t + 0.16);

  gain.gain.setValueAtTime(0.28 * volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.18);
}

export function playRuneGlow(ctx, volume, index = 0) {
  const t = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
  const freq = notes[index % notes.length];

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, t);
  osc.frequency.linearRampToValueAtTime(freq * 1.05, t + 0.15);

  gain.gain.setValueAtTime(0.25 * volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.35);
}

export function playGateRumble(ctx, volume) {
  const t = ctx.currentTime;

  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = 'sawtooth';
  osc1.frequency.setValueAtTime(90, t);
  osc1.frequency.linearRampToValueAtTime(45, t + 0.6);
  gain1.gain.setValueAtTime(0.4 * volume, t);
  gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  osc1.start(t);
  osc1.stop(t + 0.6);

  [0.08, 0.18, 0.28, 0.4].forEach((offset, idx) => {
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    const st = t + offset;
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(700 + idx * 120, st);
    osc2.frequency.exponentialRampToValueAtTime(200, st + 0.05);
    gain2.gain.setValueAtTime(0.2 * volume, st);
    gain2.gain.exponentialRampToValueAtTime(0.001, st + 0.05);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(st);
    osc2.stop(st + 0.05);
  });
}

export function playVictoryFanfare(ctx, volume) {
  const chords = [
    [523.25, 659.25, 783.99],
    [587.33, 739.99, 880.00],
    [659.25, 830.61, 987.77],
    [1046.50, 1318.51, 1567.98]
  ];

  chords.forEach((chord, step) => {
    const t = ctx.currentTime + step * 0.12;
    chord.forEach(freq => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.18 * volume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.4);
    });
  });
}
