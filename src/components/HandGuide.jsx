import React from 'react';
import { getKeyForChar } from '../data/keyboardLayout';

/**
 * Authentic EdClub Vector Hand Guide
 * Seamless organic hand contours matching user reference:
 * - Single continuous outer hand silhouette (no knuckle line)
 * - Colored fingertip circles in rest state
 * - Active finger filled in solid vibrant color with increased size & prominence
 */
export default function HandGuide({
  activeChar,
  layout = 'qwerty',
  handFilter = 'both',
  liveWpm = null,
  liveAccuracy = null
}) {
  const activeKeyDef = getKeyForChar(activeChar, layout);

  let activeHand = activeKeyDef ? activeKeyDef.hand : null;
  let activeFinger = activeKeyDef ? activeKeyDef.finger : null;

  // Space bar activation -> Thumbs
  if (activeChar === ' ' || activeKeyDef?.id === 'space') {
    activeHand = 'both';
    activeFinger = 'thumbs';
  }

  const showLeft = handFilter === 'both' || handFilter === 'left';
  const showRight = handFilter === 'both' || handFilter === 'right';

  const COLORS = {
    pinky: '#1888ff',
    ring: '#22c55e',
    middle: '#f59e0b',
    index: '#ef4444',
    thumb: '#94a3b8'
  };

  const isLeftPinky = (activeHand === 'left' || activeHand === 'both') && activeFinger === 'left-pinky';
  const isLeftRing = (activeHand === 'left' || activeHand === 'both') && activeFinger === 'left-ring';
  const isLeftMiddle = (activeHand === 'left' || activeHand === 'both') && activeFinger === 'left-middle';
  const isLeftIndex = (activeHand === 'left' || activeHand === 'both') && activeFinger === 'left-index';
  const isLeftThumb = (activeHand === 'left' || activeHand === 'both') && activeFinger === 'thumbs';

  const isRightIndex = (activeHand === 'right' || activeHand === 'both') && activeFinger === 'right-index';
  const isRightMiddle = (activeHand === 'right' || activeHand === 'both') && activeFinger === 'right-middle';
  const isRightRing = (activeHand === 'right' || activeHand === 'both') && activeFinger === 'right-ring';
  const isRightPinky = (activeHand === 'right' || activeHand === 'both') && activeFinger === 'right-pinky';
  const isRightThumb = (activeHand === 'right' || activeHand === 'both') && activeFinger === 'thumbs';

  return (
    <div className="w-full max-w-[440px] mx-auto select-none relative flex items-center justify-center pointer-events-none py-1">
      <svg
        viewBox="0 0 420 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-sm"
      >
        {/* ================= LEFT HAND ================= */}
        {showLeft && (
          <g id="left-hand">
            {/* Seamless Left Hand Outer Continuous Silhouette */}
            <path
              d="M 50 195 C 48 160 40 120 40 75 C 40 60 52 60 52 75 C 52 85 52 90 52 90 C 52 90 52 55 54 48 C 56 36 68 36 68 48 C 68 60 68 85 68 85 C 68 85 68 42 70 34 C 72 20 84 20 84 34 C 84 50 84 85 84 85 C 84 85 84 50 86 42 C 88 30 100 30 100 42 C 100 65 100 115 102 125 C 106 128 116 126 124 130 C 132 134 132 144 122 152 C 114 158 104 168 98 180 C 94 188 90 195 90 195"
              fill="#ffffff"
              stroke="#334155"
              strokeWidth="2.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Left Palm 'L' Label */}
            <text
              x="72"
              y="155"
              fontSize="24"
              fontWeight="900"
              fontFamily="sans-serif"
              fill="#f1f5f9"
              textAnchor="middle"
            >
              L
            </text>

            {/* Inactive Dot: Pinky (Blue) */}
            {!isLeftPinky && (
              <circle cx="46" cy="68" r="5" fill={COLORS.pinky} />
            )}

            {/* Inactive Dot: Ring (Green) */}
            {!isLeftRing && (
              <circle cx="61" cy="46" r="5" fill={COLORS.ring} />
            )}

            {/* Inactive Dot: Middle (Yellow) */}
            {!isLeftMiddle && (
              <circle cx="77" cy="34" r="5.5" fill={COLORS.middle} />
            )}

            {/* Inactive Dot: Index (Red) */}
            {!isLeftIndex && (
              <circle cx="93" cy="42" r="5.5" fill={COLORS.index} />
            )}

            {/* ACTIVE FINGER OVERLAYS (Filled in Solid Color with Increased Size) */}
            {isLeftPinky && (
              <path
                d="M 40 100 C 39 80 39 65 40 58 C 42 46 54 46 54 58 C 54 65 54 80 54 100 Z"
                fill={COLORS.pinky}
                stroke="#334155"
                strokeWidth="2.4"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}

            {isLeftRing && (
              <path
                d="M 53 100 C 53 75 53 45 54 38 C 56 26 68 26 68 38 C 68 45 68 75 68 100 Z"
                fill={COLORS.ring}
                stroke="#334155"
                strokeWidth="2.4"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}

            {isLeftMiddle && (
              <path
                d="M 68 100 C 68 70 68 35 70 26 C 72 14 84 14 84 26 C 84 35 84 70 84 100 Z"
                fill={COLORS.middle}
                stroke="#334155"
                strokeWidth="2.4"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}

            {isLeftIndex && (
              <path
                d="M 84 105 C 84 75 84 45 86 34 C 88 22 101 22 101 34 C 101 45 101 75 101 105 Z"
                fill={COLORS.index}
                stroke="#334155"
                strokeWidth="2.4"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}

            {isLeftThumb && (
              <path
                d="M 102 125 C 106 128 116 126 124 130 C 132 134 132 144 122 152 C 114 158 104 168 98 180 Z"
                fill={COLORS.thumb}
                stroke="#334155"
                strokeWidth="2.4"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}
          </g>
        )}

        {/* ================= RIGHT HAND ================= */}
        {showRight && (
          <g id="right-hand">
            {/* Seamless Right Hand Outer Continuous Silhouette */}
            <path
              d="M 230 195 C 228 160 220 120 220 75 C 220 60 232 60 232 75 C 232 85 232 90 232 90 C 232 90 232 55 234 48 C 236 36 248 36 248 48 C 248 60 248 85 248 85 C 248 85 248 42 250 34 C 252 20 264 20 264 34 C 264 50 264 85 264 85 C 264 85 264 50 266 42 C 268 30 280 30 280 42 C 280 65 280 115 282 125 C 286 128 296 126 304 130 C 312 134 312 144 302 152 C 294 158 284 168 278 180 C 274 188 270 195 270 195"
              fill="#ffffff"
              stroke="#334155"
              strokeWidth="2.4"
              strokeLinejoin="round"
              strokeLinecap="round"
              transform="translate(480, 0) scale(-1, 1)"
            />

            {/* Right Palm 'R' Label */}
            <text
              x="232"
              y="155"
              fontSize="24"
              fontWeight="900"
              fontFamily="sans-serif"
              fill="#f1f5f9"
              textAnchor="middle"
            >
              R
            </text>

            {/* Inactive Dot: Index (Red) */}
            {!isRightIndex && (
              <circle cx="211" cy="42" r="5.5" fill={COLORS.index} />
            )}

            {/* Inactive Dot: Middle (Yellow) */}
            {!isRightMiddle && (
              <circle cx="227" cy="34" r="5.5" fill={COLORS.middle} />
            )}

            {/* Inactive Dot: Ring (Green) */}
            {!isRightRing && (
              <circle cx="243" cy="46" r="5" fill={COLORS.ring} />
            )}

            {/* Inactive Dot: Pinky (Blue) */}
            {!isRightPinky && (
              <circle cx="258" cy="68" r="5" fill={COLORS.pinky} />
            )}

            {/* ACTIVE FINGER OVERLAYS (Right Hand) */}
            {isRightIndex && (
              <path
                d="M 203 105 C 203 75 203 45 205 34 C 207 22 220 22 220 34 C 220 45 220 75 220 105 Z"
                fill={COLORS.index}
                stroke="#334155"
                strokeWidth="2.4"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}

            {isRightMiddle && (
              <path
                d="M 220 100 C 220 70 220 35 222 26 C 224 14 236 14 236 26 C 236 35 236 70 236 100 Z"
                fill={COLORS.middle}
                stroke="#334155"
                strokeWidth="2.4"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}

            {isRightRing && (
              <path
                d="M 236 100 C 236 75 236 45 237 38 C 239 26 251 26 251 38 C 251 45 251 75 251 100 Z"
                fill={COLORS.ring}
                stroke="#334155"
                strokeWidth="2.4"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}

            {isRightPinky && (
              <path
                d="M 251 100 C 250 80 250 65 251 58 C 253 46 265 46 265 58 C 265 65 265 80 265 100 Z"
                fill={COLORS.pinky}
                stroke="#334155"
                strokeWidth="2.4"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}

            {isRightThumb && (
              <path
                d="M 198 125 C 194 128 184 126 176 130 C 168 134 168 144 178 152 C 186 158 196 168 202 180 Z"
                fill={COLORS.thumb}
                stroke="#334155"
                strokeWidth="2.4"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}
          </g>
        )}
      </svg>

      {/* Floating Speed & Accuracy Stats */}
      {(liveWpm !== null || liveAccuracy !== null) && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-end space-y-1 text-slate-700 font-sans text-xs">
          {liveWpm !== null && (
            <div className="flex flex-col items-end">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Speed</span>
              <span className="text-sm font-bold text-slate-700 leading-tight">
                {liveWpm} <span className="text-[10px] text-slate-400 font-normal">WPM</span>
              </span>
            </div>
          )}
          {liveAccuracy !== null && (
            <div className="flex flex-col items-end mt-1">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Accuracy</span>
              <span className="text-sm font-bold text-slate-700 leading-tight">
                {liveAccuracy}%
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
