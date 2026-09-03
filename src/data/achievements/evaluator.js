// RETROSPEED Achievements Evaluation Engine
import { SPEED_BADGES } from './speedBadges';
import { ACCURACY_BADGES } from './accuracyBadges';
import { STREAK_BADGES } from './streakBadges';
import { ARCADE_BADGES } from './arcadeBadges';
import { MASTERY_BADGES } from './masteryBadges';

export const ALL_ACHIEVEMENTS = [
  ...SPEED_BADGES,
  ...ACCURACY_BADGES,
  ...STREAK_BADGES,
  ...ARCADE_BADGES,
  ...MASTERY_BADGES
];

export function evaluateAchievements(userProgress = {}) {
  const attempts = userProgress.attemptLogs || [];
  const courses = userProgress.courses || {};

  let maxWpm = 0;
  let maxAccuracy = 0;
  let perfectLessons = 0;
  let totalStars = 0;

  Object.keys(courses).forEach(courseId => {
    const cData = courses[courseId] || {};
    totalStars += Number(cData.totalStars || 0);

    const scores = cData.scores || {};
    Object.keys(scores).forEach(lessonId => {
      const s = scores[lessonId];
      if (s) {
        if (s.wpm && s.wpm > maxWpm) maxWpm = s.wpm;
        if (s.accuracy && s.accuracy > maxAccuracy) maxAccuracy = s.accuracy;
        if (s.accuracy === 100 && s.stars >= 5) perfectLessons += 1;
      }
    });
  });

  attempts.forEach(att => {
    if (att.wpm && att.wpm > maxWpm) maxWpm = att.wpm;
    if (att.accuracy && att.accuracy > maxAccuracy) maxAccuracy = att.accuracy;
  });

  const streakDays = Math.max(0, Number(userProgress.streakDays || 1));
  const practiceMinutes = Math.max(0, Math.round(Number(userProgress.totalPracticeTimeSeconds || userProgress.totalTimeSeconds || 0) / 60));

  const arcade = userProgress.arcadeStats || {};
  const balloonGames = Math.max(0, Number(arcade.balloonGames ?? arcade.balloonNinja ?? arcade.pressRoom ?? 0));
  const monsterWaves = Math.max(0, Number(arcade.monsterWaves ?? arcade.monsterAttack ?? arcade.paperPlanes ?? 0));
  const templeRunes = Math.max(0, Number(arcade.templeRunes ?? arcade.templeBash ?? arcade.localLine ?? 0));
  const bubblesPopped = Math.max(0, Number(arcade.bubblesPopped ?? arcade.floatingBubbles ?? arcade.nightMarket ?? 0));
  const applesHarvested = Math.max(0, Number(arcade.applesHarvested ?? arcade.appleThieves ?? arcade.dropChits ?? 0));

  const odysseyCourse = courses['retrospeed-odyssey'] || courses['keystroke-foundations'] || {};
  const syntaxCourse = courses['syntax-forge'] || courses['code-typing'] || {};
  const mysteryCourse = courses['chronicles-of-mystery'] || courses['mystery-detective'] || {};
  const musicCourse = courses['symphony-keys'] || courses['music-theory'] || {};

  const mastery = userProgress.masteryStats || {};
  const homeRowLessons = Math.max(0, Number(
    mastery.homeRowLessons ?? userProgress.homeRowLessons ?? (Object.keys(odysseyCourse.scores || {}).filter(id => Number(id) <= 8).length)
  ));
  const alphabetKeys = Math.max(0, Number(
    mastery.alphabetKeys ?? userProgress.alphabetKeys ?? (userProgress.keyStats ? Object.keys(userProgress.keyStats).filter(k => /^[a-z]$/i.test(k) && (((userProgress.keyStats[k].hits || 0) > 0) || ((userProgress.keyStats[k].misses || 0) > 0))).length : 0)
  ));
  const codeLessons = Math.max(0, Number(
    mastery.codeLessons ?? userProgress.codeLessons ?? (Object.keys(syntaxCourse.scores || {}).length)
  ));
  const detectiveLessons = Math.max(0, Number(
    mastery.detectiveLessons ?? userProgress.detectiveLessons ?? (Object.keys(mysteryCourse.scores || {}).length)
  ));
  const musicLessons = Math.max(0, Number(
    mastery.musicLessons ?? userProgress.musicLessons ?? (Object.keys(musicCourse.scores || {}).length)
  ));
  const numberLessons = Math.max(0, Number(
    mastery.numberLessons ?? userProgress.numberLessons ?? (Object.keys(odysseyCourse.scores || {}).filter(id => Number(id) >= 20).length)
  ));

  const metricMap = {
    maxWpm,
    maxAccuracy,
    perfectLessons,
    streakDays,
    practiceMinutes,
    balloonGames,
    monsterWaves,
    templeRunes,
    bubblesPopped,
    applesHarvested,
    homeRowLessons,
    alphabetKeys,
    codeLessons,
    detectiveLessons,
    musicLessons,
    numberLessons,
    totalStars
  };

  const customUnlocked = userProgress.unlockedBadgeIds || [];

  let totalUnlocked = 0;
  let earnedXp = 0;
  let totalPossibleXp = 0;

  const categoryCounts = {
    all: { total: ALL_ACHIEVEMENTS.length, unlocked: 0 },
    speed: { total: 0, unlocked: 0 },
    accuracy: { total: 0, unlocked: 0 },
    streaks: { total: 0, unlocked: 0 },
    arcade: { total: 0, unlocked: 0 },
    mastery: { total: 0, unlocked: 0 }
  };

  const enrichedAchievements = ALL_ACHIEVEMENTS.map((badge, index) => {
    const rawVal = Math.max(0, Number(metricMap[badge.metricKey] ?? 0));
    const target = Math.max(1, Number(badge.targetValue) || 1);
    const isManuallyUnlocked = customUnlocked.includes(badge.id);
    const isStatUnlocked = rawVal >= target;
    const isUnlocked = isStatUnlocked || isManuallyUnlocked;

    const currentVal = isUnlocked ? target : Math.min(target, rawVal);
    const progressPercent = Math.min(100, Math.max(0, Math.round((currentVal / target) * 100)));

    let unlockDate = null;
    if (isUnlocked) {
      const storedDate = userProgress.earnedBadgeDates?.[badge.id];
      if (storedDate) {
        unlockDate = storedDate;
      } else {
        const daysAgo = Math.max(1, (ALL_ACHIEVEMENTS.length - index) % 7 + 1);
        const d = new Date('2026-08-31');
        d.setDate(d.getDate() - daysAgo);
        unlockDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
      totalUnlocked += 1;
      earnedXp += badge.xp;
    }

    totalPossibleXp += badge.xp;

    if (categoryCounts[badge.category]) {
      categoryCounts[badge.category].total += 1;
      if (isUnlocked) categoryCounts[badge.category].unlocked += 1;
    }
    if (isUnlocked) categoryCounts.all.unlocked += 1;

    return {
      ...badge,
      currentValue: currentVal,
      isUnlocked,
      unlockDate,
      progressPercent,
      remaining: Math.max(0, target - currentVal)
    };
  });

  const completionPercent = ALL_ACHIEVEMENTS.length > 0 ? Math.min(100, Math.max(0, Math.round((totalUnlocked / ALL_ACHIEVEMENTS.length) * 100))) : 0;

  const lockedBadges = enrichedAchievements.filter(b => !b.isUnlocked);
  lockedBadges.sort((a, b) => b.progressPercent - a.progressPercent);
  const nextUpcomingBadge = lockedBadges[0] || null;

  let rankTitle = 'Novice Keyboardist';
  let rankTier = 'Bronze';
  if (totalUnlocked >= 20) {
    rankTitle = 'Typing Jungle Grandmaster';
    rankTier = 'Mythic';
  } else if (totalUnlocked >= 15) {
    rankTitle = 'Legendary Touch Virtuoso';
    rankTier = 'Legendary';
  } else if (totalUnlocked >= 10) {
    rankTitle = 'High-Speed Scribe';
    rankTier = 'Epic';
  } else if (totalUnlocked >= 5) {
    rankTitle = 'Jungle Explorer Typist';
    rankTier = 'Rare';
  }

  return {
    achievements: enrichedAchievements,
    totalUnlocked,
    totalBadges: ALL_ACHIEVEMENTS.length,
    completionPercent,
    earnedXp,
    totalPossibleXp,
    nextUpcomingBadge,
    rankTitle,
    rankTier,
    categoryCounts
  };
}
