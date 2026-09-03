import React from 'react';

export function renderAccuracyBadgeIcon(badgeId, isUnlocked) {
  switch (badgeId) {
    case 'sharp-shooter':
      return (
        <g>
          <circle
            cx="50"
            cy="50"
            r="28"
            fill="none"
            stroke={isUnlocked ? '#10b981' : '#64748b'}
            strokeWidth="3"
          />
          <circle
            cx="50"
            cy="50"
            r="18"
            fill="none"
            stroke={isUnlocked ? '#34d399' : '#94a3b8'}
            strokeWidth="2"
          />
          <line x1="50" y1="16" x2="50" y2="30" stroke={isUnlocked ? '#059669' : '#64748b'} strokeWidth="2.5" />
          <line x1="50" y1="70" x2="50" y2="84" stroke={isUnlocked ? '#059669' : '#64748b'} strokeWidth="2.5" />
          <line x1="16" y1="50" x2="30" y2="50" stroke={isUnlocked ? '#059669' : '#64748b'} strokeWidth="2.5" />
          <line x1="70" y1="50" x2="84" y2="50" stroke={isUnlocked ? '#059669' : '#64748b'} strokeWidth="2.5" />
          <circle cx="50" cy="50" r="6" fill={isUnlocked ? '#ef4444' : '#475569'} />
          <circle cx="50" cy="50" r="2.5" fill="#ffffff" />
        </g>
      );

    case 'bullseye':
      return (
        <g>
          <circle cx="50" cy="50" r="30" fill={isUnlocked ? '#ef4444' : '#64748b'} />
          <circle cx="50" cy="50" r="23" fill="#ffffff" />
          <circle cx="50" cy="50" r="16" fill={isUnlocked ? '#3b82f6' : '#94a3b8'} />
          <circle cx="50" cy="50" r="9" fill={isUnlocked ? '#ef4444' : '#475569'} />
          <circle cx="50" cy="50" r="4" fill={isUnlocked ? '#fbbf24' : '#cbd5e1'} />
          <line
            x1="22"
            y1="22"
            x2="50"
            y2="50"
            stroke={isUnlocked ? '#facc15' : '#334155'}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <polygon points="18,18 26,18 20,24" fill={isUnlocked ? '#f43f5e' : '#cbd5e1'} />
          <polygon points="18,18 18,26 24,20" fill={isUnlocked ? '#f43f5e' : '#cbd5e1'} />
        </g>
      );

    case 'absolute-perfection':
      return (
        <g>
          <polygon
            points="30,36 70,36 82,50 50,78 18,50"
            fill={isUnlocked ? 'url(#grad-gold-bright)' : '#64748b'}
            stroke={isUnlocked ? '#fef08a' : '#cbd5e1'}
            strokeWidth="2"
            filter={isUnlocked ? 'url(#glow-gold)' : undefined}
          />
          <polygon points="38,36 62,36 50,50" fill={isUnlocked ? '#fef08a' : '#94a3b8'} />
          <polygon points="30,36 38,36 50,50 18,50" fill={isUnlocked ? '#f59e0b' : '#475569'} />
          <polygon points="62,36 70,36 82,50 50,50" fill={isUnlocked ? '#f59e0b' : '#475569'} />
          <polygon points="18,50 50,50 50,78" fill={isUnlocked ? '#d97706' : '#334155'} />
          <polygon points="82,50 50,50 50,78" fill={isUnlocked ? '#b45309' : '#1e293b'} />
          <polygon points="50,18 52,24 58,24 53,28 55,34 50,30 45,34 47,28 42,24 48,24" fill={isUnlocked ? '#facc15' : '#cbd5e1'} />
          <circle cx="24" cy="28" r="2" fill={isUnlocked ? '#ffffff' : '#94a3b8'} />
          <circle cx="76" cy="28" r="2" fill={isUnlocked ? '#ffffff' : '#94a3b8'} />
          <circle cx="18" cy="66" r="2" fill={isUnlocked ? '#fef08a' : '#94a3b8'} />
          <circle cx="82" cy="66" r="2" fill={isUnlocked ? '#fef08a' : '#94a3b8'} />
        </g>
      );

    default:
      return null;
  }
}
