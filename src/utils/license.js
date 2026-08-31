/**
 * RETROSPEED Licensing & Monetization Engine.
 * 
 * Core Philosophy:
 * - Free to install. Free forever on initial steps (Parts 1-2, Press Room, Paper Planes, basic shortcuts, local stats).
 * - Microsoft Store 30-day trial for the entire workshop.
 * - One-time durable unlock for full workshop (Parts 3-8, all 8 games, complete shortcut lab).
 * - Zero subscriptions. Zero ads. No financial tracking.
 */

export const PRICING = {
  india: {
    currency: 'INR',
    symbol: '₹',
    listPrice: 899,
    salePrice: 499,
    floorPrice: 399,
    supportTip: 99
  },
  international: {
    currency: 'USD',
    symbol: '$',
    listPrice: 9.99,
    salePrice: 4.99,
    floorPrice: 3.99,
    supportTip: 1.99
  },
  durableAddonId: 'retrospeed_unlock',
  tipAddonId: 'support_the_desk'
};

const FREE_GAMES = ['press-room', 'paper-planes'];
const FREE_SHORTCUT_CATEGORIES = ['clipboard', 'editing']; // Copy, Cut, Paste, Undo, Redo
const FREE_MAX_SPINE_PART = 2;
const FREE_MAX_FOUNDATION_LESSONS = 30;

/**
 * Evaluates current license state deterministically.
 * @param {Object} userProgress 
 * @param {number} currentTimeMs (optional, defaults to Date.now())
 */
export function getLicenseStatus(userProgress = {}, currentTimeMs = Date.now()) {
  const license = userProgress.license || {};

  // 1. Permanent Full Unlock
  if (license.isUnlocked || license.status === 'full') {
    return {
      status: 'full',
      isUnlocked: true,
      isTrial: false,
      isFree: false,
      trialDaysRemaining: 0,
      badgeText: 'Full Workshop Unlocked',
      tierLabel: 'Lifetime Edition'
    };
  }

  // 2. 30-Day Store Trial
  if (license.trialStartedAt) {
    const trialDurationMs = (license.trialDays || 30) * 24 * 60 * 60 * 1000;
    const elapsedMs = currentTimeMs - license.trialStartedAt;
    const remainingMs = trialDurationMs - elapsedMs;

    if (remainingMs > 0) {
      const daysRemaining = Math.ceil(remainingMs / (24 * 60 * 60 * 1000));
      return {
        status: 'trial',
        isUnlocked: true,
        isTrial: true,
        isFree: false,
        trialDaysRemaining: daysRemaining,
        badgeText: `Full Preview — ${daysRemaining} day${daysRemaining === 1 ? '' : 's'} left`,
        tierLabel: '30-Day Workshop Trial'
      };
    }
  }

  // 3. Free Always Tier (fallback after trial or fresh install without active trial)
  return {
    status: 'free',
    isUnlocked: false,
    isTrial: false,
    isFree: true,
    trialDaysRemaining: 0,
    badgeText: 'Free Workshop Tier',
    tierLabel: 'Free Edition'
  };
}

/**
 * Activates 30-day trial if never activated.
 */
export function startTrial(userProgress = {}, days = 30, currentTimeMs = Date.now()) {
  if (userProgress.license?.isUnlocked) return userProgress;
  if (userProgress.license?.trialStartedAt) return userProgress; // Already started in past

  return {
    ...userProgress,
    license: {
      ...userProgress.license,
      status: 'trial',
      trialStartedAt: currentTimeMs,
      trialDays: days
    }
  };
}

/**
 * Activates permanent one-time unlock.
 */
export function activateFullUnlock(userProgress = {}, purchaseReceipt = 'STORE_IAP_VERIFIED') {
  return {
    ...userProgress,
    license: {
      ...userProgress.license,
      status: 'full',
      isUnlocked: true,
      unlockedAt: Date.now(),
      receipt: purchaseReceipt
    }
  };
}

/**
 * Feature gate check for individual workshop games.
 */
export function isGameUnlocked(gameId, userProgress = {}, currentTimeMs = Date.now()) {
  const license = getLicenseStatus(userProgress, currentTimeMs);
  if (license.isUnlocked) return true;
  return FREE_GAMES.includes(gameId);
}

/**
 * Feature gate check for curriculum lessons.
 * Free tier covers Parts 1-2 (or lessons 1-30 in Keystroke Foundations).
 */
export function isLessonUnlocked(lesson, userProgress = {}, currentTimeMs = Date.now()) {
  const license = getLicenseStatus(userProgress, currentTimeMs);
  if (license.isUnlocked) return true;

  if (!lesson) return true;

  // Check stage/part index or lesson number
  const lessonNumber = Number(lesson.lessonNumber || lesson.id || 1);
  const stageIndex = Number(lesson.stageIndex || 0);

  if (lessonNumber <= FREE_MAX_FOUNDATION_LESSONS || stageIndex < FREE_MAX_SPINE_PART) {
    return true;
  }

  return false;
}

/**
 * Feature gate check for shortcut lab modules.
 */
export function isShortcutUnlocked(categoryOrId, userProgress = {}, currentTimeMs = Date.now()) {
  const license = getLicenseStatus(userProgress, currentTimeMs);
  if (license.isUnlocked) return true;

  if (FREE_SHORTCUT_CATEGORIES.includes(categoryOrId)) return true;
  return false;
}
