import React from 'react';

export function renderMasteryBadgeIcon(badgeId, isUnlocked) {
  switch (badgeId) {
    case 'home-row-hero':
      return (
        <g>
          <path
            d="M26 24 L74 24 C74 54, 50 76, 50 78 C50 76, 26 54, 26 24 Z"
            fill={isUnlocked ? 'url(#grad-gold-bright)' : '#64748b'}
            stroke={isUnlocked ? '#fef08a' : '#cbd5e1'}
            strokeWidth="2"
          />
          <rect
            x="32"
            y="38"
            width="36"
            height="16"
            rx="3"
            fill={isUnlocked ? '#1e293b' : '#334155'}
          />
          <rect x="36" y="42" width="12" height="8" rx="2" fill={isUnlocked ? '#38bdf8' : '#64748b'} />
          <rect x="52" y="42" width="12" height="8" rx="2" fill={isUnlocked ? '#38bdf8' : '#64748b'} />
          <line x1="40" y1="48" x2="44" y2="48" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="56" y1="48" x2="60" y2="48" stroke="#ffffff" strokeWidth="1.5" />
        </g>
      );

    case 'full-alphabet-master':
      return (
        <g>
          <ellipse
            cx="50"
            cy="50"
            rx="32"
            ry="14"
            fill="none"
            stroke={isUnlocked ? '#38bdf8' : '#64748b'}
            strokeWidth="2"
            transform="rotate(30 50 50)"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="32"
            ry="14"
            fill="none"
            stroke={isUnlocked ? '#c084fc' : '#94a3b8'}
            strokeWidth="2"
            transform="rotate(-30 50 50)"
          />
          <circle
            cx="50"
            cy="50"
            r="18"
            fill={isUnlocked ? 'url(#grad-gold-bright)' : '#64748b'}
            stroke={isUnlocked ? '#fef08a' : '#cbd5e1'}
            strokeWidth="2"
          />
          <text
            x="50"
            y="55"
            textAnchor="middle"
            fill={isUnlocked ? '#0f172a' : '#ffffff'}
            fontSize="12"
            fontWeight="900"
            fontFamily="sans-serif"
          >
            A-Z
          </text>
        </g>
      );

    case 'code-typing-prodigy':
      return (
        <g>
          <rect
            x="22"
            y="24"
            width="56"
            height="52"
            rx="6"
            fill={isUnlocked ? '#0f172a' : '#1e293b'}
            stroke={isUnlocked ? '#818cf8' : '#64748b'}
            strokeWidth="2"
          />
          <circle cx="30" cy="32" r="2" fill={isUnlocked ? '#ef4444' : '#64748b'} />
          <circle cx="36" cy="32" r="2" fill={isUnlocked ? '#eab308' : '#64748b'} />
          <circle cx="42" cy="32" r="2" fill={isUnlocked ? '#22c55e' : '#64748b'} />
          <text
            x="50"
            y="58"
            textAnchor="middle"
            fill={isUnlocked ? '#38bdf8' : '#94a3b8'}
            fontSize="16"
            fontWeight="bold"
            fontFamily="monospace"
          >
            &lt;/&gt;
          </text>
        </g>
      );

    case 'detective-inspector':
      return (
        <g>
          <circle
            cx="44"
            cy="44"
            r="20"
            fill={isUnlocked ? '#0284c7' : '#475569'}
            stroke={isUnlocked ? 'url(#grad-gold-bright)' : '#94a3b8'}
            strokeWidth="4"
            opacity="0.9"
          />
          <circle cx="44" cy="44" r="16" fill={isUnlocked ? '#38bdf8' : '#64748b'} opacity="0.3" />
          <path d="M34 38 C38 32, 48 32, 54 36" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
          <line
            x1="58"
            y1="58"
            x2="78"
            y2="78"
            stroke={isUnlocked ? '#b45309' : '#334155'}
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="44" cy="46" r="3" fill={isUnlocked ? '#fef08a' : '#cbd5e1'} />
          <circle cx="40" cy="42" r="1.5" fill={isUnlocked ? '#fef08a' : '#cbd5e1'} />
          <circle cx="44" cy="40" r="1.5" fill={isUnlocked ? '#fef08a' : '#cbd5e1'} />
          <circle cx="48" cy="42" r="1.5" fill={isUnlocked ? '#fef08a' : '#cbd5e1'} />
        </g>
      );

    case 'music-maestro':
      return (
        <g>
          <path
            d="M50 18 L50 74 C50 78, 44 80, 42 76 C40 72, 46 68, 50 72 M50 36 C58 32, 60 46, 48 50 C38 54, 40 68, 52 66 C64 64, 62 48, 50 48"
            fill="none"
            stroke={isUnlocked ? 'url(#grad-gold-bright)' : '#64748b'}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="28" cy="38" r="4" fill={isUnlocked ? '#ec4899' : '#94a3b8'} />
          <line x1="32" y1="38" x2="32" y2="24" stroke={isUnlocked ? '#ec4899' : '#94a3b8'} strokeWidth="2" />
          <circle cx="72" cy="42" r="4" fill={isUnlocked ? '#8b5cf6' : '#94a3b8'} />
          <line x1="76" y1="42" x2="76" y2="28" stroke={isUnlocked ? '#8b5cf6' : '#94a3b8'} strokeWidth="2" />
        </g>
      );

    case 'number-row-ninja':
    case 'number-row-champion':
      return (
        <g>
          <polygon
            points="24,62 28,34 40,48 50,26 60,48 72,34 76,62"
            fill={isUnlocked ? 'url(#grad-gold-bright)' : '#64748b'}
            stroke={isUnlocked ? '#fef08a' : '#cbd5e1'}
            strokeWidth="2"
            filter={isUnlocked ? 'url(#glow-gold)' : undefined}
          />
          <rect x="24" y="62" width="52" height="8" rx="2" fill={isUnlocked ? '#b45309' : '#334155'} />
          <circle cx="34" cy="66" r="2" fill={isUnlocked ? '#ef4444' : '#94a3b8'} />
          <circle cx="50" cy="66" r="2" fill={isUnlocked ? '#3b82f6' : '#94a3b8'} />
          <circle cx="66" cy="66" r="2" fill={isUnlocked ? '#10b981' : '#94a3b8'} />
          <circle cx="28" cy="34" r="2" fill={isUnlocked ? '#ffffff' : '#cbd5e1'} />
          <circle cx="50" cy="26" r="3" fill={isUnlocked ? '#ffffff' : '#cbd5e1'} />
          <circle cx="72" cy="34" r="2" fill={isUnlocked ? '#ffffff' : '#cbd5e1'} />
        </g>
      );

    case 'star-collector-50':
    case 'retrospeed-grandmaster':
      return (
        <g>
          <path
            d="M50 20 C64 20, 78 30, 78 48 C78 68, 64 78, 50 82 C36 78, 22 68, 22 48 C22 30, 36 20, 50 20 Z"
            fill={isUnlocked ? 'url(#grad-gold-bright)' : '#64748b'}
            stroke={isUnlocked ? '#fef08a' : '#cbd5e1'}
            strokeWidth="2.5"
            filter={isUnlocked ? 'url(#glow-gold)' : undefined}
          />
          <path
            d="M30 36 C24 46, 26 62, 36 70 M70 36 C76 46, 74 62, 64 70"
            fill="none"
            stroke={isUnlocked ? '#b45309' : '#334155'}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <polygon points="38,22 44,14 50,18 56,14 62,22" fill={isUnlocked ? '#fef08a' : '#cbd5e1'} />
          <circle cx="42" cy="46" r="3" fill={isUnlocked ? '#1e293b' : '#1e293b'} />
          <circle cx="58" cy="46" r="3" fill={isUnlocked ? '#1e293b' : '#1e293b'} />
          <polygon points="50,54 46,50 54,50" fill={isUnlocked ? '#b45309' : '#1e293b'} />
          <polygon points="50,70 52,74 56,74 53,77 54,81 50,78 46,81 47,77 44,74 48,74" fill="#ffffff" />
        </g>
      );

    default:
      return null;
  }
}
