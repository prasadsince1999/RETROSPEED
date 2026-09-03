import { useState, useEffect } from 'react';
import { 
  loadProgress, 
  saveProgress, 
  resetAllProgress, 
  enrollCourse, 
  unenrollCourse 
} from '../utils/storage';
import { sound } from '../utils/audio';
import { applyTheme, DEFAULT_THEME_ID } from '../theme';

export function useUserProgress() {
  const [userProgress, setUserProgress] = useState(loadProgress());
  const [activeCourseId, setActiveCourseId] = useState(userProgress.activeCourseId || 'retrospeed-odyssey');
  const [soundEnabled, setSoundEnabled] = useState(userProgress.settings?.sound ?? true);
  const [selectedTheme, setSelectedTheme] = useState(userProgress.settings?.theme || 'bone');

  useEffect(() => {
    sound.setMuted(!soundEnabled);
  }, [soundEnabled]);

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

  const handleEnrollCourse = (courseId) => {
    const updated = enrollCourse(userProgress, courseId);
    setUserProgress(updated);
    setActiveCourseId(courseId);
  };

  const handleUnenrollCourse = (courseId) => {
    const updated = unenrollCourse(userProgress, courseId);
    setUserProgress(updated);
    if (activeCourseId === courseId) {
      setActiveCourseId(updated.activeCourseId);
    }
  };

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

  const handleResetAllData = () => {
    const fresh = resetAllProgress();
    setUserProgress(fresh);
    setActiveCourseId('retrospeed-odyssey');
  };

  return {
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
  };
}
