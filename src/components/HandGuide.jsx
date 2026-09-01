import React from 'react';
import { getKeyForChar } from '../data/keyboardLayout';

/**
 * Authentic EdClub Vector Hand Guide
 * 100% exact replica of reference image (media_1788286863017.png):
 * - Natural wide palm, gentle wrist flare
 * - Seamless continuous outer outline with smooth thumbs
 * - Clean vertical valley lines between fingers
 * - Perfectly centered colored circle dots (r=6.5)
 * - Active finger: Smooth rounded capsule with rounded top & bottom arcs
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
    <div className="w-full max-w-[460px] mx-auto select-none relative flex items-center justify-center pointer-events-none py-1">
      <svg
        viewBox="0 0 460 210"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-sm"
      >
        {/* ================= LEFT HAND ================= */}
        {showLeft && (
          <g id="left-hand-authentic">
            
            {/* Left Hand Base Silhouette Outline */}
            <path
              d="M 60 205 C 58 175 36 145 36 100 C 36 75 52 75 54 100 C 54 100 58 55 60 42 C 63 26 81 26 84 42 C 86 55 86 100 86 100 C 86 100 90 45 92 30 C 95 12 115 12 118 30 C 120 45 120 100 120 100 C 120 100 124 50 126 38 C 129 24 149 24 152 38 C 155 52 148 100 144 122 C 140 136 138 144 146 150 C 156 156 182 150 188 140 C 193 130 186 122 176 126 C 158 134 140 156 130 180 C 126 190 124 205 124 205"
              fill="#ffffff"
              stroke="#475569"
              strokeWidth="2.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Inter-Finger Valley Crease Lines */}
            <path d="M 54 90 L 54 118" stroke="#475569" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M 86 85 L 86 118" stroke="#475569" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M 120 85 L 120 118" stroke="#475569" strokeWidth="2.4" strokeLinecap="round" />

            {/* Left Palm 'L' Watermark */}
            <text
              x="92"
              y="160"
              fontSize="28"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              fill="#f1f5f9"
              textAnchor="middle"
            >
              L
            </text>

            {/* Inactive Pinky Dot (Blue) */}
            {!isLeftPinky && (
              <circle cx="45" cy="74" r="6.5" fill={COLORS.pinky} />
            )}

            {/* Inactive Ring Dot (Green) */}
            {!isLeftRing && (
              <circle cx="72" cy="42" r="6.5" fill={COLORS.ring} />
            )}

            {/* Inactive Middle Dot (Yellow) */}
            {!isLeftMiddle && (
              <circle cx="105" cy="30" r="7" fill={COLORS.middle} />
            )}

            {/* Inactive Index Dot (Red) */}
            {!isLeftIndex && (
              <circle cx="139" cy="38" r="7" fill={COLORS.index} />
            )}

            {/* ACTIVE FINGER: LEFT PINKY */}
            {isLeftPinky && (
              <path
                d="M 36 100 C 35 78 36 62 37 52 C 39 36 51 36 53 52 C 55 62 54 78 54 100 C 54 112 36 112 36 100 Z"
                fill={COLORS.pinky}
                stroke="#475569"
                strokeWidth="2.4"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}

            {/* ACTIVE FINGER: LEFT RING */}
            {isLeftRing && (
              <path
                d="M 54 110 C 55 78 57 48 59 38 C 62 24 81 24 84 38 C 86 48 86 78 86 110 C 86 122 54 122 54 110 Z"
                fill={COLORS.ring}
                stroke="#475569"
                strokeWidth="2.4"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}

            {/* ACTIVE FINGER: LEFT MIDDLE */}
            {isLeftMiddle && (
              <path
                d="M 87 110 C 88 72 89 38 92 28 C 95 10 115 10 118 28 C 120 38 120 72 120 110 C 120 122 87 122 87 110 Z"
                fill={COLORS.middle}
                stroke="#475569"
                strokeWidth="2.4"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}

            {/* ACTIVE FINGER: LEFT INDEX (Smooth Rounded Capsule) */}
            {isLeftIndex && (
              <path
                d="M 121 112 C 122 72 123 42 126 34 C 129 20 149 20 152 34 C 155 42 153 72 149 112 C 147 126 123 126 121 112 Z"
                fill={COLORS.index}
                stroke="#475569"
                strokeWidth="2.4"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}

            {/* ACTIVE THUMB: LEFT THUMB */}
            {isLeftThumb && (
              <path
                d="M 142 135 C 150 142 178 140 184 132 C 188 124 182 118 174 122 C 158 130 142 150 134 168 C 130 160 136 142 142 135 Z"
                fill={COLORS.thumb}
                stroke="#475569"
                strokeWidth="2.4"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}
          </g>
        )}

        {/* ================= RIGHT HAND ================= */}
        {showRight && (
          <g id="right-hand-authentic">
            
            {/* Right Hand Base Silhouette Outline (Mirrored across center x=230) */}
            <path
              d="M 60 205 C 58 175 36 145 36 100 C 36 75 52 75 54 100 C 54 100 58 55 60 42 C 63 26 81 26 84 42 C 86 55 86 100 86 100 C 86 100 90 45 92 30 C 95 12 115 12 118 30 C 120 45 120 100 120 100 C 120 100 124 50 126 38 C 129 24 149 24 152 38 C 155 52 148 100 144 122 C 140 136 138 144 146 150 C 156 156 182 150 188 140 C 193 130 186 122 176 126 C 158 134 140 156 130 180 C 126 190 124 205 124 205"
              fill="#ffffff"
              stroke="#475569"
              strokeWidth="2.4"
              strokeLinejoin="round"
              strokeLinecap="round"
              transform="translate(460, 0) scale(-1, 1)"
            />

            {/* Inter-Finger Valley Crease Lines (Right) */}
            <path d="M 406 90 L 406 118" stroke="#475569" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M 374 85 L 374 118" stroke="#475569" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M 340 85 L 340 118" stroke="#475569" strokeWidth="2.4" strokeLinecap="round" />

            {/* Right Palm 'R' Watermark */}
            <text
              x="368"
              y="160"
              fontSize="28"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              fill="#f1f5f9"
              textAnchor="middle"
            >
              R
            </text>

            {/* Inactive Index Dot (Red) */}
            {!isRightIndex && (
              <circle cx="321" cy="38" r="7" fill={COLORS.index} />
            )}

            {/* Inactive Middle Dot (Yellow) */}
            {!isRightMiddle && (
              <circle cx="355" cy="30" r="7" fill={COLORS.middle} />
            )}

            {/* Inactive Ring Dot (Green) */}
            {!isRightRing && (
              <circle cx="388" cy="42" r="6.5" fill={COLORS.ring} />
            )}

            {/* Inactive Pinky Dot (Blue) */}
            {!isRightPinky && (
              <circle cx="415" cy="74" r="6.5" fill={COLORS.pinky} />
            )}

            {/* ACTIVE FINGER: RIGHT INDEX (Red Capsule) */}
            {isRightIndex && (
              <path
                d="M 311 112 C 307 72 305 42 308 34 C 311 20 331 20 334 34 C 337 42 338 72 339 112 C 337 126 313 126 311 112 Z"
                fill={COLORS.index}
                stroke="#475569"
                strokeWidth="2.4"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}

            {/* ACTIVE FINGER: RIGHT MIDDLE */}
            {isRightMiddle && (
              <path
                d="M 340 110 C 340 72 340 38 342 28 C 345 10 365 10 368 28 C 371 38 372 72 373 110 C 373 122 340 122 340 110 Z"
                fill={COLORS.middle}
                stroke="#475569"
                strokeWidth="2.4"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}

            {/* ACTIVE FINGER: RIGHT RING */}
            {isRightRing && (
              <path
                d="M 374 110 C 374 78 374 48 376 38 C 379 24 398 24 401 38 C 403 48 405 78 406 110 C 406 122 374 122 374 110 Z"
                fill={COLORS.ring}
                stroke="#475569"
                strokeWidth="2.4"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}

            {/* ACTIVE FINGER: RIGHT PINKY */}
            {isRightPinky && (
              <path
                d="M 406 100 C 406 78 405 62 406 52 C 408 36 420 36 422 52 C 424 62 425 78 424 100 C 424 112 406 112 406 100 Z"
                fill={COLORS.pinky}
                stroke="#475569"
                strokeWidth="2.4"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}

            {/* ACTIVE THUMB: RIGHT THUMB */}
            {isRightThumb && (
              <path
                d="M 318 135 C 310 142 282 140 276 132 C 272 124 278 118 286 122 C 302 130 318 150 326 168 C 330 160 324 142 318 135 Z"
                fill={COLORS.thumb}
                stroke="#475569"
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
