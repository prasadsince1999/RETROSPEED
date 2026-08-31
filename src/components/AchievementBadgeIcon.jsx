import React from 'react';
import { Lock } from 'lucide-react';

/**
 * High quality vector SVG Medal & Trophy Icon for all 24 EdClub achievements.
 * Features glowing gradients for unlocked, subdued monochrome for locked.
 */
export default function AchievementBadgeIcon({
  badgeId,
  isUnlocked = true,
  size = 'md',
  className = '',
  showLockOverlay = true
}) {
  const sizeMap = {
    xs: 'w-8 h-8',
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const dim = sizeMap[size] || sizeMap.md;

  // Render specific badge vector emblem
  const renderEmblem = () => {
    switch (badgeId) {
      // ----------------------------------------
      // SPEED BADGES (5)
      // ----------------------------------------
      case 'swift-fingers':
        return (
          <g>
            {/* Speed Wing Trails */}
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
            {/* Lightning Strike */}
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
            {/* Tachometer / Speedometer Dial */}
            <path
              d="M26 68 A 32 32 0 1 1 74 68"
              fill="none"
              stroke={isUnlocked ? 'url(#grad-cyan-glow)' : '#64748b'}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="3 6"
            />
            {/* Inner Speed Arc */}
            <path
              d="M32 64 A 24 24 0 1 1 68 64"
              fill="none"
              stroke={isUnlocked ? '#38bdf8' : '#94a3b8'}
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Gauge Needle */}
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
            {/* Speed Hash Marks */}
            <circle cx="50" cy="24" r="2" fill={isUnlocked ? '#facc15' : '#94a3b8'} />
            <circle cx="70" cy="34" r="2" fill={isUnlocked ? '#ef4444' : '#94a3b8'} />
          </g>
        );

      case 'turbo-touch':
        return (
          <g>
            {/* Rocket Thruster Body */}
            <path
              d="M50 20 C42 32, 38 48, 38 62 L62 62 C62 48, 58 32, 50 20 Z"
              fill={isUnlocked ? 'url(#grad-indigo-bright)' : '#64748b'}
            />
            {/* Rocket Fins */}
            <path
              d="M38 48 L26 62 L38 62 Z"
              fill={isUnlocked ? '#6366f1' : '#475569'}
            />
            <path
              d="M62 48 L74 62 L62 62 Z"
              fill={isUnlocked ? '#4f46e5' : '#334155'}
            />
            {/* Rocket Window */}
            <circle cx="50" cy="40" r="5" fill={isUnlocked ? '#38bdf8' : '#94a3b8'} />
            <circle cx="48" cy="38" r="1.5" fill="#ffffff" />
            {/* Turbo Exhaust Plume */}
            <polygon
              points="42,62 50,82 58,62 50,70"
              fill={isUnlocked ? 'url(#grad-fire)' : '#94a3b8'}
              filter={isUnlocked ? 'url(#glow-fire)' : undefined}
            />
            {/* Speed Particles */}
            <circle cx="32" cy="74" r="1.5" fill={isUnlocked ? '#f59e0b' : '#94a3b8'} />
            <circle cx="68" cy="74" r="1.5" fill={isUnlocked ? '#f59e0b' : '#94a3b8'} />
          </g>
        );

      case 'sonic-keystrokes':
        return (
          <g>
            {/* Sonic Boom Expanding Shockwaves */}
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
            {/* Sonic Keycap */}
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
            {/* Sound Wave Letter Symbol */}
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
            {/* Prismatic Crystal Starburst */}
            <polygon
              points="50,16 57,38 78,35 62,50 74,68 50,56 26,68 38,50 22,35 43,38"
              fill={isUnlocked ? 'url(#grad-gold-bright)' : '#64748b'}
              filter={isUnlocked ? 'url(#glow-gold)' : undefined}
            />
            {/* Diamond Facet Lines */}
            <polygon
              points="50,26 62,48 50,60 38,48"
              fill={isUnlocked ? '#fef08a' : '#cbd5e1'}
            />
            <polygon
              points="50,32 56,48 50,54 44,48"
              fill={isUnlocked ? '#ffffff' : '#f1f5f9'}
            />
            {/* Refracted Light Beams */}
            <circle cx="50" cy="50" r="3" fill="#ffffff" />
            <circle cx="28" cy="24" r="1.5" fill={isUnlocked ? '#38bdf8' : '#94a3b8'} />
            <circle cx="72" cy="24" r="1.5" fill={isUnlocked ? '#f43f5e' : '#94a3b8'} />
            <circle cx="76" cy="62" r="1.5" fill={isUnlocked ? '#a855f7' : '#94a3b8'} />
            <circle cx="24" cy="62" r="1.5" fill={isUnlocked ? '#10b981' : '#94a3b8'} />
          </g>
        );

      // ----------------------------------------
      // ACCURACY BADGES (3)
      // ----------------------------------------
      case 'sharp-shooter':
        return (
          <g>
            {/* Crosshair Target Rings */}
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
            {/* Crosshair Reticle Lines */}
            <line x1="50" y1="16" x2="50" y2="30" stroke={isUnlocked ? '#059669' : '#64748b'} strokeWidth="2.5" />
            <line x1="50" y1="70" x2="50" y2="84" stroke={isUnlocked ? '#059669' : '#64748b'} strokeWidth="2.5" />
            <line x1="16" y1="50" x2="30" y2="50" stroke={isUnlocked ? '#059669' : '#64748b'} strokeWidth="2.5" />
            <line x1="70" y1="50" x2="84" y2="50" stroke={isUnlocked ? '#059669' : '#64748b'} strokeWidth="2.5" />
            {/* Bullseye Center Dot */}
            <circle cx="50" cy="50" r="6" fill={isUnlocked ? '#ef4444' : '#475569'} />
            <circle cx="50" cy="50" r="2.5" fill="#ffffff" />
          </g>
        );

      case 'bullseye':
        return (
          <g>
            {/* Layered Target Boards */}
            <circle cx="50" cy="50" r="30" fill={isUnlocked ? '#ef4444' : '#64748b'} />
            <circle cx="50" cy="50" r="23" fill="#ffffff" />
            <circle cx="50" cy="50" r="16" fill={isUnlocked ? '#3b82f6' : '#94a3b8'} />
            <circle cx="50" cy="50" r="9" fill={isUnlocked ? '#ef4444' : '#475569'} />
            <circle cx="50" cy="50" r="4" fill={isUnlocked ? '#fbbf24' : '#cbd5e1'} />
            {/* Pierced Arrow Shaft */}
            <line
              x1="22"
              y1="22"
              x2="50"
              y2="50"
              stroke={isUnlocked ? '#facc15' : '#334155'}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Arrow Fletching */}
            <polygon
              points="18,18 26,18 20,24"
              fill={isUnlocked ? '#f43f5e' : '#cbd5e1'}
            />
            <polygon
              points="18,18 18,26 24,20"
              fill={isUnlocked ? '#f43f5e' : '#cbd5e1'}
            />
          </g>
        );

      case 'absolute-perfection':
        return (
          <g>
            {/* Sparkling Perfect Diamond */}
            <polygon
              points="30,36 70,36 82,50 50,78 18,50"
              fill={isUnlocked ? 'url(#grad-gold-bright)' : '#64748b'}
              stroke={isUnlocked ? '#fef08a' : '#cbd5e1'}
              strokeWidth="2"
              filter={isUnlocked ? 'url(#glow-gold)' : undefined}
            />
            {/* Diamond Facets */}
            <polygon points="38,36 62,36 50,50" fill={isUnlocked ? '#fef08a' : '#94a3b8'} />
            <polygon points="30,36 38,36 50,50 18,50" fill={isUnlocked ? '#f59e0b' : '#475569'} />
            <polygon points="62,36 70,36 82,50 50,50" fill={isUnlocked ? '#f59e0b' : '#475569'} />
            <polygon points="18,50 50,50 50,78" fill={isUnlocked ? '#d97706' : '#334155'} />
            <polygon points="82,50 50,50 50,78" fill={isUnlocked ? '#b45309' : '#1e293b'} />
            {/* 5 Orbiting Stars */}
            <polygon points="50,18 52,24 58,24 53,28 55,34 50,30 45,34 47,28 42,24 48,24" fill={isUnlocked ? '#facc15' : '#cbd5e1'} />
            <circle cx="24" cy="28" r="2" fill={isUnlocked ? '#ffffff' : '#94a3b8'} />
            <circle cx="76" cy="28" r="2" fill={isUnlocked ? '#ffffff' : '#94a3b8'} />
            <circle cx="18" cy="66" r="2" fill={isUnlocked ? '#fef08a' : '#94a3b8'} />
            <circle cx="82" cy="66" r="2" fill={isUnlocked ? '#fef08a' : '#94a3b8'} />
          </g>
        );

      // ----------------------------------------
      // CONSISTENCY & STREAKS (4)
      // ----------------------------------------
      case 'dedicated-learner':
        return (
          <g>
            {/* Eternal Flame Pedestal */}
            <path
              d="M36 72 L64 72 L58 60 L42 60 Z"
              fill={isUnlocked ? '#78716c' : '#475569'}
            />
            {/* Outer Flame */}
            <path
              d="M50 20 C60 36, 68 46, 64 58 C60 70, 40 70, 36 58 C32 46, 40 36, 50 20 Z"
              fill={isUnlocked ? 'url(#grad-fire)' : '#64748b'}
              filter={isUnlocked ? 'url(#glow-fire)' : undefined}
            />
            {/* Inner Flame Core */}
            <path
              d="M50 34 C56 44, 60 50, 58 58 C56 64, 44 64, 42 58 C40 50, 44 44, 50 34 Z"
              fill={isUnlocked ? '#fef08a' : '#cbd5e1'}
            />
            {/* 3 Flame Sparks */}
            <circle cx="34" cy="38" r="1.5" fill={isUnlocked ? '#f97316' : '#94a3b8'} />
            <circle cx="66" cy="38" r="1.5" fill={isUnlocked ? '#f97316' : '#94a3b8'} />
            <circle cx="50" cy="16" r="1.5" fill={isUnlocked ? '#fef08a' : '#94a3b8'} />
          </g>
        );

      case 'weekly-warrior':
        return (
          <g>
            {/* Laurel Wreath */}
            <path
              d="M24 50 C24 64, 34 74, 50 76 C66 74, 76 64, 76 50"
              fill="none"
              stroke={isUnlocked ? '#eab308' : '#64748b'}
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* 7-Pointed Warrior Star */}
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
            {/* Phoenix Flame Wings */}
            <path
              d="M50 48 C34 26, 14 36, 16 58 C26 56, 36 62, 50 76 C64 62, 74 56, 84 58 C86 36, 66 26, 50 48 Z"
              fill={isUnlocked ? 'url(#grad-gold-bright)' : '#64748b'}
              filter={isUnlocked ? 'url(#glow-gold)' : undefined}
            />
            {/* Inner Phoenix Crown */}
            <path
              d="M50 24 L54 36 L50 34 L46 36 Z"
              fill={isUnlocked ? '#ef4444' : '#475569'}
            />
            <circle cx="50" cy="38" r="4" fill={isUnlocked ? '#fef08a' : '#cbd5e1'} />
            {/* Keyboard Plinth */}
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
            {/* Steampunk Hourglass Housing */}
            <path
              d="M32 24 L68 24 M32 76 L68 76 M36 24 L36 30 L46 48 L36 66 L36 76 M64 24 L64 30 L54 48 L64 66 L64 76"
              fill="none"
              stroke={isUnlocked ? '#c084fc' : '#64748b'}
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Top Chamber Glowing Sand */}
            <polygon
              points="40,32 60,32 50,46"
              fill={isUnlocked ? 'url(#grad-purple-bright)' : '#94a3b8'}
            />
            {/* Falling Sand Stream */}
            <line x1="50" y1="46" x2="50" y2="60" stroke={isUnlocked ? '#fef08a' : '#cbd5e1'} strokeWidth="2" />
            {/* Bottom Chamber Sand Mound */}
            <polygon
              points="42,70 58,70 50,60"
              fill={isUnlocked ? 'url(#grad-gold-bright)' : '#94a3b8'}
            />
          </g>
        );

      // ----------------------------------------
      // ARCADE CHAMPIONS (5)
      // ----------------------------------------
      case 'balloon-ninja-slicer':
        return (
          <g>
            {/* Crossed Katana Blades */}
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
            {/* Blade Guards & Handles */}
            <circle cx="34" cy="34" r="5" fill={isUnlocked ? '#f59e0b' : '#334155'} />
            <circle cx="66" cy="34" r="5" fill={isUnlocked ? '#f59e0b' : '#334155'} />
            {/* Sliced Balloon Halves */}
            <ellipse cx="40" cy="46" rx="10" ry="14" fill={isUnlocked ? '#f43f5e' : '#64748b'} opacity="0.85" />
            <ellipse cx="60" cy="54" rx="10" ry="14" fill={isUnlocked ? '#0284c7' : '#475569'} opacity="0.85" />
            {/* Slash Sparkle */}
            <polygon points="50,42 53,50 61,50 54,55 57,63 50,58 43,63 46,55 39,50 47,50" fill="#ffffff" />
          </g>
        );

      case 'planetary-defender':
        return (
          <g>
            {/* Star Fighter Spacecraft */}
            <polygon
              points="50,18 64,52 50,46 36,52"
              fill={isUnlocked ? 'url(#grad-indigo-bright)' : '#64748b'}
              stroke={isUnlocked ? '#818cf8' : '#cbd5e1'}
              strokeWidth="1.5"
            />
            {/* Wing Plasma Cannons */}
            <polygon points="36,46 22,62 34,60" fill={isUnlocked ? '#38bdf8' : '#475569'} />
            <polygon points="64,46 78,62 66,60" fill={isUnlocked ? '#38bdf8' : '#475569'} />
            {/* Twin Laser Blasts */}
            <line x1="28" y1="46" x2="28" y2="24" stroke={isUnlocked ? '#ef4444' : '#94a3b8'} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="72" y1="46" x2="72" y2="24" stroke={isUnlocked ? '#ef4444' : '#94a3b8'} strokeWidth="2.5" strokeLinecap="round" />
            {/* Cockpit Glow */}
            <circle cx="50" cy="36" r="3" fill={isUnlocked ? '#22d3ee' : '#ffffff'} />
            {/* Subdued Alien Invader Outline */}
            <path
              d="M40 76 L44 70 L56 70 L60 76 L56 80 L44 80 Z"
              fill={isUnlocked ? '#a855f7' : '#334155'}
              opacity="0.8"
            />
          </g>
        );

      case 'pharaohs-scribe':
        return (
          <g>
            {/* Ancient Stone Tablet */}
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
            {/* Sacred Scarab Emblem */}
            <ellipse cx="50" cy="42" rx="10" ry="12" fill={isUnlocked ? '#0284c7' : '#334155'} />
            <circle cx="50" cy="30" r="5" fill={isUnlocked ? '#f59e0b' : '#475569'} />
            {/* Scarab Wings */}
            <path
              d="M40 42 C32 36, 30 52, 40 50 Z"
              fill={isUnlocked ? '#38bdf8' : '#94a3b8'}
            />
            <path
              d="M60 42 C68 36, 70 52, 60 50 Z"
              fill={isUnlocked ? '#38bdf8' : '#94a3b8'}
            />
            {/* Carved Hieroglyphs */}
            <line x1="34" y1="62" x2="66" y2="62" stroke={isUnlocked ? '#b45309' : '#1e293b'} strokeWidth="2" strokeDasharray="3 3" />
            <line x1="34" y1="68" x2="66" y2="68" stroke={isUnlocked ? '#b45309' : '#1e293b'} strokeWidth="2" strokeDasharray="4 2" />
          </g>
        );

      case 'deep-sea-diver':
        return (
          <g>
            {/* Steampunk Brass Diving Helmet */}
            <circle
              cx="50"
              cy="52"
              r="24"
              fill={isUnlocked ? 'url(#grad-gold-bright)' : '#64748b'}
              stroke={isUnlocked ? '#fef08a' : '#cbd5e1'}
              strokeWidth="2"
            />
            {/* Porthole Window */}
            <circle cx="50" cy="52" r="14" fill={isUnlocked ? '#0284c7' : '#334155'} />
            <circle cx="50" cy="52" r="11" fill={isUnlocked ? '#0ea5e9' : '#475569'} />
            <path d="M42 46 L58 46 M50 38 L50 66" stroke={isUnlocked ? '#fbbf24' : '#94a3b8'} strokeWidth="2" />
            {/* Rising Bubbles */}
            <circle cx="28" cy="30" r="4" fill={isUnlocked ? '#38bdf8' : '#94a3b8'} opacity="0.8" />
            <circle cx="34" cy="20" r="2.5" fill={isUnlocked ? '#38bdf8' : '#94a3b8'} opacity="0.6" />
            <circle cx="72" cy="28" r="5" fill={isUnlocked ? '#38bdf8' : '#94a3b8'} opacity="0.8" />
            <circle cx="66" cy="18" r="3" fill={isUnlocked ? '#38bdf8' : '#94a3b8'} opacity="0.6" />
          </g>
        );

      case 'orchard-master':
        return (
          <g>
            {/* Harvest Apple Fruit */}
            <path
              d="M50 36 C42 26, 26 30, 26 48 C26 66, 44 76, 50 78 C56 76, 74 66, 74 48 C74 30, 58 26, 50 36 Z"
              fill={isUnlocked ? 'url(#grad-rose-bright)' : '#64748b'}
              filter={isUnlocked ? 'url(#glow-rose)' : undefined}
            />
            {/* Apple Stem & Leaf */}
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
            {/* Apple Specular Sheen */}
            <ellipse cx="38" cy="46" rx="4" ry="8" fill="#ffffff" opacity={isUnlocked ? 0.6 : 0.2} transform="rotate(-20 38 46)" />
          </g>
        );

      // ----------------------------------------
      // CURRICULUM MASTERY (7)
      // ----------------------------------------
      case 'home-row-hero':
        return (
          <g>
            {/* Knight Shield */}
            <path
              d="M26 24 L74 24 C74 54, 50 76, 50 78 C50 76, 26 54, 26 24 Z"
              fill={isUnlocked ? 'url(#grad-gold-bright)' : '#64748b'}
              stroke={isUnlocked ? '#fef08a' : '#cbd5e1'}
              strokeWidth="2"
            />
            {/* Home Row Keys Banner */}
            <rect
              x="32"
              y="38"
              width="36"
              height="16"
              rx="3"
              fill={isUnlocked ? '#1e293b' : '#334155'}
            />
            {/* F & J Tactile Keycaps */}
            <rect x="36" y="42" width="12" height="8" rx="2" fill={isUnlocked ? '#38bdf8' : '#64748b'} />
            <rect x="52" y="42" width="12" height="8" rx="2" fill={isUnlocked ? '#38bdf8' : '#64748b'} />
            <line x1="40" y1="48" x2="44" y2="48" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="56" y1="48" x2="60" y2="48" stroke="#ffffff" strokeWidth="1.5" />
          </g>
        );

      case 'full-alphabet-master':
        return (
          <g>
            {/* Orbital Gyroscope Rings */}
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
            {/* Central Alphabet Core */}
            <circle
              cx="50"
              cy="50"
              r="18"
              fill={isUnlocked ? 'url(#grad-gold-bright)' : '#64748b'}
              stroke={isUnlocked ? '#fef08a' : '#cbd5e1'}
              strokeWidth="2"
            />
            {/* A-Z Letter Monogram */}
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
            {/* Dark Terminal Window */}
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
            {/* Terminal Top Window Dots */}
            <circle cx="30" cy="32" r="2" fill={isUnlocked ? '#ef4444' : '#64748b'} />
            <circle cx="36" cy="32" r="2" fill={isUnlocked ? '#eab308' : '#64748b'} />
            <circle cx="42" cy="32" r="2" fill={isUnlocked ? '#22c55e' : '#64748b'} />
            {/* Code Brackets < / > */}
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
            {/* Detective Magnifying Glass */}
            <circle
              cx="44"
              cy="44"
              r="20"
              fill={isUnlocked ? '#0284c7' : '#475569'}
              stroke={isUnlocked ? 'url(#grad-gold-bright)' : '#94a3b8'}
              strokeWidth="4"
              opacity="0.9"
            />
            {/* Glass Lens Reflection */}
            <circle cx="44" cy="44" r="16" fill={isUnlocked ? '#38bdf8' : '#64748b'} opacity="0.3" />
            <path d="M34 38 C38 32, 48 32, 54 36" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Magnifier Handle */}
            <line
              x1="58"
              y1="58"
              x2="78"
              y2="78"
              stroke={isUnlocked ? '#b45309' : '#334155'}
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Mystery Clue Footprint */}
            <circle cx="44" cy="46" r="3" fill={isUnlocked ? '#fef08a' : '#cbd5e1'} />
            <circle cx="40" cy="42" r="1.5" fill={isUnlocked ? '#fef08a' : '#cbd5e1'} />
            <circle cx="44" cy="40" r="1.5" fill={isUnlocked ? '#fef08a' : '#cbd5e1'} />
            <circle cx="48" cy="42" r="1.5" fill={isUnlocked ? '#fef08a' : '#cbd5e1'} />
          </g>
        );

      case 'music-maestro':
        return (
          <g>
            {/* Golden Treble Clef */}
            <path
              d="M50 18 L50 74 C50 78, 44 80, 42 76 C40 72, 46 68, 50 72 M50 36 C58 32, 60 46, 48 50 C38 54, 40 68, 52 66 C64 64, 62 48, 50 48"
              fill="none"
              stroke={isUnlocked ? 'url(#grad-gold-bright)' : '#64748b'}
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Floating Musical Eighth Notes */}
            <circle cx="28" cy="38" r="4" fill={isUnlocked ? '#ec4899' : '#94a3b8'} />
            <line x1="32" y1="38" x2="32" y2="24" stroke={isUnlocked ? '#ec4899' : '#94a3b8'} strokeWidth="2" />
            <circle cx="72" cy="42" r="4" fill={isUnlocked ? '#8b5cf6' : '#94a3b8'} />
            <line x1="76" y1="42" x2="76" y2="28" stroke={isUnlocked ? '#8b5cf6' : '#94a3b8'} strokeWidth="2" />
          </g>
        );

      case 'number-row-champion':
        return (
          <g>
            {/* Royal Crown for Number Row */}
            <polygon
              points="24,62 28,34 40,48 50,26 60,48 72,34 76,62"
              fill={isUnlocked ? 'url(#grad-gold-bright)' : '#64748b'}
              stroke={isUnlocked ? '#fef08a' : '#cbd5e1'}
              strokeWidth="2"
              filter={isUnlocked ? 'url(#glow-gold)' : undefined}
            />
            {/* Crown Base */}
            <rect x="24" y="62" width="52" height="8" rx="2" fill={isUnlocked ? '#b45309' : '#334155'} />
            {/* Gemstones (Numbers 1-2-3) */}
            <circle cx="34" cy="66" r="2" fill={isUnlocked ? '#ef4444' : '#94a3b8'} />
            <circle cx="50" cy="66" r="2" fill={isUnlocked ? '#3b82f6' : '#94a3b8'} />
            <circle cx="66" cy="66" r="2" fill={isUnlocked ? '#10b981' : '#94a3b8'} />
            {/* Top Jewels */}
            <circle cx="28" cy="34" r="2" fill={isUnlocked ? '#ffffff' : '#cbd5e1'} />
            <circle cx="50" cy="26" r="3" fill={isUnlocked ? '#ffffff' : '#cbd5e1'} />
            <circle cx="72" cy="34" r="2" fill={isUnlocked ? '#ffffff' : '#cbd5e1'} />
          </g>
        );

      case 'keycraft-odyssey-grandmaster':
      case 'keycraft-grandmaster':
      case 'typing-jungle-grandmaster':
        return (
          <g>
            {/* Grandmaster Lion Head Silhouette */}
            <path
              d="M50 20 C64 20, 78 30, 78 48 C78 68, 64 78, 50 82 C36 78, 22 68, 22 48 C22 30, 36 20, 50 20 Z"
              fill={isUnlocked ? 'url(#grad-gold-bright)' : '#64748b'}
              stroke={isUnlocked ? '#fef08a' : '#cbd5e1'}
              strokeWidth="2.5"
              filter={isUnlocked ? 'url(#glow-gold)' : undefined}
            />
            {/* Lion Mane Strands */}
            <path
              d="M30 36 C24 46, 26 62, 36 70 M70 36 C76 46, 74 62, 64 70"
              fill="none"
              stroke={isUnlocked ? '#b45309' : '#334155'}
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Grandmaster Crown */}
            <polygon
              points="38,22 44,14 50,18 56,14 62,22"
              fill={isUnlocked ? '#fef08a' : '#cbd5e1'}
            />
            {/* Lion Eyes & Muzzle */}
            <circle cx="42" cy="46" r="3" fill={isUnlocked ? '#1e293b' : '#1e293b'} />
            <circle cx="58" cy="46" r="3" fill={isUnlocked ? '#1e293b' : '#1e293b'} />
            <polygon points="50,54 46,50 54,50" fill={isUnlocked ? '#b45309' : '#1e293b'} />
            {/* Sparkling Star */}
            <polygon points="50,70 52,74 56,74 53,77 54,81 50,78 46,81 47,77 44,74 48,74" fill="#ffffff" />
          </g>
        );

      default:
        return (
          <g>
            <circle cx="50" cy="50" r="28" fill={isUnlocked ? '#38bdf8' : '#64748b'} />
            <circle cx="50" cy="50" r="20" fill={isUnlocked ? '#0284c7' : '#475569'} />
            <polygon points="50,34 54,44 64,44 56,50 59,60 50,54 41,60 44,50 36,44 46,44" fill="#ffffff" />
          </g>
        );
    }
  };

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${dim} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full drop-shadow-md transition-transform duration-300 ${
          isUnlocked ? 'hover:scale-105 filter' : 'filter grayscale contrast-75 opacity-75'
        }`}
      >
        <defs>
          {/* Gold / Amber Bright Gradient */}
          <linearGradient id="grad-gold-bright" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#fbbf24" />
            <stop offset="70%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          {/* Cyan / Blue Speed Glow */}
          <linearGradient id="grad-cyan-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>

          {/* Indigo / Purple Gradient */}
          <linearGradient id="grad-indigo-bright" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="50%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#312e81" />
          </linearGradient>

          {/* Purple Glow Gradient */}
          <linearGradient id="grad-purple-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e879f9" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#7e22ce" />
          </linearGradient>

          <linearGradient id="grad-purple-bright" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0abfc" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>

          {/* Fire Orange Gradient */}
          <linearGradient id="grad-fire" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#fb923c" />
            <stop offset="70%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>

          {/* Rose / Crimson Gradient */}
          <linearGradient id="grad-rose-bright" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fda4af" />
            <stop offset="50%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#be123c" />
          </linearGradient>

          {/* Wing Gradients */}
          <linearGradient id="grad-wing-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="grad-wing-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#f59e0b" floodOpacity="0.6" />
          </filter>
          <filter id="glow-fire" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#f97316" floodOpacity="0.7" />
          </filter>
          <filter id="glow-rose" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#f43f5e" floodOpacity="0.6" />
          </filter>
        </defs>

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
