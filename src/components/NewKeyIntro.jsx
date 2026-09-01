import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';
import { getKeyForChar } from '../data/keyboardLayout';

/**
 * Authentic EdClub Key Introduction Component
 * Exact match to user reference images (media_1788291895091 -> media_1788291952593):
 * - 4 interactive rounds per intro lesson:
 *   - Round 1: [ f ] [   ] [ f ] [   ] [ j ] [   ] [ j ] (~25%)
 *   - Round 2: [   ] [ f ] [ f ] [   ] [ f ] [ f ] [   ] (~50%)
 *   - Round 3: [ j ] [ j ] [   ] [ j ] [ j ] [   ] [ f ] (~75%)
 *   - Round 4: [ j ] [   ] [ j ] [ f ] [   ] [ f ] [ f ] (100%)
 * - Authentic line-art hands resting over keyboard with active key in solid blue (#1888ff)
 * - 4-round completion fanfare: "GOOD JOB!" screen with concentric green checkmark circle, "Try again" and "→" continue button!
 */
export default function NewKeyIntro({
  lesson = {},
  layout = 'qwerty',
  onFinish,
  onExit
}) {
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Generate the 4 rounds of 7-box sequences based on lesson keys
  const rounds = useMemo(() => {
    if (Array.isArray(lesson.introRounds) && lesson.introRounds.length === 4) {
      return lesson.introRounds;
    }

    const title = (lesson.title || '').toLowerCase();
    const rawKeys = lesson.keys || lesson.targetKeys || ['f', 'j'];

    let k1 = 'f';
    let k2 = 'j';

    if (rawKeys.length >= 2) {
      k1 = rawKeys[0];
      k2 = rawKeys[1];
    } else if (rawKeys.length === 1) {
      k1 = rawKeys[0];
      k2 = rawKeys[0];
    }

    // Authentic EdClub 4-round progression
    return [
      [k1, ' ', k1, ' ', k2, ' ', k2],
      [' ', k1, k1, ' ', k1, k1, ' '],
      [k2, k2, ' ', k2, k2, ' ', k1],
      [k2, ' ', k2, k1, ' ', k1, k1]
    ];
  }, [lesson]);

  const currentSequence = rounds[currentRoundIndex] || rounds[0];
  const currentKey = currentSequence[currentStepIndex] || currentSequence[0] || 'f';

  // Overall progress percentage across 4 rounds
  const totalSteps = rounds.reduce((acc, r) => acc + r.length, 0);
  const completedSteps = currentRoundIndex * 7 + currentStepIndex;
  const progressPercent = Math.min(100, Math.round((completedSteps / totalSteps) * 100));

  // Active Key Def for keyboard highlighting
  const activeKeyDef = getKeyForChar(currentKey, layout);

  // Handle physical key presses
  useEffect(() => {
    if (isCompleted) {
      const handleCelebrationKeys = (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
          e.preventDefault();
          sound.playKeyClick();
          onFinish();
        }
      };
      window.addEventListener('keydown', handleCelebrationKeys);
      return () => window.removeEventListener('keydown', handleCelebrationKeys);
    }

    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const pressed = e.key;

      if (pressed === ' ' || pressed === 'Tab') {
        e.preventDefault();
      }

      // Check match
      const isMatch = 
        pressed === currentKey ||
        (currentKey === ' ' && (pressed === ' ' || e.code === 'Space')) ||
        (currentKey === 'Enter' && pressed === 'Enter') ||
        (typeof currentKey === 'string' && pressed.toLowerCase() === currentKey.toLowerCase());

      if (isMatch) {
        sound.playKeyClick();
        setHasError(false);

        const nextStep = currentStepIndex + 1;
        if (nextStep < currentSequence.length) {
          setCurrentStepIndex(nextStep);
        } else {
          // Completed this round!
          const nextRound = currentRoundIndex + 1;
          if (nextRound < rounds.length) {
            sound.playKeyClick();
            setCurrentRoundIndex(nextRound);
            setCurrentStepIndex(0);
          } else {
            // All 4 rounds finished -> Trigger GOOD JOB fanfare screen!
            sound.playSuccessChime();
            setIsCompleted(true);
          }
        }
      } else {
        sound.playErrorBuzz();
        setHasError(true);
        setTimeout(() => setHasError(false), 200);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentKey, currentStepIndex, currentRoundIndex, currentSequence, rounds, isCompleted, onFinish]);

  // If all 4 rounds are completed, show the authentic "GOOD JOB!" celebration screen (Image 5)
  if (isCompleted) {
    return (
      <div className="fixed inset-0 bg-[#2b435f] text-white flex flex-col justify-between p-6 z-50 animate-in fade-in duration-300 select-none">
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onExit}
            className="text-white/70 hover:text-white flex items-center space-x-2 text-sm font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Map</span>
          </button>
        </div>

        {/* Center: Concentric Glowing Checkmark & "GOOD JOB!" Typography */}
        <div className="flex flex-col items-center justify-center my-auto space-y-8 animate-in zoom-in-90 duration-300">
          
          {/* Concentric Circle Checkmark Badge */}
          <div className="relative flex items-center justify-center">
            <div className="w-48 h-48 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
              <div className="w-40 h-40 rounded-full bg-white/20 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-[#22c55e] flex items-center justify-center shadow-2xl">
                  <Check className="w-16 h-16 text-white stroke-[3.5]" />
                </div>
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-black tracking-widest uppercase text-white drop-shadow-md">
            GOOD JOB!
          </h1>
        </div>

        {/* Bottom Bar: Try Again, 100% Progress Bar, and Green Continue Button (Exact match to Image 5) */}
        <div className="w-full max-w-4xl mx-auto flex items-center justify-between gap-4 py-2">
          
          {/* Try Again Button */}
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              setIsCompleted(false);
              setCurrentRoundIndex(0);
              setCurrentStepIndex(0);
            }}
            className="px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer flex items-center space-x-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try again</span>
          </button>

          {/* 100% Green Progress Bar */}
          <div className="flex-1 h-3 bg-white/20 rounded-full overflow-hidden p-0.5">
            <div className="h-full bg-[#34d399] rounded-full w-full transition-all duration-500" />
          </div>

          {/* Continue Action Button */}
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              onFinish();
            }}
            className="px-6 py-2.5 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 cursor-pointer active:scale-95"
          >
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[580px] flex flex-col justify-between py-4 px-3 sm:px-6 max-w-4xl mx-auto font-sans select-none animate-in fade-in duration-200">
      
      {/* Top Header: Minimal Back Button */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => {
            sound.playKeyClick();
            onExit();
          }}
          className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-mono text-xs font-bold border border-slate-300 shadow-sm active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Map</span>
        </button>

        <div className="flex items-center space-x-2 font-mono text-xs font-bold text-slate-500">
          <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-300">
            Round {currentRoundIndex + 1} of 4
          </span>
          <span className="font-bold text-slate-800">
            {lesson.title || 'Key Introduction'}
          </span>
        </div>
      </div>

      {/* TOP SEQUENCE TRACK: 7 BOXES (Exact match to Images 1, 2, 3, 4) */}
      <div className="my-auto py-4 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-2.5 sm:gap-4 flex-wrap pt-4 pb-2">
          {currentSequence.map((char, idx) => {
            const isDone = idx < currentStepIndex;
            const isActive = idx === currentStepIndex;

            return (
              <div key={idx} className="relative flex flex-col items-center">
                
                {/* Floating Green Checkmark ✓ */}
                {isDone && (
                  <div className="absolute -top-7 text-emerald-600 animate-in zoom-in duration-150">
                    <Check className="w-5 h-5 stroke-[3.5]" />
                  </div>
                )}

                {/* Box */}
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg border-2 flex items-center justify-center font-mono text-xl sm:text-2xl font-bold transition-all duration-150 relative ${
                    isDone
                      ? 'bg-[#e6f9e9] border-[#22c55e] text-[#15803d]'
                      : isActive
                      ? `bg-white border-[#1888ff] text-slate-900 shadow-sm ${hasError ? 'animate-error-shake border-rose-500 bg-rose-50' : ''}`
                      : 'bg-white border-slate-300 text-slate-400'
                  }`}
                >
                  {char === ' ' ? '' : char}

                  {/* Active Blue Underline Bar */}
                  {isActive && (
                    <div className="absolute -bottom-2 left-1.5 right-1.5 h-1 bg-[#1888ff] rounded-full animate-pulse" />
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* CENTER: KEYBOARD WITH LINE-ART HANDS & BLUE ACTIVE KEY (Matching Images 1, 2, 3, 4) */}
      <div className="w-full max-w-[620px] mx-auto relative flex flex-col items-center justify-center my-auto">
        <svg
          viewBox="0 0 560 300"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-sm overflow-visible"
        >
          {/* Keyboard Frame */}
          <rect
            x="20"
            y="20"
            width="520"
            height="180"
            rx="12"
            fill="#f8fafc"
            stroke="#cbd5e1"
            strokeWidth="2"
          />

          {/* Row 1: Number Row */}
          <g transform="translate(30, 30)">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='].map((k, i) => (
              <rect key={k} x={i * 38} y="0" width="34" height="28" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            ))}
            <rect x="456" y="0" width="44" height="28" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
          </g>

          {/* Row 2: QWERTY */}
          <g transform="translate(30, 62)">
            <rect x="0" y="0" width="42" height="28" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'].map((k, i) => (
              <rect key={k} x={46 + i * 36} y="0" width="32" height="28" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            ))}
            <rect x="478" y="0" width="22" height="28" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
          </g>

          {/* Row 3: HOME ROW (a s d f g h j k l) */}
          <g transform="translate(30, 94)">
            <rect x="0" y="0" width="48" height="28" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            {['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"].map((k, i) => {
              const isActive = (currentKey.toLowerCase() === k);
              return (
                <g key={k} transform={`translate(${52 + i * 36}, 0)`}>
                  <rect
                    x="0"
                    y="0"
                    width="32"
                    height="28"
                    rx="4"
                    fill={isActive ? '#1888ff' : '#ffffff'}
                    stroke={isActive ? '#1888ff' : '#e2e8f0'}
                    strokeWidth="1.5"
                    className="transition-colors duration-150"
                  />
                  <text
                    x="16"
                    y="18"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight={isActive ? 'bold' : 'normal'}
                    fontFamily="sans-serif"
                    fill={isActive ? '#ffffff' : '#64748b'}
                  >
                    {k}
                  </text>
                </g>
              );
            })}
            <rect x="448" y="0" width="52" height="28" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
          </g>

          {/* Row 4: Bottom Row */}
          <g transform="translate(30, 126)">
            <rect x="0" y="0" width="60" height="28" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            {['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'].map((k, i) => (
              <rect key={k} x={64 + i * 36} y="0" width="32" height="28" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            ))}
            <rect x="424" y="0" width="76" height="28" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
          </g>

          {/* Row 5: Space Bar */}
          <g transform="translate(30, 158)">
            <rect
              x="140"
              y="0"
              width="220"
              height="28"
              rx="4"
              fill={currentKey === ' ' ? '#1888ff' : '#ffffff'}
              stroke={currentKey === ' ' ? '#1888ff' : '#e2e8f0'}
              strokeWidth="1.5"
              className="transition-colors duration-150"
            />
          </g>

          {/* LINE-ART HANDS OVER KEYBOARD (Matching Images 1, 2, 3, 4) */}
          {/* Left Hand Outline */}
          <g id="intro-left-hand">
            <path
              d="M 50 300 C 60 250 80 200 90 180 C 85 160 80 140 100 130 C 115 120 120 150 125 170 C 130 140 140 125 155 130 C 168 135 162 165 160 180 C 170 140 185 125 198 130 C 210 135 200 170 195 185 C 205 150 220 135 235 140 C 248 145 235 185 220 205 C 210 215 200 230 205 245 C 200 250 170 280 150 300"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />

            {/* Left Index Active Blue Finger Outline (When 'f' is active) */}
            {currentKey.toLowerCase() === 'f' && (
              <path
                d="M 195 185 C 205 150 220 135 235 140 C 248 145 235 185 220 205"
                fill="none"
                stroke="#1888ff"
                strokeWidth="3.2"
                strokeLinecap="round"
                className="animate-pulse"
              />
            )}

            {/* Left Thumb Active Blue Outline (When Space is active) */}
            {currentKey === ' ' && (
              <path
                d="M 220 205 C 210 215 200 230 205 245"
                fill="none"
                stroke="#1888ff"
                strokeWidth="3.2"
                strokeLinecap="round"
                className="animate-pulse"
              />
            )}
          </g>

          {/* Right Hand Outline */}
          <g id="intro-right-hand">
            <path
              d="M 510 300 C 500 250 480 200 470 180 C 475 160 480 140 460 130 C 445 120 440 150 435 170 C 430 140 420 125 405 130 C 392 135 398 165 400 180 C 390 140 375 125 362 130 C 350 135 360 170 365 185 C 355 150 340 135 325 140 C 312 145 325 185 340 205 C 350 215 360 230 355 245 C 360 250 390 280 410 300"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />

            {/* Right Index Active Blue Finger Outline (When 'j' is active) */}
            {currentKey.toLowerCase() === 'j' && (
              <path
                d="M 365 185 C 355 150 340 135 325 140 C 312 145 325 185 340 205"
                fill="none"
                stroke="#1888ff"
                strokeWidth="3.2"
                strokeLinecap="round"
                className="animate-pulse"
              />
            )}
          </g>
        </svg>
      </div>

      {/* BOTTOM PROGRESS BAR (Segmented 4 Rounds) */}
      <div className="w-full max-w-xl mx-auto pt-4 pb-2 select-none">
        <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-300 shadow-inner">
          <div 
            className="h-full bg-emerald-400 rounded-full transition-all duration-300"
            style={{ width: `${Math.max(4, progressPercent)}%` }}
          />
        </div>
      </div>

    </div>
  );
}
