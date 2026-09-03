// RETROSPEED Analytics & Statistics Calculation Engine
import { STANDARD_TYPING_KEYS, KEY_FINGER_MAPPING } from './constants';

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

  const avgWpm = filtered.length > 0 ? Math.round(totalWpm / filtered.length) : 0;
  const overallAccuracy = filtered.length > 0 ? Math.round(totalAcc / filtered.length) : 0;

  const attemptBreakdown = {
    totalAttempts: filtered.length,
    passed: {
      count: passedCount,
      durationFormatted: formatTimeHuman(passedSecs),
      percentage: filtered.length > 0 ? Math.round((passedCount / filtered.length) * 100) : 0
    },
    partial: {
      count: partialCount,
      durationFormatted: formatTimeHuman(partialSecs),
      percentage: filtered.length > 0 ? Math.round((partialCount / filtered.length) * 100) : 0
    },
    failed: {
      count: failedCount,
      durationFormatted: formatTimeHuman(failedSecs),
      percentage: filtered.length > 0 ? Math.round((failedCount / filtered.length) * 100) : 0
    }
  };

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
