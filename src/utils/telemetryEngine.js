/**
 * Next-Gen Keyboard Telemetry Engine
 * Implements sub-millisecond latency extraction, Log-Normal distribution modeling,
 * Cognitive Fluster Index (FI), and Finger Load Balance (FLB) metrics.
 */

// Touch typing finger mapping (1..10)
// 1: Left Pinky, 2: Left Ring, 3: Left Middle, 4: Left Index, 5: Left Thumb
// 6: Right Thumb, 7: Right Index, 8: Right Middle, 9: Right Ring, 10: Right Pinky
export const KEY_TO_DIGIT_MAP = {
  // Left Pinky (Digit 1) - Strain Weight: High
  '`': 1, '~': 1, '1': 1, '!': 1, 'q': 1, 'Q': 1, 'a': 1, 'A': 1, 'z': 1, 'Z': 1,
  'tab': 1, 'capslock': 1, 'shiftleft': 1, 'controlleft': 1,

  // Left Ring (Digit 2)
  '2': 2, '@': 2, 'w': 2, 'W': 2, 's': 2, 'S': 2, 'x': 2, 'X': 2,

  // Left Middle (Digit 3)
  '3': 3, '#': 3, 'e': 3, 'E': 3, 'd': 3, 'D': 3, 'c': 3, 'C': 3,

  // Left Index (Digit 4)
  '4': 4, '$': 4, '5': 4, '%': 4, 'r': 4, 'R': 4, 't': 4, 'T': 4,
  'f': 4, 'F': 4, 'g': 4, 'G': 4, 'v': 4, 'V': 4, 'b': 4, 'B': 4,

  // Thumbs (Digits 5 & 6)
  ' ': 5, 'space': 5,

  // Right Index (Digit 7)
  '6': 7, '^': 7, '7': 7, '&': 7, 'y': 7, 'Y': 7, 'u': 7, 'U': 7,
  'h': 7, 'H': 7, 'j': 7, 'J': 7, 'n': 7, 'N': 7, 'm': 7, 'M': 7,

  // Right Middle (Digit 8)
  '8': 8, '*': 8, 'i': 8, 'I': 8, 'k': 8, 'K': 8, ',': 8, '<': 8,

  // Right Ring (Digit 9)
  '9': 9, '(': 9, 'o': 9, 'O': 9, 'l': 9, 'L': 9, '.': 9, '>': 9,

  // Right Pinky (Digit 10) - Strain Weight: High (Perimeter & Delimiters)
  '0': 10, ')': 10, '-': 10, '_': 10, '=': 10, '+': 10, 'p': 10, 'P': 10,
  '[': 10, '{': 10, ']': 10, '}': 10, '\\': 10, '|': 10, ';': 10, ':': 10,
  "'": 10, '"': 10, '/': 10, '?': 10, 'enter': 10, 'backspace': 10, 'shiftright': 10
};

export class TelemetryCollector {
  constructor(options = {}) {
    this.windowMs = options.windowMs || 5000; // Rolling 5-second analysis window
    this.baselineIkiMs = options.baselineIkiMs || 160; // Standard 60 WPM baseline IKI (~160ms)
    
    // Keystroke event logs
    this.events = [];
    this.keyPressTimes = new Map(); // key -> pressTimestamp
    this.lastPressTime = null;
    this.lastReleaseTime = null;

    // Cumulative digit distribution
    this.digitCounts = new Array(11).fill(0);
    this.totalKeystrokes = 0;
    this.totalErrors = 0;
    this.totalBackspaces = 0;
  }

  /**
   * Log keydown press event
   */
  recordKeyDown(key, timestamp = performance.now()) {
    const normKey = key.toLowerCase();
    const digit = KEY_TO_DIGIT_MAP[normKey] || (normKey === 'backspace' ? 10 : 4);
    
    // Calculate Inter-Key Interval (IKI)
    const iki = this.lastPressTime ? Math.max(1, timestamp - this.lastPressTime) : this.baselineIkiMs;
    // Calculate Flight Time (FT): press_n - release_{n-1}
    const flightTime = this.lastReleaseTime ? Math.max(0, timestamp - this.lastReleaseTime) : 0;

    this.lastPressTime = timestamp;
    this.keyPressTimes.set(key, timestamp);
    this.totalKeystrokes++;
    this.digitCounts[digit]++;

    if (normKey === 'backspace') {
      this.totalBackspaces++;
    }

    const eventRecord = {
      type: 'press',
      key,
      normKey,
      digit,
      timestamp,
      iki,
      flightTime,
      holdTime: 0,
      isError: false
    };

    this.events.push(eventRecord);
    this._pruneOldEvents(timestamp);
    return eventRecord;
  }

  /**
   * Log keyup release event
   */
  recordKeyUp(key, timestamp = performance.now()) {
    this.lastReleaseTime = timestamp;
    const pressTime = this.keyPressTimes.get(key);
    let holdTime = 60; // fallback default
    
    if (pressTime) {
      holdTime = Math.max(1, timestamp - pressTime);
      this.keyPressTimes.delete(key);
    }

    // Update corresponding press event holdTime
    for (let i = this.events.length - 1; i >= 0; i--) {
      if (this.events[i].key === key && this.events[i].holdTime === 0) {
        this.events[i].holdTime = holdTime;
        break;
      }
    }

    return { key, holdTime, timestamp };
  }

  /**
   * Mark the latest keystroke event as an error
   */
  markLastError(isError = true) {
    if (this.events.length > 0) {
      const last = this.events[this.events.length - 1];
      last.isError = isError;
      if (isError) this.totalErrors++;
    }
  }

  /**
   * Prune events older than 30 seconds to conserve memory
   */
  _pruneOldEvents(now) {
    const cutoff = now - 30000;
    while (this.events.length > 0 && this.events[0].timestamp < cutoff) {
      this.events.shift();
    }
  }

  /**
   * Compute instant metrics across rolling window
   */
  getLiveMetrics(now = performance.now()) {
    const windowCutoff = now - this.windowMs;
    const recentEvents = this.events.filter(e => e.timestamp >= windowCutoff);
    const windowSecs = this.windowMs / 1000;

    if (recentEvents.length === 0) {
      return {
        iwpm: 0,
        accuracy: 100,
        flusterIndex: 0,
        flusterStatus: 'normal',
        meanIki: this.baselineIkiMs,
        ikiStdDev: 0,
        pinkyStrain: 0,
        isPinkyOverloaded: false,
        totalKeystrokes: this.totalKeystrokes
      };
    }

    // 1. Instantaneous Words Per Minute (IWPM)
    const correctKeystrokes = recentEvents.filter(e => !e.isError && e.normKey !== 'backspace').length;
    const iwpm = Math.round(((correctKeystrokes / 5) / windowSecs) * 60);

    // 2. Accuracy % over session
    const accuracy = this.totalKeystrokes > 0
      ? Math.max(0, Math.min(100, Math.round(((this.totalKeystrokes - this.totalErrors) / this.totalKeystrokes) * 100)))
      : 100;

    // 3. Log-Normal Distribution Modeling of IKI
    const ikis = recentEvents.map(e => Math.max(1, e.iki));
    const logIkis = ikis.map(v => Math.log(v));
    const meanLogIki = logIkis.reduce((a, b) => a + b, 0) / logIkis.length;
    const varianceLogIki = logIkis.length > 1
      ? logIkis.reduce((sum, val) => sum + Math.pow(val - meanLogIki, 2), 0) / (logIkis.length - 1)
      : 0.1;
    const stdLogIki = Math.sqrt(varianceLogIki);

    const meanIki = Math.round(Math.exp(meanLogIki + varianceLogIki / 2));

    // 4. Cognitive Fluster Index (FI)
    // FI = (N_errors / dt_window) * (IKI_baseline / IKI_error_burst) * (1 + N_backspace / N_total)
    const windowErrors = recentEvents.filter(e => e.isError).length;
    const errorBurstEvents = recentEvents.filter(e => e.isError && e.iki < 130);
    const avgErrorBurstIki = errorBurstEvents.length > 0
      ? errorBurstEvents.reduce((sum, e) => sum + e.iki, 0) / errorBurstEvents.length
      : this.baselineIkiMs;

    const errorRate = windowErrors / windowSecs;
    const speedRatio = this.baselineIkiMs / Math.max(40, avgErrorBurstIki);
    const backspaceFactor = 1 + (this.totalBackspaces / Math.max(1, this.totalKeystrokes));

    const flusterIndex = Number((errorRate * speedRatio * backspaceFactor).toFixed(2));
    const flusterStatus = flusterIndex > 3.5 ? 'critical' : (flusterIndex > 1.5 ? 'elevated' : 'normal');

    // 5. Finger Load Balance Metric (FLB) & Pinky Strain (Digits 1 & 10)
    const pinkyHits = this.digitCounts[1] + this.digitCounts[10];
    const pinkyStrain = this.totalKeystrokes > 0 ? Number((pinkyHits / this.totalKeystrokes).toFixed(3)) : 0;
    const isPinkyOverloaded = pinkyStrain > 0.14;

    return {
      iwpm,
      accuracy,
      flusterIndex,
      flusterStatus,
      meanIki,
      stdLogIki: Number(stdLogIki.toFixed(3)),
      pinkyStrain,
      isPinkyOverloaded,
      digitDistribution: [...this.digitCounts],
      totalKeystrokes: this.totalKeystrokes,
      totalErrors: this.totalErrors
    };
  }

  /**
   * Reset collector session
   */
  reset() {
    this.events = [];
    this.keyPressTimes.clear();
    this.lastPressTime = null;
    this.lastReleaseTime = null;
    this.digitCounts.fill(0);
    this.totalKeystrokes = 0;
    this.totalErrors = 0;
    this.totalBackspaces = 0;
  }
}
