// RETROSPEED Synthesized Mechanical Key Switch Acoustic Profiles

export function playSynthesizedKeyClick(ctx, volume, pack) {
  const t = ctx.currentTime;

  if (pack === 'ibm-model-m') {
    // Heavy steel plate bottom-out impact + buckling spring ringing
    const oscImpact = ctx.createOscillator();
    const oscPing = ctx.createOscillator();
    const gainImpact = ctx.createGain();
    const gainPing = ctx.createGain();

    oscImpact.type = 'triangle';
    oscImpact.frequency.setValueAtTime(460 + Math.random() * 40, t);
    oscImpact.frequency.exponentialRampToValueAtTime(110, t + 0.055);

    gainImpact.gain.setValueAtTime(0.4 * volume, t);
    gainImpact.gain.exponentialRampToValueAtTime(0.001, t + 0.055);

    oscImpact.connect(gainImpact);
    gainImpact.connect(ctx.destination);

    oscPing.type = 'square';
    oscPing.frequency.setValueAtTime(1750 + Math.random() * 100, t);
    oscPing.frequency.exponentialRampToValueAtTime(800, t + 0.04);

    gainPing.gain.setValueAtTime(0.25 * volume, t);
    gainPing.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

    oscPing.connect(gainPing);
    gainPing.connect(ctx.destination);

    oscImpact.start(t);
    oscPing.start(t);
    oscImpact.stop(t + 0.055);
    oscPing.stop(t + 0.07);

  } else if (pack === 'gateron-brown') {
    // Tactile dampened bump: Soft rounded pop, gentle low-frequency dampening
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520 + Math.random() * 50, t);
    osc.frequency.exponentialRampToValueAtTime(140, t + 0.045);

    gain.gain.setValueAtTime(0.3 * volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.045);

  } else if (pack === 'holy-panda') {
    // Holy Panda: Snappy high tactile pop followed by woody, solid bottom-out thud
    const oscClick = ctx.createOscillator();
    const oscThud = ctx.createOscillator();
    const gainClick = ctx.createGain();
    const gainThud = ctx.createGain();

    oscClick.type = 'sine';
    oscClick.frequency.setValueAtTime(1150 + Math.random() * 80, t);
    oscClick.frequency.exponentialRampToValueAtTime(320, t + 0.035);

    gainClick.gain.setValueAtTime(0.4 * volume, t);
    gainClick.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

    oscClick.connect(gainClick);
    gainClick.connect(ctx.destination);

    oscThud.type = 'triangle';
    oscThud.frequency.setValueAtTime(260 + Math.random() * 30, t);
    oscThud.frequency.exponentialRampToValueAtTime(70, t + 0.06);

    gainThud.gain.setValueAtTime(0.35 * volume, t);
    gainThud.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

    oscThud.connect(gainThud);
    gainThud.connect(ctx.destination);

    oscClick.start(t);
    oscThud.start(t);
    oscClick.stop(t + 0.035);
    oscThud.stop(t + 0.06);

  } else if (pack === 'typewriter') {
    // Vintage Typewriter: Mechanical metal lever snap + platen carriage strike
    const oscStrike = ctx.createOscillator();
    const gainStrike = ctx.createGain();

    oscStrike.type = 'square';
    oscStrike.frequency.setValueAtTime(950 + Math.random() * 150, t);
    oscStrike.frequency.exponentialRampToValueAtTime(180, t + 0.04);

    gainStrike.gain.setValueAtTime(0.35 * volume, t);
    gainStrike.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    oscStrike.connect(gainStrike);
    gainStrike.connect(ctx.destination);

    oscStrike.start(t);
    oscStrike.stop(t + 0.05);

  } else if (pack === 'topre') {
    // Topre Electro-Capacitive: Quiet, deep pillowy dome snap with rich bass
    const oscDome = ctx.createOscillator();
    const gainDome = ctx.createGain();

    oscDome.type = 'sine';
    oscDome.frequency.setValueAtTime(380 + Math.random() * 30, t);
    oscDome.frequency.exponentialRampToValueAtTime(90, t + 0.055);

    gainDome.gain.setValueAtTime(0.35 * volume, t);
    gainDome.gain.exponentialRampToValueAtTime(0.001, t + 0.055);

    oscDome.connect(gainDome);
    gainDome.connect(ctx.destination);

    oscDome.start(t);
    oscDome.stop(t + 0.055);

  } else if (pack === 'thocky') {
    // Thocky Lubed Linear: Deep marbly bottom-out on POM stem
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(310 + Math.random() * 25, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.05);

    gain.gain.setValueAtTime(0.38 * volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.05);

  } else {
    // Default Cherry MX Blue: High-pitched crisp acoustic snap
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800 + Math.random() * 100, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.04);

    gain.gain.setValueAtTime(0.3 * volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.04);
  }
}
