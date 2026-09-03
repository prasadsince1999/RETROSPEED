import React, { Suspense, lazy } from 'react';
import HomeView from '../components/HomeView';
import LessonMap from '../components/LessonMap';
import MyLearningsView from '../components/MyLearningsView';
import LessonPlayer from '../components/LessonPlayer';
import VideoPlayer from '../components/VideoPlayer';
import QuickDrillPlayer from '../components/QuickDrillPlayer';
import ShopView from '../components/ShopView';
import { applyTheme } from '../theme';
import { sound } from '../utils/audio';
import { getCurriculumForCourse } from '../data/curriculum';

// Lazy loaded hub views and arcade engines
const PracticeHub = lazy(() => import('../components/PracticeHub'));
const ChallengeHub = lazy(() => import('../components/ChallengeHub'));
const CourseCatalog = lazy(() => import('../components/CourseCatalog'));
const StatsDashboard = lazy(() => import('../components/StatsDashboard'));
const PressRoomGame = lazy(() => import('../components/games/PressRoomGame'));
const LocalLineGame = lazy(() => import('../components/games/LocalLineGame'));
const PaperPlanesGame = lazy(() => import('../components/games/PaperPlanesGame'));
const NightMarketGame = lazy(() => import('../components/games/NightMarketGame'));
const DropChitsGame = lazy(() => import('../components/games/DropChitsGame'));
const PitLaneGame = lazy(() => import('../components/games/PitLaneGame'));
const FuseDeskGame = lazy(() => import('../components/games/FuseDeskGame'));
const PatchTerminalGame = lazy(() => import('../components/games/PatchTerminalGame'));
const ShortcutPlayer = lazy(() => import('../components/ShortcutPlayer'));
const MotionLessonPlayer = lazy(() => import('../components/motion/MotionLessonPlayer'));
const PythonCodeStudio = lazy(() => import('../components/code/PythonCodeStudio'));

export function ViewLoadingFallback() {
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

export function AppRouter({
  currentView,
  setCurrentView,
  userProgress,
  setUserProgress,
  activeCourseId,
  setActiveCourseId,
  selectedTheme,
  setSelectedTheme,
  activeLesson,
  course,
  stages,
  lessons,
  isViewingMap,
  setIsViewingMap,
  shopInitialTab,
  setShopInitialTab,
  drillConfig,
  gameLaunchOrigin,
  handleStartQuickDrill,
  handleStartDailyChallenge,
  handleStartSkillTrial,
  handleStartSpineLesson,
  launchPlayArcadeGame,
  launchLesson,
  handleSelectCourse,
  handleEnrollCourse,
  handleUnenrollCourse,
  handleComplete,
  handleMotionComplete,
  handleArcadeComplete,
  handleRetry,
  handleGameExit,
  setJumpWarningLesson,
  setUnlockModalOpen,
  updateSettings
}) {
  return (
    <Suspense fallback={<ViewLoadingFallback />}>
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
              } else if (view === 'shop-courses' || view === 'shop') {
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

      {/* Interactive Python Code Studio with Live Terminal & Simulated Compiler */}
      {currentView === 'python-studio' && (
        <PythonCodeStudio
          lesson={activeLesson}
          chapter={activeLesson?.chapter}
          onComplete={handleComplete}
          onExit={handleGameExit}
          onRetry={handleRetry}
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

      {/* Video Player inside Desktop Window */}
      {currentView === 'video' && (
        <VideoPlayer
          lesson={activeLesson}
          onComplete={handleMotionComplete}
          onExit={handleGameExit}
        />
      )}

      {/* Quick Practice & Drills */}
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

      {/* Room 6: Shop (Themes, Sound Packs, Avatars & Course Library) */}
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
    </Suspense>
  );
}
