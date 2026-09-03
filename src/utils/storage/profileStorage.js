// RETROSPEED Player Profile & Daily Challenge State Management
import { PLAYER_AVATARS } from './constants';
import { loadProgress, saveProgress } from './migrations';

export function getPlayerProfile(userProgress = {}) {
  const customProfile = userProgress.profile || {};
  
  let totalPoints = 0;
  if (userProgress.courses) {
    Object.values(userProgress.courses).forEach(c => {
      totalPoints += Number(c.totalPoints) || 0;
    });
  }
  if (Array.isArray(userProgress.attemptLogs)) {
    userProgress.attemptLogs.forEach(a => {
      totalPoints += Number(a.points) || 0;
    });
  }

  const level = Math.max(1, Math.floor(totalPoints / 500) + 1);
  const currentLevelBaseXp = (level - 1) * 500;
  const currentLevelXp = Math.max(0, totalPoints - currentLevelBaseXp);
  const percent = Math.min(100, Math.round((currentLevelXp / 500) * 100));

  const avatarId = customProfile.avatarId || 'ninja';
  const avatarMeta = PLAYER_AVATARS.find(a => a.id === avatarId) || PLAYER_AVATARS[0];

  return {
    displayName: customProfile.displayName || customProfile.name || 'Player',
    name: customProfile.displayName || customProfile.name || 'Player',
    title: customProfile.title || (level > 10 ? 'Typing Grandmaster' : level > 5 ? 'Velocity Racer' : 'Novice Typist'),
    avatarIcon: customProfile.avatar || avatarMeta.icon,
    avatarBg: customProfile.avatarBg || avatarMeta.bg,
    avatar: customProfile.avatar || avatarMeta.icon,
    avatarId,
    theme: customProfile.theme || userProgress.settings?.theme || 'bone',
    level,
    totalXp: totalPoints,
    currentLevelXp,
    nextLevelXp: 500,
    nextLevelXpRequirement: 500,
    percent,
    progressPct: percent,
    streakDays: userProgress.streakDays || 0
  };
}

export function updatePlayerProfile(userProgressOrPartial, maybePartial) {
  let current = loadProgress();
  let baseProgress = current;
  let partial = {};

  if (typeof userProgressOrPartial === 'object' && maybePartial !== undefined) {
    baseProgress = userProgressOrPartial || current;
    partial = maybePartial || {};
  } else if (typeof userProgressOrPartial === 'object') {
    partial = userProgressOrPartial;
  }

  const avatarMeta = PLAYER_AVATARS.find(a => a.id === partial.avatarId);
  const updatedProfile = {
    ...(baseProgress.profile || {}),
    ...partial,
    ...(avatarMeta ? { avatar: avatarMeta.icon, avatarBg: avatarMeta.bg, avatarIcon: avatarMeta.icon } : {})
  };

  const updated = {
    ...baseProgress,
    profile: updatedProfile
  };
  saveProgress(updated);
  return updated;
}

export function getDailyChallengeState(userProgress = {}) {
  const todayStr = new Date().toISOString().split('T')[0];
  const attempts = Array.isArray(userProgress.attemptLogs) ? userProgress.attemptLogs : [];
  const todayAttempts = attempts.filter(a => {
    if (!a.timestamp) return false;
    return new Date(a.timestamp).toISOString().split('T')[0] === todayStr;
  });

  const dailyGoal = 25;
  const currentCount = Math.min(dailyGoal, todayAttempts.length * 5);
  const isCompleted = todayAttempts.some(a => a.status === 'passed' && (a.wpm || 0) >= 20);

  return {
    isCompleted,
    goal: dailyGoal,
    current: currentCount,
    rewardXp: 250
  };
}
