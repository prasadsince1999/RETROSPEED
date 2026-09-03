// RETROSPEED Storage Migrations, Schema Initialization & Defaults
import { STORAGE_KEY } from './constants';

export function getDefaultProgress() {
  return {
    activeCourseId: 'retrospeed-odyssey',
    enrolledCourses: ['retrospeed-odyssey'],
    courses: {
      'retrospeed-odyssey': {
        unlockedLevel: 1,
        scores: {},
        totalPoints: 0,
        totalStars: 0,
        totalTimeSeconds: 0
      },
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
    profile: {
      displayName: 'Player',
      name: 'Player',
      title: 'Novice Typist',
      avatarId: 'ninja',
      avatar: '🥷',
      avatarBg: '#F28B82'
    },
    license: {
      status: 'free',
      isUnlocked: false
    },
    arcadeStats: {
      pressRoom: 0,
      paperPlanes: 0,
      localLine: 0,
      nightMarket: 0,
      dropChits: 0,
      pitLane: 0,
      fuseDesk: 0,
      patchTerminal: 0
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

export function saveProgress(data) {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

export function resetAllProgress() {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('keycraft_desktop_app_v2');
      localStorage.removeItem('edclub_typing_platform_multi_v1');
    }
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.clear();
    }
  } catch (e) {
    console.error('Error clearing local storage:', e);
  }

  const fresh = getDefaultProgress();
  saveProgress(fresh);
  return fresh;
}

export function loadProgress() {
  try {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        
        let enrolled = Array.isArray(parsed.enrolledCourses) && parsed.enrolledCourses.length > 0
          ? parsed.enrolledCourses
          : ['retrospeed-odyssey'];

        // Clean up legacy auto-seeded keystroke-foundations if unplayed
        const kfScores = parsed.courses?.['keystroke-foundations']?.scores || {};
        if (enrolled.includes('keystroke-foundations') && Object.keys(kfScores).length === 0) {
          enrolled = enrolled.filter(id => id !== 'keystroke-foundations');
          if (enrolled.length === 0) enrolled = ['retrospeed-odyssey'];
        }

        const activeCourse = (parsed.activeCourseId && parsed.activeCourseId !== 'keystroke-foundations')
          ? parsed.activeCourseId
          : (enrolled[0] || 'retrospeed-odyssey');

        return {
          ...getDefaultProgress(),
          ...parsed,
          activeCourseId: activeCourse,
          enrolledCourses: enrolled,
          courses: parsed.courses || {},
          attemptLogs: parsed.attemptLogs || [],
          keyStats: parsed.keyStats || {},
          settings: {
            ...getDefaultProgress().settings,
            ...(parsed.settings || {})
          }
        };
      }
    }
  } catch (e) {
    console.error('Failed to load saved progress:', e);
  }

  return getDefaultProgress();
}
