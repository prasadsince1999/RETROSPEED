// RETROSPEED Progress Storage & Session Result Persistence
import { getDefaultProgress, loadProgress, saveProgress } from './migrations';

export function enrollCourse(userProgress, courseId) {
  const current = userProgress || getDefaultProgress();
  const enrolled = Array.isArray(current.enrolledCourses) ? [...current.enrolledCourses] : ['retrospeed-odyssey'];
  
  if (!enrolled.includes(courseId)) {
    enrolled.push(courseId);
  }

  const courses = { ...(current.courses || {}) };
  if (!courses[courseId]) {
    courses[courseId] = {
      unlockedLevel: 1,
      scores: {},
      totalPoints: 0,
      totalStars: 0,
      totalTimeSeconds: 0
    };
  }

  const updated = {
    ...current,
    enrolledCourses: enrolled,
    activeCourseId: courseId,
    courses
  };

  saveProgress(updated);
  return updated;
}

export function unenrollCourse(userProgress, courseId) {
  const current = userProgress || getDefaultProgress();
  let enrolled = Array.isArray(current.enrolledCourses) ? [...current.enrolledCourses] : ['retrospeed-odyssey'];
  
  enrolled = enrolled.filter(id => id !== courseId);
  if (enrolled.length === 0) {
    enrolled = ['retrospeed-odyssey'];
  }

  let nextActiveId = current.activeCourseId;
  if (nextActiveId === courseId) {
    nextActiveId = enrolled[0];
  }

  const updated = {
    ...current,
    enrolledCourses: enrolled,
    activeCourseId: nextActiveId
  };

  saveProgress(updated);
  return updated;
}

export function calculateStarsFromAttempt({ 
  wpm = 0, 
  accuracy = 100, 
  goalWpm = 20, 
  minWpm = null, 
  minAccuracy = 90 
}) {
  const acc = Math.round(accuracy);
  const speed = Math.round(wpm);
  const passWpm = minWpm !== null ? minWpm : Math.max(5, Math.round(goalWpm * 0.6));
  const passAcc = minAccuracy || 90;

  if (acc < 65 || speed < 2) return 0;

  if (acc < passAcc || speed < passWpm) {
    if (acc >= 80 && speed >= Math.round(passWpm * 0.75)) return 2;
    return 1;
  }

  if (acc >= 98 && speed >= goalWpm) return 5;
  if (acc >= 95 && speed >= Math.round(goalWpm * 0.8)) return 4;
  return 3;
}

export function saveLessonResult(courseId, lessonId, result) {
  const current = loadProgress();
  const cId = courseId || 'retrospeed-odyssey';

  if (!current.courses[cId]) {
    current.courses[cId] = { unlockedLevel: 1, scores: {}, totalPoints: 0, totalStars: 0, totalTimeSeconds: 0 };
  }

  const courseData = current.courses[cId];
  const existing = courseData.scores[lessonId] || { stars: 0, points: 0, time: 0, wpm: 0, accuracy: 0 };
  
  const accuracy = Math.min(100, Math.max(0, Math.round(result.accuracy ?? 100)));
  const wpm = Math.max(0, Math.round(result.wpm || 0));
  const earnedStars = result.stars !== undefined 
    ? Number(result.stars) 
    : calculateStarsFromAttempt({
        wpm,
        accuracy,
        goalWpm: result.goalWpm || 20,
        minAccuracy: result.minAccuracy || 90
      });

  const stars = Math.max(existing.stars || 0, Math.min(5, Math.max(0, earnedStars)));
  const points = Math.max(existing.points || 0, Number(result.score || result.points) || 100);
  const durationSeconds = Math.max(1, Math.round(Number(result.durationSeconds ?? (result.durationMs ? result.durationMs / 1000 : result.time)) || 10));
  const timestamp = result.timestamp || Date.now();

  courseData.scores[lessonId] = {
    stars,
    wpm: Math.max(existing.wpm || 0, wpm),
    accuracy: Math.max(existing.accuracy || 0, accuracy),
    points,
    completed: true,
    time: (existing.time || 0) + durationSeconds,
    lastPlayed: timestamp
  };

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

  const nextLevel = Number(lessonId) + 1;
  if (!isNaN(nextLevel) && nextLevel > (courseData.unlockedLevel || 1)) {
    courseData.unlockedLevel = nextLevel;
  }

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

  if (current.attemptLogs.length > 200) {
    current.attemptLogs = current.attemptLogs.slice(0, 200);
  }

  saveProgress(current);
  return current;
}

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
