import { describe, it, expect } from 'vitest';
import {
  getLicenseStatus,
  startTrial,
  activateFullUnlock,
  isGameUnlocked,
  isLessonUnlocked,
  isShortcutUnlocked,
  PRICING
} from './license';

describe('Licensing Engine & Honest Monetization Rules', () => {
  it('defaults to Free Tier with free games and Parts 1-2 open', () => {
    const progress = {};
    const status = getLicenseStatus(progress);

    expect(status.status).toBe('free');
    expect(status.isFree).toBe(true);
    expect(status.isUnlocked).toBe(false);

    // Free games
    expect(isGameUnlocked('press-room', progress)).toBe(true);
    expect(isGameUnlocked('paper-planes', progress)).toBe(true);
    // Locked games on free tier
    expect(isGameUnlocked('local-line', progress)).toBe(false);
    expect(isGameUnlocked('pit-lane', progress)).toBe(false);

    // Free lessons (Parts 1-2 or <= 30)
    expect(isLessonUnlocked({ lessonNumber: 15, stageIndex: 0 }, progress)).toBe(true);
    expect(isLessonUnlocked({ lessonNumber: 45, stageIndex: 3 }, progress)).toBe(false);

    // Shortcuts
    expect(isShortcutUnlocked('clipboard', progress)).toBe(true);
    expect(isShortcutUnlocked('ide-navigation', progress)).toBe(false);
  });

  it('manages 30-day trial countdown and gracefully expires back to free tier', () => {
    const now = 1700000000000;
    const progressWithTrial = startTrial({}, 30, now);

    // Day 1 of trial
    const day1Status = getLicenseStatus(progressWithTrial, now + 1000);
    expect(day1Status.status).toBe('trial');
    expect(day1Status.isTrial).toBe(true);
    expect(day1Status.isUnlocked).toBe(true);
    expect(day1Status.trialDaysRemaining).toBe(30);

    // All games and lessons unlocked during trial
    expect(isGameUnlocked('local-line', progressWithTrial, now + 1000)).toBe(true);
    expect(isLessonUnlocked({ lessonNumber: 50, stageIndex: 4 }, progressWithTrial, now + 1000)).toBe(true);

    // Day 15 of trial
    const day15Time = now + (15 * 24 * 60 * 60 * 1000);
    const day15Status = getLicenseStatus(progressWithTrial, day15Time);
    expect(day15Status.status).toBe('trial');
    expect(day15Status.trialDaysRemaining).toBe(15);

    // Day 31 (expired trial)
    const day31Time = now + (31 * 24 * 60 * 60 * 1000);
    const expiredStatus = getLicenseStatus(progressWithTrial, day31Time);
    expect(expiredStatus.status).toBe('free');
    expect(expiredStatus.isUnlocked).toBe(false);
  });

  it('permanently unlocks full workshop on one-time IAP', () => {
    const unlockedProgress = activateFullUnlock({});
    const status = getLicenseStatus(unlockedProgress);

    expect(status.status).toBe('full');
    expect(status.isUnlocked).toBe(true);
    expect(status.isTrial).toBe(false);
    expect(status.badgeText).toBe('Full Edition Unlocked');

    expect(isGameUnlocked('pit-lane', unlockedProgress)).toBe(true);
    expect(isLessonUnlocked({ lessonNumber: 150, stageIndex: 7 }, unlockedProgress)).toBe(true);
    expect(isShortcutUnlocked('window-management', unlockedProgress)).toBe(true);
  });

  it('provides honest price anchoring for India and International', () => {
    expect(PRICING.india.listPrice).toBe(899);
    expect(PRICING.india.salePrice).toBe(499);
    expect(PRICING.international.listPrice).toBe(9.99);
    expect(PRICING.durableAddonId).toBe('retrospeed_unlock');
  });
});
