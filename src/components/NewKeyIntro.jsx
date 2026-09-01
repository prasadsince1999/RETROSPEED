import React, { useState, useEffect, useMemo } from 'react';
import { sound } from '../utils/audio';
import { getKeysForLayout, getKeyForChar } from '../data/keyboardLayout';

/**
 * Authentic New Key Introduction Component
 * Matches the official EdClub / TypingClub introductory screen:
 * - Subtitle: "NEW KEY INTRODUCTION"
 * - Title: "Type the [ f ] key using your left index finger."
 * - Center: Keyboard with hands overlay, ripple radar circles on active key, and blue contour lines on the active finger.
 * - Bottom: [ Previous ]  --- [ Progress Bar ] ---  [ Skip ]
 */
export default function NewKeyIntro({
  lesson,
  layout = 'qwerty',
  onFinish,
  onExit
}) {
  // Determine the sequence of keys to introduce for this lesson
  const introKeys = useMemo(() => {
    if (lesson.introKeys && Array.isArray(lesson.introKeys) && lesson.introKeys.length > 0) {
      return lesson.introKeys;
    }
    if (lesson.targetKeys && Array.isArray(lesson.targetKeys) && lesson.targetKeys.length > 0) {
      // Filter out spaces and newlines, take up to 3 distinct new keys
      const filtered = lesson.targetKeys.filter(k => k !== ' ' && k !== '\n' && k !== '\t');
      return filtered.length > 0 ? filtered.slice(0, 3) : ['f', 'j'];
    }
    return ['f', 'j'];
  }, [lesson]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);

  const currentKey = introKeys[currentStepIndex] || introKeys[0] || 'f';
  const allKeys = useMemo(() => getKeysForLayout(layout), [layout]);
  const activeKeyDef = useMemo(() => getKeyForChar(currentKey, layout), [currentKey, layout]);

  // Finger friendly description
  const fingerLabel = useMemo(() => {
    if (!activeKeyDef) return 'designated finger';
    const finger = activeKeyDef.finger;
    const map = {
      'left-pinky': 'left pinky finger',
      'left-ring': 'left ring finger',
      'left-middle': 'left middle finger',
      'left-index': 'left index finger',
      'thumbs': 'thumb',
      'right-index': 'right index finger',
      'right-middle': 'right middle finger',
      'right-ring': 'right ring finger',
      'right-pinky': 'right pinky finger'
    };
    return map[finger] || finger.replace('-', ' ') + ' finger';
  }, [activeKeyDef]);

  // Handle keyboard keypresses
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore system shortcuts
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const pressed = e.key;

      // Check for match (case-insensitive for letters)
      const isMatch = 
        pressed === currentKey || 
        (typeof currentKey === 'string' && pressed.toLowerCase() === currentKey.toLowerCase()) ||
        (currentKey === ' ' && pressed === ' ') ||
        (currentKey === 'Enter' && pressed === 'Enter');

      if (isMatch) {
        sound.playKeyClick();
        setIsSuccess(true);
        setHasError(false);

        // Advance to next key or complete
        setTimeout(() => {
          setIsSuccess(false);
          if (currentStepIndex + 1 < introKeys.length) {
            setCurrentStepIndex(prev => prev + 1);
          } else {
            // All intro keys completed! Launch practice drill
            sound.playSuccessChime();
            onFinish();
          }
        }, 320);
      } else {
        sound.playErrorBuzz();
        setHasError(true);
        setTimeout(() => setHasError(false), 260);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentKey, currentStepIndex, introKeys, onFinish]);

  const handlePrev = () => {
    sound.playKeyClick();
    setCurrentStepIndex(prev => Math.max(0, prev - 1));
  };

  const handleSkip = () => {
    sound.playKeyClick();
    onFinish();
  };

  const activeHand = activeKeyDef?.hand || 'left';
  const activeFinger = activeKeyDef?.finger || 'left-index';

  // Progress percentage
  const progressPercent = ((currentStepIndex + 1) / introKeys.length) * 100;

  return (
    <div className="w-full h-full flex flex-col justify-between items-center py-6 px-4 max-w-4xl mx-auto font-sans select-none animate-in fade-in duration-200">
      
      {/* TOP HEADER SECTION (Exact match to EdClub reference) */}
      <div className="text-center space-y-2 mt-2">
        <div className="text-xs font-mono font-bold tracking-widest text-[#2D2319]/50 uppercase">
          NEW KEY INTRODUCTION
        </div>
        
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D2319] font-sans flex items-center justify-center flex-wrap gap-2 leading-tight">
          <span>Type the</span>
          <span className={`inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#1888ff] text-white font-mono font-black text-2xl sm:text-3xl shadow-[3px_3px_0px_#2D2319] border-2 border-[#2D2319] mx-1 transition-all duration-150 ${
            isSuccess ? 'scale-115 bg-[#10B981]' : hasError ? 'animate-error-shake bg-[#EF4444]' : ''
          }`}>
            {currentKey === ' ' ? '␣' : currentKey}
          </span>
          <span>key using your {fingerLabel}.</span>
        </div>
      </div>

      {/* CENTER HERO: KEYBOARD WITH HANDS OVERLAY */}
      <div className="w-full max-w-[760px] my-auto relative flex flex-col items-center justify-center">
        <div className="w-full bg-white/60 border-2 border-[#2D2319] rounded-2xl p-4 sm:p-6 shadow-[6px_6px_0px_var(--rs-shadow)] overflow-hidden">
          
          <svg 
            viewBox="0 0 683.3 270" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto drop-shadow-sm select-none"
          >
            <defs>
              {/* Radial glow filter for the active key */}
              <radialGradient id="target-key-aura" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1888ff" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#1888ff" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#1888ff" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* KEYBOARD KEYS LAYER */}
            <g id="intro-keyboard-keys">
              {allKeys.map(key => {
                const isActive = activeKeyDef && activeKeyDef.id === key.id;
                
                return (
                  <g key={key.id}>
                    {/* Active Key Pulse Ripples */}
                    {isActive && (
                      <g>
                        {/* Outer Soft Halo */}
                        <circle
                          cx={key.cx}
                          cy={key.cy}
                          r="56"
                          fill="url(#target-key-aura)"
                        />
                        {/* Radar Ripple Rings */}
                        <circle
                          cx={key.cx}
                          cy={key.cy}
                          r="48"
                          fill="none"
                          stroke="#1888ff"
                          strokeWidth="1.5"
                          opacity="0.3"
                        />
                        <circle
                          cx={key.cx}
                          cy={key.cy}
                          r="34"
                          fill="none"
                          stroke="#1888ff"
                          strokeWidth="2"
                          opacity="0.5"
                          className="animate-pulse"
                        />
                        <circle
                          cx={key.cx}
                          cy={key.cy}
                          r="22"
                          fill="none"
                          stroke="#1888ff"
                          strokeWidth="2.5"
                          opacity="0.75"
                          className="animate-ping"
                        />
                      </g>
                    )}

                    {/* Keycap Body */}
                    <path
                      d={key.d}
                      fill={isActive ? '#1888ff' : '#ffffff'}
                      stroke={isActive ? '#0284c7' : '#cbd5e1'}
                      strokeWidth={isActive ? 2.2 : 1.2}
                      className="transition-colors duration-150"
                    />

                    {/* Tactile Bumps for F & J */}
                    {key.isHomeKey && (
                      <line
                        x1={key.cx - 4.5}
                        y1={key.cy + 12.5}
                        x2={key.cx + 4.5}
                        y2={key.cy + 12.5}
                        stroke={isActive ? '#ffffff' : '#64748b'}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    )}

                    {/* Key Label */}
                    <text
                      x={key.cx}
                      y={key.id === 'space' ? key.cy + 1 : key.cy - 1}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={key.id === 'space' || key.id.includes('shift') || key.id === 'capslock' || key.id === 'tab' || key.id === 'enter' || key.id === 'backspace' ? "11" : "15"}
                      fontWeight={isActive || key.isHomeKey ? "800" : "500"}
                      fill={isActive ? '#ffffff' : '#64748b'}
                      fontFamily="monospace"
                    >
                      {key.label || key.char}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* HANDS OVERLAY LAYER */}
            <g id="intro-hands-overlay" className="pointer-events-none">
              
              {/* LEFT HAND */}
              <g id="left-hand-group" transform="translate(18, 55) scale(1.08)">
                <path
                  d="M50,195 C55,160 65,110 75,95 C82,85 86,75 92,70 C96,66 103,72 101,84 C98,96 95,115 95,115 C95,115 115,62 125,50 C129,45 136,50 134,60 C131,75 125,105 125,105 C125,105 152,48 162,40 C167,35 174,40 171,52 C166,70 158,102 158,102 C158,102 188,60 200,52 C206,47 213,54 208,66 C198,90 185,120 185,120 C185,120 228,100 245,110 C253,115 248,128 238,135 C215,150 190,170 180,195 Z"
                  fill="rgba(255, 255, 255, 0.75)"
                  stroke="#94a3b8"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />

                {/* Left Index Finger Active Blue Highlight Lines (Reaching for F) */}
                {activeHand === 'left' && activeFinger === 'left-index' && (
                  <g className="transition-all duration-200">
                    <path
                      d="M158,102 C158,102 188,60 200,52 C206,47 213,54 208,66 C198,90 185,120 185,120"
                      fill="none"
                      stroke="#1888ff"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="200"
                      cy="52"
                      r="7"
                      fill="#1888ff"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                  </g>
                )}

                {/* Left Middle Finger Active Blue Highlight Lines (Reaching for D) */}
                {activeHand === 'left' && activeFinger === 'left-middle' && (
                  <g className="transition-all duration-200">
                    <path
                      d="M125,105 C125,105 152,48 162,40 C167,35 174,40 171,52 C166,70 158,102 158,102"
                      fill="none"
                      stroke="#1888ff"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="162"
                      cy="40"
                      r="7"
                      fill="#1888ff"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                  </g>
                )}

                {/* Left Ring Finger Active Blue Highlight Lines (Reaching for S) */}
                {activeHand === 'left' && activeFinger === 'left-ring' && (
                  <g className="transition-all duration-200">
                    <path
                      d="M95,115 C95,115 115,62 125,50 C129,45 136,50 134,60 C131,75 125,105 125,105"
                      fill="none"
                      stroke="#1888ff"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="125"
                      cy="50"
                      r="7"
                      fill="#1888ff"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                  </g>
                )}

                {/* Left Pinky Finger Active Blue Highlight Lines (Reaching for A) */}
                {activeHand === 'left' && activeFinger === 'left-pinky' && (
                  <g className="transition-all duration-200">
                    <path
                      d="M65,110 C75,95 82,85 86,75 92,70 C96,66 103,72 101,84 C98,96 95,115 95,115"
                      fill="none"
                      stroke="#1888ff"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="92"
                      cy="70"
                      r="7"
                      fill="#1888ff"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                  </g>
                )}
              </g>

              {/* RIGHT HAND */}
              <g id="right-hand-group" transform="translate(180, 55) scale(1.08)">
                <path
                  d="M450,195 C445,160 435,110 425,95 C418,85 414,75 408,70 C404,66 397,72 399,84 C402,96 405,115 405,115 C405,115 385,62 375,50 C371,45 364,50 366,60 C369,75 375,105 375,105 C375,105 348,48 338,40 C333,35 326,40 329,52 C334,70 342,102 342,102 C342,102 312,60 300,52 C294,47 287,54 292,66 C302,90 315,120 315,120 C315,120 272,100 255,110 C247,115 252,128 262,135 C285,150 310,170 320,195 Z"
                  fill="rgba(255, 255, 255, 0.75)"
                  stroke="#94a3b8"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />

                {/* Right Index Finger Active Blue Highlight Lines (Reaching for J) */}
                {activeHand === 'right' && activeFinger === 'right-index' && (
                  <g className="transition-all duration-200">
                    <path
                      d="M342,102 C342,102 312,60 300,52 C294,47 287,54 292,66 C302,90 315,120 315,120"
                      fill="none"
                      stroke="#1888ff"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="300"
                      cy="52"
                      r="7"
                      fill="#1888ff"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                  </g>
                )}

                {/* Right Middle Finger Active Blue Highlight Lines (Reaching for K) */}
                {activeHand === 'right' && activeFinger === 'right-middle' && (
                  <g className="transition-all duration-200">
                    <path
                      d="M375,105 C375,105 348,48 338,40 C333,35 326,40 329,52 C334,70 342,102 342,102"
                      fill="none"
                      stroke="#1888ff"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="338"
                      cy="40"
                      r="7"
                      fill="#1888ff"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                  </g>
                )}

                {/* Right Ring Finger Active Blue Highlight Lines (Reaching for L) */}
                {activeHand === 'right' && activeFinger === 'right-ring' && (
                  <g className="transition-all duration-200">
                    <path
                      d="M405,115 C405,115 385,62 375,50 C371,45 364,50 366,60 C369,75 375,105 375,105"
                      fill="none"
                      stroke="#1888ff"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="375"
                      cy="50"
                      r="7"
                      fill="#1888ff"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                  </g>
                )}

                {/* Right Pinky Finger Active Blue Highlight Lines (Reaching for ;) */}
                {activeHand === 'right' && activeFinger === 'right-pinky' && (
                  <g className="transition-all duration-200">
                    <path
                      d="M435,110 C425,95 418,85 414,75 408,70 C404,66 397,72 399,84 C402,96 405,115 405,115"
                      fill="none"
                      stroke="#1888ff"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="408"
                      cy="70"
                      r="7"
                      fill="#1888ff"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                  </g>
                )}
              </g>

            </g>
          </svg>

        </div>
      </div>

      {/* BOTTOM CONTROL BAR (Exact match to EdClub reference: Previous, Progress Bar, Skip) */}
      <div className="w-full max-w-[760px] flex items-center justify-between gap-4 mt-4 select-none">
        
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentStepIndex === 0}
          className="px-6 sm:px-8 py-2.5 rounded-full border-2 border-[#2D2319] bg-white hover:bg-[var(--rs-paper-alt)] text-[#2D2319] font-display font-black text-xs uppercase shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0 transition-all cursor-pointer"
        >
          Previous
        </button>

        {/* Progress Bar */}
        <div className="flex-1 max-w-md h-3.5 bg-white border-2 border-[#2D2319] rounded-full p-0.5 shadow-[2px_2px_0px_#2D2319] overflow-hidden">
          <div 
            className="h-full bg-[#1888ff] rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Skip Button */}
        <button
          type="button"
          onClick={handleSkip}
          className="px-6 sm:px-8 py-2.5 rounded-full border-2 border-[#2D2319] bg-white hover:bg-[#F6C445] text-[#2D2319] font-display font-black text-xs uppercase shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
        >
          Skip
        </button>

      </div>

    </div>
  );
}
