import React from 'react';
import { getKeysForLayout, getKeyForChar, isShiftChar } from '../data/keyboardLayout';
import Key from './Key';

// Home-Row Fingertip Rest Positions in 683.3 x 380 coordinate space
// These sit directly aligned under the ASDF (left) and JKL; (right) home key centers
const HOME_FINGERTIP_REST = {
  'left-pinky':  { x: 116, y: 172, homeKey: 'pos-3-1', label: 'Left Pinky' },
  'left-ring':   { x: 161, y: 164, homeKey: 'pos-3-2', label: 'Left Ring' },
  'left-middle': { x: 206, y: 158, homeKey: 'pos-3-3', label: 'Left Middle' },
  'left-index':  { x: 251, y: 164, homeKey: 'pos-3-4', label: 'Left Index' },
  'thumbs':      { x: 295, y: 228, homeKey: 'space',   label: 'Thumb' },
  'right-index': { x: 386, y: 164, homeKey: 'pos-3-7', label: 'Right Index' },
  'right-middle':{ x: 431, y: 158, homeKey: 'pos-3-8', label: 'Right Middle' },
  'right-ring':  { x: 476, y: 164, homeKey: 'pos-3-9', label: 'Right Ring' },
  'right-pinky': { x: 521, y: 172, homeKey: 'pos-3-10',label: 'Right Pinky' }
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

  // Compute active fingertip pose: Rest or Reach
  const getFingertipPose = (fingerId) => {
    const base = HOME_FINGERTIP_REST[fingerId];
    if (!base) return { x: 0, y: 0, isReaching: false };

    // If this finger is the active target finger
    if (fingerId === activeFinger && activeKeyDef) {
      // Calculate delta from home rest position toward target key center
      const dx = activeKeyDef.cx - base.x;
      const dy = activeKeyDef.cy - base.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Reach ~14px toward the key
      const reachDist = Math.min(18, dist * 0.35);
      const ratio = dist > 0 ? reachDist / dist : 0;
      
      const isPressed = pressedKeyId === activeKeyDef.id;
      const pressOffset = isPressed ? 4 : 0;

      return {
        x: base.x + dx * ratio,
        y: base.y + dy * ratio + pressOffset,
        isReaching: true,
        isPressed
      };
    }

    // If this finger is the active shift finger
    if (fingerId === shiftFinger && shiftKeyDef) {
      const dx = shiftKeyDef.cx - base.x;
      const dy = shiftKeyDef.cy - base.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const reachDist = Math.min(16, dist * 0.3);
      const ratio = dist > 0 ? reachDist / dist : 0;
      return {
        x: base.x + dx * ratio,
        y: base.y + dy * ratio,
        isReaching: true,
        isShift: true
      };
    }

    // Default: Parked in home-row rest pose
    return {
      x: base.x,
      y: base.y,
      isReaching: false
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
  const rtPose = { x: 350, y: 228, isReaching: activeFinger === 'thumbs' };

  // Active finger tip for the guide curve
  const activeTip = activeFinger ? getFingertipPose(activeFinger) : null;
  const shiftTip = shiftFinger ? getFingertipPose(shiftFinger) : null;

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

          {/* 2. UNIFIED TACTILE HANDS & GUIDE CURVES LAYER */}
          {isHandsVisible && (
            <g id="hands-stage">
              
              {/* LEFT HAND: Palm, Metacarpals & 5 Articulated Fingers */}
              {showLeftHand && (
                <g id="left-hand-group" className="transition-all duration-150">
                  {/* Palm base and wrist */}
                  <path
                    d="M 120,380 C 122,340 130,295 145,275 C 160,265 210,265 230,285 C 242,298 248,340 250,380 Z"
                    fill="var(--rs-paper-alt, #FDF8EE)"
                    stroke="#2D2319"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />

                  {/* Left Pinky */}
                  <path
                    d={`M 102,275 C 102,230 106,195 ${lpPose.x - 9},${lpPose.y} C ${lpPose.x - 9},${lpPose.y - 10} ${lpPose.x + 9},${lpPose.y - 10} ${lpPose.x + 9},${lpPose.y} C 122,195 125,230 125,275 Z`}
                    fill={lpPose.isReaching ? '#e0f2fe' : 'var(--rs-paper-alt, #FDF8EE)'}
                    stroke={lpPose.isReaching ? '#1888ff' : '#2D2319'}
                    strokeWidth={lpPose.isReaching ? 2.5 : 2}
                  />

                  {/* Left Ring */}
                  <path
                    d={`M 147,270 C 147,220 151,185 ${lrPose.x - 10},${lrPose.y} C ${lrPose.x - 10},${lrPose.y - 10} ${lrPose.x + 10},${lrPose.y - 10} ${lrPose.x + 10},${lrPose.y} C 169,185 171,220 171,270 Z`}
                    fill={lrPose.isReaching ? '#e0f2fe' : 'var(--rs-paper-alt, #FDF8EE)'}
                    stroke={lrPose.isReaching ? '#1888ff' : '#2D2319'}
                    strokeWidth={lrPose.isReaching ? 2.5 : 2}
                  />

                  {/* Left Middle */}
                  <path
                    d={`M 192,268 C 192,215 196,178 ${lmPose.x - 10},${lmPose.y} C ${lmPose.x - 10},${lmPose.y - 10} ${lmPose.x + 10},${lmPose.y - 10} ${lmPose.x + 10},${lmPose.y} C 216,178 218,215 218,268 Z`}
                    fill={lmPose.isReaching ? '#e0f2fe' : 'var(--rs-paper-alt, #FDF8EE)'}
                    stroke={lmPose.isReaching ? '#1888ff' : '#2D2319'}
                    strokeWidth={lmPose.isReaching ? 2.5 : 2}
                  />

                  {/* Left Index */}
                  <path
                    d={`M 238,272 C 238,220 242,185 ${liPose.x - 10},${liPose.y} C ${liPose.x - 10},${liPose.y - 10} ${liPose.x + 10},${liPose.y - 10} ${liPose.x + 10},${liPose.y} C 260,185 262,220 262,272 Z`}
                    fill={liPose.isReaching ? '#e0f2fe' : 'var(--rs-paper-alt, #FDF8EE)'}
                    stroke={liPose.isReaching ? '#1888ff' : '#2D2319'}
                    strokeWidth={liPose.isReaching ? 2.5 : 2}
                  />

                  {/* Left Thumb */}
                  <path
                    d={`M 242,305 C 255,275 270,250 ${ltPose.x - 8},${ltPose.y} C ${ltPose.x - 8},${ltPose.y - 8} ${ltPose.x + 8},${ltPose.y - 8} ${ltPose.x + 8},${ltPose.y} C 285,260 270,285 255,325 Z`}
                    fill={ltPose.isReaching ? '#e0f2fe' : 'var(--rs-paper-alt, #FDF8EE)'}
                    stroke={ltPose.isReaching ? '#1888ff' : '#2D2319'}
                    strokeWidth={ltPose.isReaching ? 2.5 : 2}
                  />

                  {/* Home Key Fingertip Resting Dots */}
                  <circle cx={HOME_FINGERTIP_REST['left-pinky'].x} cy={HOME_FINGERTIP_REST['left-pinky'].y - 2} r="2.5" fill="#2D2319" opacity="0.3" />
                  <circle cx={HOME_FINGERTIP_REST['left-ring'].x} cy={HOME_FINGERTIP_REST['left-ring'].y - 2} r="2.5" fill="#2D2319" opacity="0.3" />
                  <circle cx={HOME_FINGERTIP_REST['left-middle'].x} cy={HOME_FINGERTIP_REST['left-middle'].y - 2} r="2.5" fill="#2D2319" opacity="0.3" />
                  <circle cx={HOME_FINGERTIP_REST['left-index'].x} cy={HOME_FINGERTIP_REST['left-index'].y - 2} r="2.5" fill="#2D2319" opacity="0.3" />
                </g>
              )}

              {/* RIGHT HAND: Palm, Metacarpals & 5 Articulated Fingers */}
              {showRightHand && (
                <g id="right-hand-group" className="transition-all duration-150">
                  {/* Palm base and wrist */}
                  <path
                    d="M 433,380 C 435,340 441,298 453,285 C 473,265 523,265 538,275 C 553,295 561,340 563,380 Z"
                    fill="var(--rs-paper-alt, #FDF8EE)"
                    stroke="#2D2319"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />

                  {/* Right Thumb */}
                  <path
                    d={`M 441,305 C 428,275 413,250 ${rtPose.x + 8},${rtPose.y} C ${rtPose.x + 8},${rtPose.y - 8} ${rtPose.x - 8},${rtPose.y - 8} ${rtPose.x - 8},${rtPose.y} C 398,260 413,285 428,325 Z`}
                    fill={rtPose.isReaching ? '#e0f2fe' : 'var(--rs-paper-alt, #FDF8EE)'}
                    stroke={rtPose.isReaching ? '#1888ff' : '#2D2319'}
                    strokeWidth={rtPose.isReaching ? 2.5 : 2}
                  />

                  {/* Right Index */}
                  <path
                    d={`M 421,272 C 421,220 423,185 ${riPose.x - 10},${riPose.y} C ${riPose.x - 10},${riPose.y - 10} ${riPose.x + 10},${riPose.y - 10} ${riPose.x + 10},${riPose.y} C 445,185 445,220 445,272 Z`}
                    fill={riPose.isReaching ? '#e0f2fe' : 'var(--rs-paper-alt, #FDF8EE)'}
                    stroke={riPose.isReaching ? '#1888ff' : '#2D2319'}
                    strokeWidth={riPose.isReaching ? 2.5 : 2}
                  />

                  {/* Right Middle */}
                  <path
                    d={`M 465,268 C 465,215 467,178 ${rmPose.x - 10},${rmPose.y} C ${rmPose.x - 10},${rmPose.y - 10} ${rmPose.x + 10},${rmPose.y - 10} ${rmPose.x + 10},${rmPose.y} C 491,178 491,215 491,268 Z`}
                    fill={rmPose.isReaching ? '#e0f2fe' : 'var(--rs-paper-alt, #FDF8EE)'}
                    stroke={rmPose.isReaching ? '#1888ff' : '#2D2319'}
                    strokeWidth={rmPose.isReaching ? 2.5 : 2}
                  />

                  {/* Right Ring */}
                  <path
                    d={`M 512,270 C 512,220 514,185 ${rrPose.x - 10},${rrPose.y} C ${rrPose.x - 10},${rrPose.y - 10} ${rrPose.x + 10},${rrPose.y - 10} ${rrPose.x + 10},${rrPose.y} C 536,185 536,220 536,270 Z`}
                    fill={rrPose.isReaching ? '#e0f2fe' : 'var(--rs-paper-alt, #FDF8EE)'}
                    stroke={rrPose.isReaching ? '#1888ff' : '#2D2319'}
                    strokeWidth={rrPose.isReaching ? 2.5 : 2}
                  />

                  {/* Right Pinky */}
                  <path
                    d={`M 558,275 C 558,230 558,195 ${rpPose.x - 9},${rpPose.y} C ${rpPose.x - 9},${rpPose.y - 10} ${rpPose.x + 9},${rpPose.y - 10} ${rpPose.x + 9},${rpPose.y} C 581,195 581,230 581,275 Z`}
                    fill={rpPose.isReaching ? (rpPose.isShift ? '#f3e8ff' : '#e0f2fe') : 'var(--rs-paper-alt, #FDF8EE)'}
                    stroke={rpPose.isReaching ? (rpPose.isShift ? '#8b5cf6' : '#1888ff') : '#2D2319'}
                    strokeWidth={rpPose.isReaching ? 2.5 : 2}
                  />

                  {/* Home Key Fingertip Resting Dots */}
                  <circle cx={HOME_FINGERTIP_REST['right-index'].x} cy={HOME_FINGERTIP_REST['right-index'].y - 2} r="2.5" fill="#2D2319" opacity="0.3" />
                  <circle cx={HOME_FINGERTIP_REST['right-middle'].x} cy={HOME_FINGERTIP_REST['right-middle'].y - 2} r="2.5" fill="#2D2319" opacity="0.3" />
                  <circle cx={HOME_FINGERTIP_REST['right-ring'].x} cy={HOME_FINGERTIP_REST['right-ring'].y - 2} r="2.5" fill="#2D2319" opacity="0.3" />
                  <circle cx={HOME_FINGERTIP_REST['right-pinky'].x} cy={HOME_FINGERTIP_REST['right-pinky'].y - 2} r="2.5" fill="#2D2319" opacity="0.3" />
                </g>
              )}

              {/* 3. DYNAMIC GUIDANCE: Starts at Active Fingertip -> Curves UP to Target Keycap Center */}
              {activeKeyDef && activeTip && ((activeHand === 'left' && showLeftHand) || (activeHand === 'right' && showRightHand) || (activeFinger === 'thumbs' && (showLeftHand || showRightHand))) && (
                <g id="active-finger-guide">
                  {/* Dynamic upward curve from active fingertip pad to target key center */}
                  <path
                    d={`M ${activeTip.x},${activeTip.y - 8} Q ${(activeTip.x + activeKeyDef.cx) / 2},${(activeTip.y + activeKeyDef.cy) / 2} ${activeKeyDef.cx},${activeKeyDef.cy + 6}`}
                    fill="none"
                    stroke="#1888ff"
                    strokeWidth="3"
                    strokeDasharray="5 3"
                    strokeLinecap="round"
                    className="animate-pulse"
                    style={{ filter: 'drop-shadow(0 0 6px rgba(24, 136, 255, 0.7))' }}
                  />

                  {/* Pulsating Glowing Beacon ON THE FINGERTIP */}
                  <circle
                    cx={activeTip.x}
                    cy={activeTip.y - 8}
                    r="9"
                    fill="#1888ff"
                    opacity="0.3"
                    className="animate-ping"
                  />
                  <circle
                    cx={activeTip.x}
                    cy={activeTip.y - 8}
                    r="5.5"
                    fill="#1888ff"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />

                  {/* Target Keycap Receiving Dot */}
                  <circle
                    cx={activeKeyDef.cx}
                    cy={activeKeyDef.cy + 6}
                    r="4"
                    fill="#1888ff"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </g>
              )}

              {/* 4. SHIFT GUIDANCE: Starts at Opposite Pinky Fingertip -> Curves to Shift Keycap */}
              {shiftKeyDef && shiftTip && ((shiftHand === 'left' && showLeftHand) || (shiftHand === 'right' && showRightHand)) && (
                <g id="shift-finger-guide">
                  <path
                    d={`M ${shiftTip.x},${shiftTip.y - 8} Q ${(shiftTip.x + shiftKeyDef.cx) / 2},${(shiftTip.y + shiftKeyDef.cy) / 2} ${shiftKeyDef.cx},${shiftKeyDef.cy + 6}`}
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                    strokeLinecap="round"
                    className="animate-pulse"
                    style={{ filter: 'drop-shadow(0 0 5px rgba(139, 92, 246, 0.7))' }}
                  />
                  {/* Purple Beacon ON THE SHIFT PINKY FINGERTIP */}
                  <circle
                    cx={shiftTip.x}
                    cy={shiftTip.y - 8}
                    r="8"
                    fill="#8b5cf6"
                    opacity="0.3"
                    className="animate-ping"
                  />
                  <circle
                    cx={shiftTip.x}
                    cy={shiftTip.y - 8}
                    r="5"
                    fill="#8b5cf6"
                    stroke="#ffffff"
                    strokeWidth="1.8"
                  />
                </g>
              )}

            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

