import React, { useState, useEffect, useMemo } from 'react';
import { sound } from '../utils/audio';
import { getKeysForLayout, getKeyForChar } from '../data/keyboardLayout';
import VirtualKeyboard from './VirtualKeyboard';

/**
 * RETROSPEED New Key Introduction Component
 * Step-by-step finger placement onboarding on the paper desk:
 * - Subtitle: "NEW KEY INTRODUCTION"
 * - Title: "Type the [ f ] key using your left index finger."
 * - Center: Keyboard with hands overlay and tactile finger guidance.
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
    const raw = lesson.keys || lesson.introKeys || lesson.targetKeys || [];
    const filtered = raw.filter(k => k && k !== ' ' && k !== '\n' && k !== '\t');
    return filtered.length > 0 ? filtered.slice(0, 3) : ['f', 'j'];
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

      {/* CENTER HERO: KEYBOARD WITH INTEGRATED TACTILE HANDS */}
      <div className="w-full max-w-[760px] my-auto relative flex flex-col items-center justify-center">
        <VirtualKeyboard
          activeChar={currentKey}
          layout={layout}
          showHands={true}
          handFilter={lesson?.hand || 'both'}
        />
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
