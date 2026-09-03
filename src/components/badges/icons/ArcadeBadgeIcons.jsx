import React from 'react';

export function renderArcadeBadgeIcon(badgeId, isUnlocked) {
  switch (badgeId) {
    case 'press-room-master':
    case 'balloon-ninja-slicer':
      return (
        <g>
          <line
            x1="22"
            y1="22"
            x2="78"
            y2="78"
            stroke={isUnlocked ? '#e2e8f0' : '#64748b'}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1="78"
            y1="22"
            x2="22"
            y2="78"
            stroke={isUnlocked ? '#e2e8f0' : '#64748b'}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="34" cy="34" r="5" fill={isUnlocked ? '#f59e0b' : '#334155'} />
          <circle cx="66" cy="34" r="5" fill={isUnlocked ? '#f59e0b' : '#334155'} />
          <ellipse cx="40" cy="46" rx="10" ry="14" fill={isUnlocked ? '#f43f5e' : '#64748b'} opacity="0.85" />
          <ellipse cx="60" cy="54" rx="10" ry="14" fill={isUnlocked ? '#0284c7' : '#475569'} opacity="0.85" />
          <polygon points="50,42 53,50 61,50 54,55 57,63 50,58 43,63 46,55 39,50 47,50" fill="#ffffff" />
        </g>
      );

    case 'local-line-conductor':
    case 'planetary-defender':
      return (
        <g>
          <polygon
            points="50,18 64,52 50,46 36,52"
            fill={isUnlocked ? 'url(#grad-indigo-bright)' : '#64748b'}
            stroke={isUnlocked ? '#818cf8' : '#cbd5e1'}
            strokeWidth="1.5"
          />
          <polygon points="36,46 22,62 34,60" fill={isUnlocked ? '#38bdf8' : '#475569'} />
          <polygon points="64,46 78,62 66,60" fill={isUnlocked ? '#38bdf8' : '#475569'} />
          <line x1="28" y1="46" x2="28" y2="24" stroke={isUnlocked ? '#ef4444' : '#94a3b8'} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="72" y1="46" x2="72" y2="24" stroke={isUnlocked ? '#ef4444' : '#94a3b8'} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="50" cy="36" r="3" fill={isUnlocked ? '#22d3ee' : '#ffffff'} />
          <path
            d="M40 76 L44 70 L56 70 L60 76 L56 80 L44 80 Z"
            fill={isUnlocked ? '#a855f7' : '#334155'}
            opacity="0.8"
          />
        </g>
      );

    case 'drop-chits-sorter':
    case 'pharaohs-scribe':
      return (
        <g>
          <rect
            x="26"
            y="22"
            width="48"
            height="56"
            rx="4"
            fill={isUnlocked ? 'url(#grad-gold-bright)' : '#64748b'}
            stroke={isUnlocked ? '#fef08a' : '#cbd5e1'}
            strokeWidth="2"
          />
          <ellipse cx="50" cy="42" rx="10" ry="12" fill={isUnlocked ? '#0284c7' : '#334155'} />
          <circle cx="50" cy="30" r="5" fill={isUnlocked ? '#f59e0b' : '#475569'} />
          <path d="M40 42 C32 36, 30 52, 40 50 Z" fill={isUnlocked ? '#38bdf8' : '#94a3b8'} />
          <path d="M60 42 C68 36, 70 52, 60 50 Z" fill={isUnlocked ? '#38bdf8' : '#94a3b8'} />
          <line x1="34" y1="62" x2="66" y2="62" stroke={isUnlocked ? '#b45309' : '#1e293b'} strokeWidth="2" strokeDasharray="3 3" />
          <line x1="34" y1="68" x2="66" y2="68" stroke={isUnlocked ? '#b45309' : '#1e293b'} strokeWidth="2" strokeDasharray="4 2" />
        </g>
      );

    case 'paper-planes-pilot':
    case 'deep-sea-diver':
      return (
        <g>
          <circle
            cx="50"
            cy="52"
            r="24"
            fill={isUnlocked ? 'url(#grad-gold-bright)' : '#64748b'}
            stroke={isUnlocked ? '#fef08a' : '#cbd5e1'}
            strokeWidth="2"
          />
          <circle cx="50" cy="52" r="14" fill={isUnlocked ? '#0284c7' : '#334155'} />
          <circle cx="50" cy="52" r="11" fill={isUnlocked ? '#0ea5e9' : '#475569'} />
          <path d="M42 46 L58 46 M50 38 L50 66" stroke={isUnlocked ? '#fbbf24' : '#94a3b8'} strokeWidth="2" />
          <circle cx="28" cy="30" r="4" fill={isUnlocked ? '#38bdf8' : '#94a3b8'} opacity="0.8" />
          <circle cx="34" cy="20" r="2.5" fill={isUnlocked ? '#38bdf8' : '#94a3b8'} opacity="0.6" />
          <circle cx="72" cy="28" r="5" fill={isUnlocked ? '#38bdf8' : '#94a3b8'} opacity="0.8" />
          <circle cx="66" cy="18" r="3" fill={isUnlocked ? '#38bdf8' : '#94a3b8'} opacity="0.6" />
        </g>
      );

    case 'night-market-trader':
    case 'orchard-master':
      return (
        <g>
          <path
            d="M50 36 C42 26, 26 30, 26 48 C26 66, 44 76, 50 78 C56 76, 74 66, 74 48 C74 30, 58 26, 50 36 Z"
            fill={isUnlocked ? 'url(#grad-rose-bright)' : '#64748b'}
            filter={isUnlocked ? 'url(#glow-rose)' : undefined}
          />
          <path
            d="M50 36 C50 28, 54 22, 58 18"
            fill="none"
            stroke={isUnlocked ? '#78350f' : '#334155'}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M54 26 C62 22, 66 26, 64 30 C58 32, 54 28, 54 26 Z"
            fill={isUnlocked ? '#22c55e' : '#94a3b8'}
          />
          <ellipse cx="38" cy="46" rx="4" ry="8" fill="#ffffff" opacity={isUnlocked ? 0.6 : 0.2} transform="rotate(-20 38 46)" />
        </g>
      );

    default:
      return null;
  }
}
