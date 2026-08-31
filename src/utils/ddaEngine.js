/**
 * Next-Gen Dynamic Difficulty Adjustment (DDA) Engine
 * Implements differential state updates, fatigue modeling, and parameter scaling
 * across velocity, spawn rates, fuse timers, and vocabulary complexity.
 */

export class DDAController {
  constructor(options = {}) {
    this.targetWpm = options.targetWpm || 45; // Baseline user target
    this.alpha = options.alpha || 0.03;       // Skill progression rate
    this.beta = options.beta || 0.06;         // Fluster mitigation sensitivity
    this.gamma = options.gamma || 0.025;      // Fatigue compensation gain
    this.zeta = options.zeta || 0.0005;       // Stamina decay constant (per second)
    this.omegaPinky = options.omegaPinky || 0.4; // Pinky strain weight

    // Core difficulty state variable D in [0.1, 1.0]
    this.difficulty = options.initialDifficulty || 0.3;
    this.sessionStartTime = performance.now();
    this.lastUpdateTime = performance.now();
  }

  /**
   * Update DDA difficulty state based on live telemetry
   */
  update(telemetryMetrics = {}, now = performance.now()) {
    const sessionSeconds = Math.max(0, (now - this.sessionStartTime) / 1000);
    const dtSeconds = Math.max(0.1, (now - this.lastUpdateTime) / 1000);
    this.lastUpdateTime = now;

    const iwpm = telemetryMetrics.iwpm || 0;
    const flusterIndex = telemetryMetrics.flusterIndex || 0;
    const pinkyStrain = telemetryMetrics.pinkyStrain || 0;

    // 1. Session Stamina & Fatigue Model: F(t) = 1 - exp(-zeta * t) + omega_p * FLB_pinky
    const staminaDecay = 1 - Math.exp(-this.zeta * sessionSeconds);
    const fatigueFactor = Math.min(1.0, staminaDecay + this.omegaPinky * Math.max(0, pinkyStrain - 0.1));

    // 2. Performance Speed Delta
    const speedRatio = (iwpm / Math.max(20, this.targetWpm)) - 1.0;
    const skillAdjustment = this.alpha * speedRatio * Math.min(2.0, dtSeconds);

    // 3. Cognitive Fluster & Panic Penalty
    const flusterPenalty = this.beta * Math.max(0, flusterIndex - 0.8) * Math.min(2.0, dtSeconds);

    // 4. Fatigue Compensation
    const fatigueAdjustment = this.gamma * fatigueFactor * Math.min(2.0, dtSeconds);

    // 5. Differential Update: D_{t+dt} = Clamp(D_t + skill - fluster - fatigue, 0.1, 1.0)
    let nextD = this.difficulty + skillAdjustment - flusterPenalty - fatigueAdjustment;
    
    // Quick emergency relief if player is severely flustered (FI > 3.5)
    if (flusterIndex > 3.5) {
      nextD -= 0.08;
    }

    this.difficulty = Math.max(0.1, Math.min(1.0, Number(nextD.toFixed(3))));

    return {
      difficulty: this.difficulty,
      fatigueFactor: Number(fatigueFactor.toFixed(3)),
      skillDelta: Number(skillAdjustment.toFixed(3)),
      flusterPenalty: Number(flusterPenalty.toFixed(3)),
      scaledParams: this.getScaledParameters()
    };
  }

  /**
   * Get dynamically scaled parameters for all game engines
   */
  getScaledParameters() {
    const D = this.difficulty;

    return {
      // Falling Words Defense
      fallingWordSpeed: Number((0.6 + D * 1.8).toFixed(2)),       // 0.6px/frame to 2.4px/frame
      fallingSpawnIntervalMs: Math.round(3200 - D * 2000),         // 3200ms to 1200ms
      maxActiveWordsOnScreen: Math.round(3 + D * 6),               // 3 to 9 words

      // Typing Racer
      racerTopSpeed: Math.round(40 + D * 80),                      // 40 to 120 km/h
      aiGhostBaseWpm: Math.round(30 + D * 55),                     // 30 to 85 WPM
      obstacleDensity: Number((0.15 + D * 0.45).toFixed(2)),       // 15% to 60% frequency

      // Word Bomb
      bombFuseDurationSecs: Math.round(18 - D * 10),               // 18s down to 8s
      requiredSubstringLength: D > 0.6 ? 3 : 2,                   // 2 or 3 letter roots
      bonusTimePerWordSecs: Number((4.5 - D * 2.0).toFixed(1)),    // 4.5s down to 2.5s

      // Syntax Hacker
      syntaxTokenFriction: Number((0.1 + D * 0.4).toFixed(2)),     // 10% to 50% perimeter delimiters
      codeStreamSpeed: Number((0.8 + D * 1.6).toFixed(2)),

      // Vocabulary Zipf Rank (1 = top common words, 10 = rare technical terms)
      zipfMinLevel: Math.round(1 + D * 6)
    };
  }

  /**
   * Reset session timer
   */
  reset(initialDifficulty = 0.3) {
    this.difficulty = initialDifficulty;
    this.sessionStartTime = performance.now();
    this.lastUpdateTime = performance.now();
  }
}
