// Computer Skills & Shortcut Chording Player
// Intercepts real physical keyboard chords (Ctrl, Alt, Shift, Win + Keys) without opening browser actions.
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Zap,
  RotateCcw,
  LogOut,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Award,
  Layers,
  Sparkles,
  Command,
  ArrowRight,
  Lock
} from 'lucide-react';
import { sound } from '../utils/audio';
import { getLicenseStatus } from '../utils/license';

const SHORTCUT_DRILLS = [
  {
    id: 'sc-1',
    title: 'Select All & Copy',
    task: 'Hold Ctrl and press A to select the text, then Ctrl + C to copy.',
    steps: [
      { chord: 'Ctrl+A', keys: ['ctrl', 'a'], label: 'Select All', desc: 'Highlights all text in document' },
      { chord: 'Ctrl+C', keys: ['ctrl', 'c'], label: 'Copy', desc: 'Copies selection to clipboard' }
    ]
  },
  {
    id: 'sc-2',
    title: 'Paste & Undo',
    task: 'Hold Ctrl and press V to paste, then Ctrl + Z to undo the action.',
    steps: [
      { chord: 'Ctrl+V', keys: ['ctrl', 'v'], label: 'Paste', desc: 'Inserts clipboard contents' },
      { chord: 'Ctrl+Z', keys: ['ctrl', 'z'], label: 'Undo', desc: 'Reverses the last action' }
    ]
  },
  {
    id: 'sc-3',
    title: 'Window Management Chords',
    task: 'Switch active application with Alt + Tab, then minimize to desktop with Win + D.',
    steps: [
      { chord: 'Alt+Tab', keys: ['alt', 'tab'], label: 'Switch App', desc: 'Cycles through running windows' },
      { chord: 'Win+D', keys: ['meta', 'd'], label: 'Show Desktop', desc: 'Minimizes all windows instantly' }
    ]
  },
  {
    id: 'sc-4',
    title: 'Browser Tab Speed',
    task: 'Open a new tab with Ctrl + T, then close it with Ctrl + W.',
    steps: [
      { chord: 'Ctrl+T', keys: ['ctrl', 't'], label: 'New Tab', desc: 'Opens a blank browser tab' },
      { chord: 'Ctrl+W', keys: ['ctrl', 'w'], label: 'Close Tab', desc: 'Closes current tab' }
    ]
  },
  {
    id: 'sc-5',
    title: 'Search & Address Bar Focus',
    task: 'Focus the address bar with Ctrl + L, then open search with Ctrl + F.',
    steps: [
      { chord: 'Ctrl+L', keys: ['ctrl', 'l'], label: 'Address Bar', desc: 'Highlights URL for instant typing' },
      { chord: 'Ctrl+F', keys: ['ctrl', 'f'], label: 'Find in Page', desc: 'Searches keywords on page' }
    ]
  }
];

export default function ShortcutPlayer({ onExit, onComplete, userProgress = {}, onOpenUnlockModal }) {
  const [drillIndex, setDrillIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [pressedKeys, setPressedKeys] = useState(new Set());
  const [successFlash, setSuccessFlash] = useState(false);
  const [errorFlash, setErrorFlash] = useState(false);
  const [completedChords, setCompletedChords] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const containerRef = useRef(null);

  const license = getLicenseStatus(userProgress);
  const currentDrill = SHORTCUT_DRILLS[drillIndex] || SHORTCUT_DRILLS[0];
  const currentStep = currentDrill.steps[stepIndex] || currentDrill.steps[0];

  // Helper to normalize key names
  const normalizeKey = (k) => {
    const lower = k.toLowerCase();
    if (lower === 'control') return 'ctrl';
    if (lower === 'alt') return 'alt';
    if (lower === 'shift') return 'shift';
    if (lower === 'meta' || lower === 'os' || lower === 'win') return 'meta';
    return lower;
  };

  const handleKeyDown = useCallback((e) => {
    // Intercept standard browser shortcuts so they don't leave the app
    if (
      (e.ctrlKey && ['t', 'w', 'l', 'f', 'a', 'c', 'v', 'z'].includes(e.key.toLowerCase())) ||
      (e.altKey && e.key === 'Tab')
    ) {
      e.preventDefault();
      e.stopPropagation();
    }

    const currentPressed = new Set();
    if (e.ctrlKey) currentPressed.add('ctrl');
    if (e.altKey) currentPressed.add('alt');
    if (e.shiftKey) currentPressed.add('shift');
    if (e.metaKey) currentPressed.add('meta');

    const keyName = normalizeKey(e.key);
    if (!['ctrl', 'alt', 'shift', 'meta'].includes(keyName)) {
      currentPressed.add(keyName);
    }

    setPressedKeys(currentPressed);

    // Verify chord match
    const requiredKeys = currentStep.keys;
    const isMatch = requiredKeys.every(k => currentPressed.has(k)) && currentPressed.size === requiredKeys.length;

    if (isMatch) {
      if (sound && typeof sound.playSuccess === 'function') sound.playSuccess();
      setSuccessFlash(true);
      setCompletedChords(prev => prev + 1);
      setTotalAttempts(prev => prev + 1);

      setTimeout(() => {
        setSuccessFlash(false);
        setPressedKeys(new Set());

        if (stepIndex + 1 < currentDrill.steps.length) {
          setStepIndex(prev => prev + 1);
        } else if (drillIndex + 1 < SHORTCUT_DRILLS.length) {
          const nextIndex = drillIndex + 1;
          if (nextIndex >= 2 && !license.isUnlocked) {
            // Reached boundary of free shortcut drills
            if (onOpenUnlockModal) onOpenUnlockModal();
            return;
          }
          setDrillIndex(nextIndex);
          setStepIndex(0);
        } else {
          setIsFinished(true);
          if (onComplete) {
            onComplete({
              modeId: 'shortcuts',
              wpm: 45,
              accuracy: 100,
              chars: 20,
              errors: 0,
              durationSeconds: 45,
              score: 350,
              stars: 5
            });
          }
        }
      }, 500);
    }
  }, [currentStep, stepIndex, currentDrill, drillIndex, onComplete]);

  const handleKeyUp = useCallback((e) => {
    setPressedKeys(new Set());
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex flex-col justify-between font-sans select-none bg-[#FDF8EE] p-4 sm:p-6 overflow-y-auto"
    >
      {/* TOP HUD BAR */}
      <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-4 shadow-[4px_4px_0px_#2D2319] flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#48B89F] text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center justify-center font-bold">
            <Command className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-bold text-[#2D2319]/80 uppercase">
                COMPUTER SKILLS // SHORTCUT LAB
              </span>
              <span className="px-1.5 py-0.2 rounded bg-[#F6C445] text-[#2D2319] font-mono text-[10px] font-bold border border-[#2D2319]">
                CHORD DETECTION
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-[#2D2319] font-display">
              {currentDrill.title}
            </h1>
          </div>
        </div>

        {/* PROGRESS METRIC & EXIT */}
        <div className="flex items-center space-x-3">
          <div className="px-3 py-1.5 rounded-xl bg-[#FDF8EE] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] font-mono text-xs font-bold text-[#2D2319]">
            Drill {drillIndex + 1} / {SHORTCUT_DRILLS.length}
          </div>
          <button
            onClick={() => {
              if (sound && typeof sound.playKeyClick === 'function') sound.playKeyClick();
              onExit();
            }}
            className="px-3 py-1.5 rounded-xl bg-[#FDF8EE] hover:bg-[#F28B82] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] font-mono text-xs font-bold text-[#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit</span>
          </button>
        </div>
      </div>

      {/* CENTER CHORD WORKBENCH */}
      <div className="my-auto py-8 max-w-2xl mx-auto w-full space-y-6">
        
        {/* TASK BANNER */}
        <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-5 shadow-[4px_4px_0px_#2D2319] text-center">
          <span className="text-xs font-mono font-bold text-[#2D2319]/70 uppercase tracking-wider">
            CURRENT TASK
          </span>
          <p className="text-base sm:text-lg font-bold text-[#2D2319] mt-1 font-display">
            {currentDrill.task}
          </p>
        </div>

        {/* TARGET CHORD KEYCAPS DISPLAY */}
        <div className={`p-8 rounded-2xl border-2 border-[#2D2319] shadow-[6px_6px_0px_#2D2319] text-center transition-all duration-200 ${
          successFlash ? 'bg-[#10B981] text-[#2D2319] scale-102' : 'bg-[#FDF8EE]'
        }`}>
          <div className="text-xs font-mono font-bold text-[#2D2319]/80 uppercase tracking-wider mb-4">
            PRESS THIS COMBO SIMULTANEOUSLY:
          </div>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            {currentStep.keys.map((k, idx) => {
              const isCurrentlyHeld = pressedKeys.has(k);
              const label = k === 'meta' ? 'Win ❖' : k === 'ctrl' ? 'Ctrl ⎈' : k === 'alt' ? 'Alt ⎇' : k.toUpperCase();

              return (
                <React.Fragment key={k}>
                  {idx > 0 && <span className="text-2xl font-black text-[#2D2319]">+</span>}
                  <div className={`px-6 py-4 rounded-xl border-3 border-[#2D2319] font-mono text-xl sm:text-2xl font-black transition-all ${
                    isCurrentlyHeld 
                      ? 'bg-[#10B981] text-[#2D2319] shadow-[1px_1px_0px_#2D2319] translate-y-1' 
                      : 'bg-[#FAF3E0] text-[#2D2319] shadow-[4px_4px_0px_#2D2319]'
                  }`}>
                    {label}
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-[#C3A6E8] text-[#2D2319] font-mono text-xs font-bold border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
              {currentStep.label}
            </span>
            <span className="text-xs font-mono text-[#2D2319]/80 font-medium">
              — {currentStep.desc}
            </span>
          </div>
        </div>

        {/* FEEDBACK STATUS BAR */}
        <div className="flex items-center justify-between text-xs font-mono text-[#2D2319]/80 font-bold px-2">
          <span>Hands on keyboard. Do not use mouse.</span>
          <span>Clean Combos: {completedChords}</span>
        </div>

      </div>

      {/* BOTTOM ACTION BAR */}
      <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-4 shadow-[4px_4px_0px_#2D2319] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-[#F6C445]" />
          <span className="text-xs font-mono font-bold text-[#2D2319]">
            Step {stepIndex + 1} of {currentDrill.steps.length} in this drill
          </span>
        </div>
        <div className="text-xs font-mono font-bold text-[#2D2319]">
          Press chord to advance ➔
        </div>
      </div>
    </div>
  );
}
