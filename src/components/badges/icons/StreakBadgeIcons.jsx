import React from 'react';

export function renderStreakBadgeIcon(badgeId, isUnlocked) {
  switch (badgeId) {
    case 'dedicated-learner':
      return (
        <g>
          <path
            d="M36 72 L64 72 L58 60 L42 60 Z"
            fill={isUnlocked ? '#78716c' : '#475569'}
          />
          <path
            d="M50 20 C60 36, 68 46, 64 58 C60 70, 40 70, 36 58 C32 46, 40 36, 50 20 Z"
            fill={isUnlocked ? 'url(#grad-fire)' : '#64748b'}
            filter={isUnlocked ? 'url(#glow-fire)' : undefined}
          />
          <path
            d="M50 34 C56 44, 60 50, 58 58 C56 64, 44 64, 42 58 C40 50, 44 44, 50 34 Z"
            fill={isUnlocked ? '#fef08a' : '#cbd5e1'}
          />
          <circle cx="34" cy="38" r="1.5" fill={isUnlocked ? '#f97316' : '#94a3b8'} />
          <circle cx="66" cy="38" r="1.5" fill={isUnlocked ? '#f97316' : '#94a3b8'} />
          <circle cx="50" cy="16" r="1.5" fill={isUnlocked ? '#fef08a' : '#94a3b8'} />
        </g>
      );

    case 'weekly-warrior':
      return (
        <g>
          <path
            d="M24 50 C24 64, 34 74, 50 76 C66 74, 76 64, 76 50"
            fill="none"
            stroke={isUnlocked ? '#eab308' : '#64748b'}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <polygon
            points="50,20 54,34 68,30 60,42 72,52 58,56 60,70 50,62 40,70 42,56 28,52 40,42 32,30 46,34"
            fill={isUnlocked ? 'url(#grad-gold-bright)' : '#64748b'}
            stroke={isUnlocked ? '#fef08a' : '#cbd5e1'}
            strokeWidth="1.5"
            filter={isUnlocked ? 'url(#glow-gold)' : undefined}
          />
          <circle cx="50" cy="46" r="7" fill={isUnlocked ? '#b45309' : '#334155'} />
          <circle cx="50" cy="46" r="4" fill={isUnlocked ? '#fef08a' : '#cbd5e1'} />
        </g>
      );

    case 'touch-typing-legend':
      return (
        <g>
          <path
            d="M50 48 C34 26, 14 36, 16 58 C26 56, 36 62, 50 76 C64 62, 74 56, 84 58 C86 36, 66 26, 50 48 Z"
            fill={isUnlocked ? 'url(#grad-gold-bright)' : '#64748b'}
            filter={isUnlocked ? 'url(#glow-gold)' : undefined}
          />
          <path
            d="M50 24 L54 36 L50 34 L46 36 Z"
            fill={isUnlocked ? '#ef4444' : '#475569'}
          />
          <circle cx="50" cy="38" r="4" fill={isUnlocked ? '#fef08a' : '#cbd5e1'} />
          <rect
            x="30"
            y="74"
            width="40"
            height="6"
            rx="2"
            fill={isUnlocked ? '#334155' : '#1e293b'}
          />
          <line x1="36" y1="77" x2="64" y2="77" stroke={isUnlocked ? '#38bdf8' : '#64748b'} strokeWidth="1.5" strokeDasharray="3 3" />
        </g>
      );

    case 'marathon-typist':
      return (
        <g>
          <path
            d="M32 24 L68 24 M32 76 L68 76 M36 24 L36 30 L46 48 L36 66 L36 76 M64 24 L64 30 L54 48 L64 66 L64 76"
            fill="none"
            stroke={isUnlocked ? '#c084fc' : '#64748b'}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polygon
            points="40,32 60,32 50,46"
            fill={isUnlocked ? 'url(#grad-purple-bright)' : '#94a3b8'}
          />
          <line x1="50" y1="46" x2="50" y2="60" stroke={isUnlocked ? '#fef08a' : '#cbd5e1'} strokeWidth="2" />
          <polygon
            points="42,70 58,70 50,60"
            fill={isUnlocked ? 'url(#grad-gold-bright)' : '#94a3b8'}
          />
        </g>
      );

    default:
      return null;
  }
}
