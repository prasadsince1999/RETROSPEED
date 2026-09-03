import { useState } from 'react';
import { saveLessonResult } from '../utils/storage';
import { isLessonUnlocked, isGameUnlocked } from '../utils/license';

export function useLessonSession({
  userProgress,
  setUserProgress,
  activeCourseId,
  lessons,
  setActiveCourseId,
  setIsViewingMap,
  setCurrentView,
  setIsLessonPlayerActive
}) {
  const [activeLesson, setActiveLesson] = useState(lessons[0]);
  const [gameLaunchOrigin, setGameLaunchOrigin] = useState('play');
  const [drillConfig, setDrillConfig] = useState({
    mode: 'quick',
    difficulty: 'easy',
    timeLimit: 60
  });

  const [scoreModalStats, setScoreModalStats] = useState(null);
  const [jumpWarningLesson, setJumpWarningLesson] = useState(null);
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);

  const launchLesson = (lesson, origin = 'learn') => {
    if (!isLessonUnlocked(lesson, userProgress)) {
      setUnlockModalOpen(true);
      return;
    }

    setActiveLesson(lesson);
    setScoreModalStats(null);
    setJumpWarningLesson(null);
    setGameLaunchOrigin(origin);

    const isMotionOrVideo = 
      lesson.type === 'video' || 
      lesson.type === 'motion' || 
      lesson.renderEngine === 'motion' || 
      /introduction\s+to\s+typing/i.test(lesson.title || '') ||
      /sit\s+straight/i.test(lesson.title || '') ||
      /think\s+ideas/i.test(lesson.title || '');

    if (isMotionOrVideo) {
      setCurrentView('motion');
    } else if (lesson.type === 'game') {
      const gId = (lesson.gameId || lesson.gameApp || lesson.activityApp || '').toLowerCase();
      const title = (lesson.title || '').toLowerCase();
      const combined = `${gId} ${title}`;

      if (combined.includes('plane') || combined.includes('bubble') || combined.includes('paper')) {
        setCurrentView('paper-planes');
      } else if (combined.includes('local') || combined.includes('train') || combined.includes('monster') || combined.includes('line')) {
        setCurrentView('local-line');
      } else if (combined.includes('market') || combined.includes('night') || combined.includes('apple') || combined.includes('chit')) {
        setCurrentView('night-market');
      } else if (combined.includes('drop') || combined.includes('meteor')) {
        setCurrentView('drop-chits');
      } else if (combined.includes('pit') || combined.includes('lane') || combined.includes('racer') || combined.includes('velocity')) {
        setCurrentView('pit-lane');
      } else if (combined.includes('fuse') || combined.includes('desk') || combined.includes('bomb')) {
        setCurrentView('fuse-desk');
      } else if (combined.includes('patch') || combined.includes('terminal') || combined.includes('syntax') || combined.includes('hacker')) {
        setCurrentView('patch-terminal');
      } else {
        setCurrentView('press-room');
      }
    } else if (
      lesson.renderEngine === 'python-studio' || 
      lesson.type === 'code' || 
      activeCourseId === 'python-zero-to-hero' ||
      activeCourseId === 'syntax-forge'
    ) {
      setCurrentView('python-studio');
    } else {
      setCurrentView('lesson');
    }
  };

  const launchPlayArcadeGame = (gameViewId) => {
    if (!isGameUnlocked(gameViewId, userProgress)) {
      setUnlockModalOpen(true);
      return;
    }
    setGameLaunchOrigin('play');
    setCurrentView(gameViewId);
  };

  const handleStartQuickDrill = (difficulty = 'easy', timeLimit = 60) => {
    setDrillConfig({
      mode: 'quick',
      difficulty,
      timeLimit
    });
    setCurrentView('drill');
  };

  const handleStartDailyChallenge = () => {
    setDrillConfig({
      mode: 'daily',
      difficulty: 'medium',
      timeLimit: 90
    });
    setCurrentView('drill');
  };

  const handleStartSkillTrial = (trialType) => {
    if (trialType === 'speed-sprint') {
      setDrillConfig({ mode: 'sprint', difficulty: 'medium', timeLimit: 60 });
    } else if (trialType === 'accuracy-gauntlet') {
      setDrillConfig({ mode: 'gauntlet', difficulty: 'hard', timeLimit: 90 });
    } else if (trialType === 'survival-attack') {
      setDrillConfig({ mode: 'survival', difficulty: 'hard', timeLimit: 15 });
    } else {
      setDrillConfig({ mode: 'quick', difficulty: 'medium', timeLimit: 60 });
    }
    setCurrentView('drill');
  };

  const handleStartSpineLesson = (part, spineLesson) => {
    setScoreModalStats(null);
    setJumpWarningLesson(null);
    setGameLaunchOrigin('learn');
    setActiveLesson(spineLesson);

    if (spineLesson.renderEngine === 'python-studio' || spineLesson.type === 'code' || activeCourseId === 'python-zero-to-hero') {
      setCurrentView('python-studio');
    } else if (spineLesson.isShortcut || spineLesson.type === 'chord') {
      setCurrentView('shortcuts');
    } else if (spineLesson.type === 'motion') {
      setCurrentView('motion');
    } else if (spineLesson.type === 'video') {
      setCurrentView('video');
    } else if (spineLesson.type === 'play' || spineLesson.type === 'game') {
      switch (spineLesson.gameId) {
        case 'paper-planes':
          setCurrentView('paper-planes');
          break;
        case 'local-line':
          setCurrentView('local-line');
          break;
        case 'night-market':
          setCurrentView('night-market');
          break;
        case 'drop-chits':
          setCurrentView('drop-chits');
          break;
        case 'pit-lane':
          setCurrentView('pit-lane');
          break;
        case 'fuse-box':
        case 'fuse-desk':
          setCurrentView('fuse-box');
          break;
        case 'patch-terminal':
          setCurrentView('patch-terminal');
          break;
        case 'press-room':
        default:
          setCurrentView('press-room');
          break;
      }
    } else {
      const adapted = {
        ...spineLesson,
        id: spineLesson.id,
        number: spineLesson.index || spineLesson.lessonNumber,
        title: spineLesson.title,
        description: spineLesson.description,
        type: spineLesson.type || 'drill',
        text: spineLesson.text,
        goalWpm: spineLesson.goalWpm || 20,
        minAccuracy: spineLesson.minAccuracy || 90,
        targetKeys: spineLesson.keys || spineLesson.targetKeys || [],
        keys: spineLesson.keys || []
      };
      setActiveLesson(adapted);
      setCurrentView('lesson');
    }
  };

  const handleComplete = (stats) => {
    const isIntroLesson = 
      activeLesson?.type === 'intro' || 
      activeLesson?.type === 'keys' || 
      activeLesson?.type === 'motion' ||
      activeLesson?.type === 'video' ||
      stats?.isIntro;

    const updatedProgress = saveLessonResult(activeCourseId, activeLesson.id, stats);
    setUserProgress(updatedProgress);

    if (isIntroLesson) {
      setScoreModalStats(null);
      const currentIdx = lessons.findIndex(l => l.id === activeLesson?.id || l.rawId === activeLesson?.id);
      if (currentIdx !== -1 && currentIdx + 1 < lessons.length) {
        const nextLesson = lessons[currentIdx + 1];
        launchLesson(nextLesson, gameLaunchOrigin || 'learn');
      } else {
        setIsViewingMap(true);
        setCurrentView('learn');
      }
    } else {
      setScoreModalStats(stats);
    }
  };

  const handleMotionComplete = (stats = {}) => {
    const introStats = {
      completed: true,
      stars: 5,
      points: 250,
      wpm: 0,
      accuracy: 100,
      errors: 0,
      durationSeconds: stats.time || 30
    };
    const updatedProgress = saveLessonResult(activeCourseId, activeLesson.id, introStats);
    setUserProgress(updatedProgress);
    setScoreModalStats(null);

    const currentIdx = lessons.findIndex(l => l.id === activeLesson?.id || l.rawId === activeLesson?.id);
    if (currentIdx !== -1 && currentIdx + 1 < lessons.length) {
      const nextLesson = lessons[currentIdx + 1];
      launchLesson(nextLesson, gameLaunchOrigin || 'learn');
    } else {
      setIsViewingMap(true);
      setCurrentView('learn');
    }
  };

  const handleArcadeComplete = (gameId, stats = {}) => {
    const gameTitles = {
      'press-room': 'PRESS ROOM — STAMP FACTORY',
      'paper-planes': 'PAPER PLANES — AIR DISPATCH',
      'local-line': 'LOCAL LINE — RAIL DISPATCH',
      'night-market': 'NIGHT MARKET — STREET ORDERS',
      'drop-chits': 'DROP CHITS — OFFICE VAULT',
      'pit-lane': 'PIT LANE — GRAND PRIX RACER',
      'fuse-desk': 'FUSE DESK — WIRE RUNNER',
      'patch-terminal': 'PATCH TERMINAL — CODE HACKER'
    };
    const title = stats.title || gameTitles[gameId] || gameId.replace('-', ' ').toUpperCase();
    const formattedStats = {
      isArcade: true,
      gameId,
      title,
      lessonTitle: title,
      wpm: Math.round(stats.wpm || 0),
      accuracy: Math.round(stats.accuracy ?? 100),
      score: stats.score || 500,
      points: stats.points || stats.score || 500,
      stars: stats.stars || (stats.accuracy >= 95 ? 5 : stats.accuracy >= 85 ? 4 : 3),
      time: stats.durationSeconds || Math.round((stats.durationMs || 30000) / 1000),
      durationSeconds: stats.durationSeconds || Math.round((stats.durationMs || 30000) / 1000),
      errors: stats.errors || 0
    };
    const updatedProgress = saveLessonResult(activeCourseId, gameId, formattedStats);
    setUserProgress(updatedProgress);
    setScoreModalStats(formattedStats);
  };

  const handleNextLesson = () => {
    setScoreModalStats(null);
    const currentIdx = lessons.findIndex(l => l.id === activeLesson?.id || l.rawId === activeLesson?.id);
    if (currentIdx !== -1 && currentIdx + 1 < lessons.length) {
      const nextLesson = lessons[currentIdx + 1];
      launchLesson(nextLesson, gameLaunchOrigin || 'learn');
    } else {
      setIsViewingMap(true);
      setCurrentView('learn');
    }
  };

  const handleRetry = () => {
    setScoreModalStats(null);
    launchLesson(activeLesson, gameLaunchOrigin || 'learn');
  };

  const handleGameExit = () => {
    setScoreModalStats(null);
    if (gameLaunchOrigin === 'play') {
      setCurrentView('play');
    } else {
      setIsViewingMap(true);
      setCurrentView('learn');
    }
  };

  return {
    activeLesson,
    setActiveLesson,
    gameLaunchOrigin,
    setGameLaunchOrigin,
    drillConfig,
    setDrillConfig,
    scoreModalStats,
    setScoreModalStats,
    jumpWarningLesson,
    setJumpWarningLesson,
    unlockModalOpen,
    setUnlockModalOpen,
    launchLesson,
    launchPlayArcadeGame,
    handleStartQuickDrill,
    handleStartDailyChallenge,
    handleStartSkillTrial,
    handleStartSpineLesson,
    handleComplete,
    handleMotionComplete,
    handleArcadeComplete,
    handleNextLesson,
    handleRetry,
    handleGameExit
  };
}
