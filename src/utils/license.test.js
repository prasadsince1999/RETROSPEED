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

describe('Licensing Engine & 100% Free Edition Rules', () => {
  it('defaults to fully unlocked 100% free edition for all users', () => {
    const progress = {};
    const status = getLicenseStatus(progress);

    expect(status.status).toBe('full');
    expect(status.isFree).toBe(true);
    expect(status.isUnlocked).toBe(true);
    expect(status.badgeText).toBe('100% Free Edition');

    // All arcade games are unconditionally unlocked
    expect(isGameUnlocked('press-room', progress)).toBe(true);
    expect(isGameUnlocked('paper-planes', progress)).toBe(true);
    expect(isGameUnlocked('local-line', progress)).toBe(true);
    expect(isGameUnlocked('night-market', progress)).toBe(true);
    expect(isGameUnlocked('drop-chits', progress)).toBe(true);
    expect(isGameUnlocked('fuse-desk', progress)).toBe(true);
    expect(isGameUnlocked('pit-lane', progress)).toBe(true);
    expect(isGameUnlocked('patch-terminal', progress)).toBe(true);

    // All lessons across all parts are unlocked
    expect(isLessonUnlocked({ lessonNumber: 15, stageIndex: 0 }, progress)).toBe(true);
    expect(isLessonUnlocked({ lessonNumber: 45, stageIndex: 3 }, progress)).toBe(true);
    expect(isLessonUnlocked({ lessonNumber: 150, stageIndex: 7 }, progress)).toBe(true);

    // All shortcuts are unlocked
    expect(isShortcutUnlocked('clipboard', progress)).toBe(true);
    expect(isShortcutUnlocked('ide-navigation', progress)).toBe(true);
    expect(isShortcutUnlocked('window-management', progress)).toBe(true);
  });

  it('guarantees zero-cost pricing structure', () => {
    expect(PRICING.india.listPrice).toBe(0);
    expect(PRICING.india.salePrice).toBe(0);
    expect(PRICING.international.listPrice).toBe(0);
  });

  it('preserves full unlock through activation calls', () => {
    const unlockedProgress = activateFullUnlock({});
    const status = getLicenseStatus(unlockedProgress);

    expect(status.status).toBe('full');
    expect(status.isUnlocked).toBe(true);
    expect(isGameUnlocked('pit-lane', unlockedProgress)).toBe(true);
    expect(isLessonUnlocked({ lessonNumber: 150, stageIndex: 7 }, unlockedProgress)).toBe(true);
  });
});
