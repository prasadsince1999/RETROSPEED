import React from 'react';
import { getKeyForChar, isShiftChar, FINGER_ZONES } from '../data/keyboardLayout';

export default function HandGuide({ activeChar, layout = 'qwerty' }) {
  const activeKeyDef = getKeyForChar(activeChar, layout);
  const isShiftRequired = isShiftChar(activeChar, layout);
  const activeFinger = activeKeyDef ? activeKeyDef.finger : null;
  const activeHand = activeKeyDef ? activeKeyDef.hand : null;

  const shiftFinger = isShiftRequired && activeHand
    ? (activeHand === 'left' ? 'right-pinky' : 'left-pinky')
    : null;
  const shiftHand = isShiftRequired && activeHand
    ? (activeHand === 'left' ? 'right' : 'left')
    : null;

  // Finger tips anchor coordinates on the visual hands
  const FINGER_COORDINATES = {
    'left-pinky': { x: 92, y: 70 },
    'left-ring': { x: 125, y: 50 },
    'left-middle': { x: 162, y: 40 },
    'left-index': { x: 200, y: 52 },
    'thumbs': { x: 245, y: 110 },
    'right-index': { x: 300, y: 52 },
    'right-middle': { x: 338, y: 40 },
    'right-ring': { x: 375, y: 50 },
    'right-pinky': { x: 408, y: 70 }
  };

  const fingerZone = activeFinger ? FINGER_ZONES[activeFinger] : null;

  return (
    <div className="w-full max-w-[500px] mx-auto select-none relative -mt-6 pointer-events-none">
      <svg 
        viewBox="0 0 500 200" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-sm opacity-90"
      >
        {/* Left Hand Vector Outline */}
        <g id="left-hand" className="transition-all duration-200">
          <path
            d="M50,195 C55,160 65,110 75,95 C82,85 86,75 92,70 C96,66 103,72 101,84 C98,96 95,115 95,115 C95,115 115,62 125,50 C129,45 136,50 134,60 C131,75 125,105 125,105 C125,105 152,48 162,40 C167,35 174,40 171,52 C166,70 158,102 158,102 C158,102 188,60 200,52 C206,47 213,54 208,66 C198,90 185,120 185,120 C185,120 228,100 245,110 C253,115 248,128 238,135 C215,150 190,170 180,195 Z"
            fill="#f8fafc"
            stroke="#94a3b8"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* Left Hand Primary Active Finger Highlight */}
          {activeHand === 'left' && activeFinger && FINGER_COORDINATES[activeFinger] && (
            <g>
              <circle
                cx={FINGER_COORDINATES[activeFinger].x}
                cy={FINGER_COORDINATES[activeFinger].y}
                r="10"
                fill="#1888ff"
                opacity="0.3"
                className="animate-ping"
              />
              <circle
                cx={FINGER_COORDINATES[activeFinger].x}
                cy={FINGER_COORDINATES[activeFinger].y}
                r="6"
                fill="#1888ff"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <line
                x1={FINGER_COORDINATES[activeFinger].x}
                y1={FINGER_COORDINATES[activeFinger].y}
                x2={FINGER_COORDINATES[activeFinger].x}
                y2={FINGER_COORDINATES[activeFinger].y - 28}
                stroke="#1888ff"
                strokeWidth="2.5"
                strokeDasharray="4 2"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Left Hand Shift Finger Highlight (when right hand has target key) */}
          {shiftHand === 'left' && shiftFinger && FINGER_COORDINATES[shiftFinger] && (
            <g>
              <circle
                cx={FINGER_COORDINATES[shiftFinger].x}
                cy={FINGER_COORDINATES[shiftFinger].y}
                r="8"
                fill="#6366f1"
                opacity="0.3"
                className="animate-ping"
              />
              <circle
                cx={FINGER_COORDINATES[shiftFinger].x}
                cy={FINGER_COORDINATES[shiftFinger].y}
                r="5.5"
                fill="#6366f1"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <line
                x1={FINGER_COORDINATES[shiftFinger].x}
                y1={FINGER_COORDINATES[shiftFinger].y}
                x2={FINGER_COORDINATES[shiftFinger].x}
                y2={FINGER_COORDINATES[shiftFinger].y - 22}
                stroke="#6366f1"
                strokeWidth="2"
                strokeDasharray="3 2"
                strokeLinecap="round"
              />
            </g>
          )}
        </g>

        {/* Right Hand Vector Outline */}
        <g id="right-hand" className="transition-all duration-200">
          <path
            d="M450,195 C445,160 435,110 425,95 C418,85 414,75 408,70 C404,66 397,72 399,84 C402,96 405,115 405,115 C405,115 385,62 375,50 C371,45 364,50 366,60 C369,75 375,105 375,105 C375,105 348,48 338,40 C333,35 326,40 329,52 C334,70 342,102 342,102 C342,102 312,60 300,52 C294,47 287,54 292,66 C302,90 315,120 315,120 C315,120 272,100 255,110 C247,115 252,128 262,135 C285,150 310,170 320,195 Z"
            fill="#f8fafc"
            stroke="#94a3b8"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* Right Hand Primary Active Finger Highlight */}
          {(activeHand === 'right' || (activeHand === 'both' && activeFinger === 'thumbs')) && activeFinger && FINGER_COORDINATES[activeFinger] && (
            <g>
              <circle
                cx={FINGER_COORDINATES[activeFinger].x}
                cy={FINGER_COORDINATES[activeFinger].y}
                r="10"
                fill="#1888ff"
                opacity="0.3"
                className="animate-ping"
              />
              <circle
                cx={FINGER_COORDINATES[activeFinger].x}
                cy={FINGER_COORDINATES[activeFinger].y}
                r="6"
                fill="#1888ff"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <line
                x1={FINGER_COORDINATES[activeFinger].x}
                y1={FINGER_COORDINATES[activeFinger].y}
                x2={FINGER_COORDINATES[activeFinger].x}
                y2={FINGER_COORDINATES[activeFinger].y - 28}
                stroke="#1888ff"
                strokeWidth="2.5"
                strokeDasharray="4 2"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Right Hand Shift Finger Highlight (when left hand has target key) */}
          {shiftHand === 'right' && shiftFinger && FINGER_COORDINATES[shiftFinger] && (
            <g>
              <circle
                cx={FINGER_COORDINATES[shiftFinger].x}
                cy={FINGER_COORDINATES[shiftFinger].y}
                r="8"
                fill="#6366f1"
                opacity="0.3"
                className="animate-ping"
              />
              <circle
                cx={FINGER_COORDINATES[shiftFinger].x}
                cy={FINGER_COORDINATES[shiftFinger].y}
                r="5.5"
                fill="#6366f1"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <line
                x1={FINGER_COORDINATES[shiftFinger].x}
                y1={FINGER_COORDINATES[shiftFinger].y}
                x2={FINGER_COORDINATES[shiftFinger].x}
                y2={FINGER_COORDINATES[shiftFinger].y - 22}
                stroke="#6366f1"
                strokeWidth="2"
                strokeDasharray="3 2"
                strokeLinecap="round"
              />
            </g>
          )}
        </g>
      </svg>
      
      {/* Friendly Finger Placement Helper Caption */}
      {fingerZone && (
        <div className="text-center text-xs font-semibold text-slate-500 mt-1">
          Finger:{' '}
          <span className="text-sky-600 font-bold">{fingerZone.label}</span>
          {isShiftRequired && (
            <span className="text-indigo-600 font-bold ml-1.5">
              + {shiftHand === 'left' ? 'Left' : 'Right'} Shift
            </span>
          )}
        </div>
      )}
    </div>
  );
}
