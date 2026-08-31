// Multi-Course LocalStorage Progress & Settings Manager with Deep Analytics Engine

const STORAGE_KEY = 'keycraft_desktop_app_v2';
const LEGACY_STORAGE_KEY = 'edclub_typing_platform_multi_v1';

// Backwards compatibility map for legacy IDs
const LEGACY_COURSE_ID_MAP = {
  'typing-jungle': 'keycraft-odyssey',
  'typing-basics': 'keystroke-foundations',
  'code-typing': 'syntax-forge',
  'loanwords': 'global-lexicon',
  'mystery-detective': 'chronicles-of-mystery',
  'music-theory': 'symphony-keys',
  'us-state-facts': 'atlas-chronicles',
  'fun-facts': 'curiosity-vault',
  'people-progress': 'pioneers-innovators',
  'natural-world': 'wild-kingdom',
  'vocab-nonfiction': 'literary-heritage',
  'dvorak': 'ergo-dvorak',
  'colemak': 'speed-colemak'
};

function normalizeCourseId(courseId) {
  if (!courseId) return 'keycraft-odyssey';
  return LEGACY_COURSE_ID_MAP[courseId] || courseId;
}

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

// Seed realistic keystroke accuracy stats
function getDefaultKeyStats() {
  return {
    'f': { hits: 320, misses: 4 },
    'j': { hits: 310, misses: 5 },
    'd': { hits: 260, misses: 4 },
    'k': { hits: 250, misses: 6 },
    's': { hits: 230, misses: 5 },
    'l': { hits: 220, misses: 4 },
    'a': { hits: 210, misses: 8 },
    ';': { hits: 180, misses: 10 },
    'g': { hits: 190, misses: 14 },
    'h': { hits: 185, misses: 12 },
    'e': { hits: 280, misses: 6 },
    'i': { hits: 270, misses: 7 },
    'r': { hits: 210, misses: 8 },
    'u': { hits: 200, misses: 11 },
    't': { hits: 195, misses: 12 },
    'y': { hits: 160, misses: 16 },
    'b': { hits: 130, misses: 20 },
    'n': { hits: 175, misses: 10 },
    'v': { hits: 150, misses: 8 },
    'm': { hits: 165, misses: 9 },
    'c': { hits: 140, misses: 11 },
    'w': { hits: 135, misses: 7 },
    'o': { hits: 190, misses: 8 },
    'p': { hits: 115, misses: 18 },
    'q': { hits: 90, misses: 19 },
    'z': { hits: 85, misses: 15 },
    'x': { hits: 95, misses: 12 },
    ',': { hits: 110, misses: 6 },
    '.': { hits: 120, misses: 7 },
    '/': { hits: 75, misses: 14 },
    ' ': { hits: 640, misses: 10 },
    '1': { hits: 80, misses: 8 },
    '2': { hits: 75, misses: 7 },
    '3': { hits: 70, misses: 6 },
    '4': { hits: 65, misses: 9 },
    '5': { hits: 60, misses: 10 },
    '6': { hits: 55, misses: 12 },
    '7': { hits: 50, misses: 11 },
    '8': { hits: 60, misses: 6 },
    '9': { hits: 65, misses: 7 },
    '0': { hits: 70, misses: 8 }
  };
}

// Seed historical attempt logs spanning the last 7 days
function getDefaultAttemptLogs() {
  const now = Date.now();
  const dayMs = 86400000;
  
  return [
    {
      id: 'att_seed_1',
      timestamp: now - dayMs * 6 - 3600000 * 4,
      courseId: 'keycraft-odyssey',
      lessonId: 1,
      lessonTitle: 'Home Row: F & J Keys',
      wpm: 24,
      accuracy: 100,
      stars: 5,
      points: 560,
      durationSeconds: 14,
      status: 'passed',
      errors: 0
    },
    {
      id: 'att_seed_2',
      timestamp: now - dayMs * 5 - 3600000 * 3,
      courseId: 'keycraft-odyssey',
      lessonId: 2,
      lessonTitle: 'Home Row: D & K Keys',
      wpm: 26,
      accuracy: 98,
      stars: 5,
      points: 560,
      durationSeconds: 16,
      status: 'passed',
      errors: 1
    },
    {
      id: 'att_seed_3',
      timestamp: now - dayMs * 4 - 3600000 * 5,
      courseId: 'keycraft-odyssey',
      lessonId: 3,
      lessonTitle: 'Home Row: S & L Keys',
      wpm: 28,
      accuracy: 96,
      stars: 4,
      points: 540,
      durationSeconds: 18,
      status: 'passed',
      errors: 2
    },
    {
      id: 'att_seed_4',
      timestamp: now - dayMs * 3 - 3600000 * 2,
      courseId: 'keycraft-odyssey',
      lessonId: 4,
      lessonTitle: 'Home Row: A & Semi-colon',
      wpm: 31,
      accuracy: 97,
      stars: 5,
      points: 570,
      durationSeconds: 21,
      status: 'passed',
      errors: 2
    },
    {
      id: 'att_seed_5',
      timestamp: now - dayMs * 3 - 3600000 * 1,
      courseId: 'syntax-forge',
      lessonId: 1,
      lessonTitle: 'JavaScript Brackets & Syntax',
      wpm: 22,
      accuracy: 92,
      stars: 3,
      points: 510,
      durationSeconds: 32,
      status: 'passed',
      errors: 4
    },
    {
      id: 'att_seed_6',
      timestamp: now - dayMs * 2 - 3600000 * 6,
      courseId: 'keycraft-odyssey',
      lessonId: 5,
      lessonTitle: 'Top Row: E & I Keys',
      wpm: 33,
      accuracy: 99,
      stars: 5,
      points: 580,
      durationSeconds: 19,
      status: 'passed',
      errors: 1
    },
    {
      id: 'att_seed_7',
      timestamp: now - dayMs * 2 - 3600000 * 4,
      courseId: 'keycraft-odyssey',
      lessonId: 6,
      lessonTitle: 'Top Row: R & U Keys',
      wpm: 34,
      accuracy: 98,
      stars: 5,
      points: 585,
      durationSeconds: 22,
      status: 'passed',
      errors: 1
    },
    {
      id: 'att_seed_8',
      timestamp: now - dayMs * 1 - 3600000 * 3,
      courseId: 'keycraft-odyssey',
      lessonId: 7,
      lessonTitle: 'Top Row: T & Y Keys',
      wpm: 35,
      accuracy: 96,
      stars: 4,
      points: 550,
      durationSeconds: 24,
      status: 'passed',
      errors: 3
    },
    {
      id: 'att_seed_9',
      timestamp: now - dayMs * 1 - 3600000 * 1,
      courseId: 'global-lexicon',
      lessonId: 1,
      lessonTitle: 'French Culinary Vocabulary',
      wpm: 32,
      accuracy: 95,
      stars: 4,
      points: 535,
      durationSeconds: 28,
      status: 'passed',
      errors: 3
    },
    {
      id: 'att_seed_10',
      timestamp: now - 3600000 * 2,
      courseId: 'keycraft-odyssey',
      lessonId: 8,
      lessonTitle: 'Bottom Row: V & M Keys',
      wpm: 38,
      accuracy: 98,
      stars: 5,
      points: 590,
      durationSeconds: 20,
      status: 'passed',
      errors: 1
    }
  ];
}

export function getDefaultProgress() {
  return {
    activeCourseId: 'keycraft-odyssey',
    enrolledCourses: ['keycraft-odyssey', 'syntax-forge', 'global-lexicon', 'curiosity-vault'],
    courses: {
      'keycraft-odyssey': {
        unlockedLevel: 9,
        scores: {
          1: { stars: 5, wpm: 24, accuracy: 100, points: 560, completed: true, time: 14 },
          2: { stars: 5, wpm: 26, accuracy: 98, points: 560, completed: true, time: 16 },
          3: { stars: 4, wpm: 28, accuracy: 96, points: 540, completed: true, time: 18 },
          4: { stars: 5, wpm: 31, accuracy: 97, points: 570, completed: true, time: 21 },
          5: { stars: 5, wpm: 33, accuracy: 99, points: 580, completed: true, time: 19 },
          6: { stars: 5, wpm: 34, accuracy: 98, points: 585, completed: true, time: 22 },
          7: { stars: 4, wpm: 35, accuracy: 96, points: 550, completed: true, time: 24 },
          8: { stars: 5, wpm: 38, accuracy: 98, points: 590, completed: true, time: 20 }
        },
        totalPoints: 4535,
        totalStars: 38,
        totalTimeSeconds: 154
      },
      'syntax-forge': {
        unlockedLevel: 2,
        scores: {
          1: { stars: 3, wpm: 22, accuracy: 92, points: 510, completed: true, time: 32 }
        },
        totalPoints: 510,
        totalStars: 3,
        totalTimeSeconds: 32
      },
      'global-lexicon': {
        unlockedLevel: 2,
        scores: {
          1: { stars: 4, wpm: 32, accuracy: 95, points: 535, completed: true, time: 28 }
        },
        totalPoints: 535,
        totalStars: 4,
        totalTimeSeconds: 28
      },
      'curiosity-vault': {
        unlockedLevel: 1,
        scores: {},
        totalPoints: 0,
        totalStars: 0,
        totalTimeSeconds: 0
      }
    },
    keyStats: getDefaultKeyStats(),
    attemptLogs: getDefaultAttemptLogs(),
    streakDays: 4,
    arcadeStats: {
      balloonGames: 5,
      monsterWaves: 6,
      templeRunes: 14,
      bubblesPopped: 25,
      applesHarvested: 32
    },
    masteryStats: {
      homeRowLessons: 8,
      alphabetKeys: 18,
      codeLessons: 4,
      detectiveLessons: 5,
      musicLessons: 3,
      numberLessons: 6
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
    let saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      // Check legacy storage key for migration
      const legacySaved = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacySaved) {
        saved = legacySaved;
      }
    }

    if (saved) {
      const parsed = JSON.parse(saved);

      // Normalize active course ID if legacy
      if (parsed.activeCourseId) {
        parsed.activeCourseId = normalizeCourseId(parsed.activeCourseId);
      } else {
        parsed.activeCourseId = 'keycraft-odyssey';
      }

      // Normalize enrolled courses
      if (Array.isArray(parsed.enrolledCourses)) {
        parsed.enrolledCourses = parsed.enrolledCourses.map(normalizeCourseId);
      } else {
        parsed.enrolledCourses = ['keycraft-odyssey', 'syntax-forge', 'global-lexicon', 'curiosity-vault'];
      }

      // Migrate course keys
      if (parsed.courses) {
        const migratedCourses = {};
        Object.entries(parsed.courses).forEach(([key, val]) => {
          const newKey = normalizeCourseId(key);
          migratedCourses[newKey] = val;
        });
        parsed.courses = migratedCourses;
      } else {
        parsed.courses = getDefaultProgress().courses;
      }

      // Migrate and ensure analytics fields exist
      if (!parsed.attemptLogs || parsed.attemptLogs.length === 0) {
        parsed.attemptLogs = getDefaultAttemptLogs();
      } else {
        parsed.attemptLogs = parsed.attemptLogs.map(att => ({
          ...att,
          courseId: normalizeCourseId(att.courseId)
        }));
      }

      if (!parsed.keyStats || Object.keys(parsed.keyStats).length === 0) {
        parsed.keyStats = getDefaultKeyStats();
      }

      return parsed;
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
 * Enhanced saveLessonResult to record session timestamp, active duration,
 * key-by-key accuracy hits/misses, and maintain historical attemptLogs.
 */
export function saveLessonResult(courseId, lessonId, result) {
  const current = loadProgress();
  if (!current.courses[courseId]) {
    current.courses[courseId] = { unlockedLevel: 1, scores: {}, totalPoints: 0, totalStars: 0, totalTimeSeconds: 0 };
  }

  const courseData = current.courses[courseId];
  const existing = courseData.scores[lessonId] || { stars: 0, points: 0, time: 0 };
  
  const stars = Math.max(existing.stars || 0, result.stars || 1);
  const points = Math.max(existing.points || 0, result.points || 500);
  const durationSeconds = Number(result.durationSeconds ?? result.time ?? 15) || 15;
  const timestamp = result.timestamp || Date.now();
  const accuracy = Math.round(result.accuracy ?? 100);
  const wpm = Math.round(result.wpm || 0);

  courseData.scores[lessonId] = {
    stars,
    wpm: Math.max(existing.wpm || 0, wpm),
    accuracy: Math.max(existing.accuracy || 0, accuracy),
    points,
    time: Math.max(existing.time || 0, durationSeconds),
    completed: true,
    lastAttemptTimestamp: timestamp
  };

  // Unlock next level in this course
  if (lessonId >= courseData.unlockedLevel) {
    courseData.unlockedLevel = Number(lessonId) + 1;
  }

  // Recalculate course totals
  let totalStars = 0;
  let totalPoints = 0;
  let totalTimeSeconds = 0;
  Object.values(courseData.scores).forEach(s => {
    totalStars += s.stars || 0;
    totalPoints += s.points || 0;
    totalTimeSeconds += s.time || 0;
  });

  courseData.totalStars = totalStars;
  courseData.totalPoints = totalPoints;
  courseData.totalTimeSeconds = totalTimeSeconds;

  // Determine status (passed / failed / partial)
  let status = result.status;
  if (!status) {
    if (accuracy < 75 || stars === 0) {
      status = 'failed';
    } else if (stars < 3) {
      status = 'partial';
    } else {
      status = 'passed';
    }
  }

  // Update key-by-key accuracy hits/misses
  if (!current.keyStats) {
    current.keyStats = getDefaultKeyStats();
  }

  if (result.keyStats && typeof result.keyStats === 'object') {
    Object.entries(result.keyStats).forEach(([keyChar, stat]) => {
      let char = String(keyChar).toLowerCase();
      if (char === 'space') char = ' ';
      if (!current.keyStats[char]) {
        current.keyStats[char] = { hits: 0, misses: 0 };
      }
      current.keyStats[char].hits += Math.max(0, Number(stat?.hits || 0));
      current.keyStats[char].misses += Math.max(0, Number(stat?.misses || 0));
    });
  } else if (result.errors !== undefined) {
    // Inferred incremental key strokes if keyStats map not directly provided
    const estimatedHits = Math.max(1, Math.round((wpm * (durationSeconds / 60)) * 5));
    const estimatedErrors = Math.max(0, Number(result.errors) || 0);
    const defaultSampleKeys = ['f', 'j', 'd', 'k', 's', 'l', 'e', 'i', ' '];
    const sampleKey = defaultSampleKeys[Math.floor(Math.random() * defaultSampleKeys.length)];
    
    if (!current.keyStats[sampleKey]) {
      current.keyStats[sampleKey] = { hits: 0, misses: 0 };
    }
    current.keyStats[sampleKey].hits += estimatedHits;
    current.keyStats[sampleKey].misses += estimatedErrors;
  }

  // Append new attempt log entry
  if (!Array.isArray(current.attemptLogs)) {
    current.attemptLogs = getDefaultAttemptLogs();
  }

  const newLogEntry = {
    id: `att_${timestamp}_${Math.random().toString(36).substring(2, 6)}`,
    timestamp,
    courseId,
    lessonId,
    lessonTitle: result.lessonTitle || `Lesson ${lessonId}`,
    wpm,
    accuracy,
    stars: result.stars || 1,
    points,
    durationSeconds,
    status,
    errors: result.errors || 0,
    keyStats: result.keyStats || null
  };

  current.attemptLogs.unshift(newLogEntry);

  // Keep a cap of 300 recent attempt logs to prevent unbounded storage growth
  if (current.attemptLogs.length > 300) {
    current.attemptLogs = current.attemptLogs.slice(0, 300);
  }

  saveProgress(current);
  return current;
}

/**
 * Format seconds into digital mm:ss or hh:mm:ss string without negative or NaN values
 */
export function formatTimeDigital(totalSeconds) {
  const num = Number(totalSeconds);
  const sec = (!Number.isFinite(num) || num < 0) ? 0 : Math.round(num);
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const remainingSeconds = sec % 60;

  const pad = (val) => String(val).padStart(2, '0');

  if (hours > 0) {
    return `${hours}:${pad(minutes)}:${pad(remainingSeconds)}`;
  }
  return `${pad(minutes)}:${pad(remainingSeconds)}`;
}

/**
 * Format seconds into human readable string ("Xh Ym Zs" or "Xm Ys") without negative or NaN values
 */
export function formatTimeHuman(totalSeconds) {
  const num = Number(totalSeconds);
  const sec = (!Number.isFinite(num) || num < 0) ? 0 : Math.round(num);
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const remainingSeconds = sec % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  }
  return `${minutes}m ${remainingSeconds}s`;
}

/**
 * Calculate comprehensive statistics summary across user progress
 * Filtered optionally by activeCourseId and timeRange ('7days', '30days', 'all')
 */
export function calculateStatsSummary(userProgress, activeCourseId = 'all', timeRange = 'all') {
  const progress = userProgress || loadProgress();
  const allAttempts = Array.isArray(progress.attemptLogs) && progress.attemptLogs.length > 0 
    ? progress.attemptLogs 
    : getDefaultAttemptLogs();

  const now = Date.now();
  const dayMs = 86400000;

  // Filter attempts by time range with calendar start-of-day boundaries
  let timeCutoff = 0;
  const normalizedRange = String(timeRange || 'all').toLowerCase().replace(/\s+/g, '');

  if (normalizedRange === '7days' || normalizedRange === '7d' || normalizedRange === '7') {
    const d = new Date(now);
    d.setDate(d.getDate() - 6);
    d.setHours(0, 0, 0, 0);
    timeCutoff = d.getTime();
  } else if (normalizedRange === '30days' || normalizedRange === '30d' || normalizedRange === '30') {
    const d = new Date(now);
    d.setDate(d.getDate() - 29);
    d.setHours(0, 0, 0, 0);
    timeCutoff = d.getTime();
  }

  let filteredAttempts = allAttempts.filter(att => {
    const ts = Number(att.timestamp);
    if (!Number.isFinite(ts) || ts <= 0) return false;
    if (timeCutoff > 0 && ts < timeCutoff) return false;
    if (activeCourseId && activeCourseId !== 'all' && att.courseId !== activeCourseId) return false;
    return true;
  });

  // If filtered set is empty, fallback to course scores to calculate basic metrics
  if (filteredAttempts.length === 0 && activeCourseId && activeCourseId !== 'all' && progress.courses?.[activeCourseId]) {
    const courseScores = Object.entries(progress.courses[activeCourseId].scores || {});
    filteredAttempts = courseScores.map(([id, s]) => ({
      id: `score_${id}`,
      timestamp: now,
      courseId: activeCourseId,
      lessonId: id,
      lessonTitle: `Lesson ${id}`,
      wpm: s.wpm || 25,
      accuracy: s.accuracy || 98,
      stars: s.stars || 5,
      points: s.points || 560,
      durationSeconds: s.time || 15,
      status: 'passed',
      errors: 0
    }));
  }

  // 1. Overall Accuracy & Average WPM & Total Time
  let totalWeightedAcc = 0;
  let totalWpm = 0;
  let totalTimeSeconds = 0;
  let totalStars = 0;
  let totalLessonsPassed = 0;

  let passedCount = 0;
  let passedDuration = 0;
  let failedCount = 0;
  let failedDuration = 0;
  let partialCount = 0;
  let partialDuration = 0;

  filteredAttempts.forEach(att => {
    const rawDur = Number(att.durationSeconds ?? att.time ?? 15);
    const dur = Number.isFinite(rawDur) && rawDur >= 0 ? rawDur : 15;
    const wpmVal = Number.isFinite(Number(att.wpm)) ? Math.max(0, Number(att.wpm)) : 0;
    const accVal = Number.isFinite(Number(att.accuracy)) ? Math.max(0, Math.min(100, Number(att.accuracy))) : 100;
    const starsVal = Number.isFinite(Number(att.stars)) ? Math.max(0, Number(att.stars)) : 0;

    totalTimeSeconds += dur;
    totalWpm += wpmVal;
    totalWeightedAcc += accVal;
    totalStars += starsVal;

    const st = String(att.status || 'passed').toLowerCase();
    if (st === 'passed' || (starsVal >= 3 && accVal >= 75)) {
      passedCount++;
      passedDuration += dur;
      totalLessonsPassed++;
    } else if (st === 'failed' || accVal < 70) {
      failedCount++;
      failedDuration += dur;
    } else {
      partialCount++;
      partialDuration += dur;
    }
  });

  const count = filteredAttempts.length;
  const averageWpm = count > 0 ? Math.round(totalWpm / count) : 0;
  const overallAccuracy = count > 0 ? Number(Math.max(0, Math.min(100, totalWeightedAcc / count)).toFixed(1)) : 100;

  // 2. Keyboard Coverage % (Unique practiced standard typing keys / 47 total keys)
  const keyStats = progress.keyStats || getDefaultKeyStats();
  const practicedKeysCount = STANDARD_TYPING_KEYS.filter(k => {
    const stat = keyStats[k] || keyStats[k.toLowerCase()] || (k === ' ' ? keyStats['space'] : null);
    return stat && ((Number(stat.hits) || 0) > 0 || (Number(stat.misses) || 0) > 0);
  }).length;

  const totalStandardKeys = STANDARD_TYPING_KEYS.length || 47;
  const keyboardCoverage = Math.min(100, Math.max(0, Math.round((practicedKeysCount / totalStandardKeys) * 100)));

  // 3. Attempt Breakdown with percentages
  const safeTotalDuration = Math.max(1, totalTimeSeconds);
  const attemptBreakdown = {
    totalAttempts: filteredAttempts.length,
    totalDurationSeconds: totalTimeSeconds,
    totalDurationFormatted: formatTimeDigital(totalTimeSeconds),
    passed: {
      count: passedCount,
      durationSeconds: passedDuration,
      durationFormatted: formatTimeDigital(passedDuration),
      percentage: Math.round((passedDuration / safeTotalDuration) * 100)
    },
    failed: {
      count: failedCount,
      durationSeconds: failedDuration,
      durationFormatted: formatTimeDigital(failedDuration),
      percentage: Math.round((failedDuration / safeTotalDuration) * 100)
    },
    partial: {
      count: partialCount,
      durationSeconds: partialDuration,
      durationFormatted: formatTimeDigital(partialDuration),
      percentage: Math.round((partialDuration / safeTotalDuration) * 100)
    }
  };

  // 4. Key Accuracy Map & Heatmap Classification
  // (>95% emerald, 85-94% amber, <85% rose, unpracticed slate)
  const keyAccuracyMap = {};
  const allProblemCandidates = [];

  Object.entries(keyStats).forEach(([rawChar, stat]) => {
    let char = rawChar.toLowerCase();
    if (char === 'space') char = ' ';

    const hits = Math.max(0, Number(stat?.hits || 0));
    const misses = Math.max(0, Number(stat?.misses || 0));
    const total = hits + misses;
    
    let accuracy = 100;
    let status = 'slate'; // unpracticed default

    if (total > 0) {
      accuracy = Number(Math.max(0, Math.min(100, (hits / total) * 100)).toFixed(1));
      if (accuracy >= 95) {
        status = 'emerald';
      } else if (accuracy >= 85) {
        status = 'amber';
      } else {
        status = 'rose';
      }

      const mapping = KEY_FINGER_MAPPING[char] || { finger: 'Standard Touch', hand: 'Both' };
      const errorRate = Number(Math.max(0, Math.min(100, (misses / total) * 100)).toFixed(1));

      // Only candidate keys with actual recorded errors are evaluated for problem key ranking
      if (misses > 0) {
        allProblemCandidates.push({
          key: char,
          label: char === ' ' ? 'Space' : char.toUpperCase(),
          hits,
          misses,
          total,
          accuracy,
          errorRate,
          status,
          finger: mapping.finger,
          hand: mapping.hand
        });
      }
    }

    const statEntry = {
      key: char,
      label: char === ' ' ? 'Space' : char.toUpperCase(),
      hits,
      misses,
      total,
      accuracy,
      status
    };

    keyAccuracyMap[char] = statEntry;
    if (char === ' ') {
      keyAccuracyMap['space'] = statEntry;
    }
  });

  // 5. Top Problem Keys (sorted by error rate with minimal attempt threshold)
  allProblemCandidates.sort((a, b) => {
    const aHasThreshold = a.total >= 3 ? 1 : 0;
    const bHasThreshold = b.total >= 3 ? 1 : 0;
    if (aHasThreshold !== bHasThreshold) {
      return bHasThreshold - aHasThreshold;
    }
    if (b.errorRate !== a.errorRate) {
      return b.errorRate - a.errorRate;
    }
    if (b.misses !== a.misses) {
      return b.misses - a.misses;
    }
    return b.total - a.total;
  });

  const problemKeys = allProblemCandidates.slice(0, 4);

  // 6. Recent Attempts Log (sorted by timestamp descending)
  const recentAttempts = [...filteredAttempts]
    .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
    .slice(0, 20);

  // 7. Dual-Axis Chart Timeline Series Data (Grouped by Day)
  const chartDays = normalizedRange === '7days' || normalizedRange === '7d' ? 7 : (normalizedRange === '30days' || normalizedRange === '30d' ? 30 : 14);
  const chartData = [];

  for (let i = chartDays - 1; i >= 0; i--) {
    const dayStart = new Date(now - i * dayMs);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(now - i * dayMs);
    dayEnd.setHours(23, 59, 59, 999);

    const dayAttempts = filteredAttempts.filter(att => att.timestamp >= dayStart.getTime() && att.timestamp <= dayEnd.getTime());

    const dayName = dayStart.toLocaleDateString('en-US', { weekday: 'short' });
    const monthDay = dayStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    let dayWpmSum = 0;
    let dayAccSum = 0;
    let daySecs = 0;

    dayAttempts.forEach(a => {
      dayWpmSum += Number.isFinite(Number(a.wpm)) ? Math.max(0, Number(a.wpm)) : 0;
      dayAccSum += Number.isFinite(Number(a.accuracy)) ? Math.max(0, Math.min(100, Number(a.accuracy))) : 100;
      const rawD = Number(a.durationSeconds ?? a.time ?? 15);
      daySecs += Number.isFinite(rawD) && rawD >= 0 ? rawD : 15;
    });

    const dayCount = dayAttempts.length;
    const dayWpm = dayCount > 0 ? Math.round(dayWpmSum / dayCount) : 0;
    const dayAcc = dayCount > 0 ? Number((dayAccSum / dayCount).toFixed(1)) : 0;
    const dayMinutes = Number((daySecs / 60).toFixed(1));

    chartData.push({
      date: monthDay,
      dayName,
      fullDate: dayStart.toISOString(),
      practiceTimeSeconds: daySecs,
      practiceTimeMinutes: dayMinutes,
      practiceTimeFormatted: formatTimeDigital(daySecs),
      wpm: dayWpm,
      accuracy: dayAcc,
      attemptsCount: dayCount
    });
  }

  return {
    overallAccuracy,
    totalPracticeTime: formatTimeDigital(totalTimeSeconds),
    totalPracticeTimeHuman: formatTimeHuman(totalTimeSeconds),
    totalTimeSeconds,
    averageWpm,
    keyboardCoverage,
    totalLessonsPassed,
    totalStars,
    attemptBreakdown,
    keyAccuracyMap,
    problemKeys,
    recentAttempts,
    chartData
  };
}

// ==========================================
// 8. PLAYER PROFILE & LEVEL ENGINE
// ==========================================

export const PLAYER_AVATARS = [
  { id: 'ninja', name: 'Shadow Ninja', icon: '🥷', bg: '#F28B82' },
  { id: 'robot', name: 'KeyBot 3000', icon: '🤖', bg: '#4BA3E3' },
  { id: 'wizard', name: 'Syntax Mage', icon: '🧙', bg: '#C3A6E8' },
  { id: 'cyberpunk', name: 'Cyber Neon', icon: '🐱', bg: '#48B89F' },
  { id: 'detective', name: 'Clue Inspector', icon: '🕵️', bg: '#F6C445' },
  { id: 'pharaoh', name: 'Desert Scribe', icon: '👑', bg: '#F6C445' },
  { id: 'hacker', name: 'Terminal Hacker', icon: '💻', bg: '#2D2319', text: 'white' },
  { id: 'maestro', name: 'Key Maestro', icon: '🎵', bg: '#C3A6E8' },
  { id: 'astronaut', name: 'Cosmic Pilot', icon: '🚀', bg: '#4BA3E3' },
  { id: 'racer', name: 'Velocity Racer', icon: '🏎️', bg: '#F28B82' }
];

export const LEVEL_TIERS = [
  { level: 1, minXp: 0, nextXp: 500, title: 'Novice Keypresser' },
  { level: 2, minXp: 500, nextXp: 1200, title: 'Home Row Adept' },
  { level: 3, minXp: 1200, nextXp: 2200, title: 'Touch Typist' },
  { level: 4, minXp: 2200, nextXp: 3500, title: 'Speed Striker' },
  { level: 5, minXp: 3500, nextXp: 5200, title: 'Lexicon Explorer' },
  { level: 6, minXp: 5200, nextXp: 7500, title: 'Velocity Master' },
  { level: 7, minXp: 7500, nextXp: 10500, title: 'Cyber Scribe' },
  { level: 8, minXp: 10500, nextXp: 14500, title: 'Syntax Architect' },
  { level: 9, minXp: 14500, nextXp: 20000, title: 'Grandmaster Typist' },
  { level: 10, minXp: 20000, nextXp: 30000, title: 'Legendary KeyCrafter' }
];

export function calculateLevelInfo(totalXp = 0) {
  const xp = Math.max(0, Number(totalXp) || 0);
  let currentTier = LEVEL_TIERS[0];

  for (let i = 0; i < LEVEL_TIERS.length; i++) {
    if (xp >= LEVEL_TIERS[i].minXp) {
      currentTier = LEVEL_TIERS[i];
    } else {
      break;
    }
  }

  const range = currentTier.nextXp - currentTier.minXp;
  const currentInLevel = Math.max(0, xp - currentTier.minXp);
  const percent = range > 0 ? Math.min(100, Math.round((currentInLevel / range) * 100)) : 100;

  return {
    level: currentTier.level,
    title: currentTier.title,
    totalXp: xp,
    currentLevelXp: currentInLevel,
    nextLevelXpRequirement: range,
    levelNextThreshold: currentTier.nextXp,
    percent
  };
}

export function getPlayerProfile(userProgress = {}) {
  // Compute lifetime XP from courses, arcade, attempt logs, and achievements
  let lifetimePoints = 0;
  
  if (userProgress.courses) {
    Object.values(userProgress.courses).forEach(c => {
      lifetimePoints += Number(c.totalPoints) || 0;
    });
  }

  if (Array.isArray(userProgress.attemptLogs) && userProgress.attemptLogs.length > 0) {
    let attemptSum = 0;
    userProgress.attemptLogs.forEach(a => {
      attemptSum += Number(a.points) || 0;
    });
    if (attemptSum > lifetimePoints) lifetimePoints = attemptSum;
  }

  if (userProgress.totalXp && userProgress.totalXp > lifetimePoints) {
    lifetimePoints = userProgress.totalXp;
  }

  if (lifetimePoints < 5580) lifetimePoints = 5580; // Baseline progress

  const levelInfo = calculateLevelInfo(lifetimePoints);

  const profile = userProgress.profile || {};
  const avatar = PLAYER_AVATARS.find(a => a.id === profile.avatarId) || PLAYER_AVATARS[0];

  return {
    displayName: profile.displayName || 'Player',
    avatarId: avatar.id,
    avatarIcon: avatar.icon,
    avatarBg: avatar.bg,
    avatarName: avatar.name,
    title: profile.customTitle || levelInfo.title,
    level: levelInfo.level,
    totalXp: levelInfo.totalXp,
    currentLevelXp: levelInfo.currentLevelXp,
    nextLevelXpRequirement: levelInfo.nextLevelXpRequirement,
    levelNextThreshold: levelInfo.levelNextThreshold,
    percent: levelInfo.percent,
    streakDays: userProgress.streakDays || 3,
    unlockedAvatars: profile.unlockedAvatars || ['ninja', 'robot', 'detective', 'wizard']
  };
}

export function updatePlayerProfile(userProgress = {}, updates = {}) {
  const currentProfile = userProgress.profile || {};
  const updatedProfile = {
    ...currentProfile,
    ...updates
  };

  const updatedProgress = {
    ...userProgress,
    profile: updatedProfile
  };

  saveProgress(updatedProgress);
  return updatedProgress;
}

// ==========================================
// 9. DAILY CHALLENGE ENGINE
// ==========================================

export function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getDailyChallengeState(userProgress = {}) {
  const todayKey = getTodayKey();
  const dailyRecord = userProgress.dailyChallenges?.[todayKey] || {
    date: todayKey,
    completedKeywords: 12,
    targetKeywords: 25,
    isCompleted: false,
    bestWpm: 0,
    timeSeconds: 0,
    score: 0
  };

  const progressPercent = Math.min(100, Math.round((dailyRecord.completedKeywords / dailyRecord.targetKeywords) * 100));

  return {
    ...dailyRecord,
    todayKey,
    progressPercent
  };
}

export function recordDailyChallengeResult(userProgress = {}, result = {}) {
  const todayKey = getTodayKey();
  const currentDaily = getDailyChallengeState(userProgress);

  const newCompletedKeywords = Math.min(currentDaily.targetKeywords, (currentDaily.completedKeywords || 0) + (result.keywordsTyped || 0));
  const isNowCompleted = newCompletedKeywords >= currentDaily.targetKeywords;

  const xpReward = isNowCompleted && !currentDaily.isCompleted ? 250 : Math.round((result.keywordsTyped || 0) * 10);
  const newTotalXp = (userProgress.totalXp || 5580) + xpReward;

  let newStreak = userProgress.streakDays || 3;
  if (isNowCompleted && !currentDaily.isCompleted) {
    newStreak += 1;
  }

  const updatedDaily = {
    ...currentDaily,
    completedKeywords: newCompletedKeywords,
    isCompleted: isNowCompleted || currentDaily.isCompleted,
    bestWpm: Math.max(currentDaily.bestWpm || 0, result.wpm || 0),
    score: (currentDaily.score || 0) + (result.score || 0)
  };

  const updatedProgress = {
    ...userProgress,
    totalXp: newTotalXp,
    streakDays: newStreak,
    dailyChallenges: {
      ...(userProgress.dailyChallenges || {}),
      [todayKey]: updatedDaily
    }
  };

  saveProgress(updatedProgress);
  return { updatedProgress, xpReward, isCompleted: isNowCompleted };
}

// ==========================================
// 10. QUICK DRILL RESULT RECORDER
// ==========================================

export function recordQuickDrillResult(userProgress = {}, drillResult = {}) {
  const now = Date.now();
  const xpEarned = Math.round(100 + (Number(drillResult.accuracy) || 90) * 1.2 + (Number(drillResult.wpm) || 30) * 1.5);
  const pointsEarned = Number(drillResult.points) || Math.round(xpEarned * 1.5);

  const attemptLog = {
    id: `drill_${now}`,
    timestamp: now,
    courseId: drillResult.difficulty === 'hard' ? 'syntax-forge' : 'keycraft-odyssey',
    lessonId: drillResult.difficulty === 'hard' ? 999 : 998,
    lessonTitle: `Quick Play [${drillResult.difficulty?.toUpperCase() || 'EASY'}] (${drillResult.timeLimit || 60}s)`,
    wpm: Number(drillResult.wpm) || 0,
    accuracy: Number(drillResult.accuracy) || 100,
    stars: Number(drillResult.stars) || (drillResult.wpm >= 40 ? 5 : 4),
    points: pointsEarned,
    durationSeconds: Number(drillResult.durationSeconds) || drillResult.timeLimit || 60,
    status: (drillResult.accuracy || 100) >= 80 ? 'passed' : 'failed',
    errors: Number(drillResult.errors) || 0
  };

  const existingLogs = Array.isArray(userProgress.attemptLogs) ? userProgress.attemptLogs : [];
  const updatedLogs = [attemptLog, ...existingLogs].slice(0, 100);

  const newTotalXp = (userProgress.totalXp || 5580) + xpEarned;

  const updatedProgress = {
    ...userProgress,
    totalXp: newTotalXp,
    attemptLogs: updatedLogs
  };

  saveProgress(updatedProgress);
  return { updatedProgress, xpEarned, pointsEarned };
}

