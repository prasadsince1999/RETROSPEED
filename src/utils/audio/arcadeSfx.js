// RETROSPEED Procedural Arcade Game Audio Synthesizers

export function playBalloonPop(ctx, volume) {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(400, t);
  osc.frequency.exponentialRampToValueAtTime(1200, t + 0.08);

  gain.gain.setValueAtTime(0.3 * volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.08);
}

export function playBladeSlash(ctx, volume) {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(1800, t);
  osc.frequency.exponentialRampToValueAtTime(320, t + 0.09);

  gain.gain.setValueAtTime(0.28 * volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.09);
}

export function playLaserBeam(ctx, volume) {
  const t = ctx.currentTime;
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.type = 'sawtooth';
  osc1.frequency.setValueAtTime(1400, t);
  osc1.frequency.exponentialRampToValueAtTime(180, t + 0.12);

  osc2.type = 'square';
  osc2.frequency.setValueAtTime(950, t);
  osc2.frequency.exponentialRampToValueAtTime(120, t + 0.12);

  gain.gain.setValueAtTime(0.24 * volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(t);
  osc2.start(t);
  osc1.stop(t + 0.12);
  osc2.stop(t + 0.12);
}

export function playMonsterHit(ctx, volume) {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(280, t);
  osc.frequency.exponentialRampToValueAtTime(60, t + 0.1);

  gain.gain.setValueAtTime(0.35 * volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.1);
}

export function playMonsterDefeat(ctx, volume) {
  const t = ctx.currentTime;
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = 'sawtooth';
  osc1.frequency.setValueAtTime(180, t);
  osc1.frequency.exponentialRampToValueAtTime(30, t + 0.35);

  gain1.gain.setValueAtTime(0.4 * volume, t);
  gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  osc1.start(t);
  osc1.stop(t + 0.35);

  [880, 1174.66, 1760].forEach((freq, idx) => {
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    const startT = t + 0.1 + idx * 0.07;
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq, startT);

    gain2.gain.setValueAtTime(0.2 * volume, startT);
    gain2.gain.exponentialRampToValueAtTime(0.001, startT + 0.2);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(startT);
    osc2.stop(startT + 0.2);
  });
}

export function playSlingshot(ctx, volume) {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(220, t);
  osc.frequency.exponentialRampToValueAtTime(880, t + 0.05);
  osc.frequency.exponentialRampToValueAtTime(110, t + 0.12);

  gain.gain.setValueAtTime(0.3 * volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.12);
}

export function playAppleDrop(ctx, volume) {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(320, t);
  osc.frequency.exponentialRampToValueAtTime(140, t + 0.09);

  gain.gain.setValueAtTime(0.35 * volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.09);
}

export function playStoneBash(ctx, volume) {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(240, t);
  osc.frequency.exponentialRampToValueAtTime(45, t + 0.18);

  gain.gain.setValueAtTime(0.4 * volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.18);
}

export function playChiselStrike(ctx, volume) {
  const t = ctx.currentTime;
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = 'triangle';
  osc1.frequency.setValueAtTime(1200 + Math.random() * 300, t);
  osc1.frequency.exponentialRampToValueAtTime(300, t + 0.08);
  gain1.gain.setValueAtTime(0.3 * volume, t);
  gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  osc1.start(t);
  osc1.stop(t + 0.08);

  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = 'sawtooth';
  osc2.frequency.setValueAtTime(280, t);
  osc2.frequency.exponentialRampToValueAtTime(60, t + 0.1);
  gain2.gain.setValueAtTime(0.35 * volume, t);
  gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  osc2.start(t);
  osc2.stop(t + 0.1);
}

export function playStoneCrumble(ctx, volume) {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(140, t);
  osc.frequency.exponentialRampToValueAtTime(30, t + 0.35);
  gain.gain.setValueAtTime(0.45 * volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.35);

  [0.05, 0.12, 0.2].forEach((offset, idx) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    const st = t + offset;
    o.type = 'triangle';
    o.frequency.setValueAtTime(450 - idx * 70, st);
    o.frequency.exponentialRampToValueAtTime(80, st + 0.08);
    g.gain.setValueAtTime(0.2 * volume, st);
    g.gain.exponentialRampToValueAtTime(0.001, st + 0.08);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(st);
    o.stop(st + 0.08);
  });
}

export function playBubblePop(ctx, volume) {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(550 + Math.random() * 150, t);
  osc.frequency.exponentialRampToValueAtTime(1500 + Math.random() * 200, t + 0.07);

  gain.gain.setValueAtTime(0.3 * volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.07);
}

export function playWaterSplash(ctx, volume) {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(700, t);
  osc.frequency.exponentialRampToValueAtTime(200, t + 0.12);
  gain.gain.setValueAtTime(0.25 * volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.12);
}

export function playSonarPing(ctx, volume) {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1400, t);
  osc.frequency.exponentialRampToValueAtTime(1380, t + 0.4);
  gain.gain.setValueAtTime(0.25 * volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.45);
}
