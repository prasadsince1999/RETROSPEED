import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ArrowLeft, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';
import { getKeyForChar } from '../data/keyboardLayout';
import VirtualKeyboard from './VirtualKeyboard';

/**
 * Authentic EdClub Key Introduction Component
 * Exact match to user reference images (media_1788292974365 -> media_1788292978661):
 * - Step 1: "Type the [ f ] key using your left index finger."
 * - Step 2: "Type the [ j ] key using your right index finger."
 * - Celebration Screen: "GOOD JOB!", "Next we will practice" with [ f ] [ j ] cards and "Continue" button!
 */
export default function NewKeyIntro({
  lesson = {},
  layout = 'qwerty',
  onFinish,
  onExit
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const isTransitioningRef = useRef(false);

  // Extract the target keys to introduce (typically 2 keys, or 1 key for Space)
  const targetKeys = useMemo(() => {
    const title = (lesson.title || '').toLowerCase();

    // Explicit title checks for exact 2-key sequence
    if (title.includes('space bar')) return [' '];
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

  const currentKey = targetKeys[currentStepIndex] || targetKeys[0] || 'f';
  const currentKeyDef = getKeyForChar(currentKey, layout);

  // Friendly finger label
  const fingerLabel = useMemo(() => {
    if (!currentKeyDef) return 'correct finger';
    const finger = currentKeyDef.finger;
    const hand = currentKeyDef.hand;

    if (currentKey === ' ' || finger === 'thumbs') {
      return 'either thumb';
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
  }, [currentKey, currentKeyDef]);

  // Overall progress percentage (Step 1 of 2 is 0%, Step 2 of 2 is 50%, Completed is 100%)
  const progressPercent = isCompleted ? 100 : Math.round((currentStepIndex / Math.max(1, targetKeys.length)) * 100);

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
      if (isTransitioningRef.current) return;

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
        if (nextStep < targetKeys.length) {
          isTransitioningRef.current = true;
          setTimeout(() => {
            setCurrentStepIndex(nextStep);
            isTransitioningRef.current = false;
          }, 120);
        } else {
          // All keys introduced -> trigger celebration screen (Image 3)
          isTransitioningRef.current = true;
          sound.playSuccessChime();
          setTimeout(() => {
            setIsCompleted(true);
            isTransitioningRef.current = false;
          }, 150);
        }
      } else {
        sound.playErrorBuzz();
        setHasError(true);
        setTimeout(() => setHasError(false), 200);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentKey, currentStepIndex, targetKeys, isCompleted, onFinish]);

  // If all keys in introduction are completed, show authentic celebration screen (Image 3)
  if (isCompleted) {
    return (
      <div className="w-full h-full min-h-[580px] flex flex-col justify-between py-6 px-4 max-w-4xl mx-auto font-sans select-none animate-in fade-in duration-300">
        
        {/* Top Spacer */}
        <div />

        {/* Center: Concentric Glowing Checkmark, "GOOD JOB!", "Next we will practice", and Key Cards */}
        <div className="flex flex-col items-center justify-center my-auto space-y-6 animate-in zoom-in-95 duration-300">
          
          {/* Concentric Circle Checkmark Badge */}
          <div className="relative flex items-center justify-center">
            <div className="w-36 h-36 rounded-full bg-emerald-100 flex items-center justify-center">
              <div className="w-28 h-28 rounded-full bg-[#22c55e] flex items-center justify-center shadow-lg">
                <Check className="w-14 h-14 text-white stroke-[3.5]" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-slate-700 tracking-wider">
            GOOD JOB!
          </h1>

          {/* Subtitle */}
          <p className="text-slate-500 font-medium text-base sm:text-lg">
            Next we will practice
          </p>

          {/* Introduced Keys Cards Grid */}
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

        {/* Bottom Bar: Previous, 100% Progress Bar, and Continue Button (Exact match to Image 3) */}
        <div className="w-full max-w-3xl mx-auto flex items-center justify-between gap-4 pt-6 pb-2">
          
          {/* Previous Button */}
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              setIsCompleted(false);
              setCurrentStepIndex(Math.max(0, targetKeys.length - 1));
            }}
            className="px-5 py-2 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
          >
            Previous
          </button>

          {/* 100% Mint Green Progress Bar */}
          <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden p-0.5">
            <div className="h-full bg-[#34d399] rounded-full w-full transition-all duration-300" />
          </div>

          {/* Continue Button */}
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

  return (
    <div className="w-full h-full min-h-[580px] flex flex-col justify-between py-6 px-4 max-w-4xl mx-auto font-sans select-none animate-in fade-in duration-200">
      
      {/* TOP HEADER INSTRUCTION (Exact match to Images 1 & 2) */}
      <div className="flex flex-col items-center justify-center pt-2 pb-6 text-center">
        <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-2">
          NEW KEY INTRODUCTION
        </span>

        <h2 className="text-xl sm:text-2xl font-normal text-slate-700 flex items-center justify-center flex-wrap gap-2">
          <span>Type the</span>
          <span className="inline-flex items-center justify-center px-3 py-1 bg-[#1888ff] text-white font-bold rounded-lg shadow-sm font-mono text-lg sm:text-xl min-w-[2.25rem]">
            {currentKey === ' ' ? 'Space' : currentKey}
          </span>
          <span>key using your <strong className="font-semibold text-slate-800">{fingerLabel}</strong>.</span>
        </h2>
      </div>

      {/* CENTER: VIRTUAL KEYBOARD WITH AUTHENTIC TACTILE HANDS */}
      <div className="w-full max-w-[680px] mx-auto relative flex flex-col items-center justify-center my-auto">
        <VirtualKeyboard
          activeChar={currentKey}
          layout={layout}
          showHands={true}
          handFilter={lesson?.hand || 'both'}
        />
      </div>

      {/* BOTTOM BAR: Previous, Progress Bar, Skip (Exact match to Images 1 & 2) */}
      <div className="w-full max-w-3xl mx-auto flex items-center justify-between gap-4 pt-6 pb-2">
        
        {/* Previous Button */}
        <button
          type="button"
          disabled={currentStepIndex === 0}
          onClick={() => {
            sound.playKeyClick();
            setCurrentStepIndex(prev => Math.max(0, prev - 1));
          }}
          className={`px-5 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all ${
            currentStepIndex === 0
              ? 'border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed'
              : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-600 cursor-pointer'
          }`}
        >
          Previous
        </button>

        {/* Progress Bar */}
        <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden p-0.5">
          <div 
            className="h-full bg-[#34d399] rounded-full transition-all duration-300"
            style={{ width: `${Math.max(4, progressPercent)}%` }}
          />
        </div>

        {/* Skip Button */}
        <button
          type="button"
          onClick={() => {
            sound.playKeyClick();
            onFinish();
          }}
          className="px-6 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
        >
          Skip
        </button>

      </div>

    </div>
  );
}
