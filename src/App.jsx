import React, { useState, useEffect, Suspense, lazy } from 'react';
import DesktopWindowShell from './components/DesktopWindowShell';
import HomeView from './components/HomeView';
import LessonMap from './components/LessonMap';
import LessonPlayer from './components/LessonPlayer';
import VideoPlayer from './components/VideoPlayer';
import ScoreModal from './components/ScoreModal';
import JumpWarningModal from './components/JumpWarningModal';
import QuickDrillPlayer from './components/QuickDrillPlayer';
import ShopView from './components/ShopView';
import { getCurriculumForCourse } from './data/curriculum';
import { loadProgress, saveLessonResult, saveProgress } from './utils/storage';
import { sound } from './utils/audio';

// Lazy load hub views and arcade engines on demand
const PracticeHub = lazy(() => import('./components/PracticeHub'));
const ChallengeHub = lazy(() => import('./components/ChallengeHub'));
const CourseCatalog = lazy(() => import('./components/CourseCatalog'));
const StatsDashboard = lazy(() => import('./components/StatsDashboard'));
const BadgesDashboard = lazy(() => import('./components/BadgesDashboard'));

// 5 Classic Arcade Games (Redesigned in Retro Solid Theme)
const BalloonNinjaGame = lazy(() => import('./components/games/BalloonNinjaGame'));
const MonsterAttackGame = lazy(() => import('./components/games/MonsterAttackGame'));
const TempleBashGame = lazy(() => import('./components/games/TempleBashGame'));
const FloatingBubblesGame = lazy(() => import('./components/games/FloatingBubblesGame'));
const AppleThievesGame = lazy(() => import('./components/games/AppleThievesGame'));

// 4 Next-Gen Canvas Arcade Engines
const FallingWordsDefenseGame = lazy(() => import('./components/games/FallingWordsDefenseGame'));
const TypingRacerGame = lazy(() => import('./components/games/TypingRacerGame'));
const WordBombGame = lazy(() => import('./components/games/WordBombGame'));
const SyntaxHackerGame = lazy(() => import('./components/games/SyntaxHackerGame'));

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
  const [activeCourseId, setActiveCourseId] = useState(userProgress.activeCourseId || 'keycraft-odyssey');
  const [currentView, setCurrentView] = useState('home');
  
  // Drill config
  const [drillConfig, setDrillConfig] = useState({
    mode: 'quick',
    difficulty: 'easy',
    timeLimit: 60
  });

  // Dynamic curriculum for currently active course
  const currentCurriculum = getCurriculumForCourse(activeCourseId);
  const { course, stages, lessons } = currentCurriculum;

  const [activeLesson, setActiveLesson] = useState(lessons[1] || lessons[0]);
  
  // Modals state
  const [scoreModalStats, setScoreModalStats] = useState(null);
  const [jumpWarningLesson, setJumpWarningLesson] = useState(null);

  // Settings
  const [soundEnabled, setSoundEnabled] = useState(userProgress.settings?.sound ?? true);
  const [keyboardEnabled, setKeyboardEnabled] = useState(userProgress.settings?.keyboard ?? true);
  const [handsEnabled, setHandsEnabled] = useState(userProgress.settings?.hands ?? true);
  const [selectedTheme, setSelectedTheme] = useState(userProgress.settings?.theme || 'bone');

  // Sync sound engine state
  useEffect(() => {
    sound.setMuted(!soundEnabled);
  }, [soundEnabled]);

  // Handle course switching
  const handleSelectCourse = (courseId, targetLevelId = null) => {
    setActiveCourseId(courseId);
    
    // Enroll if not already enrolled
    const enrolled = userProgress.enrolledCourses || ['keycraft-odyssey'];
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
      const target = newCurriculum.lessons.find(l => l.id === targetLevelId) || newCurriculum.lessons[0];
      launchLesson(target);
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
  const launchLesson = (lesson) => {
    setActiveLesson(lesson);
    setScoreModalStats(null);
    setJumpWarningLesson(null);

    if (lesson.type === 'video') {
      setCurrentView('video');
    } else if (lesson.type === 'game') {
      const app = (lesson.gameApp || lesson.activityApp || '').toLowerCase();
      const title = (lesson.title || '').toLowerCase();
      const eng = (lesson.renderEngine || '').toLowerCase();
      const combined = `${app} ${title} ${eng}`;

      if (combined.includes('apple') || combined.includes('thief') || combined.includes('thieves') || combined.includes('orchard') || combined.includes('raccoon')) {
        setCurrentView('apple');
      } else if (combined.includes('monster') || combined.includes('alien') || combined.includes('space')) {
        setCurrentView('monster');
      } else if (combined.includes('temple') || combined.includes('bash') || combined.includes('desert') || combined.includes('tomb') || combined.includes('relic')) {
        setCurrentView('temple');
      } else if (combined.includes('bubble') || combined.includes('ocean') || combined.includes('float')) {
        setCurrentView('bubble');
      } else {
        setCurrentView('balloon');
      }
    } else {
      setCurrentView('lesson');
    }
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

  // Handle lesson / game completion
  const handleComplete = (stats) => {
    const updatedProgress = saveLessonResult(activeCourseId, activeLesson.id, stats);
    setUserProgress(updatedProgress);
    setScoreModalStats(stats);
  };

  // Move to next lesson
  const handleNextLesson = () => {
    const nextId = activeLesson.id + 1;
    const nextLesson = lessons.find(l => l.id === nextId);
    if (nextLesson) {
      launchLesson(nextLesson);
    } else {
      setCurrentView('map');
    }
  };

  // Retry active lesson
  const handleRetry = () => {
    launchLesson(activeLesson);
  };

  // Determine if current view should be wrapped inside DesktopWindowShell
  const isDesktopWindowView = [
    'home', 
    'portal', 
    'practice', 
    'challenge', 
    'daily', 
    'stats', 
    'badges', 
    'shop', 
    'drill',
    'meteor-words',
    'velocity-gp',
    'word-bomb',
    'syntax-matrix',
    'balloon',
    'monster',
    'temple',
    'bubble',
    'apple'
  ].includes(currentView);

  return (
    <div className="min-h-screen bg-[#B9D2E8] text-[#2D2319] flex flex-col font-sans select-none">
      
      {/* Main View Router */}
      <main className="flex-1">
        <Suspense fallback={<ViewLoadingFallback />}>
          
          {/* Unified Desktop Window Shell for Home, Hubs, Stats, Badges, Shop, Drills, & ALL 9 Arcade Games */}
          {isDesktopWindowView && (
            <DesktopWindowShell
              currentView={
                ['meteor-words', 'velocity-gp', 'word-bomb', 'syntax-matrix', 'balloon', 'monster', 'temple', 'bubble', 'apple'].includes(currentView)
                  ? 'challenge'
                  : currentView === 'drill' 
                  ? (drillConfig.mode === 'daily' ? 'daily' : 'home') 
                  : currentView
              }
              userProgress={userProgress}
              activeCourseId={activeCourseId}
              soundEnabled={soundEnabled}
              onNavigate={view => {
                if (view === 'daily') {
                  handleStartDailyChallenge();
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
            >
              {(currentView === 'home' || currentView === 'portal') && (
                <HomeView
                  userProgress={userProgress}
                  activeCourseId={activeCourseId}
                  onStartQuickDrill={handleStartQuickDrill}
                  onStartDailyChallenge={handleStartDailyChallenge}
                  onNavigate={view => setCurrentView(view)}
                />
              )}

              {currentView === 'practice' && (
                <PracticeHub
                  userProgress={userProgress}
                  activeCourseId={activeCourseId}
                  onSelectCourse={handleSelectCourse}
                  onStartLesson={(courseId, targetLevelId) => {
                    handleSelectCourse(courseId, targetLevelId);
                  }}
                  onNavigate={view => setCurrentView(view)}
                />
              )}

              {(currentView === 'challenge' || currentView === 'daily') && (
                <ChallengeHub
                  userProgress={userProgress}
                  activeCourseId={activeCourseId}
                  onSelectCourse={handleSelectCourse}
                  onStartLesson={(courseId, targetLevelId) => {
                    handleSelectCourse(courseId, targetLevelId);
                  }}
                  onLaunchGame={gameViewId => setCurrentView(gameViewId)}
                  onNavigate={view => setCurrentView(view)}
                />
              )}

              {currentView === 'badges' && (
                <BadgesDashboard
                  userProgress={userProgress}
                  onBack={() => setCurrentView('home')}
                  onNavigate={view => setCurrentView(view)}
                  onSelectCourse={(courseId, targetLevelId) => {
                    handleSelectCourse(courseId, targetLevelId);
                  }}
                />
              )}

              {currentView === 'shop' && (
                <ShopView
                  userProgress={userProgress}
                  selectedTheme={selectedTheme}
                  onSelectTheme={theme => {
                    setSelectedTheme(theme);
                    updateSettings({ theme });
                  }}
                  onUpdateProfile={updated => setUserProgress(updated)}
                  onNavigate={view => setCurrentView(view)}
                />
              )}

              {currentView === 'stats' && (
                <StatsDashboard
                  userProgress={userProgress}
                  activeCourseId={activeCourseId}
                  onSelectCourse={courseId => handleSelectCourse(courseId)}
                  onNavigate={view => setCurrentView(view)}
                  onStartLesson={(courseId, lessonId) => {
                    handleSelectCourse(courseId, lessonId);
                  }}
                  onPracticeKey={keyChar => {
                    const cur = getCurriculumForCourse(activeCourseId);
                    const found = cur.lessons.find(l => (l.targetKeys || []).includes(keyChar)) || cur.lessons[0];
                    launchLesson(found);
                  }}
                />
              )}

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

              {/* Next-Gen Arcade Game Engines */}
              {currentView === 'meteor-words' && (
                <FallingWordsDefenseGame
                  onExit={() => setCurrentView('challenge')}
                />
              )}

              {currentView === 'velocity-gp' && (
                <TypingRacerGame
                  onExit={() => setCurrentView('challenge')}
                />
              )}

              {currentView === 'word-bomb' && (
                <WordBombGame
                  onExit={() => setCurrentView('challenge')}
                />
              )}

              {currentView === 'syntax-matrix' && (
                <SyntaxHackerGame
                  onExit={() => setCurrentView('challenge')}
                />
              )}

              {/* 5 Classic Arcade Games (Inside Unified Window Shell) */}
              {currentView === 'balloon' && (
                <BalloonNinjaGame
                  lesson={activeLesson}
                  onComplete={handleComplete}
                  onExit={() => setCurrentView('challenge')}
                />
              )}

              {currentView === 'monster' && (
                <MonsterAttackGame
                  lesson={activeLesson}
                  onComplete={handleComplete}
                  onExit={() => setCurrentView('challenge')}
                />
              )}

              {currentView === 'temple' && (
                <TempleBashGame
                  lesson={activeLesson}
                  onComplete={handleComplete}
                  onExit={() => setCurrentView('challenge')}
                />
              )}

              {currentView === 'bubble' && (
                <FloatingBubblesGame
                  lesson={activeLesson}
                  onComplete={handleComplete}
                  onExit={() => setCurrentView('challenge')}
                />
              )}

              {currentView === 'apple' && (
                <AppleThievesGame
                  lesson={activeLesson}
                  onComplete={handleComplete}
                  onExit={() => setCurrentView('challenge')}
                />
              )}

            </DesktopWindowShell>
          )}

          {currentView === 'catalog' && (
            <CourseCatalog
              onBack={() => setCurrentView('practice')}
              enrolledCourses={userProgress.enrolledCourses || []}
              onSelectCourse={courseId => {
                handleSelectCourse(courseId);
                setCurrentView('map');
              }}
            />
          )}

          {currentView === 'map' && (
            <LessonMap
              course={course}
              stages={stages}
              lessons={lessons}
              userProgress={userProgress}
              onSelectLesson={launchLesson}
              onJumpWarning={lesson => setJumpWarningLesson(lesson)}
              onNavigate={view => setCurrentView(view)}
              onBack={() => setCurrentView('home')}
            />
          )}

          {currentView === 'lesson' && (
            <LessonPlayer
              lesson={activeLesson}
              course={course}
              courseId={activeCourseId}
              programId={course.programId}
              layout={course.keyboardType || 'qwerty'}
              onComplete={handleComplete}
              onExit={() => setCurrentView('map')}
              keyboardEnabled={keyboardEnabled}
              handsEnabled={handsEnabled}
              theme={selectedTheme}
            />
          )}

          {currentView === 'video' && (
            <VideoPlayer
              lesson={activeLesson}
              onComplete={handleComplete}
              onExit={() => setCurrentView('map')}
            />
          )}

        </Suspense>
      </main>

      {/* Score Modal on Finish */}
      {scoreModalStats && (
        <ScoreModal
          lesson={activeLesson}
          stats={scoreModalStats}
          onNextLesson={handleNextLesson}
          onRetry={handleRetry}
          onGoToMap={() => {
            setScoreModalStats(null);
            setCurrentView('map');
          }}
        />
      )}

      {/* Jump Ahead Confirmation Modal */}
      {jumpWarningLesson && (
        <JumpWarningModal
          lesson={jumpWarningLesson}
          onConfirm={() => launchLesson(jumpWarningLesson)}
          onCancel={() => setJumpWarningLesson(null)}
        />
      )}

    </div>
  );
}
