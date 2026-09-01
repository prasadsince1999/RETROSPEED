import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';
import { getKeysForLayout, getKeyForChar } from '../data/keyboardLayout';
import VirtualKeyboard from './VirtualKeyboard';

/**
 * Authentic EdClub Key Introduction Component
 * Exact match to user reference images:
 * - Top: Clean white letter boxes [ f ] [   ] [ f ] [   ] [ j ] [   ] [ j ]
 * - Active box has solid blue underline cursor
 * - Completed box turns mint green with green checkmark ✓ above
 * - Center: Keyboard with active key highlighted in vibrant blue + finger outline on hands
 * - Bottom: Sleek minimal green progress bar
 */
export default function NewKeyIntro({
  lesson = {},
  layout = 'qwerty',
  onFinish,
  onExit
}) {
  // Determine the sequence of boxes to type
  const sequence = useMemo(() => {
    if (Array.isArray(lesson.introSequence) && lesson.introSequence.length > 0) {
      return lesson.introSequence;
    }

    const title = (lesson.title || '').toLowerCase();
    const rawKeys = lesson.keys || lesson.targetKeys || ['f', 'j'];

    if (title.includes('space bar')) {
      return ['f', ' ', 'f', ' ', 'j', ' ', 'j'];
    }

    if (rawKeys.length >= 2) {
      const k1 = rawKeys[0];
      const k2 = rawKeys[1];
      return [k1, ' ', k1, ' ', k2, ' ', k2];
    } else if (rawKeys.length === 1) {
      const k = rawKeys[0];
      return [k, ' ', k, ' ', k, ' ', k];
    }

    return ['f', ' ', 'f', ' ', 'j', ' ', 'j'];
  }, [lesson]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  const currentKey = sequence[currentStepIndex] || sequence[0] || 'f';

  // Handle physical key presses
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const pressed = e.key;

      // Check match
      const isMatch = 
        pressed === currentKey ||
        (currentKey === ' ' && (pressed === ' ' || e.code === 'Space')) ||
        (currentKey === 'Enter' && pressed === 'Enter') ||
        (typeof currentKey === 'string' && pressed.toLowerCase() === currentKey.toLowerCase());

      if (isMatch) {
        sound.playKeyClick();
        setHasError(false);

        const nextIndex = currentStepIndex + 1;
        if (nextIndex < sequence.length) {
          setCurrentStepIndex(nextIndex);
        } else {
          // Sequence fully completed!
          sound.playSuccessChime();
          setTimeout(() => {
            onFinish();
          }, 350);
        }
      } else {
        sound.playErrorBuzz();
        setHasError(true);
        setTimeout(() => setHasError(false), 200);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentKey, currentStepIndex, sequence, onFinish]);

  const progressPercent = ((currentStepIndex) / sequence.length) * 100;

  return (
    <div className="w-full h-full flex flex-col justify-between py-4 px-3 sm:px-6 max-w-5xl mx-auto font-sans select-none animate-in fade-in duration-200">
      
      {/* Top Bar: Minimal Back Button & Lesson Badge */}
      <div className="flex items-center justify-between border-b border-[#2D2319]/15 pb-2.5">
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

        <div className="flex items-center space-x-2 font-mono text-xs font-bold text-[#2D2319]/80">
          <span className="px-2.5 py-0.5 rounded-md bg-[#C7E8CA] border border-[#2D2319] text-[#2D2319]">
            {lesson.stageTitle || 'Home Row'}
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-[#F6C445] border border-[#2D2319] text-[#2D2319]">
            {lesson.title}
          </span>
        </div>
      </div>

      {/* CENTER TOP: CHARACTER BOXES SEQUENCE TRACK */}
      <div className="my-auto py-6 flex flex-col items-center justify-center">
        
        <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 flex-wrap pt-6 pb-4">
          {sequence.map((char, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isActive = idx === currentStepIndex;

            return (
              <div key={idx} className="relative flex flex-col items-center">
                
                {/* Floating Green Checkmark ✓ Above Completed Box */}
                {isCompleted && (
                  <div className="absolute -top-7 text-emerald-600 animate-in zoom-in duration-150">
                    <Check className="w-5 h-5 stroke-[3.5]" />
                  </div>
                )}

                {/* Box Card */}
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl border-2 flex items-center justify-center font-mono text-xl sm:text-2xl font-bold transition-all duration-150 relative ${
                    isCompleted
                      ? 'bg-[#dcfce7] border-[#22c55e] text-[#15803d] shadow-sm'
                      : isActive
                      ? `bg-white border-[#1888ff] text-[#2D2319] ring-2 ring-[#1888ff]/40 shadow-md ${hasError ? 'animate-error-shake border-rose-500 ring-rose-500/40 bg-rose-50' : ''}`
                      : 'bg-white border-slate-300 text-slate-400 shadow-sm'
                  }`}
                >
                  {char === ' ' ? '' : char}

                  {/* Active Blue Underline Bar Cursor */}
                  {isActive && (
                    <div className="absolute -bottom-2.5 left-2 right-2 h-1 bg-[#1888ff] rounded-full animate-pulse" />
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
