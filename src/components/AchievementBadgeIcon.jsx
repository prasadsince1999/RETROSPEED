import React from 'react';
import { Lock } from 'lucide-react';
import BadgeSvgGradients from './badges/icons/BadgeSvgGradients';
import { renderSpeedBadgeIcon } from './badges/icons/SpeedBadgeIcons';
import { renderAccuracyBadgeIcon } from './badges/icons/AccuracyBadgeIcons';
import { renderStreakBadgeIcon } from './badges/icons/StreakBadgeIcons';
import { renderArcadeBadgeIcon } from './badges/icons/ArcadeBadgeIcons';
import { renderMasteryBadgeIcon } from './badges/icons/MasteryBadgeIcons';

export default function AchievementBadgeIcon({
  badgeId,
  isUnlocked = false,
  size = 'md',
  showLockOverlay = true,
  className = ''
}) {
  const sizeMap = {
    xs: 'w-8 h-8',
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const dim = sizeMap[size] || sizeMap.md;

  const renderEmblem = () => {
    const speed = renderSpeedBadgeIcon(badgeId, isUnlocked);
    if (speed) return speed;

    const accuracy = renderAccuracyBadgeIcon(badgeId, isUnlocked);
    if (accuracy) return accuracy;

    const streak = renderStreakBadgeIcon(badgeId, isUnlocked);
    if (streak) return streak;

    const arcade = renderArcadeBadgeIcon(badgeId, isUnlocked);
    if (arcade) return arcade;

    const mastery = renderMasteryBadgeIcon(badgeId, isUnlocked);
    if (mastery) return mastery;

    // Fallback default star emblem
    return (
      <g>
        <circle cx="50" cy="50" r="28" fill={isUnlocked ? '#38bdf8' : '#64748b'} />
        <circle cx="50" cy="50" r="20" fill={isUnlocked ? '#0284c7' : '#475569'} />
        <polygon points="50,34 54,44 64,44 56,50 59,60 50,54 41,60 44,50 36,44 46,44" fill="#ffffff" />
      </g>
    );
  };

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${dim} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full drop-shadow-md transition-transform duration-300 ${
          isUnlocked ? 'hover:scale-105 filter' : 'filter grayscale contrast-75 opacity-75'
        }`}
      >
        <BadgeSvgGradients />

        {/* Outer Circular Shield Base */}
        <circle
          cx="50"
          cy="50"
          r="46"
          fill={isUnlocked ? '#0f172a' : '#1e293b'}
          stroke={isUnlocked ? 'url(#grad-gold-bright)' : '#475569'}
          strokeWidth="3.5"
        />

        {/* Inner Decorative Rim */}
        <circle
          cx="50"
          cy="50"
          r="41"
          fill="none"
          stroke={isUnlocked ? '#334155' : '#334155'}
          strokeWidth="1"
          strokeDasharray="2 3"
        />

        {/* Badge Vector Artwork */}
        {renderEmblem()}
      </svg>

      {/* Locked Overlay Icon Badge */}
      {!isUnlocked && showLockOverlay && (
        <div className="absolute -bottom-1 -right-1 bg-slate-900/90 text-slate-300 border border-slate-700 rounded-full p-1 shadow-md">
          <Lock className="w-3.5 h-3.5 text-slate-400" />
        </div>
      )}
    </div>
  );
}
