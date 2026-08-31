import React, { useState, useEffect, Suspense, lazy } from 'react';
import DesktopWindowShell from './components/DesktopWindowShell';
import HomeView from './components/HomeView';
import PracticeLobby from './components/PracticeLobby';
import LessonMap from './components/LessonMap';
import LessonPlayer from './components/LessonPlayer';
import VideoPlayer from './components/VideoPlayer';
import ScoreModal from './components/ScoreModal';
import JumpWarningModal from './components/JumpWarningModal';
import QuickDrillPlayer from './components/QuickDrillPlayer';
import ShopView from './components/ShopView';
import UnlockModal from './components/UnlockModal';
import { getCurriculumForCourse } from './data/curriculum';
import { loadProgress, saveLessonResult, saveProgress, resetAllProgress } from './utils/storage';
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
  const [activeCourseId, setActiveCourseId] = useState(userProgress.activeCourseId || 'keystroke-foundations');
  const [currentView, setCurrentView] = useState('home');
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

  // Handle course switching
  const handleSelectCourse = (courseId, targetLevelId = null) => {
    setActiveCourseId(courseId);
    
    // Enroll if not already enrolled
    const enrolled = userProgress.enrolledCourses || ['keystroke-foundations'];
    let updatedEnrolled = [...enrolled];
    if (!updatedEnrolled.includes(courseId)) {
      updatedEnrolled.push(courseId);
    }

    const updated = {
      ...userProgress,
      activeCourseId: courseId,
      enrolledCourses: updatedEnrolled
    };
    setUserProgress(updated);
    saveProgress(updated);

    const newCurriculum = getCurriculumForCourse(courseId);
    if (targetLevelId) {
      const target = newCurriculum.lessons.find(l => l.id === targetLevelId || l.rawId === targetLevelId) || newCurriculum.lessons[0];
      launchLesson(target, 'learn');
    } else {
      setActiveLesson(newCurriculum.lessons[0]);
      setCurrentView('map');
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

    if (lesson.type === 'video') {
      setCurrentView('video');
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

    if (spineLesson.isShortcut) {
      setCurrentView('shortcuts');
    } else {
      const adapted = {
        id: spineLesson.id,
        number: spineLesson.lessonNumber,
        title: spineLesson.title,
        description: spineLesson.description,
        type: 'drill',
        text: spineLesson.text,
        goalWpm: spineLesson.goalWpm || 20,
        minAccuracy: spineLesson.minAccuracy || 90,
        targetKeys: spineLesson.targetKeys || []
      };
      setActiveLesson(adapted);
      setCurrentView('lesson');
    }
  };

  // Factory Reset All Workshop Data
  const handleResetAllData = () => {
    const fresh = resetAllProgress();
    setUserProgress(fresh);
    setActiveCourseId('keystroke-foundations');
    setCurrentView('home');
  };

  // Handle lesson / game completion
  const handleComplete = (stats) => {
    const updatedProgress = saveLessonResult(activeCourseId, activeLesson.id, stats);
    setUserProgress(updatedProgress);
    setScoreModalStats(stats);
  };

  // Handle standalone arcade game completion
  const handleArcadeComplete = (gameId, stats) => {
    const updatedProgress = saveLessonResult('arcade', gameId, {
      title: gameId.replace('-', ' ').toUpperCase(),
      wpm: stats.wpm || 0,
      accuracy: stats.accuracy || 100,
      score: stats.score || 500,
      points: stats.score || 500,
      stars: stats.accuracy >= 95 ? 5 : stats.accuracy >= 85 ? 4 : 3,
      durationSeconds: stats.durationSeconds || Math.round((stats.durationMs || 30000) / 1000),
      errors: stats.errors || 0
    });
    setUserProgress(updatedProgress);
  };

  // Move to next lesson
  const handleNextLesson = () => {
    const nextId = activeLesson.id + 1;
    const nextLesson = lessons.find(l => l.id === nextId);
    if (nextLesson) {
      launchLesson(nextLesson, 'learn');
    } else {
      setCurrentView('map');
    }
  };

  // Retry active lesson
  const handleRetry = () => {
    launchLesson(activeLesson, gameLaunchOrigin);
  };

  // Exit from game back to origin room
  const handleGameExit = () => {
    if (gameLaunchOrigin === 'learn') {
      setCurrentView('map');
    } else {
      setCurrentView('play');
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
              onNavigate={view => {
                if (view === 'daily') {
                  handleStartDailyChallenge();
                } else if (view === 'challenge') {
                  setCurrentView('play');
                } else if (view === 'practice') {
                  setCurrentView('home');
                } else if (view === 'tracks') {
                  setCurrentView('catalog');
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

              {/* Room 2: Learn (Curriculum Tracks Directory & 8-Part Spine) */}
              {currentView === 'learn' && (
                <PracticeHub
                  userProgress={userProgress}
                  activeCourseId={activeCourseId}
                  onSelectCourse={handleSelectCourse}
                  onStartSpineLesson={handleStartSpineLesson}
                  onStartLesson={(courseId, targetLevelId) => {
                    handleSelectCourse(courseId, targetLevelId);
                  }}
                  onNavigate={view => setCurrentView(view)}
                  onOpenUnlockModal={() => setUnlockModalOpen(true)}
                />
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

              {/* Course Catalog & Specialty Tracks */}
              {(currentView === 'catalog' || currentView === 'tracks') && (
                <CourseCatalog
                  onBack={() => setCurrentView('learn')}
                  enrolledCourses={userProgress.enrolledCourses || []}
                  onSelectCourse={courseId => {
                    handleSelectCourse(courseId);
                    setCurrentView('map');
                  }}
                />
              )}

              {/* Lesson Map inside Desktop Window */}
              {currentView === 'map' && (
                <LessonMap
                  course={course}
                  stages={stages}
                  lessons={lessons}
                  userProgress={userProgress}
                  onSelectLesson={l => launchLesson(l, 'learn')}
                  onJumpWarning={lesson => setJumpWarningLesson(lesson)}
                  onNavigate={view => setCurrentView(view)}
                  onBack={() => setCurrentView('learn')}
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
                  onExit={() => setCurrentView('map')}
                />
              )}

              {/* Video Player inside Desktop Window */}
              {currentView === 'video' && (
                <VideoPlayer
                  lesson={activeLesson}
                  onComplete={() => {
                    handleComplete({
                      wpm: 25,
                      accuracy: 100,
                      stars: 5,
                      points: 500,
                      durationSeconds: 15
                    });
                  }}
                  onExit={() => setCurrentView('map')}
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

              {/* Room 6: Shop (Themes & Sound Packs) */}
              {currentView === 'shop' && (
                <ShopView
                  userProgress={userProgress}
                  selectedTheme={selectedTheme}
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
                  onNavigate={view => setCurrentView(view)}
                />
              )}

              {/* The 8 RETROSPEED Games */}
              {currentView === 'press-room' && (
                <PressRoomGame
                  lesson={activeLesson}
                  onComplete={handleComplete}
                  onExit={handleGameExit}
                />
              )}

              {currentView === 'paper-planes' && (
                <PaperPlanesGame
                  lesson={activeLesson}
                  onComplete={handleComplete}
                  onExit={handleGameExit}
                />
              )}

              {currentView === 'local-line' && (
                <LocalLineGame
                  lesson={activeLesson}
                  onComplete={handleComplete}
                  onExit={handleGameExit}
                />
              )}

              {currentView === 'night-market' && (
                <NightMarketGame
                  lesson={activeLesson}
                  onComplete={handleComplete}
                  onExit={handleGameExit}
                />
              )}

              {currentView === 'drop-chits' && (
                <DropChitsGame
                  onComplete={stats => handleArcadeComplete('drop-chits', stats)}
                  onExit={handleGameExit}
                />
              )}

              {currentView === 'pit-lane' && (
                <PitLaneGame
                  onComplete={stats => handleArcadeComplete('pit-lane', stats)}
                  onExit={handleGameExit}
                />
              )}

              {currentView === 'fuse-desk' && (
                <FuseDeskGame
                  onComplete={stats => handleArcadeComplete('fuse-desk', stats)}
                  onExit={handleGameExit}
                />
              )}

              {currentView === 'patch-terminal' && (
                <PatchTerminalGame
                  onComplete={stats => handleArcadeComplete('patch-terminal', stats)}
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
          onNext={handleNextLesson}
          onRetry={handleRetry}
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
