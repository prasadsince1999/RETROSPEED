import React, { useState } from 'react';
import DesktopWindowShell from './components/DesktopWindowShell';
import ScoreModal from './components/ScoreModal';
import JumpWarningModal from './components/JumpWarningModal';
import UnlockModal from './components/UnlockModal';
import { getCurriculumForCourse } from './data/curriculum';
import { saveProgress } from './utils/storage';
import { applyTheme } from './theme';
import { useUserProgress } from './hooks/useUserProgress';
import { useLessonSession } from './hooks/useLessonSession';
import { AppRouter } from './routes/AppRouter';

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

export default function App() {
  const {
    userProgress,
    setUserProgress,
    activeCourseId,
    setActiveCourseId,
    soundEnabled,
    setSoundEnabled,
    selectedTheme,
    setSelectedTheme,
    handleEnrollCourse,
    handleUnenrollCourse,
    updateSettings,
    handleResetAllData
  } = useUserProgress();

  const [currentView, setCurrentView] = useState('home');
  const [isViewingMap, setIsViewingMap] = useState(false);
  const [shopInitialTab, setShopInitialTab] = useState('themes');

  const currentCurriculum = getCurriculumForCourse(activeCourseId);
  const { course, stages, lessons } = currentCurriculum;

  const {
    activeLesson,
    setActiveLesson,
    gameLaunchOrigin,
    drillConfig,
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
  } = useLessonSession({
    userProgress,
    setUserProgress,
    activeCourseId,
    lessons,
    setActiveCourseId,
    setIsViewingMap,
    setCurrentView
  });

  const handleSelectCourse = (courseId, targetLevelId = null) => {
    handleEnrollCourse(courseId);
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

  return (
    <div className="min-h-screen bg-retro-bg text-retro-ink flex flex-col font-sans">
      <main className="flex-1">
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
          <AppRouter
            currentView={currentView}
            setCurrentView={setCurrentView}
            userProgress={userProgress}
            setUserProgress={setUserProgress}
            activeCourseId={activeCourseId}
            setActiveCourseId={setActiveCourseId}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
            activeLesson={activeLesson}
            course={course}
            stages={stages}
            lessons={lessons}
            isViewingMap={isViewingMap}
            setIsViewingMap={setIsViewingMap}
            shopInitialTab={shopInitialTab}
            setShopInitialTab={setShopInitialTab}
            drillConfig={drillConfig}
            gameLaunchOrigin={gameLaunchOrigin}
            handleStartQuickDrill={handleStartQuickDrill}
            handleStartDailyChallenge={handleStartDailyChallenge}
            handleStartSkillTrial={handleStartSkillTrial}
            handleStartSpineLesson={handleStartSpineLesson}
            launchPlayArcadeGame={launchPlayArcadeGame}
            launchLesson={launchLesson}
            handleSelectCourse={handleSelectCourse}
            handleEnrollCourse={handleEnrollCourse}
            handleUnenrollCourse={handleUnenrollCourse}
            handleComplete={handleComplete}
            handleMotionComplete={handleMotionComplete}
            handleArcadeComplete={handleArcadeComplete}
            handleRetry={handleRetry}
            handleGameExit={handleGameExit}
            setJumpWarningLesson={setJumpWarningLesson}
            setUnlockModalOpen={setUnlockModalOpen}
            updateSettings={updateSettings}
          />
        </DesktopWindowShell>
      </main>

      {/* Post-Lesson Celebration Score Modal */}
      {scoreModalStats && (
        <ScoreModal
          stats={scoreModalStats}
          lesson={
            scoreModalStats.isArcade || gameLaunchOrigin === 'play'
              ? { id: scoreModalStats.gameId || 'arcade', title: scoreModalStats.title || 'Arcade Minigame', isArcade: true }
              : activeLesson
          }
          courseTitle={
            scoreModalStats.isArcade || gameLaunchOrigin === 'play'
              ? 'RETROSPEED ARCADE'
              : course.title
          }
          isArcade={scoreModalStats.isArcade || gameLaunchOrigin === 'play'}
          onNextLesson={() => {
            if (gameLaunchOrigin === 'play') {
              setScoreModalStats(null);
              setCurrentView('play');
            } else {
              handleNextLesson();
            }
          }}
          onNext={() => {
            if (gameLaunchOrigin === 'play') {
              setScoreModalStats(null);
              setCurrentView('play');
            } else {
              handleNextLesson();
            }
          }}
          onRetry={() => {
            setScoreModalStats(null);
            if (gameLaunchOrigin === 'play') {
              const gId = scoreModalStats.gameId || 'press-room';
              setCurrentView('home');
              setTimeout(() => setCurrentView(gId), 20);
            } else {
              handleRetry();
            }
          }}
          onGoToMap={() => {
            setScoreModalStats(null);
            if (gameLaunchOrigin === 'play') {
              setCurrentView('play');
            } else {
              setIsViewingMap(true);
              setCurrentView('learn');
            }
          }}
          onExit={() => {
            setScoreModalStats(null);
            if (gameLaunchOrigin === 'play') {
              setCurrentView('play');
            } else {
              handleGameExit();
            }
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
