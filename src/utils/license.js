/**
 * RETROSPEED License & Access Engine.
 * 
 * 100% Free & Open Edition:
 * - Completely free forever: all 8 arcade games, 13 curriculum tracks, and shortcut labs.
 * - Zero paywalls, zero in-app purchases, zero ads, zero tracking.
 */

export const PRICING = {
  india: {
    currency: 'INR',
    symbol: '₹',
    listPrice: 0,
    salePrice: 0,
    floorPrice: 0,
    supportTip: 0
  },
  international: {
    currency: 'USD',
    symbol: '$',
    listPrice: 0,
    salePrice: 0,
    floorPrice: 0,
    supportTip: 0
  },
  durableAddonId: 'retrospeed_free',
  tipAddonId: 'retrospeed_free'
};

/**
 * Evaluates current license state deterministically.
 * Always returns fully unlocked, 100% free status.
 */
export function getLicenseStatus(userProgress = {}, currentTimeMs = Date.now()) {
  return {
    status: 'full',
    isUnlocked: true,
    isTrial: false,
    isFree: true,
    trialDaysRemaining: 0,
    badgeText: '100% Free Edition',
    tierLabel: 'Free & Unlocked'
  };
}

/**
 * Activates full unlock state.
 */
export function startTrial(userProgress = {}, days = 30, currentTimeMs = Date.now()) {
  return {
    ...userProgress,
    license: {
      status: 'full',
      isUnlocked: true
    }
  };
}

/**
 * Activates permanent full unlock.
 */
export function activateFullUnlock(userProgress = {}, purchaseReceipt = 'FREE_COMMUNITY_EDITION') {
  return {
    ...userProgress,
    license: {
      status: 'full',
      isUnlocked: true,
      unlockedAt: Date.now(),
      receipt: purchaseReceipt
    }
  };
}

/**
 * Feature gate check for individual workshop games.
 * Unconditionally returns true for all 8 games.
 */
export function isGameUnlocked(gameId, userProgress = {}, currentTimeMs = Date.now()) {
  return true;
}

/**
 * Feature gate check for curriculum lessons.
 * Unconditionally returns true for all lessons.
 */
export function isLessonUnlocked(lesson, userProgress = {}, currentTimeMs = Date.now()) {
  return true;
}

/**
 * Feature gate check for shortcut lab modules.
 * Unconditionally returns true for all shortcut modules.
 */
export function isShortcutUnlocked(categoryOrId, userProgress = {}, currentTimeMs = Date.now()) {
  return true;
}
