import React from 'react';
import { getKeysForLayout, getKeyForChar, isShiftChar } from '../data/keyboardLayout';
import Key from './Key';

// Home-Row Fingertip Rest Positions in 683.3 x 380 coordinate space
// These sit directly aligned under the ASDF (left) and JKL; (right) home key centers
const HOME_FINGERTIP_REST = {
  'left-pinky':  { x: 120, y: 172, homeKey: 'pos-3-1', label: 'Left Pinky',  color: '#1888ff' },
  'left-ring':   { x: 165, y: 164, homeKey: 'pos-3-2', label: 'Left Ring',   color: '#70c028' },
  'left-middle': { x: 210, y: 158, homeKey: 'pos-3-3', label: 'Left Middle', color: '#fab814' },
  'left-index':  { x: 255, y: 164, homeKey: 'pos-3-4', label: 'Left Index',  color: '#f44336' },
  'thumbs':      { x: 300, y: 228, homeKey: 'space',   label: 'Thumb',       color: '#94a3b8' },
  'right-index': { x: 428, y: 164, homeKey: 'pos-3-7', label: 'Right Index', color: '#f44336' },
  'right-middle':{ x: 473, y: 158, homeKey: 'pos-3-8', label: 'Right Middle',color: '#fab814' },
  'right-ring':  { x: 518, y: 164, homeKey: 'pos-3-9', label: 'Right Ring',  color: '#70c028' },
  'right-pinky': { x: 563, y: 172, homeKey: 'pos-3-10',label: 'Right Pinky', color: '#1888ff' }
};

// Knuckle base anchors on palm
const KNUCKLES = {
  'left-pinky':  { x: 122, y: 275 },
  'left-ring':   { x: 158, y: 268 },
  'left-middle': { x: 198, y: 265 },
  'left-index':  { x: 238, y: 268 },
  'left-thumb':  { x: 252, y: 305 },
  'right-thumb': { x: 431, y: 305 },
  'right-index': { x: 445, y: 268 },
  'right-middle':{ x: 485, y: 265 },
  'right-ring':  { x: 525, y: 268 },
  'right-pinky': { x: 561, y: 275 }
};

/**
 * Generates a clean, smooth, uniform capsule path from knuckle (kx, ky) to tip (tx, ty)
 */
function createFingerPath(kx, ky, tx, ty, width = 18) {
  const hw = width / 2;
  const angle = Math.atan2(ty - ky, tx - kx);
  const perp = angle + Math.PI / 2;
  
  const nx = Math.cos(perp) * hw;
  const ny = Math.sin(perp) * hw;
  
  const bLx = kx + nx;
  const bLy = ky + ny;
  const bRx = kx - nx;
  const bRy = ky - ny;
  
  const tLx = tx + nx;
  const tLy = ty + ny;
  const tRx = tx - nx;
  const tRy = ty - ny;
  
  // Forward vector for rounded tip arc
  const fx = Math.cos(angle) * hw;
  const fy = Math.sin(angle) * hw;
  const tipX = tx + fx;
  const tipY = ty + fy;
  
  return `M ${bLx.toFixed(1)},${bLy.toFixed(1)} L ${tLx.toFixed(1)},${tLy.toFixed(1)} C ${(tLx + fx * 0.8).toFixed(1)},${(tLy + fy * 0.8).toFixed(1)} ${(tipX + nx * 0.5).toFixed(1)},${(tipY + ny * 0.5).toFixed(1)} ${tipX.toFixed(1)},${tipY.toFixed(1)} C ${(tipX - nx * 0.5).toFixed(1)},${(tipY - ny * 0.5).toFixed(1)} ${(tRx + fx * 0.8).toFixed(1)},${(tRy + fy * 0.8).toFixed(1)} ${tRx.toFixed(1)},${tRy.toFixed(1)} L ${bRx.toFixed(1)},${bRy.toFixed(1)} Z`;
}

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

  // Compute active fingertip pose: Rest or Reach
  const getFingertipPose = (fingerId) => {
    const base = HOME_FINGERTIP_REST[fingerId];
    if (!base) return { x: 0, y: 0, isReaching: false, color: '#f44336' };

    // If this finger is the active target finger
    if (fingerId === activeFinger && activeKeyDef) {
      const dx = activeKeyDef.cx - base.x;
      const dy = activeKeyDef.cy - base.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Smooth reach ~28px toward key
      const reachDist = Math.min(32, dist * 0.45);
      const ratio = dist > 0 ? reachDist / dist : 0;
      
      const isPressed = pressedKeyId === activeKeyDef.id;
      const pressOffset = isPressed ? 4 : 0;

      return {
        x: base.x + dx * ratio,
        y: base.y + dy * ratio + pressOffset,
        isReaching: true,
        isPressed,
        color: base.color
      };
    }

    // If this finger is the active shift finger
    if (fingerId === shiftFinger && shiftKeyDef) {
      const dx = shiftKeyDef.cx - base.x;
      const dy = shiftKeyDef.cy - base.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const reachDist = Math.min(26, dist * 0.4);
      const ratio = dist > 0 ? reachDist / dist : 0;
      return {
        x: base.x + dx * ratio,
        y: base.y + dy * ratio,
        isReaching: true,
        isShift: true,
        color: '#8b5cf6'
      };
    }

    // Default: Parked in home-row rest pose
    return {
      x: base.x,
      y: base.y,
      isReaching: false,
      color: base.color
    };
  };

  const lpPose = getFingertipPose('left-pinky');
  const lrPose = getFingertipPose('left-ring');
  const lmPose = getFingertipPose('left-middle');
  const liPose = getFingertipPose('left-index');
  const ltPose = getFingertipPose('thumbs');

  const riPose = getFingertipPose('right-index');
  const rmPose = getFingertipPose('right-middle');
  const rrPose = getFingertipPose('right-ring');
  const rpPose = getFingertipPose('right-pinky');
  const rtPose = { x: 383, y: 228, isReaching: activeFinger === 'thumbs', color: '#94a3b8' };

  // Theme styling rules
  const isJungle = theme === 'jungle';
  const isCyber = theme === 'cyber';

  const boardBg = isCyber ? '#0f172a' : isJungle ? '#1e3a2b' : 'var(--rs-paper, #FDF8EE)';
  const boardBorder = isCyber ? '#334155' : isJungle ? '#2d5a3e' : '#2D2319';
  const keyDefaultFill = isCyber ? '#1e293b' : isJungle ? '#244733' : '#ffffff';
  const keyDefaultStroke = isCyber ? '#475569' : isJungle ? '#386c4e' : '#2D2319';
  const textDefaultFill = isCyber ? '#94a3b8' : isJungle ? '#a7f3d0' : '#2D2319';

  return (
    <div className="w-full flex flex-col items-center justify-center select-none py-1">
      <div 
        className="w-full max-w-[760px] p-3 sm:p-4 rounded-2xl shadow-[4px_4px_0px_#2D2319] border-2 border-[#2D2319] transition-colors duration-200"
        style={{ backgroundColor: boardBg, borderColor: boardBorder }}
      >
        <svg 
          viewBox={isHandsVisible ? "0 0 683.3 380" : "0 0 683.3 254"} 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-sm overflow-visible"
        >
          {/* 1. KEYBOARD KEYS LAYER */}
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

          {/* 2. AUTHENTIC SEPARATE FINGERS HANDS LAYER */}
          {isHandsVisible && (
            <g id="hands-stage">
              
              {/* LEFT HAND */}
              {showLeftHand && (
                <g id="left-hand-group" className="transition-all duration-150">
                  {/* Palm Base */}
                  <path
                    d="M 120,380 C 122,340 130,295 145,275 C 160,265 210,265 230,285 C 242,298 248,340 250,380 Z"
                    fill="#ffffff"
                    stroke="#2D2319"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />

                  {/* Left Pinky */}
                  <path
                    d={createFingerPath(KNUCKLES['left-pinky'].x, KNUCKLES['left-pinky'].y, lpPose.x, lpPose.y, 18)}
                    fill={lpPose.isReaching ? lpPose.color : '#ffffff'}
                    stroke="#2D2319"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                    className="transition-all duration-150"
                  />
                  {!lpPose.isReaching && (
                    <circle cx={lpPose.x} cy={lpPose.y - 2} r="5" fill={HOME_FINGERTIP_REST['left-pinky'].color} />
                  )}

                  {/* Left Ring */}
                  <path
                    d={createFingerPath(KNUCKLES['left-ring'].x, KNUCKLES['left-ring'].y, lrPose.x, lrPose.y, 19)}
                    fill={lrPose.isReaching ? lrPose.color : '#ffffff'}
                    stroke="#2D2319"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                    className="transition-all duration-150"
                  />
                  {!lrPose.isReaching && (
                    <circle cx={lrPose.x} cy={lrPose.y - 2} r="5" fill={HOME_FINGERTIP_REST['left-ring'].color} />
                  )}

                  {/* Left Middle */}
                  <path
                    d={createFingerPath(KNUCKLES['left-middle'].x, KNUCKLES['left-middle'].y, lmPose.x, lmPose.y, 20)}
                    fill={lmPose.isReaching ? lmPose.color : '#ffffff'}
                    stroke="#2D2319"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                    className="transition-all duration-150"
                  />
                  {!lmPose.isReaching && (
                    <circle cx={lmPose.x} cy={lmPose.y - 2} r="5.5" fill={HOME_FINGERTIP_REST['left-middle'].color} />
                  )}

                  {/* Left Index */}
                  <path
                    d={createFingerPath(KNUCKLES['left-index'].x, KNUCKLES['left-index'].y, liPose.x, liPose.y, 20)}
                    fill={liPose.isReaching ? liPose.color : '#ffffff'}
                    stroke="#2D2319"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                    className="transition-all duration-150"
                  />
                  {!liPose.isReaching && (
                    <circle cx={liPose.x} cy={liPose.y - 2} r="5.5" fill={HOME_FINGERTIP_REST['left-index'].color} />
                  )}

                  {/* Left Thumb */}
                  <path
                    d={createFingerPath(KNUCKLES['left-thumb'].x, KNUCKLES['left-thumb'].y, ltPose.x, ltPose.y, 18)}
                    fill={ltPose.isReaching ? ltPose.color : '#ffffff'}
                    stroke="#2D2319"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                    className="transition-all duration-150"
                  />
                </g>
              )}

              {/* RIGHT HAND */}
              {showRightHand && (
                <g id="right-hand-group" className="transition-all duration-150">
                  {/* Palm Base */}
                  <path
                    d="M 433,380 C 435,340 441,298 453,285 C 473,265 523,265 538,275 C 553,295 561,340 563,380 Z"
                    fill="#ffffff"
                    stroke="#2D2319"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />

                  {/* Right Thumb */}
                  <path
                    d={createFingerPath(KNUCKLES['right-thumb'].x, KNUCKLES['right-thumb'].y, rtPose.x, rtPose.y, 18)}
                    fill={rtPose.isReaching ? rtPose.color : '#ffffff'}
                    stroke="#2D2319"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                    className="transition-all duration-150"
                  />

                  {/* Right Index */}
                  <path
                    d={createFingerPath(KNUCKLES['right-index'].x, KNUCKLES['right-index'].y, riPose.x, riPose.y, 20)}
                    fill={riPose.isReaching ? riPose.color : '#ffffff'}
                    stroke="#2D2319"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                    className="transition-all duration-150"
                  />
                  {!riPose.isReaching && (
                    <circle cx={riPose.x} cy={riPose.y - 2} r="5.5" fill={HOME_FINGERTIP_REST['right-index'].color} />
                  )}

                  {/* Right Middle */}
                  <path
                    d={createFingerPath(KNUCKLES['right-middle'].x, KNUCKLES['right-middle'].y, rmPose.x, rmPose.y, 20)}
                    fill={rmPose.isReaching ? rmPose.color : '#ffffff'}
                    stroke="#2D2319"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                    className="transition-all duration-150"
                  />
                  {!rmPose.isReaching && (
                    <circle cx={rmPose.x} cy={rmPose.y - 2} r="5.5" fill={HOME_FINGERTIP_REST['right-middle'].color} />
                  )}

                  {/* Right Ring */}
                  <path
                    d={createFingerPath(KNUCKLES['right-ring'].x, KNUCKLES['right-ring'].y, rrPose.x, rrPose.y, 19)}
                    fill={rrPose.isReaching ? rrPose.color : '#ffffff'}
                    stroke="#2D2319"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                    className="transition-all duration-150"
                  />
                  {!rrPose.isReaching && (
                    <circle cx={rrPose.x} cy={rrPose.y - 2} r="5" fill={HOME_FINGERTIP_REST['right-ring'].color} />
                  )}

                  {/* Right Pinky */}
                  <path
                    d={createFingerPath(KNUCKLES['right-pinky'].x, KNUCKLES['right-pinky'].y, rpPose.x, rpPose.y, 18)}
                    fill={rpPose.isReaching ? (rpPose.isShift ? '#8b5cf6' : rpPose.color) : '#ffffff'}
                    stroke="#2D2319"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                    className="transition-all duration-150"
                  />
                  {!rpPose.isReaching && (
                    <circle cx={rpPose.x} cy={rpPose.y - 2} r="5" fill={HOME_FINGERTIP_REST['right-pinky'].color} />
                  )}
                </g>
              )}

            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
