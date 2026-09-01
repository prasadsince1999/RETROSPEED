import React, { useMemo } from 'react';
import { getKeysForLayout } from '../../data/keyboardLayout';

/**
 * Top-Down Paper Desk & Kinetic Keyboard Stage
 * Renders the retro desk, circular coach stamp, reactive paper keyboard,
 * tactile key-lift animations, reaching finger path, and rubber stamp banners.
 */
export default function DeskCoachStage({
  currentBeat,
  isGateActive,
  gateType,
  gateStatus = {},
  onSkipGate,
  layout = 'qwerty'
}) {
  const allKeys = useMemo(() => getKeysForLayout(layout), [layout]);

  const highlightMode = currentBeat?.highlight || 'none';
  const coachState = currentBeat?.coach || 'open';
  const bannerText = currentBeat?.banner;

  // Check which keys are highlighted for the current beat
  const isKeyHighlighted = (keyId, keyChar) => {
    const char = (keyChar || '').toLowerCase();
    if (highlightMode === 'FJ' || highlightMode === 'bumps') {
      return char === 'f' || char === 'j';
    }
    if (highlightMode === 'homerow') {
      return ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'].includes(char);
    }
    if (highlightMode === 'homerow_space') {
      return ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'].includes(char) || keyId === 'space';
    }
    if (highlightMode === 'U') {
      return char === 'u' || char === 'j';
    }
    if (highlightMode === 'flow') {
      return ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', ' '].includes(char);
    }
    return false;
  };

  // Get color for a highlighted key
  const getKeyHighlightStyle = (keyId, keyChar) => {
    const char = (keyChar || '').toLowerCase();
    if (char === 'f' || char === 'j') {
      return {
        fill: '#1888ff',
        stroke: '#0284c7',
        textFill: '#ffffff',
        isPop: true
      };
    }
    if (['a', 's', 'd'].includes(char)) {
      return {
        fill: '#48bb78',
        stroke: '#2f855a',
        textFill: '#ffffff',
        isPop: false
      };
    }
    if (['k', 'l', ';'].includes(char)) {
      return {
        fill: '#4BA3E3',
        stroke: '#2b6cb0',
        textFill: '#ffffff',
        isPop: false
      };
    }
    if (char === 'u') {
      return {
        fill: '#F28B82',
        stroke: '#c53030',
        textFill: '#2D2319',
        isPop: true
      };
    }
    if (keyId === 'space') {
      return {
        fill: '#F6C445',
        stroke: '#d69e2e',
        textFill: '#2D2319',
        isPop: false
      };
    }
    return null;
  };

  return (
    <div className="relative w-full flex-1 flex flex-col items-center justify-between p-4 sm:p-6 bg-[var(--rs-paper)] select-none overflow-hidden transition-colors duration-200 min-h-[360px] sm:min-h-[420px]">
      
      {/* RETRO DESK GRID & CORNER STAMPS */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#2D2319 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* TOP BAR: CIRCULAR COACH STAMP & DYNAMIC RUBBER-STAMP BANNER */}
      <div className="w-full flex items-center justify-between z-10 gap-4 mb-2">
        
        {/* Left / Center: Dynamic Stamp Banner */}
        <div className="flex-1 flex items-center">
          {bannerText ? (
            <div className={`px-4 sm:px-6 py-2 rounded-xl font-display font-black text-sm sm:text-xl md:text-2xl border-2 sm:border-3 border-[#2D2319] shadow-[4px_4px_0px_#2D2319] transition-all duration-200 animate-in zoom-in-95 ${
              bannerText === 'TYPE LIKE A PRO' ? 'bg-[#F6C445] text-[#2D2319] -rotate-1' :
              bannerText === 'EYES ON THE PAGE' ? 'bg-[#EF4444] text-white -rotate-2 animate-pulse' :
              bannerText === 'LET\'S GET STARTED' ? 'bg-[#10B981] text-white rotate-1' :
              bannerText === 'REACH AND RETURN' ? 'bg-[#F28B82] text-[#2D2319] rotate-1' :
              'bg-[#4BA3E3] text-white -rotate-1'
            }`}>
              ★ {bannerText}
            </div>
          ) : (
            <div className="text-xs font-mono font-bold text-[#2D2319]/40 tracking-wider">
              RETROSPEED COACHING DESK
            </div>
          )}
        </div>

        {/* Right: Circular Coach Stamp Portrait */}
        <div className="relative group shrink-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-3 border-[#2D2319] bg-white shadow-[3px_3px_0px_#2D2319] flex flex-col items-center justify-center p-1 relative overflow-hidden transition-transform duration-200 group-hover:scale-105">
            {/* Stamp Ring Text */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#2D2319]/30 pointer-events-none" />
            
            {/* Coach Facial Expressions */}
            {coachState === 'closed' ? (
              // Closed Eyes on Beat 3 ("Close your eyes... Don't peek")
              <div className="flex flex-col items-center justify-center space-y-1 text-[#2D2319]">
                <div className="flex space-x-2 text-base sm:text-lg font-black leading-none">
                  <span>⌒</span>
                  <span>⌒</span>
                </div>
                <div className="text-[10px] font-mono font-bold tracking-tighter text-amber-600">
                  NO PEEKING
                </div>
              </div>
            ) : coachState === 'focused' ? (
              // Focused Eyes on Beat 7 ("One rule: never look down")
              <div className="flex flex-col items-center justify-center space-y-0.5 text-[#2D2319]">
                <div className="flex space-x-1.5 text-sm sm:text-base font-black">
                  <span className="text-rose-600">▲</span>
                  <span className="text-rose-600">▲</span>
                </div>
                <div className="w-4 h-0.5 bg-[#2D2319] rounded-full" />
                <div className="text-[8px] font-mono font-black text-rose-600 tracking-tighter">
                  EYES UP
                </div>
              </div>
            ) : coachState === 'celebrate' ? (
              // Celebration on Beat 10
              <div className="flex flex-col items-center justify-center space-y-0.5 text-[#2D2319]">
                <div className="flex space-x-1.5 text-amber-500 text-xs sm:text-sm font-black">
                  <span>★</span>
                  <span>★</span>
                </div>
                <div className="text-sm font-black text-[#2D2319]">⌣</div>
              </div>
            ) : (
              // Default Open / Attentive Eyes
              <div className="flex flex-col items-center justify-center space-y-1 text-[#2D2319]">
                <div className="flex space-x-2 text-xs sm:text-sm font-black">
                  <span>◉</span>
                  <span>◉</span>
                </div>
                <div className="w-3 h-0.5 bg-[#2D2319] rounded-full" />
              </div>
            )}
          </div>
          
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#2D2319] text-white text-[8px] font-mono font-black px-1.5 py-0.2 rounded-full border border-white whitespace-nowrap">
            COACH
          </div>
        </div>

      </div>

      {/* CENTER: KINETIC PAPER KEYBOARD */}
      <div className="w-full max-w-[740px] my-auto relative flex flex-col items-center justify-center">
        
        {/* Keyboard Chassis Card */}
        <div className="w-full bg-white/80 border-2 sm:border-3 border-[#2D2319] rounded-2xl p-3 sm:p-5 shadow-[6px_6px_0px_var(--rs-shadow)] overflow-hidden transition-all duration-300">
          
          <svg 
            viewBox="0 0 683.3 254" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto drop-shadow-sm select-none"
          >
            <defs>
              <radialGradient id="coach-key-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1888ff" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#1888ff" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#1888ff" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="u-reach-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F28B82" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#F28B82" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* KEYBOARD KEYS LAYER */}
            <g id="motion-keys">
              {allKeys.map(key => {
                const highlighted = isKeyHighlighted(key.id, key.char);
                const highlightStyle = highlighted ? getKeyHighlightStyle(key.id, key.char) : null;
                const isPop = highlightStyle?.isPop;
                const isAnchor = key.isHomeKey; // F or J

                return (
                  <g 
                    key={key.id}
                    className={`transition-all duration-200 ${isPop ? 'cursor-pointer' : ''}`}
                    transform={isPop ? `translate(0, -3)` : ''}
                  >
                    {/* Active Radar Ripple on Anchor Bumps F & J */}
                    {highlighted && isAnchor && (
                      <g>
                        <circle
                          cx={key.cx}
                          cy={key.cy}
                          r="44"
                          fill="url(#coach-key-glow)"
                        />
                        <circle
                          cx={key.cx}
                          cy={key.cy}
                          r="32"
                          fill="none"
                          stroke="#1888ff"
                          strokeWidth="2"
                          opacity="0.5"
                          className="animate-pulse"
                        />
                        <circle
                          cx={key.cx}
                          cy={key.cy}
                          r="20"
                          fill="none"
                          stroke="#1888ff"
                          strokeWidth="2.5"
                          opacity="0.8"
                          className="animate-ping"
                        />
                      </g>
                    )}

                    {/* Reach U Glow */}
                    {highlighted && (key.char || '').toLowerCase() === 'u' && (
                      <g>
                        <circle
                          cx={key.cx}
                          cy={key.cy}
                          r="36"
                          fill="url(#u-reach-glow)"
                        />
                        <circle
                          cx={key.cx}
                          cy={key.cy}
                          r="24"
                          fill="none"
                          stroke="#F28B82"
                          strokeWidth="2.5"
                          opacity="0.75"
                          className="animate-ping"
                        />
                      </g>
                    )}

                    {/* Pop-up 3D Drop Shadow */}
                    {isPop && (
                      <path
                        d={key.d}
                        fill="#2D2319"
                        transform="translate(3, 4)"
                        opacity="0.25"
                      />
                    )}

                    {/* Keycap Surface */}
                    <path
                      d={key.d}
                      fill={highlightStyle ? highlightStyle.fill : '#ffffff'}
                      stroke={highlightStyle ? highlightStyle.stroke : '#cbd5e1'}
                      strokeWidth={highlighted ? 2.2 : 1.2}
                      className="transition-colors duration-200"
                    />

                    {/* Tactile Bumps for F & J */}
                    {key.isHomeKey && (
                      <line
                        x1={key.cx - 5}
                        y1={key.cy + 12.5}
                        x2={key.cx + 5}
                        y2={key.cy + 12.5}
                        stroke={highlighted ? '#ffffff' : '#475569'}
                        strokeWidth={highlighted ? "2.5" : "2"}
                        strokeLinecap="round"
                        className={highlighted ? "animate-pulse" : ""}
                      />
                    )}

                    {/* Key Label */}
                    <text
                      x={key.cx}
                      y={key.id === 'space' ? key.cy + 1 : key.cy - 1}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={key.id === 'space' || key.id.includes('shift') || key.id === 'capslock' || key.id === 'tab' || key.id === 'enter' || key.id === 'backspace' ? "11" : "15"}
                      fontWeight={highlighted || key.isHomeKey ? "900" : "500"}
                      fill={highlightStyle ? highlightStyle.textFill : '#64748b'}
                      fontFamily="monospace"
                    >
                      {key.label || key.char}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* REACH AND RETURN VECTOR PATH (J → U → J) */}
            {highlightMode === 'U' && (
              <g id="reach-return-path" className="pointer-events-none">
                {/* Dashed line connecting key J (cx=386, cy=124) to key U (cx=366, cy=74) */}
                <path
                  d="M386,124 Q376,95 366,74"
                  fill="none"
                  stroke="#F28B82"
                  strokeWidth="3.5"
                  strokeDasharray="5,4"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
                {/* Arrowhead at U */}
                <polygon
                  points="366,70 372,82 360,82"
                  fill="#F28B82"
                />
                {/* Return arrow back to J */}
                <path
                  d="M366,74 Q390,98 386,124"
                  fill="none"
                  stroke="#1888ff"
                  strokeWidth="2.5"
                  strokeDasharray="4,3"
                  strokeLinecap="round"
                />
              </g>
            )}

          </svg>

        </div>

      </div>

      {/* INTERACTIVE PHYSICAL KEYBOARD GATE PROMPT OVERLAY */}
      {isGateActive && (
        <div className="w-full max-w-xl bg-white border-2 sm:border-3 border-[#2D2319] rounded-2xl p-3 sm:p-4 shadow-[5px_5px_0px_#2D2319] mt-3 z-20 animate-in zoom-in-95 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center space-x-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-[#F6C445] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center font-black text-lg text-[#2D2319] shrink-0 animate-bounce-subtle">
              ⌨
            </div>
            <div>
              <div className="text-[11px] font-mono font-black text-amber-700 uppercase tracking-wide">
                PHYSICAL KEY GATE
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#2D2319]">
                {currentBeat?.gatePrompt || "Press the required keys to continue."}
              </div>
            </div>
          </div>

          {/* Interactive Key Badges + Skip Gate */}
          <div className="flex items-center space-x-2 shrink-0">
            {gateType === 'fj' && (
              <div className="flex items-center space-x-1.5">
                <span className={`w-8 h-8 rounded-lg border-2 border-[#2D2319] flex items-center justify-center font-mono font-black text-sm shadow-[1px_1px_0px_#2D2319] transition-all duration-150 ${
                  gateStatus.f ? 'bg-[#10B981] text-white scale-105' : 'bg-[#1888ff] text-white animate-pulse'
                }`}>
                  {gateStatus.f ? '✓' : 'F'}
                </span>
                <span className="text-xs font-black text-[#2D2319]">+</span>
                <span className={`w-8 h-8 rounded-lg border-2 border-[#2D2319] flex items-center justify-center font-mono font-black text-sm shadow-[1px_1px_0px_#2D2319] transition-all duration-150 ${
                  gateStatus.j ? 'bg-[#10B981] text-white scale-105' : 'bg-[#1888ff] text-white animate-pulse'
                }`}>
                  {gateStatus.j ? '✓' : 'J'}
                </span>
              </div>
            )}

            {gateType === 'uj' && (
              <div className="flex items-center space-x-1.5">
                <span className={`w-8 h-8 rounded-lg border-2 border-[#2D2319] flex items-center justify-center font-mono font-black text-sm shadow-[1px_1px_0px_#2D2319] transition-all duration-150 ${
                  gateStatus.u ? 'bg-[#10B981] text-white scale-105' : 'bg-[#F28B82] text-[#2D2319] animate-pulse'
                }`}>
                  {gateStatus.u ? '✓' : 'U'}
                </span>
                <span className="text-xs font-black text-[#2D2319]">→</span>
                <span className={`w-8 h-8 rounded-lg border-2 border-[#2D2319] flex items-center justify-center font-mono font-black text-sm shadow-[1px_1px_0px_#2D2319] transition-all duration-150 ${
                  gateStatus.j ? 'bg-[#10B981] text-white scale-105' : 'bg-[#1888ff] text-white'
                }`}>
                  {gateStatus.j ? '✓' : 'J'}
                </span>
              </div>
            )}

            {/* Skip Gate Button */}
            <button
              type="button"
              onClick={onSkipGate}
              className="px-2.5 py-1.5 rounded-lg border-2 border-[#2D2319] bg-[var(--rs-paper-alt)] hover:bg-white text-[#2D2319] font-mono text-[10px] font-bold shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer whitespace-nowrap ml-1"
            >
              Skip Gate
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
