import { describe, it, expect } from 'vitest';
import { getDefaultProgress, calculateStatsSummary, getPlayerProfile, resetAllProgress, saveProgress } from './storage';

describe('Storage & Analytics Engine Integrity', () => {
  it('initializes a fresh profile with honest zero state', () => {
    const progress = getDefaultProgress();

    expect(progress).toBeDefined();
    expect(progress.attemptLogs).toEqual([]);
    expect(progress.streakDays).toBe(0);
    expect(progress.keyStats).toEqual({});

    const profile = getPlayerProfile(progress);
    expect(profile.totalXp).toBe(0);
    expect(profile.level).toBe(1);
    expect(profile.title).toBe('Novice Typist');
  });

  it('calculates stats summary on empty progress without NaN or crashes', () => {
    const progress = getDefaultProgress();
    const stats = calculateStatsSummary(progress);

    expect(stats).toBeDefined();
    expect(stats.hasData).toBe(false);
    expect(stats.averageWpm).toBe(0);
    expect(stats.overallAccuracy).toBe(0);
    expect(stats.totalPracticeSeconds).toBe(0);
    expect(stats.keyboardCoverage).toBe(0);
    expect(Number.isNaN(stats.averageWpm)).toBe(false);
    expect(Number.isNaN(stats.overallAccuracy)).toBe(false);
  });

  it('resets all local progress and restores factory clean slate', () => {
    // Seed some progress
    saveProgress({
      courses: { 'keystroke-foundations': { totalPoints: 5000, totalStars: 20 } },
      attemptLogs: [{ wpm: 65, accuracy: 98, points: 250 }],
      streakDays: 5
    });

    const reset = resetAllProgress();
    expect(reset.attemptLogs).toEqual([]);
    expect(reset.streakDays).toBe(0);
    expect(reset.courses['keystroke-foundations'].totalPoints).toBe(0);
    expect(reset.profile.displayName).toBe('Player');
  });
});
