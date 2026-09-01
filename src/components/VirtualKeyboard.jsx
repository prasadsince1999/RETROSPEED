import React from 'react';
import { getKeysForLayout, getKeyForChar, isShiftChar, FINGER_ZONES } from '../data/keyboardLayout';
import Key from './Key';

// Unified Home-Row Fingertip Anchor Coordinates in 683.3 x 390 viewBox
const FINGERTIP_ANCHORS = {
  'left-pinky': { x: 115, y: 260, homeKey: 'key-a' },
  'left-ring': { x: 160, y: 254, homeKey: 'key-s' },
  'left-middle': { x: 205, y: 250, homeKey: 'key-d' },
  'left-index': { x: 250, y: 254, homeKey: 'key-f' },
  'thumbs': { x: 310, y: 285, homeKey: 'space' },
  'right-index': { x: 385, y: 254, homeKey: 'key-j' },
  'right-middle': { x: 430, y: 250, homeKey: 'key-k' },
  'right-ring': { x: 475, y: 254, homeKey: 'key-l' },
  'right-pinky': { x: 520, y: 260, homeKey: 'semicolon' }
};

export default function VirtualKeyboard({ 
  activeChar, 
  pressedKeyId, 
  errorKeyId,
  layout = 'qwerty',
  theme = 'bone',
  showHands = true,
  handFilter = 'both' // 'both' | 'left' | 'right' | 'off'
}) {
  const keys = getKeysForLayout(layout);
  const activeKeyDef = getKeyForChar(activeChar, layout);
  const isShiftRequired = isShiftChar(activeChar, layout);
  const requiredShiftId = isShiftRequired && activeKeyDef
    ? (activeKeyDef.hand === 'left' ? 'shift-right' : 'shift-left')
    : null;

  const shiftKeyDef = requiredShiftId ? keys.find(k => k.id === requiredShiftId) : null;

  const activeFinger = activeKeyDef ? activeKeyDef.finger : null;
  const activeHand = activeKeyDef ? activeKeyDef.hand : null;

  const shiftFinger = isShiftRequired && activeHand
    ? (activeHand === 'left' ? 'right-pinky' : 'left-pinky')
    : null;
  const shiftHand = isShiftRequired && activeHand
    ? (activeHand === 'left' ? 'right' : 'left')
    : null;

  const isHandsVisible = showHands && handFilter !== 'off';
  const showLeftHand = isHandsVisible && (handFilter === 'both' || handFilter === 'left');
  const showRightHand = isHandsVisible && (handFilter === 'both' || handFilter === 'right');

  // Theme styling rules
  const isJungle = theme === 'jungle';
  const isCyber = theme === 'cyber';

  const boardBg = isCyber ? '#0f172a' : isJungle ? '#1e3a2b' : 'var(--rs-paper, #FDF8EE)';
  const boardBorder = isCyber ? '#334155' : isJungle ? '#2d5a3e' : '#2D2319';
  const keyDefaultFill = isCyber ? '#1e293b' : isJungle ? '#244733' : '#ffffff';
  const keyDefaultStroke = isCyber ? '#475569' : isJungle ? '#386c4e' : '#2D2319';
  const textDefaultFill = isCyber ? '#94a3b8' : isJungle ? '#a7f3d0' : '#2D2319';

  // Active finger anchor & target
  const anchor = activeFinger && FINGERTIP_ANCHORS[activeFinger] ? FINGERTIP_ANCHORS[activeFinger] : null;
  const shiftAnchor = shiftFinger && FINGERTIP_ANCHORS[shiftFinger] ? FINGERTIP_ANCHORS[shiftFinger] : null;

  return (
    <div className="w-full flex flex-col items-center justify-center select-none py-1">
      <div 
        className="w-full max-w-[760px] p-3 sm:p-4 rounded-2xl shadow-[4px_4px_0px_#2D2319] border-2 border-[#2D2319] transition-colors duration-200"
        style={{ backgroundColor: boardBg, borderColor: boardBorder }}
      >
        <svg 
          viewBox={isHandsVisible ? "0 0 683.3 385" : "0 0 683.3 254"} 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-sm overflow-visible"
        >
          {/* Key Outlines Layer */}
          <g id="keys">
            {keys.map(key => (
              <Key
                key={key.id}
                keyDef={key}
                isActive={activeKeyDef && activeKeyDef.id === key.id}
                isShiftGuide={requiredShiftId === key.id}
                isPressed={pressedKeyId === key.id}
                isError={errorKeyId === key.id}
                isShiftRequired={isShiftRequired}
                fill={keyDefaultFill}
                stroke={keyDefaultStroke}
                textFill={textDefaultFill}
              />
            ))}
          </g>

          {/* Unified Tactile Hands Layer */}
          {isHandsVisible && (
            <g id="hands-layer">
              {/* Dynamic Bezier Guide Lines from Fingertip to Target Keycap */}
              {activeKeyDef && anchor && ((activeHand === 'left' && showLeftHand) || (activeHand === 'right' && showRightHand) || (activeFinger === 'thumbs' && (showLeftHand || showRightHand))) && (
                <g id="active-finger-guide">
                  <path
                    d={`M ${anchor.x},${anchor.y} Q ${(anchor.x + activeKeyDef.cx) / 2},${(anchor.y + activeKeyDef.cy) / 2 + 15} ${activeKeyDef.cx},${activeKeyDef.cy + 12}`}
                    fill="none"
                    stroke="#1888ff"
                    strokeWidth="3"
                    strokeDasharray="5 3"
                    strokeLinecap="round"
                    className="animate-pulse"
                    style={{ filter: 'drop-shadow(0 0 6px rgba(24, 136, 255, 0.7))' }}
                  />
                  {/* Glowing fingertip beacon */}
                  <circle
                    cx={anchor.x}
                    cy={anchor.y}
                    r="8"
                    fill="#1888ff"
                    opacity="0.3"
                    className="animate-ping"
                  />
                  <circle
                    cx={anchor.x}
                    cy={anchor.y}
                    r="5.5"
                    fill="#1888ff"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </g>
              )}

              {/* Shift Guide Bezier Line (Opposite Pinky to Shift Key) */}
              {shiftKeyDef && shiftAnchor && ((shiftHand === 'left' && showLeftHand) || (shiftHand === 'right' && showRightHand)) && (
                <g id="shift-finger-guide">
                  <path
                    d={`M ${shiftAnchor.x},${shiftAnchor.y} Q ${(shiftAnchor.x + shiftKeyDef.cx) / 2},${(shiftAnchor.y + shiftKeyDef.cy) / 2 + 10} ${shiftKeyDef.cx},${shiftKeyDef.cy + 10}`}
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                    strokeLinecap="round"
                    className="animate-pulse"
                    style={{ filter: 'drop-shadow(0 0 5px rgba(139, 92, 246, 0.7))' }}
                  />
                  <circle
                    cx={shiftAnchor.x}
                    cy={shiftAnchor.y}
                    r="7"
                    fill="#8b5cf6"
                    opacity="0.3"
                    className="animate-ping"
                  />
                  <circle
                    cx={shiftAnchor.x}
                    cy={shiftAnchor.y}
                    r="5"
                    fill="#8b5cf6"
                    stroke="#ffffff"
                    strokeWidth="1.8"
                  />
                </g>
              )}

              {/* Left Hand Silhouette & Fingers */}
              {showLeftHand && (
                <g id="left-hand-vector" className="transition-all duration-200">
                  <path
                    d="M 60,380 C 65,340 78,290 92,275 C 99,268 107,262 115,260 C 122,258 126,266 128,276 C 132,256 148,252 160,254 C 168,256 172,266 174,276 C 178,250 195,248 205,250 C 213,252 218,262 219,274 C 224,252 240,252 250,254 C 258,256 262,266 260,282 C 275,274 295,275 310,285 C 318,290 312,302 300,310 C 280,325 240,350 220,380 Z"
                    fill="var(--rs-paper-alt, #FDF8EE)"
                    stroke="#2D2319"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    style={{ filter: 'drop-shadow(2px 2px 0px rgba(45, 35, 25, 0.15))' }}
                  />
                  {/* Home row finger rest resting indicators */}
                  <circle cx="115" cy="260" r="3" fill="#2D2319" opacity="0.3" />
                  <circle cx="160" cy="254" r="3" fill="#2D2319" opacity="0.3" />
                  <circle cx="205" cy="250" r="3" fill="#2D2319" opacity="0.3" />
                  <circle cx="250" cy="254" r="3" fill="#2D2319" opacity="0.3" />
                </g>
              )}

              {/* Right Hand Silhouette & Fingers */}
              {showRightHand && (
                <g id="right-hand-vector" className="transition-all duration-200">
                  <path
                    d="M 623,380 C 618,340 605,290 591,275 C 584,268 576,262 520,260 C 513,258 509,266 507,276 C 503,256 487,252 475,254 C 467,256 463,266 461,276 C 457,250 440,248 430,250 C 422,252 417,262 416,274 C 411,252 395,252 385,254 C 377,256 373,266 375,282 C 360,274 340,275 325,285 C 317,290 323,302 335,310 C 355,325 395,350 415,380 Z"
                    fill="var(--rs-paper-alt, #FDF8EE)"
                    stroke="#2D2319"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    style={{ filter: 'drop-shadow(2px 2px 0px rgba(45, 35, 25, 0.15))' }}
                  />
                  {/* Home row finger rest resting indicators */}
                  <circle cx="385" cy="254" r="3" fill="#2D2319" opacity="0.3" />
                  <circle cx="430" cy="250" r="3" fill="#2D2319" opacity="0.3" />
                  <circle cx="475" cy="254" r="3" fill="#2D2319" opacity="0.3" />
                  <circle cx="520" cy="260" r="3" fill="#2D2319" opacity="0.3" />
                </g>
              )}
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

