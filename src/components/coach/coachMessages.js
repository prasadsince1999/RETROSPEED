/**
 * Contextual coach encouragement messages and helper logic
 */
export const IDLE_MESSAGES = [
  "Ready when you are! Rest fingers on F & J.",
  "Sit up tall and keep your wrists floating gently.",
  "Feel the bumps on F & J — no need to look down!",
  "Take a deep breath and find your rhythm."
];

export const FOCUS_MESSAGES = [
  "In the zone! Keep your eyes on the text.",
  "Smooth keystrokes build lasting muscle memory.",
  "Rhythm over rush — let your fingers flow.",
  "Steady cadence! You're locked in."
];

export const ERROR_TIPS = [
  "Take a breath! Anchor your fingers on the home row.",
  "Accuracy builds speed — let velocity come naturally.",
  "Soft, light taps! No need to rush.",
  "Check finger alignment on the virtual keyboard guide.",
  "Shake it off! Even grandmasters miss keys."
];

export const VICTORY_MESSAGES = [
  "SPECTACULAR! That was pure velocity! 🌟",
  "Outstanding accuracy and focus! High five!",
  "Lesson crushed! Your fingers are on fire!",
  "Champion typing! Look at that rhythm!"
];

/**
 * Pure helper to compute contextual speech bubble messages
 */
export function getCoachSpeechMessage({
  state = 'idle',
  streak = 0,
  tip = null,
  wpm = 0,
  randomIdleIndex = 0
} = {}) {
  if (tip && state === 'error') {
    return tip;
  }

  switch (state) {
    case 'victory':
      return VICTORY_MESSAGES[Math.floor(Math.random() * VICTORY_MESSAGES.length)] || VICTORY_MESSAGES[0];
    
    case 'error':
      return tip || ERROR_TIPS[Math.floor(Math.random() * ERROR_TIPS.length)];

    case 'streak':
      if (streak >= 50) return `🔥 UNSTOPPABLE! ${streak}X HYPER STREAK!`;
      if (streak >= 25) return `⚡ INCREDIBLE FLOW! ${streak} in a row!`;
      if (streak >= 10) return `✨ You're on fire! ${streak}x combo! Keep it going!`;
      return `Nice rhythm! ${streak}x combo!`;

    case 'focus':
      if (wpm > 45) return `⚡ Blazing fast! ${wpm} WPM tempo!`;
      if (wpm > 25) return `🚀 Solid cadence! Cruising at ${wpm} WPM!`;
      return FOCUS_MESSAGES[Math.floor((wpm || 0) % FOCUS_MESSAGES.length)];

    case 'idle':
    default:
      return IDLE_MESSAGES[randomIdleIndex % IDLE_MESSAGES.length];
  }
}
