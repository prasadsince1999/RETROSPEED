import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Check } from 'lucide-react';
import { sound } from '../utils/audio';
import { getKeyForChar } from '../data/keyboardLayout';
import VirtualKeyboard from './VirtualKeyboard';

/**
 * Authentic EdClub Key Introduction Component
 * Exact match to user reference images (media_1788342566805 -> media_1788342959121):
 * - Phase A: Single Key Introduction (e.g. Type [f] with left index, Type [j] with right index)
 * - Phase B: 4-Round Guided Drill with 7 top card boxes and animated reaching hands over keyboard
 *   * Round 1: 25% progress (Repetitions e.g. [f][f][f][f][j][j][j])
 *   * Round 2: 50% progress (Alternations e.g. [f][ ][f][ ][j][ ][j])
 *   * Round 3: 75% progress (Combinations e.g. [ ][f][f][ ][f][f][ ])
 *   * Round 4: 100% progress (Rhythm check e.g. [j][j][ ][j][j][ ][f])
 * - Phase C: Celebration Screen ("GOOD JOB! Next we will practice" -> Continue -> onFinish)
 */
export default function NewKeyIntro({
  lesson = {},
  layout = 'qwerty',
  onFinish,
  onExit
}) {
  const [phase, setPhase] = useState('intro'); // 'intro' | 'drill' | 'celebration'
  const [introStepIndex, setIntroStepIndex] = useState(0);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [drillCharIndex, setDrillCharIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const isTransitioningRef = useRef(false);

  // Extract the target keys to introduce (typically 2 keys, or 1 key for Space)
  const targetKeys = useMemo(() => {
    const title = (lesson.title || '').toLowerCase();

    // Explicit title checks
    if (title.includes('space bar') || title.includes('spacebar')) return [' '];
    if (title.includes('f & j') || title.includes('j & f')) return ['f', 'j'];
    if (title.includes('d & k') || title.includes('k & d')) return ['d', 'k'];
    if (title.includes('s & l') || title.includes('l & s')) return ['s', 'l'];
    if (title.includes('a & ;') || title.includes('; & a')) return ['a', ';'];
    if (title.includes('e & i') || title.includes('i & e')) return ['e', 'i'];
    if (title.includes('r & u') || title.includes('u & r')) return ['r', 'u'];
    if (title.includes('t & y') || title.includes('y & t')) return ['t', 'y'];
    if (title.includes('v & m') || title.includes('m & v')) return ['v', 'm'];
    if (title.includes('c & ,') || title.includes(', & c')) return ['c', ','];
    if (title.includes('x & .') || title.includes('. & x')) return ['x', '.'];
    if (title.includes('z & /') || title.includes('/ & z')) return ['z', '/'];
    if (title.includes('g & h') || title.includes('h & g')) return ['g', 'h'];
    if (title.includes('b & n') || title.includes('n & b')) return ['b', 'n'];
    if (title.includes('q & p') || title.includes('p & q')) return ['q', 'p'];
    if (title.includes('w & o') || title.includes('o & w')) return ['w', 'o'];

    const rawKeys = lesson.keys || lesson.targetKeys;
    if (Array.isArray(rawKeys) && rawKeys.length > 0) {
      return rawKeys.filter(k => k !== '\n').slice(0, 2);
    }

    return ['f', 'j'];
  }, [lesson]);

  // Generate the 4 authentic 7-card drill rounds
  const drillRounds = useMemo(() => {
    const title = (lesson.title || '').toLowerCase();

    // Space Bar Lesson Rounds (Exact match to Images 3, 4, 5)
    if (title.includes('space') || targetKeys[0] === ' ') {
      return [
        ['f', ' ', 'f', ' ', 'j', ' ', 'j'],
        [' ', 'f', 'f', ' ', 'f', 'f', ' '],
        ['j', 'j', ' ', 'j', 'j', ' ', 'f'],
        ['f', 'j', ' ', 'f', 'j', ' ', ' ']
      ];
    }

    const k1 = targetKeys[0] || 'f';
    const k2 = targetKeys[1] || targetKeys[0] || 'j';

    if (k1 === k2) {
      return [
        [k1, k1, k1, k1, k1, k1, k1],
        [k1, k1, k1, k1, k1, k1, k1],
        [k1, k1, k1, k1, k1, k1, k1],
        [k1, k1, k1, k1, k1, k1, k1]
      ];
    }

    // Standard 2-Key Pair Rounds (Exact match to Image 2: [f][f][f][f][j][j][j])
    return [
      [k1, k1, k1, k1, k2, k2, k2],
      [k1, k2, k1, k2, k1, k1, k2],
      [k2, k2, k1, k1, k2, k1, k2],
      [k1, k2, k2, k1, k2, k1, k1]
    ];
  }, [lesson, targetKeys]);

  const currentIntroKey = targetKeys[introStepIndex] || targetKeys[0] || 'f';
  const currentIntroKeyDef = getKeyForChar(currentIntroKey, layout);

  const currentRoundCards = drillRounds[currentRoundIndex] || drillRounds[0];
  const currentDrillTarget = currentRoundCards[drillCharIndex] || currentRoundCards[0];

  const activeTargetChar = phase === 'intro' ? currentIntroKey : currentDrillTarget;

  // Friendly finger label for Intro step
  const fingerLabel = useMemo(() => {
    if (!currentIntroKeyDef) return 'correct finger';
    const finger = currentIntroKeyDef.finger;
    const hand = currentIntroKeyDef.hand;

    if (currentIntroKey === ' ' || finger === 'thumbs') {
      return 'right thumb';
    }

    const fingerNames = {
      'pinky': 'pinky finger',
      'ring': 'ring finger',
      'middle': 'middle finger',
      'index': 'index finger',
      'left-pinky': 'left pinky finger',
      'left-ring': 'left ring finger',
      'left-middle': 'left middle finger',
      'left-index': 'left index finger',
      'right-index': 'right index finger',
      'right-middle': 'right middle finger',
      'right-ring': 'right ring finger',
      'right-pinky': 'right pinky finger'
    };

    if (fingerNames[finger]) return fingerNames[finger];
    return `${hand} ${finger} finger`;
  }, [currentIntroKey, currentIntroKeyDef]);

  // Overall progress percentage
  const progressPercent = useMemo(() => {
    if (phase === 'celebration') return 100;
    if (phase === 'intro') {
      return Math.round((introStepIndex / Math.max(1, targetKeys.length + 4)) * 100);
    }
    // Phase Drill: 4 rounds
    const roundBase = currentRoundIndex * 25;
    const cardPart = (drillCharIndex / currentRoundCards.length) * 25;
    return Math.min(100, Math.max(5, Math.round(roundBase + cardPart)));
  }, [phase, introStepIndex, targetKeys.length, currentRoundIndex, drillCharIndex, currentRoundCards.length]);

  // Handle Keydown interactions across all phases
  useEffect(() => {
    if (phase === 'celebration') {
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
      if (isTransitioningRef.current) return;

      const pressed = e.key;

      if (pressed === ' ' || pressed === 'Tab') {
        e.preventDefault();
      }

      const expected = activeTargetChar;
      const isMatch = 
        pressed === expected ||
        (expected === ' ' && (pressed === ' ' || e.code === 'Space')) ||
        (expected === 'Enter' && pressed === 'Enter') ||
        (typeof expected === 'string' && pressed.toLowerCase() === expected.toLowerCase());

      if (isMatch) {
        sound.playKeyClick();
        setHasError(false);

        if (phase === 'intro') {
          const nextIntroStep = introStepIndex + 1;
          if (nextIntroStep < targetKeys.length) {
            isTransitioningRef.current = true;
            setTimeout(() => {
              setIntroStepIndex(nextIntroStep);
              isTransitioningRef.current = false;
            }, 120);
          } else {
            // Intro steps finished -> transition directly to 4-round drill (Image 2)
            isTransitioningRef.current = true;
            setTimeout(() => {
              setPhase('drill');
              setCurrentRoundIndex(0);
              setDrillCharIndex(0);
              isTransitioningRef.current = false;
            }, 150);
          }
        } else if (phase === 'drill') {
          const nextChar = drillCharIndex + 1;
          if (nextChar < currentRoundCards.length) {
            setDrillCharIndex(nextChar);
          } else {
            // Completed current 7-card round
            const nextRound = currentRoundIndex + 1;
            if (nextRound < drillRounds.length) {
              isTransitioningRef.current = true;
              setTimeout(() => {
                setCurrentRoundIndex(nextRound);
                setDrillCharIndex(0);
                isTransitioningRef.current = false;
              }, 120);
            } else {
              // All 4 rounds complete -> celebration screen
              isTransitioningRef.current = true;
              sound.playSuccessChime();
              setTimeout(() => {
                setPhase('celebration');
                isTransitioningRef.current = false;
              }, 180);
            }
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
  }, [phase, activeTargetChar, introStepIndex, targetKeys.length, drillCharIndex, currentRoundIndex, currentRoundCards.length, drillRounds.length, onFinish]);

  // ==========================================================
  // PHASE C: CELEBRATION SCREEN ("GOOD JOB!", "Next we will practice")
  // ==========================================================
  if (phase === 'celebration') {
    return (
      <div className="w-full h-full min-h-[580px] flex flex-col justify-between py-6 px-4 max-w-4xl mx-auto font-sans select-none animate-in fade-in duration-300">
        <div />

        {/* Center: Concentric Glowing Checkmark, "GOOD JOB!", and Introduced Keys Cards */}
        <div className="flex flex-col items-center justify-center my-auto space-y-6 animate-in zoom-in-95 duration-300">
          <div className="relative flex items-center justify-center">
            <div className="w-36 h-36 rounded-full bg-emerald-100 flex items-center justify-center">
              <div className="w-28 h-28 rounded-full bg-[#22c55e] flex items-center justify-center shadow-lg">
                <Check className="w-14 h-14 text-white stroke-[3.5]" />
              </div>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black uppercase text-slate-700 tracking-wider">
            GOOD JOB!
          </h1>

          <p className="text-slate-500 font-medium text-base sm:text-lg">
            Next we will practice
          </p>

          {/* Key Cards Grid */}
          <div className="flex items-center justify-center gap-4 pt-2">
            {targetKeys.map((key, idx) => (
              <div
                key={idx}
                className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-center font-mono text-3xl sm:text-4xl text-slate-700 font-normal"
              >
                {key === ' ' ? '␣' : key}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Previous, 100% Progress Bar, Continue */}
        <div className="w-full max-w-3xl mx-auto flex items-center justify-between gap-4 pt-6 pb-2">
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              setPhase('drill');
              setCurrentRoundIndex(drillRounds.length - 1);
              setDrillCharIndex(0);
            }}
            className="px-5 py-2 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
          >
            Previous
          </button>

          <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden p-0.5">
            <div className="h-full bg-[#34d399] rounded-full w-full transition-all duration-300" />
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              onFinish();
            }}
            className="px-7 py-2.5 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center space-x-2 cursor-pointer active:scale-95"
          >
            <span>Continue</span>
          </button>
        </div>
      </div>
    );
  }

  // ==========================================================
  // PHASE A & B: SINGLE KEY INTRO + 4-ROUND GUIDED DRILL
  // ==========================================================
  return (
    <div className="w-full h-full min-h-[580px] flex flex-col justify-between py-5 px-4 max-w-4xl mx-auto font-sans select-none animate-in fade-in duration-200">
      
      {/* TOP AREA: Header Instruction (Phase A) OR 7 Card Boxes (Phase B) */}
      {phase === 'intro' ? (
        <div className="flex flex-col items-center justify-center pt-2 pb-4 text-center">
          <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-2">
            NEW KEY INTRODUCTION
          </span>

          <h2 className="text-xl sm:text-2xl font-normal text-slate-700 flex items-center justify-center flex-wrap gap-2">
            <span>Type the</span>
            <span className="inline-flex items-center justify-center px-3 py-1 bg-[#1888ff] text-white font-bold rounded-lg shadow-sm font-mono text-lg sm:text-xl min-w-[2.25rem]">
              {currentIntroKey === ' ' ? 'Space' : currentIntroKey}
            </span>
            <span>key using your <strong className="font-semibold text-slate-800">{fingerLabel}</strong>.</span>
          </h2>
        </div>
      ) : (
        /* Phase B: 7 Square Cards Row (Exact match to Images 2, 3, 4, 5) */
        <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 pt-4 pb-3">
          {currentRoundCards.map((cardChar, idx) => {
            const isTyped = idx < drillCharIndex;
            const isCurrent = idx === drillCharIndex;

            return (
              <div
                key={idx}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 flex items-center justify-center relative font-mono text-2xl sm:text-3xl font-bold transition-all duration-100 ${
                  isTyped
                    ? 'bg-[#dcfce7] text-[#15803d] border-[#86efac] shadow-xs'
                    : isCurrent
                    ? 'bg-white text-slate-800 border-slate-300 shadow-sm'
                    : 'bg-white text-slate-400 border-slate-200/90 shadow-2xs'
                }`}
              >
                {/* Character Glyph (Empty space box for ' ') */}
                <span>{cardChar === ' ' ? '' : cardChar}</span>

                {/* Solid Blue Underline on Active Card */}
                {isCurrent && (
                  <span className="absolute bottom-1.5 left-2 right-2 h-1 bg-[#1888ff] rounded-full animate-pulse" />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* CENTER: VIRTUAL KEYBOARD WITH AUTHENTIC TACTILE HANDS */}
      <div className="w-full max-w-[680px] mx-auto relative flex flex-col items-center justify-center my-auto py-1">
        <VirtualKeyboard
          activeChar={activeTargetChar}
          layout={layout}
          showHands={true}
          handFilter={lesson?.hand || 'both'}
        />
      </div>

      {/* BOTTOM BAR: Controls */}
      {phase === 'intro' ? (
        /* Phase A (Intro): Previous, Progress Bar, Skip (skips into drill) */
        <div className="w-full max-w-3xl mx-auto flex items-center justify-between gap-4 pt-4 pb-2">
          {/* Previous Button */}
          <button
            type="button"
            disabled={introStepIndex === 0}
            onClick={() => {
              sound.playKeyClick();
              if (introStepIndex > 0) setIntroStepIndex(prev => prev - 1);
            }}
            className={`px-5 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all ${
              introStepIndex === 0
                ? 'border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed'
                : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-600 cursor-pointer'
            }`}
          >
            Previous
          </button>

          {/* Mint Green Progress Bar */}
          <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden p-0.5 shadow-inner">
            <div 
              className="h-full bg-[#34d399] rounded-full transition-all duration-300"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>

          {/* Skip Button (Skips single key intro to start the 4-round drill) */}
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              setPhase('drill');
              setCurrentRoundIndex(0);
              setDrillCharIndex(0);
            }}
            className="px-6 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
          >
            Skip
          </button>
        </div>
      ) : (
        /* Phase B (4-Round Drill): Pure Centered Progress Bar with NO previous or skip buttons */
        <div className="w-full max-w-xl mx-auto pt-4 pb-2">
          <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden p-0.5 shadow-inner">
            <div 
              className="h-full bg-[#34d399] rounded-full transition-all duration-300"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>
        </div>
      )}

    </div>
  );
}

