import { describe, it, expect } from 'vitest';
import {
  getCoachSpeechMessage,
  IDLE_MESSAGES,
  FOCUS_MESSAGES,
  ERROR_TIPS,
  VICTORY_MESSAGES
} from './coachMessages';

describe('AnimatedCoach Mascot State & Encouragement Engine', () => {
  it('provides calm guidance during idle state', () => {
    const msg = getCoachSpeechMessage({ state: 'idle', randomIdleIndex: 0 });
    expect(IDLE_MESSAGES).toContain(msg);
  });

  it('cycles idle guidance messages based on index', () => {
    const msg0 = getCoachSpeechMessage({ state: 'idle', randomIdleIndex: 0 });
    const msg1 = getCoachSpeechMessage({ state: 'idle', randomIdleIndex: 1 });
    expect(msg0).toBe(IDLE_MESSAGES[0]);
    expect(msg1).toBe(IDLE_MESSAGES[1]);
  });

  it('renders focused encouragement during typing', () => {
    const normalFocus = getCoachSpeechMessage({ state: 'focus', wpm: 20 });
    expect(FOCUS_MESSAGES).toContain(normalFocus);

    const cruisingFocus = getCoachSpeechMessage({ state: 'focus', wpm: 35 });
    expect(cruisingFocus).toContain('35 WPM');

    const blazingFocus = getCoachSpeechMessage({ state: 'focus', wpm: 60 });
    expect(blazingFocus).toContain('60 WPM tempo');
  });

  it('triggers celebrating speech for streak milestones 10+, 25+, 50+', () => {
    const streak5 = getCoachSpeechMessage({ state: 'streak', streak: 5 });
    expect(streak5).toContain('5x combo');

    const streak15 = getCoachSpeechMessage({ state: 'streak', streak: 15 });
    expect(streak15).toContain('15x combo');

    const streak30 = getCoachSpeechMessage({ state: 'streak', streak: 30 });
    expect(streak30).toContain('30 in a row');

    const streak60 = getCoachSpeechMessage({ state: 'streak', streak: 60 });
    expect(streak60).toContain('60X HYPER STREAK');
  });

  it('provides supportive guidance on errors and prioritizes custom tips', () => {
    const defaultErrorMsg = getCoachSpeechMessage({ state: 'error' });
    expect(ERROR_TIPS).toContain(defaultErrorMsg);

    const customTip = "Feel for the tactile bumps on F and J!";
    const customErrorMsg = getCoachSpeechMessage({ state: 'error', tip: customTip });
    expect(customErrorMsg).toBe(customTip);
  });

  it('celebrates victory on lesson completion', () => {
    const victoryMsg = getCoachSpeechMessage({ state: 'victory' });
    expect(VICTORY_MESSAGES).toContain(victoryMsg);
  });
});
