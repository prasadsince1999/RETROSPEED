import React from 'react';
import { getKeyForChar } from '../data/keyboardLayout';

/**
 * Authentic EdClub Vector Hand Guide
 * 100% exact replica of EdClub reference:
 * - Natural fanned hand silhouette with straight wrist bottom
 * - Smooth outward thumbs with rounded tips (zero loops)
 * - Deep inter-finger valley lines
 * - Large, perfectly centered colored circle dots
 * - Active finger: Solid vibrant rounded capsule covering the active finger
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
    ring: '#70c028',
    middle: '#fab814',
    index: '#f44336',
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
        viewBox="0 0 380 190"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-sm"
      >
        {/* ================= LEFT HAND ================= */}
        {showLeft && (
          <g id="left-hand">
            {/* Left Hand Outer Silhouette */}
            <path
              d="M 38 175 L 38 150 C 38 128 20 108 20 85 C 20 62 21 42 26 34 C 30 24 44 24 48 34 C 51 44 52 70 52 86 M 52 86 C 52 66 53 38 58 26 C 62 16 76 16 80 26 C 83 38 84 66 84 86 M 84 86 C 84 62 85 28 90 18 C 94 8 108 8 112 18 C 115 28 116 62 116 86 M 116 86 C 116 66 117 38 122 26 C 126 16 140 16 144 26 C 147 38 144 75 140 96 C 138 108 142 118 150 122 C 158 126 168 126 174 130 C 180 134 180 144 172 148 C 160 154 136 150 116 152 L 116 175"
              fill="#ffffff"
              stroke="#4b5563"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Valley Cleft Lines dropping into palm */}
            <path d="M 52 86 L 52 104" stroke="#4b5563" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M 84 86 L 84 104" stroke="#4b5563" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M 116 86 L 116 104" stroke="#4b5563" strokeWidth="2.6" strokeLinecap="round" />

            {/* Left Palm 'L' Watermark */}
            <text x="84" y="142" fontSize="30" fontWeight="900" fill="#e5e7eb" textAnchor="middle" fontFamily="system-ui, sans-serif">L</text>

            {/* Inactive Pinky Dot (Blue) */}
            {!isLeftPinky && (
              <circle cx="37" cy="40" r="7.5" fill={COLORS.pinky} />
            )}

            {/* Inactive Ring Dot (Green) */}
            {!isLeftRing && (
              <circle cx="69" cy="31" r="8" fill={COLORS.ring} />
            )}

            {/* Inactive Middle Dot (Yellow) */}
            {!isLeftMiddle && (
              <circle cx="101" cy="22" r="8.5" fill={COLORS.middle} />
            )}

            {/* Inactive Index Dot (Red) */}
            {!isLeftIndex && (
              <circle cx="133" cy="31" r="8" fill={COLORS.index} />
            )}

            {/* ACTIVE FINGER: LEFT PINKY */}
            {isLeftPinky && (
              <path
                d="M 20 86 C 20 62 21 42 26 34 C 30 24 44 24 48 34 C 51 44 52 70 52 86 C 52 98 20 98 20 86 Z"
                fill={COLORS.pinky}
                stroke="#4b5563"
                strokeWidth="2.6"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}

            {/* ACTIVE FINGER: LEFT RING */}
            {isLeftRing && (
              <path
                d="M 52 88 C 52 66 53 38 58 26 C 62 16 76 16 80 26 C 83 38 84 66 84 88 C 84 100 52 100 52 88 Z"
                fill={COLORS.ring}
                stroke="#4b5563"
                strokeWidth="2.6"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}

            {/* ACTIVE FINGER: LEFT MIDDLE */}
            {isLeftMiddle && (
              <path
                d="M 84 88 C 84 62 85 28 90 18 C 94 8 108 8 112 18 C 115 28 116 62 116 88 C 116 100 84 100 84 88 Z"
                fill={COLORS.middle}
                stroke="#4b5563"
                strokeWidth="2.6"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}

            {/* ACTIVE FINGER: LEFT INDEX (Solid Coral-Red Capsule) */}
            {isLeftIndex && (
              <path
                d="M 116 92 C 116 68 117 35 122 24 C 126 14 140 14 144 24 C 148 35 147 70 142 94 C 138 106 118 106 116 92 Z"
                fill={COLORS.index}
                stroke="#4b5563"
                strokeWidth="2.6"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}

            {/* ACTIVE THUMB: LEFT THUMB */}
            {isLeftThumb && (
              <path
                d="M 140 96 C 138 108 142 118 150 122 C 158 126 168 126 174 130 C 180 134 180 144 172 148 C 160 154 136 150 116 152 C 116 140 132 115 140 96 Z"
                fill={COLORS.thumb}
                stroke="#4b5563"
                strokeWidth="2.6"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}
          </g>
        )}

        {/* ================= RIGHT HAND ================= */}
        {showRight && (
          <g id="right-hand" transform="translate(380, 0) scale(-1, 1)">
            {/* Right Hand Outer Silhouette */}
            <path
              d="M 38 175 L 38 150 C 38 128 20 108 20 85 C 20 62 21 42 26 34 C 30 24 44 24 48 34 C 51 44 52 70 52 86 M 52 86 C 52 66 53 38 58 26 C 62 16 76 16 80 26 C 83 38 84 66 84 86 M 84 86 C 84 62 85 28 90 18 C 94 8 108 8 112 18 C 115 28 116 62 116 86 M 116 86 C 116 66 117 38 122 26 C 126 16 140 16 144 26 C 147 38 144 75 140 96 C 138 108 142 118 150 122 C 158 126 168 126 174 130 C 180 134 180 144 172 148 C 160 154 136 150 116 152 L 116 175"
              fill="#ffffff"
              stroke="#4b5563"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Valley Cleft Lines dropping into palm */}
            <path d="M 52 86 L 52 104" stroke="#4b5563" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M 84 86 L 84 104" stroke="#4b5563" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M 116 86 L 116 104" stroke="#4b5563" strokeWidth="2.6" strokeLinecap="round" />

            {/* Right Palm 'R' Watermark */}
            <text x="84" y="142" fontSize="30" fontWeight="900" fill="#e5e7eb" textAnchor="middle" fontFamily="system-ui, sans-serif" transform="scale(-1, 1) translate(-168, 0)">R</text>

            {/* Inactive Pinky Dot (Blue) */}
            {!isRightPinky && (
              <circle cx="37" cy="40" r="7.5" fill={COLORS.pinky} />
            )}

            {/* Inactive Ring Dot (Green) */}
            {!isRightRing && (
              <circle cx="69" cy="31" r="8" fill={COLORS.ring} />
            )}

            {/* Inactive Middle Dot (Yellow) */}
            {!isRightMiddle && (
              <circle cx="101" cy="22" r="8.5" fill={COLORS.middle} />
            )}

            {/* Inactive Index Dot (Red) */}
            {!isRightIndex && (
              <circle cx="133" cy="31" r="8" fill={COLORS.index} />
            )}

            {/* ACTIVE FINGER: RIGHT INDEX (Red Solid Capsule) */}
            {isRightIndex && (
              <path
                d="M 116 92 C 116 68 117 35 122 24 C 126 14 140 14 144 24 C 148 35 147 70 142 94 C 138 106 118 106 116 92 Z"
                fill={COLORS.index}
                stroke="#4b5563"
                strokeWidth="2.6"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}

            {/* ACTIVE FINGER: RIGHT MIDDLE */}
            {isRightMiddle && (
              <path
                d="M 84 88 C 84 62 85 28 90 18 C 94 8 108 8 112 18 C 115 28 116 62 116 88 C 116 100 84 100 84 88 Z"
                fill={COLORS.middle}
                stroke="#4b5563"
                strokeWidth="2.6"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}

            {/* ACTIVE FINGER: RIGHT RING */}
            {isRightRing && (
              <path
                d="M 52 88 C 52 66 53 38 58 26 C 62 16 76 16 80 26 C 83 38 84 66 84 88 C 84 100 52 100 52 88 Z"
                fill={COLORS.ring}
                stroke="#4b5563"
                strokeWidth="2.6"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}

            {/* ACTIVE FINGER: RIGHT PINKY */}
            {isRightPinky && (
              <path
                d="M 20 86 C 20 62 21 42 26 34 C 30 24 44 24 48 34 C 51 44 52 70 52 86 C 52 98 20 98 20 86 Z"
                fill={COLORS.pinky}
                stroke="#4b5563"
                strokeWidth="2.6"
                strokeLinejoin="round"
                className="transition-all duration-150 animate-in fade-in"
              />
            )}

            {/* ACTIVE THUMB: RIGHT THUMB */}
            {isRightThumb && (
              <path
                d="M 140 98 C 137 110 138 118 145 124 C 154 130 174 125 178 116 C 182 106 172 98 160 104 C 144 112 126 132 116 150 C 116 140 132 115 140 98 Z"
                fill={COLORS.thumb}
                stroke="#4b5563"
                strokeWidth="2.6"
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
