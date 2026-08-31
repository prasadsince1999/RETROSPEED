// RETROSPEED — LocalStorage Progress & Deterministic Analytics Engine
// 100% Local-First, Zero Data Tracking, Deterministic Calculations

export const STORAGE_KEY = 'retrospeed_user_v1';

// Standard 47 typing keys for keyboard coverage calculation
export const STANDARD_TYPING_KEYS = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
  '-', '=', '[', ']', ';', "'", ',', '.', '/', '`', ' '
];

// Key to finger and hand mapping for problem key analysis
export const KEY_FINGER_MAPPING = {
  'q': { finger: 'Left Pinky', hand: 'Left' },
  'a': { finger: 'Left Pinky', hand: 'Left' },
  'z': { finger: 'Left Pinky', hand: 'Left' },
  '1': { finger: 'Left Pinky', hand: 'Left' },
  '`': { finger: 'Left Pinky', hand: 'Left' },
  'w': { finger: 'Left Ring', hand: 'Left' },
  's': { finger: 'Left Ring', hand: 'Left' },
  'x': { finger: 'Left Ring', hand: 'Left' },
  '2': { finger: 'Left Ring', hand: 'Left' },
  'e': { finger: 'Left Middle', hand: 'Left' },
  'd': { finger: 'Left Middle', hand: 'Left' },
  'c': { finger: 'Left Middle', hand: 'Left' },
  '3': { finger: 'Left Middle', hand: 'Left' },
  'r': { finger: 'Left Index', hand: 'Left' },
  'f': { finger: 'Left Index (Home)', hand: 'Left' },
  'v': { finger: 'Left Index', hand: 'Left' },
  't': { finger: 'Left Index', hand: 'Left' },
  'g': { finger: 'Left Index', hand: 'Left' },
  'b': { finger: 'Left Index', hand: 'Left' },
  '4': { finger: 'Left Index', hand: 'Left' },
  '5': { finger: 'Left Index', hand: 'Left' },
  'y': { finger: 'Right Index', hand: 'Right' },
  'h': { finger: 'Right Index', hand: 'Right' },
  'n': { finger: 'Right Index', hand: 'Right' },
  'u': { finger: 'Right Index', hand: 'Right' },
  'j': { finger: 'Right Index (Home)', hand: 'Right' },
  'm': { finger: 'Right Index', hand: 'Right' },
  '6': { finger: 'Right Index', hand: 'Right' },
  '7': { finger: 'Right Index', hand: 'Right' },
  'i': { finger: 'Right Middle', hand: 'Right' },
  'k': { finger: 'Right Middle', hand: 'Right' },
  ',': { finger: 'Right Middle', hand: 'Right' },
  '8': { finger: 'Right Middle', hand: 'Right' },
  'o': { finger: 'Right Ring', hand: 'Right' },
  'l': { finger: 'Right Ring', hand: 'Right' },
  '.': { finger: 'Right Ring', hand: 'Right' },
  '9': { finger: 'Right Ring', hand: 'Right' },
  'p': { finger: 'Right Pinky', hand: 'Right' },
  ';': { finger: 'Right Pinky', hand: 'Right' },
  '/': { finger: 'Right Pinky', hand: 'Right' },
  '0': { finger: 'Right Pinky', hand: 'Right' },
  '-': { finger: 'Right Pinky', hand: 'Right' },
  '=': { finger: 'Right Pinky', hand: 'Right' },
  '[': { finger: 'Right Pinky', hand: 'Right' },
  ']': { finger: 'Right Pinky', hand: 'Right' },
  "'": { finger: 'Right Pinky', hand: 'Right' },
  ' ': { finger: 'Thumb', hand: 'Both' }
};

// Pure, honest empty state for new installations
export function getDefaultProgress() {
  return {
    activeCourseId: 'keystroke-foundations',
    enrolledCourses: ['keystroke-foundations', 'retrospeed-odyssey', 'syntax-forge'],
    courses: {
      'keystroke-foundations': {
        unlockedLevel: 1,
        scores: {},
        totalPoints: 0,
        totalStars: 0,
        totalTimeSeconds: 0
      }
    },
    keyStats: {},
    attemptLogs: [],
    streakDays: 0,
    lastActiveDate: null,
    arcadeStats: {
      balloonGames: 0,
      monsterWaves: 0,
      templeRunes: 0,
      bubblesPopped: 0,
      applesHarvested: 0,
      meteorWords: 0,
      racerLaps: 0,
      bombsDefused: 0,
      syntaxShields: 0
    },
    masteryStats: {
      homeRowLessons: 0,
      alphabetKeys: 0,
      codeLessons: 0,
      detectiveLessons: 0,
      musicLessons: 0,
      numberLessons: 0
    },
    settings: {
      sound: true,
      keyboard: true,
      hands: true,
      theme: 'bone'
    }
  };
}

export function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...getDefaultProgress(),
        ...parsed,
        courses: parsed.courses || {},
        attemptLogs: parsed.attemptLogs || [],
        keyStats: parsed.keyStats || {},
        settings: {
          ...getDefaultProgress().settings,
          ...(parsed.settings || {})
        }
      };
    }
  } catch (e) {
    console.error('Failed to load saved progress:', e);
  }

  return getDefaultProgress();
}

export function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

/**
 * Universal Game and Lesson Session Result Saver.
 * Persists attempts, records per-key accuracy, and increments streaks.
 */
export function saveLessonResult(courseId, lessonId, result) {
  const current = loadProgress();
  const cId = courseId || 'keystroke-foundations';

  if (!current.courses[cId]) {
    current.courses[cId] = { unlockedLevel: 1, scores: {}, totalPoints: 0, totalStars: 0, totalTimeSeconds: 0 };
  }

  const courseData = current.courses[cId];
  const existing = courseData.scores[lessonId] || { stars: 0, points: 0, time: 0, wpm: 0, accuracy: 0 };
  
  const stars = Math.max(existing.stars || 0, Number(result.stars) || 1);
  const points = Math.max(existing.points || 0, Number(result.score || result.points) || 100);
  const durationSeconds = Math.max(1, Math.round(Number(result.durationSeconds ?? (result.durationMs ? result.durationMs / 1000 : result.time)) || 10));
  const timestamp = result.timestamp || Date.now();
  const accuracy = Math.min(100, Math.max(0, Math.round(result.accuracy ?? 100)));
  const wpm = Math.max(0, Math.round(result.wpm || 0));

  courseData.scores[lessonId] = {
    stars,
    wpm: Math.max(existing.wpm || 0, wpm),
    accuracy: Math.max(existing.accuracy || 0, accuracy),
    points,
    completed: true,
    time: (existing.time || 0) + durationSeconds,
    lastPlayed: timestamp
  };

  // Recalculate course aggregates
  let courseTotalStars = 0;
  let courseTotalPoints = 0;
  let courseTotalTime = 0;
  Object.values(courseData.scores).forEach(s => {
    courseTotalStars += s.stars || 0;
    courseTotalPoints += s.points || 0;
    courseTotalTime += s.time || 0;
  });
  courseData.totalStars = courseTotalStars;
  courseData.totalPoints = courseTotalPoints;
  courseData.totalTimeSeconds = courseTotalTime;

  // Unlock next level if passed
  const nextLevel = Number(lessonId) + 1;
  if (!isNaN(nextLevel) && nextLevel > (courseData.unlockedLevel || 1)) {
    courseData.unlockedLevel = nextLevel;
  }

  // Update per-key accuracy metrics
  if (result.keyHits && typeof result.keyHits === 'object') {
    if (!current.keyStats) current.keyStats = {};
    Object.entries(result.keyHits).forEach(([char, count]) => {
      const k = char.toLowerCase();
      if (!current.keyStats[k]) current.keyStats[k] = { hits: 0, misses: 0 };
      current.keyStats[k].hits += Number(count) || 0;
    });
  }

  if (result.keyMisses && typeof result.keyMisses === 'object') {
    if (!current.keyStats) current.keyStats = {};
    Object.entries(result.keyMisses).forEach(([char, count]) => {
      const k = char.toLowerCase();
      if (!current.keyStats[k]) current.keyStats[k] = { hits: 0, misses: 0 };
      current.keyStats[k].misses += Number(count) || 0;
    });
  }

  // Streak logic based on calendar days
  const todayStr = new Date().toISOString().split('T')[0];
  if (current.lastActiveDate !== todayStr) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (current.lastActiveDate === yesterday) {
      current.streakDays = (current.streakDays || 0) + 1;
    } else {
      current.streakDays = 1;
    }
    current.lastActiveDate = todayStr;
  }

  // Record attempt in historical attempt log
  if (!Array.isArray(current.attemptLogs)) current.attemptLogs = [];
  current.attemptLogs.unshift({
    id: `att_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestamp,
    courseId: cId,
    lessonId,
    lessonTitle: result.title || `Lesson ${lessonId}`,
    wpm,
    accuracy,
    stars,
    points,
    durationSeconds,
    status: accuracy >= 80 ? 'passed' : 'failed',
    errors: Number(result.errors) || 0
  });

  // Cap logs at 200 items to keep storage lightweight
  if (current.attemptLogs.length > 200) {
    current.attemptLogs = current.attemptLogs.slice(0, 200);
  }

  saveProgress(current);
  return current;
}

/**
 * Deterministic Stats Summary Calculator.
 * Returns true empty states (hasData: false, avgWpm: 0, accuracy: 0) when no sessions exist.
 */
export function calculateStatsSummary(userProgress, activeCourseId = null, timeRange = '7days') {
  const attempts = Array.isArray(userProgress?.attemptLogs) ? userProgress.attemptLogs : [];

  const emptyBreakdown = {
    totalAttempts: 0,
    passed: { count: 0, durationFormatted: '0s', percentage: 0 },
    partial: { count: 0, durationFormatted: '0s', percentage: 0 },
    failed: { count: 0, durationFormatted: '0s', percentage: 0 }
  };

  const defaultChartData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
    day,
    date: day,
    durationSecs: 0,
    durationFormatted: '0s',
    wpm: 0,
    accuracy: 0
  }));

  if (attempts.length === 0) {
    const keyAccuracyMap = {};
    STANDARD_TYPING_KEYS.forEach(k => {
      keyAccuracyMap[k] = { key: k, accuracy: null, status: 'slate', hits: 0, misses: 0, total: 0 };
    });

    return {
      hasData: false,
      overallAccuracy: 0,
      totalPracticeTime: '00:00',
      totalPracticeTimeHuman: '0s',
      totalPracticeSeconds: 0,
      averageWpm: 0,
      avgWpm: 0,
      bestWpm: 0,
      keyboardCoverage: 0,
      keyboardCoveragePct: 0,
      totalLessonsPassed: 0,
      passedAttemptsCount: 0,
      failedAttemptsCount: 0,
      totalAttemptsCount: 0,
      totalStars: 0,
      totalPoints: 0,
      attemptBreakdown: emptyBreakdown,
      recentAttempts: [],
      problemKeys: [],
      keyAccuracyMap,
      chartData: defaultChartData
    };
  }

  // Filter attempts by course
  let filtered = activeCourseId && activeCourseId !== 'all'
    ? attempts.filter(a => a.courseId === activeCourseId)
    : attempts;

  if (filtered.length === 0) filtered = attempts;

  let totalWpm = 0;
  let bestWpm = 0;
  let totalAcc = 0;
  let totalSecs = 0;
  let passedCount = 0;
  let partialCount = 0;
  let failedCount = 0;
  let passedSecs = 0;
  let partialSecs = 0;
  let failedSecs = 0;
  let totalStars = 0;
  let totalPoints = 0;

  filtered.forEach(a => {
    const wpm = Number(a.wpm) || 0;
    const acc = Number(a.accuracy) || 0;
    const dur = Number(a.durationSeconds) || 0;
    
    totalWpm += wpm;
    if (wpm > bestWpm) bestWpm = wpm;
    totalAcc += acc;
    totalSecs += dur;
    totalStars += Number(a.stars) || 0;
    totalPoints += Number(a.points) || 0;

    if (acc >= 90) {
      passedCount++;
      passedSecs += dur;
    } else if (acc >= 75) {
      partialCount++;
      partialSecs += dur;
    } else {
      failedCount++;
      failedSecs += dur;
    }
  });

  const avgWpm = Math.round(totalWpm / filtered.length);
  const overallAccuracy = Math.round(totalAcc / filtered.length);

  const attemptBreakdown = {
    totalAttempts: filtered.length,
    passed: {
      count: passedCount,
      durationFormatted: formatTimeHuman(passedSecs),
      percentage: Math.round((passedCount / filtered.length) * 100)
    },
    partial: {
      count: partialCount,
      durationFormatted: formatTimeHuman(partialSecs),
      percentage: Math.round((partialCount / filtered.length) * 100)
    },
    failed: {
      count: failedCount,
      durationFormatted: formatTimeHuman(failedSecs),
      percentage: Math.round((failedCount / filtered.length) * 100)
    }
  };

  // Keyboard coverage & key accuracy map
  const keyStats = userProgress?.keyStats || {};
  const practicedKeysCount = Object.keys(keyStats).filter(k => (keyStats[k]?.hits || 0) > 0).length;
  const keyboardCoveragePct = Math.min(100, Math.round((practicedKeysCount / STANDARD_TYPING_KEYS.length) * 100));

  const keyAccuracyMap = {};
  STANDARD_TYPING_KEYS.forEach(k => {
    const data = keyStats[k];
    if (!data || (data.hits === 0 && data.misses === 0)) {
      keyAccuracyMap[k] = { key: k, accuracy: null, status: 'slate', hits: 0, misses: 0, total: 0 };
    } else {
      const hits = data.hits || 0;
      const misses = data.misses || 0;
      const total = hits + misses;
      const acc = total > 0 ? Math.round((hits / total) * 100) : 100;
      let status = 'emerald';
      if (acc < 85) status = 'rose';
      else if (acc < 95) status = 'amber';
      keyAccuracyMap[k] = { key: k, accuracy: acc, status, hits, misses, total };
    }
  });

  // Problem keys
  const problemKeys = Object.entries(keyStats)
    .filter(([_, data]) => (data.misses || 0) > 0)
    .map(([key, data]) => {
      const hits = data.hits || 0;
      const misses = data.misses || 0;
      const total = hits + misses;
      const errorRate = total > 0 ? Math.round((misses / total) * 100) : 0;
      const accuracy = 100 - errorRate;
      const meta = KEY_FINGER_MAPPING[key] || { finger: 'Standard Touch', hand: 'Both' };
      return {
        key,
        hits,
        misses,
        errorRate,
        accuracy,
        finger: meta.finger,
        hand: meta.hand
      };
    })
    .sort((a, b) => b.misses - a.misses)
    .slice(0, 4);

  return {
    hasData: true,
    overallAccuracy,
    totalPracticeTime: formatTimeDigital(totalSecs),
    totalPracticeTimeHuman: formatTimeHuman(totalSecs),
    totalPracticeSeconds: totalSecs,
    averageWpm: avgWpm,
    avgWpm,
    bestWpm,
    keyboardCoverage: keyboardCoveragePct,
    keyboardCoveragePct,
    totalLessonsPassed: passedCount,
    passedAttemptsCount: passedCount,
    failedAttemptsCount: failedCount,
    totalAttemptsCount: filtered.length,
    totalStars,
    totalPoints,
    attemptBreakdown,
    recentAttempts: filtered.slice(0, 20),
    problemKeys,
    keyAccuracyMap,
    chartData: defaultChartData
  };
}

/**
 * Deterministic Player Profile Extractor.
 */
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

/**
 * Deterministic Daily Challenge State Calculator.
 */
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

/**
 * Quick Drill and Daily Challenge Persistence Handlers.
 */
export function recordQuickDrillResult(userProgress, result) {
  const xpEarned = Math.round((result.wordsCompleted || 5) * 20 + (result.wpm || 0) * 5);
  
  const saved = saveLessonResult('practice', `drill_${Date.now()}`, {
    title: result.title || `Quick Drill (${result.difficulty || 'Normal'})`,
    wpm: result.wpm || 0,
    accuracy: result.accuracy || 100,
    points: xpEarned,
    score: xpEarned,
    durationSeconds: result.durationSeconds || 60,
    errors: result.errors || 0,
    stars: result.wpm >= 50 ? 5 : result.wpm >= 30 ? 4 : 3
  });

  return {
    xpEarned,
    updatedProgress: saved
  };
}

export const PLAYER_AVATARS = [
  { id: 'ninja', icon: '🥷', label: 'Ninja', bg: '#F28B82' },
  { id: 'hacker', icon: '💻', label: 'Hacker', bg: '#48B89F' },
  { id: 'racer', icon: '🏎️', label: 'Racer', bg: '#F6C445' },
  { id: 'robot', icon: '🤖', label: 'Robot', bg: '#4BA3E3' },
  { id: 'wizard', icon: '🧙', label: 'Wizard', bg: '#C3A6E8' },
  { id: 'diver', icon: '🤿', label: 'Diver', bg: '#70B9D9' },
  { id: 'tiger', icon: '🐯', label: 'Tiger', bg: '#F6C445' },
  { id: 'raccoon', icon: '🦝', label: 'Raccoon', bg: '#FAF3E0' },
  { id: 'star', icon: '⭐', label: 'Star', bg: '#F6C445' }
];

export const LEVEL_TIERS = [
  { minLevel: 1, maxLevel: 4, title: 'Novice Typist', badge: 'Tier 1' },
  { minLevel: 5, maxLevel: 9, title: 'Velocity Racer', badge: 'Tier 2' },
  { minLevel: 10, maxLevel: 19, title: 'Typing Grandmaster', badge: 'Tier 3' },
  { minLevel: 20, maxLevel: 99, title: 'Arcade Legend', badge: 'Tier 4' }
];

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


export function recordDailyChallengeResult(userProgress, result) {
  const xpEarned = 250;

  const saved = saveLessonResult('daily', `daily_${new Date().toISOString().split('T')[0]}`, {
    title: `Daily Challenge (${new Date().toLocaleDateString()})`,
    wpm: result.wpm || 0,
    accuracy: result.accuracy || 100,
    points: xpEarned,
    score: xpEarned,
    durationSeconds: result.durationSeconds || 90,
    errors: result.errors || 0,
    stars: 5
  });

  return {
    xpEarned,
    updatedProgress: saved
  };
}

export function formatTimeDigital(totalSeconds = 0) {
  const s = Math.max(0, Math.round(Number(totalSeconds) || 0));
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatTimeHuman(totalSeconds = 0) {
  const s = Math.max(0, Math.round(Number(totalSeconds) || 0));
  const hrs = Math.floor(s / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
  if (mins > 0) return `${mins}m ${secs}s`;
  return `${secs}s`;
}
