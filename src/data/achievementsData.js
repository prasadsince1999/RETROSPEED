// RETROSPEED Achievements & Badges Registry Facade
// 100% Backward Compatible Module Surface

import { SPEED_BADGES } from './achievements/speedBadges';
import { ACCURACY_BADGES } from './achievements/accuracyBadges';
import { STREAK_BADGES } from './achievements/streakBadges';
import { ARCADE_BADGES } from './achievements/arcadeBadges';
import { MASTERY_BADGES } from './achievements/masteryBadges';
import { ALL_ACHIEVEMENTS, evaluateAchievements } from './achievements/evaluator';

export { SPEED_BADGES, ACCURACY_BADGES, STREAK_BADGES, ARCADE_BADGES, MASTERY_BADGES, evaluateAchievements };

export const ACHIEVEMENT_CATEGORIES = [
  { id: 'all', label: 'All Badges', countKey: 'all' },
  { id: 'speed', label: 'Speed', countKey: 'speed' },
  { id: 'accuracy', label: 'Accuracy', countKey: 'accuracy' },
  { id: 'streaks', label: 'Streaks', countKey: 'streaks' },
  { id: 'arcade', label: 'Arcade', countKey: 'arcade' },
  { id: 'mastery', label: 'Mastery', countKey: 'mastery' }
];

export const ACHIEVEMENTS = ALL_ACHIEVEMENTS;
