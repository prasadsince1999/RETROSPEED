import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';
import VirtualKeyboard from './VirtualKeyboard';

/**
 * Authentic EdClub Key Introduction Component
 * - 4 interactive rounds per intro lesson:
 *   - Round 1: [ f ] [   ] [ f ] [   ] [ j ] [   ] [ j ] (~25%)
 *   - Round 2: [   ] [ f ] [ f ] [   ] [ f ] [ f ] [   ] (~50%)
 *   - Round 3: [ j ] [ j ] [   ] [ j ] [ j ] [   ] [ f ] (~75%)
 *   - Round 4: [ j ] [   ] [ j ] [ f ] [   ] [ f ] [ f ] (100%)
 * - Uses VirtualKeyboard with authentic tactile hands and active key highlighting
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

  // If all 4 rounds are completed, show the authentic "GOOD JOB!" celebration screen
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

        {/* Bottom Bar: Try Again, 100% Progress Bar, and Green Continue Button */}
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
    <div className="w-full h-full min-h-[580px] flex flex-col justify-between py-4 px-3 sm:px-6 max-w-5xl mx-auto font-sans select-none animate-in fade-in duration-200">
      
      {/* Top Header: Minimal Back Button */}
      <div className="flex items-center justify-between border-b border-[#2D2319]/15 pb-2">
        <button
          type="button"
          onClick={() => {
            sound.playKeyClick();
            onExit();
          }}
          className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#2D2319] font-mono text-xs font-bold border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Map</span>
        </button>

        <div className="flex items-center space-x-2 font-mono text-xs font-bold text-[#2D2319]">
          <span className="px-2.5 py-0.5 rounded-md bg-[#C7E8CA] border border-[#2D2319]">
            Round {currentRoundIndex + 1} of 4
          </span>
          <span className="font-bold text-[#2D2319]">
            {lesson.title || 'Key Introduction'}
          </span>
        </div>
      </div>

      {/* TOP SEQUENCE TRACK: 7 BOXES */}
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
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 flex items-center justify-center font-mono text-xl sm:text-2xl font-bold transition-all duration-150 relative ${
                    isDone
                      ? 'bg-[#e6f9e9] border-[#22c55e] text-[#15803d]'
                      : isActive
                      ? `bg-white border-[#1888ff] text-[#2D2319] shadow-sm ${hasError ? 'animate-error-shake border-rose-500 bg-rose-50' : ''}`
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

      {/* CENTER HERO: KEYBOARD WITH INTEGRATED TACTILE HANDS */}
      <div className="w-full max-w-[680px] mx-auto relative flex flex-col items-center justify-center my-auto">
        <VirtualKeyboard
          activeChar={currentKey}
          layout={layout}
          showHands={true}
          handFilter={lesson?.hand || 'both'}
        />
      </div>

      {/* BOTTOM PROGRESS BAR */}
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
