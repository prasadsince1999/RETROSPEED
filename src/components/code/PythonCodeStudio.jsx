import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Terminal as TerminalIcon,
  Play,
  RotateCcw,
  LogOut,
  Sparkles,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  HelpCircle,
  Eye,
  EyeOff,
  Keyboard,
  Zap,
  Flame,
  ArrowRight,
  Box,
  Megaphone,
  Mic,
  GitFork,
  Repeat,
  Binary
} from 'lucide-react';
import VirtualKeyboard from '../VirtualKeyboard';
import { sound } from '../../utils/audio';

export default function PythonCodeStudio({
  lesson,
  chapter,
  onComplete,
  onExit,
  onRetry
}) {
  const code = lesson?.code || "print('Hello, Python!')";
  const expectedOutput = lesson?.expectedOutput || "Hello, Python!";
  const variables = lesson?.variables || {};
  const concept = lesson?.concept || "Python translates code into bytecode behind the scenes.";
  const visualTopic = lesson?.visualTopic || "Python Memory & Execution Model";
  const analogy = lesson?.analogy || "The Python Mental Model";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedChars, setTypedChars] = useState([]);
  const [errors, setErrors] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [showHands, setShowHands] = useState(true);
  const [isCompiling, setIsCompiling] = useState(false);

  // Target Character
  const targetChar = currentIndex < code.length ? code[currentIndex] : null;

  // Split code into lines with character indices
  const codeLines = useMemo(() => {
    const lines = [];
    let currentLine = [];
    let lineIdx = 0;

    for (let i = 0; i < code.length; i++) {
      const char = code[i];
      currentLine.push({ char, globalIdx: i });
      if (char === '\n') {
        lines.push({ lineNum: lineIdx + 1, chars: currentLine });
        currentLine = [];
        lineIdx++;
      }
    }
    if (currentLine.length > 0) {
      lines.push({ lineNum: lineIdx + 1, chars: currentLine });
    }
    return lines;
  }, [code]);

  // Handle Keystroke
  const handleKeyDown = useCallback((e) => {
    if (isFinished || isCompiling) return;

    // Filter modifier keys
    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab'].includes(e.key)) {
      return;
    }

    if (!startTime) {
      setStartTime(Date.now());
    }

    // Handle Backspace
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
        setTypedChars(prev => prev.slice(0, -1));
        sound.playKeyClick();
      }
      return;
    }

    // Handle Enter vs Regular Character
    const keyToMatch = e.key === 'Enter' ? '\n' : e.key;

    if (keyToMatch === targetChar) {
      // Correct keystroke!
      sound.playKeyClick();
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setTypedChars(prev => [...prev, { char: keyToMatch, status: 'correct' }]);

      // Update Live Stats
      const elapsedMinutes = (Date.now() - (startTime || Date.now())) / 60000;
      const currentWords = (nextIdx / 5);
      const currentWpm = elapsedMinutes > 0 ? Math.round(currentWords / elapsedMinutes) : 0;
      const totalAttempts = nextIdx + errors;
      const currentAcc = totalAttempts > 0 ? Math.round((nextIdx / totalAttempts) * 100) : 100;

      setWpm(currentWpm);
      setAccuracy(currentAcc);

      // Check Completion
      if (nextIdx >= code.length) {
        setIsCompiling(true);
        setIsFinished(true);
        setEndTime(Date.now());
        sound.playVictoryFanfare();

        // Simulate code compilation and execution
        setTimeout(() => {
          setIsCompiling(false);
          if (onComplete) {
            const finalElapsedSeconds = Math.max(1, Math.round(((Date.now() - startTime) || 10000) / 1000));
            const finalWpm = Math.max(15, Math.round((code.length / 5) / (finalElapsedSeconds / 60)));
            const finalAcc = Math.round((code.length / (code.length + errors)) * 100);

            onComplete({
              lessonId: lesson.id,
              title: lesson.title,
              wpm: finalWpm,
              accuracy: finalAcc,
              errors,
              durationSeconds: finalElapsedSeconds,
              score: 750 + finalWpm * 10,
              points: 750 + finalWpm * 10,
              stars: finalAcc >= 95 ? 5 : finalAcc >= 85 ? 4 : 3
            });
          }
        }, 1200);
      }
    } else {
      // Mistake!
      sound.playErrorBuzz();
      setErrors(prev => prev + 1);
      setTypedChars(prev => [...prev, { char: keyToMatch, status: 'incorrect' }]);
      setTimeout(() => {
        setTypedChars(prev => prev.slice(0, currentIndex));
      }, 250);
    }
  }, [currentIndex, targetChar, code, errors, startTime, isFinished, isCompiling, lesson, onComplete]);

  // Attach global keyboard listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="w-full h-full flex flex-col justify-between font-sans select-none bg-[#FDF8EE] overflow-y-auto p-3 sm:p-5 space-y-4">
      
      {/* 1. TOP HEADER & METRICS BAR */}
      <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl px-4 py-2.5 shadow-[3px_3px_0px_#2D2319] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              sound.playKeyClick();
              if (onExit) onExit();
            }}
            className="px-2.5 py-1 rounded-lg bg-[#FDF8EE] hover:bg-[#F28B82] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] text-xs font-mono font-bold text-[#2D2319] flex items-center space-x-1.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit Studio</span>
          </button>

          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.2 rounded bg-[#F6C445] text-[#2D2319] font-mono text-[10px] font-bold border border-[#2D2319]">
                PYTHON 3.12 STUDIO
              </span>
              <span className="text-xs font-mono font-bold text-[#2D2319]/70">
                Chapter {lesson?.chapter || 1} · Section {lesson?.section || '1.0'}
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-black text-[#2D2319] font-display mt-0.5">
              {lesson?.title || 'Python Interactive Code Lab'}
            </h2>
          </div>
        </div>

        {/* Live Metrics Tiles */}
        <div className="flex items-center space-x-2 sm:space-x-3 font-mono">
          <div className="bg-[#FDF8EE] px-3 py-1 rounded-lg border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] text-center">
            <span className="text-[9px] font-bold text-[#2D2319]/60 block uppercase">SPEED</span>
            <span className="text-sm font-black text-[#2D2319]">{wpm} <span className="text-[10px]">WPM</span></span>
          </div>

          <div className="bg-[#FDF8EE] px-3 py-1 rounded-lg border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] text-center">
            <span className="text-[9px] font-bold text-[#2D2319]/60 block uppercase">ACCURACY</span>
            <span className="text-sm font-black text-[#48B89F]">{accuracy}%</span>
          </div>

          <div className="bg-[#FDF8EE] px-3 py-1 rounded-lg border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] text-center">
            <span className="text-[9px] font-bold text-[#2D2319]/60 block uppercase">PROGRESS</span>
            <span className="text-sm font-black text-[#4BA3E3]">
              {Math.min(100, Math.round((currentIndex / Math.max(1, code.length)) * 100))}%
            </span>
          </div>
        </div>
      </div>

      {/* 2. TOP CONCEPT & ANALOGY STORY CONTAINER */}
      <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-4 shadow-[4px_4px_0px_#2D2319] space-y-3">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-2.5 border-b border-[#2D2319]/15">
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-[#F6C445]" />
            <h3 className="font-mono font-black text-xs uppercase tracking-wider text-[#2D2319]">
              How Python Works Behind The Scenes
            </h3>
          </div>
          <span className="text-[10px] font-mono font-bold bg-[#F6C445] px-2.5 py-0.5 rounded-full border border-[#2D2319] text-[#2D2319]">
            💡 Mental Model: {analogy}
          </span>
        </div>

        <p className="text-xs sm:text-sm font-mono text-[#2D2319]/90 leading-relaxed font-medium">
          {concept}
        </p>

        {/* Responsive Graphic Sketch Slot (Ready for diagrams) */}
        <div className="w-full bg-[#FDF8EE] border-2 border-dashed border-[#2D2319]/40 rounded-xl p-3 flex items-center justify-between text-[#2D2319]/80 font-mono text-xs shadow-inner">
          <div className="flex items-center space-x-2.5">
            <Layers className="w-4 h-4 text-[#4BA3E3]" />
            <span>🎨 <strong>Visual Concept Sketch:</strong> {visualTopic}</span>
          </div>
          <span className="text-[10px] bg-[#C3A6E8] px-2 py-0.5 rounded border border-[#2D2319] text-[#2D2319] font-bold">
            Interactive Slot
          </span>
        </div>
      </div>

      {/* 3. DUAL-PANE IDE WORKSPACE (EDITOR + FAKE COMPILER TERMINAL) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* LEFT PANE: MONOSPACE CODE EDITOR (7 Cols) */}
        <div className="lg:col-span-7 bg-[#2D2319] text-[#FDF8EE] border-2 border-[#2D2319] rounded-2xl shadow-[5px_5px_0px_#2D2319] overflow-hidden flex flex-col justify-between">
          
          {/* Editor Header Bar */}
          <div className="bg-[#211A13] px-4 py-2 border-b border-[#FDF8EE]/20 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-2">
              <Code2 className="w-3.5 h-3.5 text-[#F6C445]" />
              <span className="font-bold text-[#FDF8EE]">main.py</span>
              <span className="text-[10px] text-[#FDF8EE]/50">UTF-8 · Python 3.12</span>
            </div>
            <div className="text-[10px] text-[#FDF8EE]/60 font-mono">
              Ln {codeLines.findIndex(l => l.chars.some(c => c.globalIdx === currentIndex)) + 1 || 1}, Col {currentIndex + 1}
            </div>
          </div>

          {/* Code Stream Lines */}
          <div className="p-4 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto min-h-[190px]">
            {codeLines.map((line) => (
              <div key={line.lineNum} className="flex items-baseline space-x-3">
                {/* Line Number */}
                <span className="text-[10px] font-mono text-[#FDF8EE]/30 select-none w-5 text-right shrink-0">
                  {String(line.lineNum).padStart(2, '0')}
                </span>

                {/* Characters on this line */}
                <div className="flex-1 whitespace-pre">
                  {line.chars.map(({ char, globalIdx }) => {
                    const isTyped = globalIdx < currentIndex;
                    const isCurrent = globalIdx === currentIndex;
                    const isError = globalIdx === currentIndex && typedChars[globalIdx]?.status === 'incorrect';

                    let colorClass = 'text-[#FDF8EE]/40'; // pending
                    if (isTyped) {
                      colorClass = 'text-[#48B89F] font-bold'; // typed correct
                    } else if (isCurrent) {
                      colorClass = 'text-[#F6C445] font-black bg-[#F6C445]/20 rounded ring-2 ring-[#F6C445] animate-pulse';
                    }

                    return (
                      <span
                        key={globalIdx}
                        className={`${colorClass} ${char === '\n' ? 'inline-block w-2 text-xs text-[#FDF8EE]/20' : ''}`}
                      >
                        {char === '\n' ? '↵\n' : char}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Editor Footer Status */}
          <div className="bg-[#211A13] px-4 py-1.5 border-t border-[#FDF8EE]/20 flex items-center justify-between text-[10px] font-mono text-[#FDF8EE]/70">
            <span>Type syntax characters exactly as shown (including colons & indentations)</span>
            <span className="text-[#F6C445] font-bold">● Live Interactive Buffer</span>
          </div>
        </div>

        {/* RIGHT PANE: SIMULATED COMPILER & TERMINAL OUTPUT (5 Cols) */}
        <div className="lg:col-span-5 bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl shadow-[5px_5px_0px_#2D2319] overflow-hidden flex flex-col justify-between">
          
          {/* Terminal Title Bar */}
          <div className="bg-[#2D2319] text-[#FDF8EE] px-4 py-2 border-b-2 border-[#2D2319] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-2">
              <TerminalIcon className="w-3.5 h-3.5 text-[#48B89F]" />
              <span className="font-bold">Python 3.12 Terminal</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className={`w-2 h-2 rounded-full ${isCompiling ? 'bg-[#F6C445] animate-ping' : isFinished ? 'bg-[#48B89F]' : 'bg-[#4BA3E3]'}`} />
              <span className="text-[10px]">{isCompiling ? 'Compiling...' : isFinished ? 'Executed' : 'Standby'}</span>
            </div>
          </div>

          {/* Terminal Standard Output Area */}
          <div className="p-3.5 bg-[#1F1912] text-[#FDF8EE] font-mono text-xs min-h-[120px] flex flex-col justify-between">
            <div className="space-y-1">
              <div className="text-[#F6C445] text-[11px] font-bold">
                $ python -u main.py
              </div>
              <div className="text-[#48B89F] whitespace-pre-wrap font-mono pt-1 text-xs">
                {isFinished || currentIndex > code.length / 2
                  ? expectedOutput
                  : '... [Awaiting code completion to execute]'}
              </div>
            </div>

            <div className="text-[10px] text-[#FDF8EE]/40 pt-2 border-t border-[#FDF8EE]/10 flex items-center justify-between">
              <span>Exit Code: {isFinished ? '0 (Success)' : '...'}</span>
              <span>Memory Heap: Clean</span>
            </div>
          </div>

          {/* Animated Memory Box Visualizer (RAM Warehouse) */}
          <div className="p-3 bg-[#FAF3E0] border-t-2 border-[#2D2319] space-y-2 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-[#2D2319] flex items-center space-x-1">
                <Box className="w-3 h-3 text-[#4BA3E3]" />
                <span>Memory Inspector (RAM Boxes)</span>
              </span>
              <span className="text-[9px] text-[#2D2319]/60 font-bold">Active Heap Tags</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-[85px] overflow-y-auto">
              {Object.entries(variables).length > 0 ? (
                Object.entries(variables).map(([k, v]) => (
                  <div key={k} className="bg-[#FDF8EE] border border-[#2D2319] rounded-lg px-2.5 py-1 flex items-center justify-between text-[10px] shadow-[1px_1px_0px_#2D2319]">
                    <span className="font-black text-[#2D2319] bg-[#C3A6E8]/30 px-1 rounded border border-[#2D2319]/30">{k}</span>
                    <span className="text-[#4BA3E3] font-bold truncate max-w-[100px]">{String(v)}</span>
                  </div>
                ))
              ) : (
                <div className="text-[10px] text-[#2D2319]/50 italic col-span-2 text-center py-1">
                  No variables allocated in this frame
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* 4. VIRTUAL KEYBOARD & CONTROLS */}
      {showKeyboard && (
        <div className="w-full bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-3 shadow-[4px_4px_0px_#2D2319]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-bold text-[#2D2319]/70 flex items-center space-x-1.5">
              <Keyboard className="w-3.5 h-3.5 text-[#2D2319]" />
              <span>Target Key: <strong className="text-[#2D2319] bg-[#FDF8EE] px-1.5 py-0.5 rounded border border-[#2D2319]">{targetChar === ' ' ? 'Space' : targetChar === '\n' ? 'Enter' : targetChar || 'Complete'}</strong></span>
            </span>

            <button
              onClick={() => setShowHands(prev => !prev)}
              className="text-[10px] font-mono font-bold text-[#2D2319] hover:text-[#4BA3E3] underline cursor-pointer"
            >
              {showHands ? 'Hide Hand Guides' : 'Show Hand Guides'}
            </button>
          </div>

          <VirtualKeyboard
            targetChar={targetChar}
            showHands={showHands}
            activeLayout="qwerty"
          />
        </div>
      )}

    </div>
  );
}
