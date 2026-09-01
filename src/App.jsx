import React, { useState, useEffect, Suspense, lazy } from 'react';
import DesktopWindowShell from './components/DesktopWindowShell';
import HomeView from './components/HomeView';
import PracticeLobby from './components/PracticeLobby';
import LessonMap from './components/LessonMap';
import MyLearningsView from './components/MyLearningsView';
import LessonPlayer from './components/LessonPlayer';
import VideoPlayer from './components/VideoPlayer';
import ScoreModal from './components/ScoreModal';
import JumpWarningModal from './components/JumpWarningModal';
import QuickDrillPlayer from './components/QuickDrillPlayer';
import ShopView from './components/ShopView';
import UnlockModal from './components/UnlockModal';
import { getCurriculumForCourse } from './data/curriculum';
import { SPINE_PARTS } from './data/spineCurriculum';
import { loadProgress, saveLessonResult, saveProgress, resetAllProgress, enrollCourse, unenrollCourse } from './utils/storage';
import { sound } from './utils/audio';
import { isGameUnlocked, isLessonUnlocked } from './utils/license';
import { applyTheme, DEFAULT_THEME_ID } from './theme';

// Lazy load hub views and arcade engines on demand
const PracticeHub = lazy(() => import('./components/PracticeHub'));
const ChallengeHub = lazy(() => import('./components/ChallengeHub'));
const CourseCatalog = lazy(() => import('./components/CourseCatalog'));
const StatsDashboard = lazy(() => import('./components/StatsDashboard'));

// 8 Paper-Arcade Games
const PressRoomGame = lazy(() => import('./components/games/PressRoomGame'));
const LocalLineGame = lazy(() => import('./components/games/LocalLineGame'));
const PaperPlanesGame = lazy(() => import('./components/games/PaperPlanesGame'));
const NightMarketGame = lazy(() => import('./components/games/NightMarketGame'));
const DropChitsGame = lazy(() => import('./components/games/DropChitsGame'));
const PitLaneGame = lazy(() => import('./components/games/PitLaneGame'));
const FuseDeskGame = lazy(() => import('./components/games/FuseDeskGame'));
const PatchTerminalGame = lazy(() => import('./components/games/PatchTerminalGame'));
const ShortcutPlayer = lazy(() => import('./components/ShortcutPlayer'));
const MotionLessonPlayer = lazy(() => import('./components/motion/MotionLessonPlayer'));

function ViewLoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[50vh] p-8">
      <div className="flex flex-col items-center space-y-3">
        <div className="w-10 h-10 border-4 border-[#2D2319] border-t-[#F6C445] rounded-full animate-spin" />
        <span className="text-xs font-bold text-[#2D2319] font-mono uppercase tracking-wider">
          Loading Workspace...
        </span>
      </div>
    </div>
  );
}

export default function App() {
  const [userProgress, setUserProgress] = useState(loadProgress());
  const [activeCourseId, setActiveCourseId] = useState(userProgress.activeCourseId || 'retrospeed-odyssey');
  const [currentView, setCurrentView] = useState('home');
  const [isViewingMap, setIsViewingMap] = useState(false);
  const [shopInitialTab, setShopInitialTab] = useState('themes');
  const [gameLaunchOrigin, setGameLaunchOrigin] = useState('play'); // 'learn' | 'play'
  
  // Drill config
  const [drillConfig, setDrillConfig] = useState({
    mode: 'quick',
    difficulty: 'easy',
    timeLimit: 60
  });

  // Dynamic curriculum for currently active course
  const currentCurriculum = getCurriculumForCourse(activeCourseId);
  const { course, stages, lessons } = currentCurriculum;

  const [activeLesson, setActiveLesson] = useState(lessons[0]);
  
  // Modals state
  const [scoreModalStats, setScoreModalStats] = useState(null);
  const [jumpWarningLesson, setJumpWarningLesson] = useState(null);
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);

  // Settings
  const [soundEnabled, setSoundEnabled] = useState(userProgress.settings?.sound ?? true);
  const [selectedTheme, setSelectedTheme] = useState(userProgress.settings?.theme || 'bone');

  // Sync sound engine state
  useEffect(() => {
    sound.setMuted(!soundEnabled);
  }, [soundEnabled]);

  // Sync theme & sound pack on mount and when changed
  useEffect(() => {
    applyTheme(selectedTheme || DEFAULT_THEME_ID);
  }, [selectedTheme]);

  useEffect(() => {
    if (userProgress.settings?.soundPack) {
      sound.setPack(userProgress.settings.soundPack);
    }
    if (userProgress.settings?.theme) {
      setSelectedTheme(userProgress.settings.theme);
      applyTheme(userProgress.settings.theme);
    }
  }, []);

  // Handle enrolling course from Shop into personal workspace
  const handleEnrollCourse = (courseId) => {
    const updated = enrollCourse(userProgress, courseId);
    setUserProgress(updated);
    setActiveCourseId(courseId);
    setIsViewingMap(false);
    setCurrentView('learn');
  };

  // Handle un-enrolling course from personal workspace back to Shop
  const handleUnenrollCourse = (courseId) => {
    const updated = unenrollCourse(userProgress, courseId);
    setUserProgress(updated);
    if (activeCourseId === courseId) {
      setActiveCourseId(updated.activeCourseId);
    }
  };

  // Handle course opening / level jumping
  const handleSelectCourse = (courseId, targetLevelId = null) => {
    const updated = enrollCourse(userProgress, courseId);
    setUserProgress(updated);
    setActiveCourseId(courseId);

    const newCurriculum = getCurriculumForCourse(courseId);
    if (targetLevelId) {
      const target = newCurriculum.lessons.find(l => l.id === targetLevelId || l.rawId === targetLevelId) || newCurriculum.lessons[0];
      launchLesson(target, 'learn');
    } else {
      setActiveLesson(newCurriculum.lessons[0]);
      setIsViewingMap(true);
      setCurrentView('learn');
    }
  };

  // Persist settings
  const updateSettings = (partial) => {
    const updated = {
      ...userProgress,
      settings: {
        ...userProgress.settings,
        ...partial
      }
    };
    setUserProgress(updated);
    saveProgress(updated);
  };

  // Launch a specific lesson
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
    } else {
      setCurrentView('lesson');
    }
  };

  // Launch direct arcade game from Play Hub
  const launchPlayArcadeGame = (gameViewId) => {
    if (!isGameUnlocked(gameViewId, userProgress)) {
      setUnlockModalOpen(true);
      return;
    }
    setGameLaunchOrigin('play');
    setCurrentView(gameViewId);
  };

  // Start Quick Play Drill
  const handleStartQuickDrill = (difficulty = 'easy', timeLimit = 60) => {
    setDrillConfig({
      mode: 'quick',
      difficulty,
      timeLimit
    });
    setCurrentView('drill');
  };

  // Start Daily Challenge Drill
  const handleStartDailyChallenge = () => {
    setDrillConfig({
      mode: 'daily',
      difficulty: 'medium',
      timeLimit: 90
    });
    setCurrentView('drill');
  };

  // Start Specific Skill Trial
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

  // Start Zero-to-Hero Spine Lesson
  const handleStartSpineLesson = (part, spineLesson) => {
    setScoreModalStats(null);
    setJumpWarningLesson(null);
    setGameLaunchOrigin('learn');
    setActiveLesson(spineLesson);

    if (spineLesson.isShortcut || spineLesson.type === 'chord') {
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

  // Factory Reset All Workshop Data
  const handleResetAllData = () => {
    const fresh = resetAllProgress();
    setUserProgress(fresh);
    setActiveCourseId('retrospeed-odyssey');
    setCurrentView('home');
  };

  // Handle lesson / game completion
  const handleComplete = (stats) => {
    const updatedProgress = saveLessonResult(activeCourseId, activeLesson.id, stats);
    setUserProgress(updatedProgress);
    setScoreModalStats(stats);
  };

  // Handle video / motion intro completion (or "Start Drill" skip)
  const handleMotionComplete = (stats = {}) => {
    // Record motion intro as completed (unlocking next level)
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
    setScoreModalStats(null); // No fake speed modal for introductory videos!

    // Advance directly to the next lesson (e.g. Level 2: Keys f & j)
    const currentIdx = lessons.findIndex(l => l.id === activeLesson?.id || l.rawId === activeLesson?.id);
    if (currentIdx !== -1 && currentIdx + 1 < lessons.length) {
      const nextLesson = lessons[currentIdx + 1];
      launchLesson(nextLesson, gameLaunchOrigin || 'learn');
    } else {
      setIsViewingMap(true);
      setCurrentView('learn');
    }
  };

  // Handle standalone arcade game completion
  const handleArcadeComplete = (gameId, stats = {}) => {
    const formattedStats = {
      title: (stats.title || gameId.replace('-', ' ')).toUpperCase(),
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

  // Move to next lesson seamlessly based on launch context
  const handleNextLesson = () => {
    setScoreModalStats(null); // Dissolve Score Modal!

    // Find next lesson in the current course
    const currentIdx = lessons.findIndex(l => l.id === activeLesson?.id || l.rawId === activeLesson?.id);
    if (currentIdx !== -1 && currentIdx + 1 < lessons.length) {
      const nextLesson = lessons[currentIdx + 1];
      launchLesson(nextLesson, gameLaunchOrigin || 'learn');
    } else {
      setIsViewingMap(true);
      setCurrentView('learn');
    }
  };

  // Retry active lesson
  const handleRetry = () => {
    setScoreModalStats(null); // Dissolve Score Modal!
    launchLesson(activeLesson, gameLaunchOrigin || 'learn');
  };

  // Exit from game back to origin room
  const handleGameExit = () => {
    setScoreModalStats(null); // Dissolve Score Modal!
    if (gameLaunchOrigin === 'play') {
      setCurrentView('play');
    } else {
      setIsViewingMap(true);
      setCurrentView('learn');
    }
  };

  // Determine if current view should be wrapped inside DesktopWindowShell
  const WORKSHOP_GAME_IDS = [
    'press-room',
    'paper-planes',
    'local-line',
    'night-market',
    'drop-chits',
    'pit-lane',
    'fuse-desk',
    'patch-terminal'
  ];

  const isDesktopWindowView = true;

  return (
    <div className="min-h-screen bg-retro-bg text-retro-ink flex flex-col font-sans">
      
      {/* Main View Router */}
      <main className="flex-1">
        <Suspense fallback={<ViewLoadingFallback />}>
          
          {/* Unified Desktop Window Shell for All Views & Live Arcade Games */}
          {isDesktopWindowView && (
            <DesktopWindowShell
              currentView={
                WORKSHOP_GAME_IDS.includes(currentView)
                  ? 'play'
                  : currentView === 'challenge'
                  ? 'play'
                  : currentView === 'drill' || currentView === 'daily' || currentView === 'practice'
                  ? 'home'
                  : currentView === 'tracks' || currentView === 'catalog'
                  ? 'tracks'
                  : currentView === 'map' || currentView === 'lesson' || currentView === 'video' || currentView === 'shortcuts'
                  ? 'learn'
                  : currentView === 'stats' || currentView === 'badges' || currentView === 'shop'
                  ? currentView
                  : currentView
              }
              userProgress={userProgress}
              activeCourseId={activeCourseId}
              soundEnabled={soundEnabled}
              selectedTheme={selectedTheme}
              onSelectTheme={theme => {
                setSelectedTheme(theme);
                applyTheme(theme);
                updateSettings({ theme });
              }}
              onNavigate={view => {
                if (view === 'daily') {
                  handleStartDailyChallenge();
                } else if (view === 'challenge') {
                  setCurrentView('play');
                } else if (view === 'practice') {
                  setCurrentView('home');
                } else if (view === 'tracks' || view === 'map') {
                  setCurrentView('learn');
                } else {
                  setCurrentView(view);
                }
              }}
              onSelectCourse={handleSelectCourse}
              onToggleSound={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                updateSettings({ sound: next });
              }}
              onProfileUpdated={updated => setUserProgress(updated)}
              onResetAllData={handleResetAllData}
            >
              {/* Room 1: Home */}
              {currentView === 'home' && (
                <HomeView
                  userProgress={userProgress}
                  activeCourseId={activeCourseId}
                  onStartQuickDrill={handleStartQuickDrill}
                  onStartDailyChallenge={handleStartDailyChallenge}
                  onStartSpineLesson={handleStartSpineLesson}
                  onNavigate={view => setCurrentView(view)}
                />
              )}

              {/* Room 2: My Learnings (Personal Space & Active Course Map) */}
              {(currentView === 'learn' || currentView === 'map' || currentView === 'tracks') && (
                isViewingMap ? (
                  <LessonMap
                    course={course}
                    stages={stages}
                    lessons={lessons}
                    userProgress={userProgress}
                    onSelectLesson={l => launchLesson(l, 'learn')}
                    onJumpWarning={lesson => setJumpWarningLesson(lesson)}
                    onNavigate={view => {
                      if (view === 'learn' || view === 'my-learnings') {
                        setIsViewingMap(false);
                      } else if (view === 'shop-courses') {
                        setShopInitialTab('courses');
                        setCurrentView('shop');
                      } else if (view === 'shop') {
                        setShopInitialTab('courses');
                        setCurrentView('shop');
                      } else {
                        setCurrentView(view);
                      }
                    }}
                    onBack={() => setIsViewingMap(false)}
                  />
                ) : (
                  <MyLearningsView
                    userProgress={userProgress}
                    activeCourseId={activeCourseId}
                    onSelectCourse={courseId => {
                      setActiveCourseId(courseId);
                      setIsViewingMap(true);
                    }}
                    onUnenrollCourse={handleUnenrollCourse}
                    onNavigate={view => {
                      if (view === 'shop-courses') {
                        setShopInitialTab('courses');
                        setCurrentView('shop');
                      } else {
                        setCurrentView(view);
                      }
                    }}
                  />
                )
              )}

              {/* Computer Skills & Shortcut Chords Lab */}
              {currentView === 'shortcuts' && (
                <ShortcutPlayer
                  userProgress={userProgress}
                  onOpenUnlockModal={() => setUnlockModalOpen(true)}
                  onExit={() => setCurrentView('learn')}
                  onComplete={stats => {
                    handleArcadeComplete('shortcuts-lab', stats);
                    setCurrentView('learn');
                  }}
                />
              )}

              {/* Course Catalog (Direct Access / Fallback) */}
              {currentView === 'catalog' && (
                <CourseCatalog
                  onBack={() => setCurrentView('learn')}
                  enrolledCourses={userProgress.enrolledCourses || []}
                  onSelectCourse={courseId => {
                    handleSelectCourse(courseId);
                    setCurrentView('learn');
                  }}
                />
              )}

              {/* Lesson Player inside Desktop Window */}
              {currentView === 'lesson' && (
                <LessonPlayer
                  lesson={activeLesson}
                  course={course}
                  courseId={activeCourseId}
                  programId={course.programId}
                  layout={course.keyboardType || 'qwerty'}
                  onComplete={handleComplete}
                  onExit={handleGameExit}
                />
              )}

              {/* Scripted Timed Graphic Motion Player */}
              {currentView === 'motion' && (
                <MotionLessonPlayer
                  lesson={activeLesson}
                  onComplete={handleMotionComplete}
                  onExit={handleGameExit}
                />
              )}

              {/* Shortcut & Chord Practice Player */}
              {currentView === 'shortcuts' && (
                <ShortcutPlayer
                  lesson={activeLesson}
                  userProgress={userProgress}
                  onComplete={stats => {
                    handleComplete(stats || {
                      wpm: activeLesson?.goalWpm || 25,
                      accuracy: 100,
                      stars: 5,
                      points: 500,
                      durationSeconds: 30
                    });
                  }}
                  onExit={handleGameExit}
                  onOpenUnlockModal={() => setUnlockModalOpen(true)}
                />
              )}

              {/* Video Player inside Desktop Window */}
              {currentView === 'video' && (
                <VideoPlayer
                  lesson={activeLesson}
                  onComplete={handleMotionComplete}
                  onExit={handleGameExit}
                />
              )}

              {/* Quick Practice & Drills (Launched from Home Quick Play or Daily Challenge) */}
              {currentView === 'drill' && (
                <QuickDrillPlayer
                  mode={drillConfig.mode}
                  difficulty={drillConfig.difficulty}
                  timeLimit={drillConfig.timeLimit}
                  userProgress={userProgress}
                  onComplete={updated => setUserProgress(updated)}
                  onExit={() => setCurrentView('home')}
                />
              )}

              {/* Legacy practice view fallback */}
              {currentView === 'practice' && (
                <HomeView
                  userProgress={userProgress}
                  activeCourseId={activeCourseId}
                  onStartQuickDrill={handleStartQuickDrill}
                  onStartDailyChallenge={handleStartDailyChallenge}
                  onStartSpineLesson={handleStartSpineLesson}
                  onOpenStudio={() => setLicenseModalOpen(true)}
                  onNavigate={view => setCurrentView(view)}
                />
              )}

              {/* Room 4: Play (Arcade Catalog & Trials) */}
              {(currentView === 'play' || currentView === 'challenge') && (
                <ChallengeHub
                  userProgress={userProgress}
                  activeCourseId={activeCourseId}
                  onSelectCourse={handleSelectCourse}
                  onStartLesson={(courseId, targetLevelId) => {
                    handleSelectCourse(courseId, targetLevelId);
                  }}
                  onLaunchGame={launchPlayArcadeGame}
                  onStartSkillTrial={handleStartSkillTrial}
                  onNavigate={view => setCurrentView(view)}
                  onOpenUnlockModal={() => setUnlockModalOpen(true)}
                />
              )}

              {/* Room 5: Stats (Diagnostics & Trophy Cabinet) */}
              {(currentView === 'progress' || currentView === 'stats' || currentView === 'badges') && (
                <StatsDashboard
                  userProgress={userProgress}
                  activeCourseId={activeCourseId}
                  defaultTab={currentView === 'badges' ? 'trophies' : 'telemetry'}
                  onSelectCourse={courseId => handleSelectCourse(courseId)}
                  onNavigate={view => setCurrentView(view)}
                  onStartLesson={(courseId, lessonId) => {
                    handleSelectCourse(courseId, lessonId);
                  }}
                  onPracticeKey={keyChar => {
                    const cur = getCurriculumForCourse(activeCourseId);
                    const found = cur.lessons.find(l => (l.targetKeys || []).includes(keyChar)) || cur.lessons[0];
                    launchLesson(found, 'learn');
                  }}
                />
              )}

              {/* Room 5: Shop (Themes, Sound Packs, Avatars & Course Library) */}
              {currentView === 'shop' && (
                <ShopView
                  userProgress={userProgress}
                  selectedTheme={selectedTheme}
                  activeCourseId={activeCourseId}
                  initialTab={shopInitialTab}
                  onSelectCourse={courseId => {
                    handleEnrollCourse(courseId);
                  }}
                  onSelectTheme={theme => {
                    setSelectedTheme(theme);
                    applyTheme(theme);
                    updateSettings({ theme });
                  }}
                  onUpdateProfile={updated => {
                    setUserProgress(updated);
                    saveProgress(updated);
                    if (updated.settings?.soundPack) {
                      sound.setPack(updated.settings.soundPack);
                    }
                  }}
                  onNavigate={view => {
                    if (view === 'shop-courses') {
                      setShopInitialTab('courses');
                    } else {
                      setShopInitialTab('themes');
                      setCurrentView(view);
                    }
                  }}
                />
              )}

              {/* The 8 RETROSPEED Games */}
              {currentView === 'press-room' && (
                <PressRoomGame
                  lesson={activeLesson}
                  onComplete={stats => {
                    if (gameLaunchOrigin === 'learn') handleComplete(stats);
                    else handleArcadeComplete('press-room', stats);
                  }}
                  onExit={handleGameExit}
                />
              )}

              {currentView === 'paper-planes' && (
                <PaperPlanesGame
                  lesson={activeLesson}
                  onComplete={stats => {
                    if (gameLaunchOrigin === 'learn') handleComplete(stats);
                    else handleArcadeComplete('paper-planes', stats);
                  }}
                  onExit={handleGameExit}
                />
              )}

              {currentView === 'local-line' && (
                <LocalLineGame
                  lesson={activeLesson}
                  onComplete={stats => {
                    if (gameLaunchOrigin === 'learn') handleComplete(stats);
                    else handleArcadeComplete('local-line', stats);
                  }}
                  onExit={handleGameExit}
                />
              )}

              {currentView === 'night-market' && (
                <NightMarketGame
                  lesson={activeLesson}
                  onComplete={stats => {
                    if (gameLaunchOrigin === 'learn') handleComplete(stats);
                    else handleArcadeComplete('night-market', stats);
                  }}
                  onExit={handleGameExit}
                />
              )}

              {currentView === 'drop-chits' && (
                <DropChitsGame
                  lesson={activeLesson}
                  onComplete={stats => {
                    if (gameLaunchOrigin === 'learn') handleComplete(stats);
                    else handleArcadeComplete('drop-chits', stats);
                  }}
                  onExit={handleGameExit}
                />
              )}

              {currentView === 'pit-lane' && (
                <PitLaneGame
                  lesson={activeLesson}
                  onComplete={stats => {
                    if (gameLaunchOrigin === 'learn') handleComplete(stats);
                    else handleArcadeComplete('pit-lane', stats);
                  }}
                  onExit={handleGameExit}
                />
              )}

              {(currentView === 'fuse-box' || currentView === 'fuse-desk') && (
                <FuseDeskGame
                  lesson={activeLesson}
                  onComplete={stats => {
                    if (gameLaunchOrigin === 'learn') handleComplete(stats);
                    else handleArcadeComplete('fuse-box', stats);
                  }}
                  onExit={handleGameExit}
                />
              )}

              {currentView === 'patch-terminal' && (
                <PatchTerminalGame
                  lesson={activeLesson}
                  onComplete={stats => {
                    if (gameLaunchOrigin === 'learn') handleComplete(stats);
                    else handleArcadeComplete('patch-terminal', stats);
                  }}
                  onExit={handleGameExit}
                />
              )}

            </DesktopWindowShell>
          )}

        </Suspense>
      </main>

      {/* Post-Lesson Celebration Score Modal */}
      {scoreModalStats && (
        <ScoreModal
          stats={scoreModalStats}
          lesson={activeLesson}
          courseTitle={course.title}
          onNextLesson={handleNextLesson}
          onNext={handleNextLesson}
          onRetry={handleRetry}
          onGoToMap={() => {
            setScoreModalStats(null);
            setIsViewingMap(true);
            setCurrentView('learn');
          }}
          onExit={() => {
            setScoreModalStats(null);
            handleGameExit();
          }}
        />
      )}

      {/* Lesson Jump Confirmation Warning Modal */}
      {jumpWarningLesson && (
        <JumpWarningModal
          targetLesson={jumpWarningLesson}
          currentUnlockedLevel={userProgress.courses?.[activeCourseId]?.unlockedLevel || 1}
          onConfirm={() => {
            const target = jumpWarningLesson;
            setJumpWarningLesson(null);
            launchLesson(target, 'learn');
          }}
          onCancel={() => setJumpWarningLesson(null)}
        />
      )}

      {/* Global Unlock Workshop Modal */}
      <UnlockModal
        isOpen={unlockModalOpen}
        onClose={() => setUnlockModalOpen(false)}
        userProgress={userProgress}
        onLicenseUpdated={updated => {
          setUserProgress(updated);
          saveProgress(updated);
        }}
      />

    </div>
  );
}
