import React from 'react';

// Aura Color Themes corresponding to authentic EdClub aesthetic palettes
const THEME_PALETTES = {
  gold: {
    primary: '#fbbf24',
    secondary: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.65)',
    ambient: 'rgba(251, 191, 36, 0.25)',
    arrow: '#fde047',
    ring: '#fef08a'
  },
  cyan: {
    primary: '#22d3ee',
    secondary: '#0284c7',
    glow: 'rgba(6, 182, 212, 0.65)',
    ambient: 'rgba(34, 211, 238, 0.25)',
    arrow: '#67e8f9',
    ring: '#a5f3fc'
  },
  emerald: {
    primary: '#34d399',
    secondary: '#059669',
    glow: 'rgba(16, 185, 129, 0.65)',
    ambient: 'rgba(52, 211, 153, 0.25)',
    arrow: '#6ee7b7',
    ring: '#a7f3d0'
  },
  ruby: {
    primary: '#f43f5e',
    secondary: '#be123c',
    glow: 'rgba(225, 29, 72, 0.65)',
    ambient: 'rgba(244, 63, 94, 0.25)',
    arrow: '#fda4af',
    ring: '#ffe4e6'
  },
  amethyst: {
    primary: '#c084fc',
    secondary: '#7e22ce',
    glow: 'rgba(168, 85, 247, 0.65)',
    ambient: 'rgba(192, 132, 252, 0.25)',
    arrow: '#d8b4fe',
    ring: '#f3e8ff'
  },
  solar: {
    primary: '#ffffff',
    secondary: '#facc15',
    glow: 'rgba(250, 204, 21, 0.8)',
    ambient: 'rgba(255, 255, 255, 0.35)',
    arrow: '#ffffff',
    ring: '#fef9c3'
  }
};

export default function TargetAuraHalo({
  active = true,
  theme = 'gold',
  size = 80,
  showArrows = true,
  showSunburst = true,
  showRays = true,
  showRings = true,
  pulsing = true,
  arrowDistance = 22,
  targetChar = null,
  colorOverride = null,
  glowOverride = null,
  className = '',
  style = {},
  children
}) {
  if (!active) {
    return <div className={`relative inline-flex items-center justify-center ${className}`} style={style}>{children}</div>;
  }

  const palette = THEME_PALETTES[theme] || THEME_PALETTES.gold;
  const primaryColor = colorOverride || palette.primary;
  const glowColor = glowOverride || palette.glow;
  const arrowColor = palette.arrow;
  const ambientColor = palette.ambient;

  const halfSize = size / 2;
  const rayCount = 12;

  return (
    <div 
      className={`relative inline-flex items-center justify-center pointer-events-none select-none ${className}`}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
        ...style
      }}
    >
      {/* Layer 1: Diffuse Ambient Color Bloom Background */}
      <div 
        className="absolute inset-0 rounded-full blur-xl pointer-events-none transition-all duration-300"
        style={{
          backgroundColor: ambientColor,
          transform: 'scale(1.4)'
        }}
      />

      {/* Layer 2: Radiant Rotating Sunburst Starburst Rays */}
      {showSunburst && showRays && (
        <svg
          className={`absolute inset-0 w-full h-full pointer-events-none overflow-visible ${
            pulsing ? 'animate-spin-slow' : ''
          }`}
          viewBox={`0 0 ${size} ${size}`}
        >
          <defs>
            <radialGradient id={`sunburstGrad-${theme}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={primaryColor} stopOpacity="0.9" />
              <stop offset="60%" stopColor={palette.secondary} stopOpacity="0.4" />
              <stop offset="100%" stopColor={palette.secondary} stopOpacity="0" />
            </radialGradient>
          </defs>
          <g transform={`translate(${halfSize}, ${halfSize})`}>
            {Array.from({ length: rayCount }).map((_, i) => {
              const angle = (i * 360) / rayCount;
              return (
                <polygon
                  key={`ray-${i}`}
                  points={`0,0 -${size * 0.08},-${halfSize * 1.3} ${size * 0.08},-${halfSize * 1.3}`}
                  fill={`url(#sunburstGrad-${theme})`}
                  transform={`rotate(${angle})`}
                  opacity={i % 2 === 0 ? 0.75 : 0.45}
                />
              );
            })}
          </g>
        </svg>
      )}

      {/* Layer 3: Glowing Concentric Halo Rings */}
      {showRings && (
        <div 
          className={`absolute inset-0 rounded-full border-2 border-dashed pointer-events-none ${
            pulsing ? 'animate-ping opacity-40' : ''
          }`}
          style={{
            borderColor: primaryColor,
            boxShadow: `0 0 16px ${glowColor}`
          }}
        />
      )}

      <div 
        className="absolute inset-1 rounded-full border-2 pointer-events-none"
        style={{
          borderColor: primaryColor,
          boxShadow: `0 0 20px ${glowColor}, inset 0 0 12px ${glowColor}`
        }}
      />

      {/* Layer 4: Flanking '<' and '>' Directional Arrow Markers */}
      {showArrows && (
        <>
          {/* Left Arrow Marker '<' pointing right towards target */}
          <div 
            className="absolute top-1/2 flex items-center justify-center pointer-events-none"
            style={{
              left: `-${arrowDistance}px`,
              transform: 'translateY(-50%)'
            }}
          >
            <div className="flex items-center -space-x-1 animate-pulse">
              <svg 
                width="16" 
                height="22" 
                viewBox="0 0 16 22" 
                className="filter drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]"
              >
                <path
                  d="M 12 3 L 4 11 L 12 19"
                  fill="none"
                  stroke={arrowColor}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg 
                width="12" 
                height="16" 
                viewBox="0 0 12 16" 
                className="opacity-75 filter drop-shadow-[0_0_4px_rgba(251,191,36,0.6)]"
              >
                <path
                  d="M 9 3 L 3 8 L 9 13"
                  fill="none"
                  stroke={arrowColor}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Right Arrow Marker '>' pointing left towards target */}
          <div 
            className="absolute top-1/2 flex items-center justify-center pointer-events-none"
            style={{
              right: `-${arrowDistance}px`,
              transform: 'translateY(-50%)'
            }}
          >
            <div className="flex items-center -space-x-1 animate-pulse">
              <svg 
                width="12" 
                height="16" 
                viewBox="0 0 12 16" 
                className="opacity-75 filter drop-shadow-[0_0_4px_rgba(251,191,36,0.6)]"
              >
                <path
                  d="M 3 3 L 9 8 L 3 13"
                  fill="none"
                  stroke={arrowColor}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg 
                width="16" 
                height="22" 
                viewBox="0 0 16 22" 
                className="filter drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]"
              >
                <path
                  d="M 4 3 L 12 11 L 4 19"
                  fill="none"
                  stroke={arrowColor}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </>
      )}

      {/* Target Content: Children (wrapped item) or Standalone targetChar */}
      <div className="relative z-10 pointer-events-auto flex items-center justify-center">
        {children ? (
          children
        ) : targetChar ? (
          <span 
            className="font-mono font-black text-2xl drop-shadow-md"
            style={{ color: primaryColor }}
          >
            {targetChar}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export { THEME_PALETTES as TARGET_AURA_PALETTES };
