import React from 'react';

export function renderSpeedBadgeIcon(badgeId, isUnlocked) {
  switch (badgeId) {
    case 'swift-fingers':
      return (
        <g>
          <path
            d="M18 42 C18 42, 28 32, 48 30 C68 28, 82 18, 82 18 C82 18, 70 32, 54 38 C40 44, 28 48, 18 42 Z"
            fill={isUnlocked ? 'url(#grad-wing-1)' : '#94a3b8'}
            opacity="0.9"
          />
          <path
            d="M22 52 C22 52, 34 44, 52 42 C70 40, 80 32, 80 32 C80 32, 68 44, 54 48 C42 52, 30 56, 22 52 Z"
            fill={isUnlocked ? 'url(#grad-wing-2)' : '#64748b'}
            opacity="0.8"
          />
          <polygon
            points="52,22 36,48 48,48 40,74 68,44 54,44"
            fill={isUnlocked ? 'url(#grad-gold-bright)' : '#cbd5e1'}
            filter={isUnlocked ? 'url(#glow-gold)' : undefined}
          />
          <circle cx="50" cy="50" r="4" fill="#ffffff" opacity={isUnlocked ? 0.9 : 0.4} />
        </g>
      );

    case 'velocity-typist':
      return (
        <g>
          <path
            d="M26 68 A 32 32 0 1 1 74 68"
            fill="none"
            stroke={isUnlocked ? 'url(#grad-cyan-glow)' : '#64748b'}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="3 6"
          />
          <path
            d="M32 64 A 24 24 0 1 1 68 64"
            fill="none"
            stroke={isUnlocked ? '#38bdf8' : '#94a3b8'}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="50"
            y1="56"
            x2="72"
            y2="34"
            stroke={isUnlocked ? '#ef4444' : '#475569'}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="50" cy="56" r="6" fill={isUnlocked ? '#0284c7' : '#475569'} />
          <circle cx="50" cy="56" r="2.5" fill="#ffffff" />
          <circle cx="50" cy="24" r="2" fill={isUnlocked ? '#facc15' : '#94a3b8'} />
          <circle cx="70" cy="34" r="2" fill={isUnlocked ? '#ef4444' : '#94a3b8'} />
        </g>
      );

    case 'turbo-touch':
      return (
        <g>
          <path
            d="M50 20 C42 32, 38 48, 38 62 L62 62 C62 48, 58 32, 50 20 Z"
            fill={isUnlocked ? 'url(#grad-indigo-bright)' : '#64748b'}
          />
          <path d="M38 48 L26 62 L38 62 Z" fill={isUnlocked ? '#6366f1' : '#475569'} />
          <path d="M62 48 L74 62 L62 62 Z" fill={isUnlocked ? '#4f46e5' : '#334155'} />
          <circle cx="50" cy="40" r="5" fill={isUnlocked ? '#38bdf8' : '#94a3b8'} />
          <circle cx="48" cy="38" r="1.5" fill="#ffffff" />
          <polygon
            points="42,62 50,82 58,62 50,70"
            fill={isUnlocked ? 'url(#grad-fire)' : '#94a3b8'}
            filter={isUnlocked ? 'url(#glow-fire)' : undefined}
          />
          <circle cx="32" cy="74" r="1.5" fill={isUnlocked ? '#f59e0b' : '#94a3b8'} />
          <circle cx="68" cy="74" r="1.5" fill={isUnlocked ? '#f59e0b' : '#94a3b8'} />
        </g>
      );

    case 'sonic-keystrokes':
      return (
        <g>
          <circle
            cx="50"
            cy="50"
            r="34"
            fill="none"
            stroke={isUnlocked ? 'url(#grad-purple-glow)' : '#64748b'}
            strokeWidth="2"
            strokeDasharray="4 4"
            opacity="0.8"
          />
          <circle
            cx="50"
            cy="50"
            r="26"
            fill="none"
            stroke={isUnlocked ? '#c084fc' : '#94a3b8'}
            strokeWidth="2.5"
          />
          <rect
            x="36"
            y="36"
            width="28"
            height="28"
            rx="6"
            fill={isUnlocked ? 'url(#grad-gold-bright)' : '#64748b'}
            stroke={isUnlocked ? '#fef08a' : '#cbd5e1'}
            strokeWidth="1.5"
          />
          <path
            d="M44 50 L47 44 L50 56 L53 46 L56 50"
            fill="none"
            stroke={isUnlocked ? '#7e22ce' : '#ffffff'}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      );

    case 'light-speed-master':
      return (
        <g>
          <polygon
            points="50,16 57,38 78,35 62,50 74,68 50,56 26,68 38,50 22,35 43,38"
            fill={isUnlocked ? 'url(#grad-gold-bright)' : '#64748b'}
            filter={isUnlocked ? 'url(#glow-gold)' : undefined}
          />
          <polygon points="50,26 62,48 50,60 38,48" fill={isUnlocked ? '#fef08a' : '#cbd5e1'} />
          <polygon points="50,32 56,48 50,54 44,48" fill={isUnlocked ? '#ffffff' : '#f1f5f9'} />
          <circle cx="50" cy="50" r="3" fill="#ffffff" />
          <circle cx="28" cy="24" r="1.5" fill={isUnlocked ? '#38bdf8' : '#94a3b8'} />
          <circle cx="72" cy="24" r="1.5" fill={isUnlocked ? '#f43f5e' : '#94a3b8'} />
          <circle cx="76" cy="62" r="1.5" fill={isUnlocked ? '#a855f7' : '#94a3b8'} />
          <circle cx="24" cy="62" r="1.5" fill={isUnlocked ? '#10b981' : '#94a3b8'} />
        </g>
      );

    default:
      return null;
  }
}
