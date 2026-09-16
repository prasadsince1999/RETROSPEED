import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Terminal as TerminalIcon,
  Play,
  LogOut,
  Code2,
  Cpu,
  Keyboard,
  Box,
  ChevronRight,
  BookOpen,
  RotateCcw,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import VirtualKeyboard from '../VirtualKeyboard';
import { sound } from '../../utils/audio';
import { getVisualComponentForLesson } from './visuals';
import PythonStepTeacher from './PythonStepTeacher';
import {
  analyzePythonSyntax,
  evaluateLearnerCode,
  generateProgressiveHints
} from './pythonEvaluator';

/**
 * Python studio is THREE rooms, never one scrolling page:
 *   teach  — concept + visual storyboard (no typing clock)
 *   type   — editor + keyboard only
 *   run    — terminal output + continue
 */
export default function PythonCodeStudio({
  lesson,
  chapter,
  onComplete,
  onExit,
  onRetry
}) {
  const code = lesson?.code || "print('Hello, Python!')";
  const expectedOutput = lesson?.expectedOutput || 'Hello, Python!';
  const variables = lesson?.variables || {};
  const concept = lesson?.concept || 'Python translates code into bytecode behind the scenes.';
  const analogy = lesson?.analogy || 'The Python Mental Model';

  const [phase, setPhase] = useState('teach');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedChars, setTypedChars] = useState([]);
  const [errors, setErrors] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [showHands, setShowHands] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [hintLevel, setHintLevel] = useState(1);
  const completeLock = useRef(false);

  useEffect(() => {
    setPhase('teach');
    setCurrentIndex(0);
    setTypedChars([]);
    setErrors(0);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsFinished(false);
    setIsCompiling(false);
    setShowHints(false);
    setHintLevel(1);
    completeLock.current = false;
  }, [lesson?.id, code]);

  const targetChar = currentIndex < code.length ? code[currentIndex] : null;

  const progressiveHints = useMemo(
    () => generateProgressiveHints(lesson),
    [lesson]
  );

  const currentTypedCode = useMemo(
    () => code.slice(0, currentIndex),
    [code, currentIndex]
  );

  const syntaxReport = useMemo(() => {
    if (currentIndex === 0) return { valid: true, message: 'Syntax OK' };
    if (currentIndex >= code.length) return analyzePythonSyntax(code);
    return analyzePythonSyntax(currentTypedCode);
  }, [currentIndex, code, currentTypedCode]);

  const evaluationReport = useMemo(
    () => evaluateLearnerCode(code, expectedOutput, lesson),
    [code, expectedOutput, lesson]
  );

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
        lineIdx += 1;
      }
    }
    if (currentLine.length > 0) {
      lines.push({ lineNum: lineIdx + 1, chars: currentLine });
    }
    return lines;
  }, [code]);

  const finishTyping = useCallback(() => {
    if (completeLock.current) return;
    completeLock.current = true;
    setIsCompiling(true);
    setIsFinished(true);
    if (sound.playVictoryFanfare) sound.playVictoryFanfare();
    else if (sound.playSuccessChime) sound.playSuccessChime();
    setTimeout(() => {
      setIsCompiling(false);
      setPhase('run');
    }, 700);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (phase === 'teach') {
      // PythonStepTeacher manages internal 4-step progression and calls onStartTyping when ready
      return;
    }

    if (phase !== 'type' || isFinished || isCompiling) return;
    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock'].includes(e.key)) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      if (onExit) onExit();
      return;
    }

    if (e.key === 'Tab' || e.key === ' ' || e.key === 'Enter') e.preventDefault();
    if (!startTime) setStartTime(Date.now());

    if (e.key === 'Backspace') {
      e.preventDefault();
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
        setTypedChars((prev) => prev.slice(0, -1));
        sound.playKeyClick();
      }
      return;
    }

    let incoming = e.key;
    if (e.key === 'Enter') incoming = '\n';
    else if (e.key === 'Tab') incoming = code[currentIndex] === '\t' ? '\t' : '    ';

    if (incoming.length > 1 && incoming !== '\n' && incoming !== '\t' && incoming !== '    ') return;

    const matchesSingle = incoming === targetChar;
    const matchesIndent = incoming === '    ' && code.slice(currentIndex, currentIndex + 4) === '    ';

    if (matchesSingle || matchesIndent) {
      sound.playKeyClick();
      const advance = matchesIndent ? 4 : 1;
      const nextIdx = currentIndex + advance;
      setCurrentIndex(nextIdx);
      setTypedChars((prev) => {
        const next = [...prev];
        for (let i = 0; i < advance; i += 1) next.push({ char: code[currentIndex + i], status: 'correct' });
        return next;
      });

      const elapsedMinutes = (Date.now() - (startTime || Date.now())) / 60000;
      const currentWpm = elapsedMinutes > 0.02 ? Math.round(nextIdx / 5 / elapsedMinutes) : 0;
      const totalAttempts = nextIdx + errors;
      setWpm(Math.max(0, currentWpm));
      setAccuracy(totalAttempts > 0 ? Math.round((nextIdx / totalAttempts) * 100) : 100);
      if (nextIdx >= code.length) finishTyping();
    } else {
      sound.playErrorBuzz();
      setErrors((prev) => prev + 1);
    }
  }, [phase, isFinished, isCompiling, startTime, currentIndex, targetChar, code, errors, finishTyping, onExit]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const header = (
    <div className="shrink-0 bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl px-4 py-2 shadow-[3px_3px_0px_#2D2319] flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center space-x-3 min-w-0">
        <button
          onClick={() => { sound.playKeyClick(); if (onExit) onExit(); }}
          className="px-2.5 py-1 rounded-lg bg-[#FDF8EE] hover:bg-[#F28B82] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] text-xs font-mono font-bold text-[#2D2319] flex items-center space-x-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit</span>
        </button>
        <div className="min-w-0">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-[#F6C445] text-[#2D2319] font-mono text-[10px] font-bold border border-[#2D2319]">PYTHON STUDIO</span>
            <span className="text-[10px] font-mono font-bold text-[#2D2319]/70 uppercase tracking-wide">
              {phase === 'teach' ? '1 / 3  Learn' : phase === 'type' ? '2 / 3  Type' : '3 / 3  Run'}
            </span>
          </div>
          <h2 className="text-sm sm:text-base font-black text-[#2D2319] font-display truncate">{lesson?.title || 'Python Lab'}</h2>
        </div>
      </div>
      {phase !== 'teach' && (
        <div className="flex items-center space-x-2 font-mono">
          <Metric label="SPEED" value={`${wpm} WPM`} />
          <Metric label="ACCURACY" value={`${accuracy}%`} accent="#48B89F" />
          <Metric label="PROGRESS" value={`${Math.min(100, Math.round((currentIndex / Math.max(1, code.length)) * 100))}%`} accent="#4BA3E3" />
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full h-full min-h-0 flex flex-col font-sans select-none bg-[#FDF8EE] overflow-hidden p-3 sm:p-4 gap-3">
      {header}

      {phase === 'teach' && (
        <div className="flex-1 min-h-0 overflow-hidden">
          <PythonStepTeacher
            lesson={lesson}
            chapter={chapter || lesson?.chapter}
            onStartTyping={() => {
              sound.playKeyClick();
              setPhase('type');
            }}
            onExit={onExit}
          />
        </div>
      )}

      {phase === 'type' && (
        <div className="flex-1 min-h-0 flex flex-col gap-2.5 overflow-hidden">
          {/* Main Top Row: Flexible Code Editor (8 cols) & Live Terminal (4 cols) */}
          <div className="flex-1 min-h-[160px] grid grid-cols-1 lg:grid-cols-12 gap-2.5 overflow-hidden">
            
            {/* Left: Code Stream Editor */}
            <div className="lg:col-span-8 bg-[#2D2319] text-[#FDF8EE] border-2 border-[#2D2319] rounded-2xl shadow-[4px_4px_0px_#2D2319] overflow-hidden flex flex-col min-h-0">
              <div className="bg-[#211A13] px-3.5 py-1.5 border-b border-[#FDF8EE]/20 flex items-center justify-between text-xs font-mono shrink-0 gap-2 flex-wrap">
                <div className="flex items-center space-x-2">
                  <Code2 className="w-3.5 h-3.5 text-[#F6C445]" />
                  <span className="font-bold">main.py</span>
                  {/* Real-time Syntax Diagnostic Pill */}
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1 border transition-all ${
                      syntaxReport.valid
                        ? 'bg-[#48B89F]/20 text-[#48B89F] border-[#48B89F]/40'
                        : 'bg-[#F28B82]/20 text-[#F28B82] border-[#F28B82]/40 animate-pulse'
                    }`}
                    title={syntaxReport.message}
                  >
                    {syntaxReport.valid ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-[#48B89F]" />
                        <span>Syntax OK</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3 h-3 text-[#F28B82]" />
                        <span>{syntaxReport.message}</span>
                      </>
                    )}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-[10px] text-[#FDF8EE]/60 font-mono">
                  {/* Subtle Code Hints Collapsible Toggle */}
                  <button
                    onClick={() => {
                      sound.playKeyClick();
                      setShowHints((p) => !p);
                    }}
                    className={`px-2 py-0.5 rounded-lg border text-[10px] font-mono font-bold flex items-center gap-1 transition-all cursor-pointer ${
                      showHints
                        ? 'bg-[#F6C445] text-[#2D2319] border-[#2D2319] shadow-[1px_1px_0px_#2D2319]'
                        : 'bg-[#2D2319] text-[#FDF8EE]/80 hover:text-[#FDF8EE] border-[#FDF8EE]/20 hover:border-[#FDF8EE]/40'
                    }`}
                    title="Toggle progressive code hints"
                  >
                    <Lightbulb className="w-3 h-3 text-[#F6C445]" />
                    <span>Code Hints</span>
                    {showHints ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                  <span>•</span>
                  <span>Ln {codeLines.findIndex((l) => l.chars.some((c) => c.globalIdx === currentIndex)) + 1 || 1} of {codeLines.length}</span>
                  <span>•</span>
                  <span>UTF-8</span>
                </div>
              </div>

              {/* Subtle Progressive Code Hints Drawer */}
              {showHints && (
                <div className="bg-[#19130D] border-b border-[#FDF8EE]/15 p-2.5 sm:p-3 text-xs font-mono shrink-0 transition-all">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#F6C445]" />
                      <span className="text-[11px] font-bold text-[#F6C445] uppercase tracking-wide">
                        Clue {hintLevel} of {progressiveHints.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {progressiveHints.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            sound.playKeyClick();
                            setHintLevel(idx + 1);
                          }}
                          className={`w-5 h-5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                            hintLevel === idx + 1
                              ? 'bg-[#F6C445] text-[#2D2319]'
                              : hintLevel > idx + 1
                              ? 'bg-[#48B89F]/30 text-[#48B89F] border border-[#48B89F]/40'
                              : 'bg-[#2D2319] text-[#FDF8EE]/50 border border-[#FDF8EE]/20'
                          }`}
                          title={`View clue ${idx + 1}`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                      {hintLevel < progressiveHints.length && (
                        <button
                          onClick={() => {
                            sound.playKeyClick();
                            setHintLevel((prev) => Math.min(progressiveHints.length, prev + 1));
                          }}
                          className="ml-1 text-[10px] text-[#48B89F] hover:underline font-bold cursor-pointer"
                        >
                          Next clue &rarr;
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-[#FDF8EE]/90 text-xs leading-relaxed pl-1">
                    {progressiveHints[hintLevel - 1]}
                  </p>
                </div>
              )}

              <div className="p-3.5 sm:p-4 font-mono text-sm sm:text-base leading-relaxed overflow-y-auto flex-1 min-h-0">
                {codeLines.map((line) => (
                  <div key={line.lineNum} className="flex items-baseline space-x-3 py-0.5">
                    <span className="text-[11px] font-mono text-[#FDF8EE]/30 select-none w-6 text-right shrink-0">
                      {String(line.lineNum).padStart(2, '0')}
                    </span>
                    <div className="flex-1 whitespace-pre font-mono font-medium">
                      {line.chars.map(({ char, globalIdx }) => {
                        const isTyped = globalIdx < currentIndex;
                        const isCurrent = globalIdx === currentIndex;
                        let colorClass = 'text-[#FDF8EE]/40';
                        if (isTyped) colorClass = 'text-[#48B89F] font-bold';
                        else if (isCurrent) colorClass = 'text-[#F6C445] font-black bg-[#F6C445]/25 px-0.5 rounded ring-2 ring-[#F6C445] animate-pulse';
                        return <span key={globalIdx} className={colorClass}>{char === '\n' ? '\u21B5' : char}</span>;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Live Standby Terminal */}
            <div className="lg:col-span-4 bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl shadow-[4px_4px_0px_#2D2319] overflow-hidden flex flex-col min-h-0">
              <div className="bg-[#2D2319] text-[#FDF8EE] px-3.5 py-1.5 flex items-center justify-between text-xs font-mono shrink-0">
                <div className="flex items-center space-x-2">
                  <TerminalIcon className="w-3.5 h-3.5 text-[#48B89F]" />
                  <span className="font-bold">Terminal</span>
                </div>
                <span className="text-[10px] text-[#48B89F] font-bold">Standby</span>
              </div>
              <div className="p-3 sm:p-3.5 bg-[#1F1912] text-[#FDF8EE] font-mono text-xs flex-1 flex flex-col justify-between overflow-y-auto min-h-0">
                <div className="space-y-2">
                  <div className="text-[#F6C445] text-xs font-bold">$ python -u main.py</div>
                  <div className="text-[#FDF8EE]/40 text-xs">
                    Terminal waiting for execution...
                  </div>
                  {expectedOutput && (
                    <div className="pt-2 border-t border-[#FDF8EE]/10">
                      <span className="text-[10px] uppercase text-[#FDF8EE]/40 block font-bold">Expected Output:</span>
                      <pre className="text-[#48B89F]/70 text-[11px] font-mono whitespace-pre-wrap mt-0.5">{expectedOutput}</pre>
                    </div>
                  )}
                  <div className="pt-2 border-t border-[#FDF8EE]/10 space-y-1">
                    <span className="text-[10px] uppercase text-[#FDF8EE]/40 block font-bold">Auto-Grading Plan (pytest):</span>
                    <div className="text-[11px] text-[#FDF8EE]/70 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#48B89F]">✓</span>
                        <span>Test 1: Output assertion</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#48B89F]">✓</span>
                        <span>Test 2: Syntax validity & token balance</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#48B89F]">✓</span>
                        <span>Test 3: Expected print statement detection</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#48B89F]">✓</span>
                        <span>Test 4: Construct paradigm & exit code 0</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#FDF8EE]/10 text-[10px] text-[#FDF8EE]/50 flex items-center justify-between shrink-0">
                  <span>Python 3.12 Engine</span>
                  <span className="text-[#48B89F]">Ready</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Full Unclipped Virtual Keyboard */}
          {showKeyboard ? (
            <div className="shrink-0 bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-2 sm:p-2.5 shadow-[3px_3px_0px_#2D2319] max-w-[660px] mx-auto w-full">
              <div className="flex items-center justify-between mb-1 px-1">
                <span className="text-[10px] font-mono font-bold text-[#2D2319]/70 flex items-center gap-1.5">
                  <Keyboard className="w-3.5 h-3.5" />
                  Target: <strong className="bg-[#FDF8EE] px-2 py-0.5 rounded border border-[#2D2319] text-[#2D2319] font-black">{targetChar === ' ' ? 'Space' : targetChar === '\n' ? 'Enter ↵' : targetChar === '\t' ? 'Tab ⇥' : targetChar || 'Done'}</strong>
                </span>
                <div className="flex items-center space-x-3 text-[10px] font-mono font-bold">
                  <button 
                    onClick={() => setShowHands((p) => !p)} 
                    className="underline hover:text-[#1888ff] transition-colors cursor-pointer"
                  >
                    {showHands ? 'Hide hands' : 'Show hands'}
                  </button>
                  <button 
                    onClick={() => setShowKeyboard(false)} 
                    className="text-[#2D2319]/60 hover:text-[#2D2319] cursor-pointer"
                  >
                    Hide keyboard ×
                  </button>
                </div>
              </div>
              <div className="w-full flex justify-center">
                <VirtualKeyboard activeChar={targetChar} layout="qwerty" showHands={showHands} frameless={true} />
              </div>
            </div>
          ) : (
            <div className="shrink-0 flex justify-center py-1">
              <button
                onClick={() => setShowKeyboard(true)}
                className="px-3 py-1 rounded-xl bg-[#FAF3E0] hover:bg-white text-[#2D2319] font-mono text-xs font-bold border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center space-x-1.5 cursor-pointer"
              >
                <Keyboard className="w-3.5 h-3.5" />
                <span>Show Virtual Keyboard</span>
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'run' && (
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl shadow-[4px_4px_0px_#2D2319]">
          <div className="bg-[#2D2319] text-[#FDF8EE] px-4 py-2 flex items-center justify-between text-xs font-mono shrink-0 gap-2 flex-wrap">
            <div className="flex items-center space-x-2">
              <TerminalIcon className="w-3.5 h-3.5 text-[#48B89F]" />
              <span className="font-bold">Python 3.12 Terminal</span>
              {/* Syntax Diagnostic Pill */}
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1 border ${
                  evaluationReport.syntax.valid
                    ? 'bg-[#48B89F]/20 text-[#48B89F] border-[#48B89F]/40'
                    : 'bg-[#F28B82]/20 text-[#F28B82] border-[#F28B82]/40'
                }`}
              >
                {evaluationReport.syntax.valid ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-[#48B89F]" />
                    <span>Syntax OK</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3 h-3 text-[#F28B82]" />
                    <span>{evaluationReport.syntax.message}</span>
                  </>
                )}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[10px]">
              <span className="text-[#48B89F] font-bold">
                {evaluationReport.allPassed
                  ? 'All Assertions Passed (4/4)'
                  : `${evaluationReport.passedCount}/${evaluationReport.totalCount} Passed`}
              </span>
              <span>•</span>
              <span>{isCompiling ? 'Compiling' : 'Exit 0'}</span>
            </div>
          </div>
          <div className="flex-1 p-4 sm:p-5 bg-[#1F1912] text-[#FDF8EE] font-mono text-xs sm:text-sm overflow-auto space-y-4">
            <div>
              <div className="text-[#F6C445] font-bold">$ python -u main.py</div>
              <pre className="text-[#48B89F] whitespace-pre-wrap pt-2 pb-1 pl-2 border-l-2 border-[#48B89F]/40 my-2">{expectedOutput}</pre>
            </div>

            {/* Automated Test Suite Evaluation (pytest pattern) */}
            <div className="pt-3 border-t border-[#FDF8EE]/15">
              <div className="text-[11px] font-bold text-[#FDF8EE]/60 uppercase tracking-wider mb-2.5 flex items-center justify-between flex-wrap gap-1">
                <span className="flex items-center gap-1.5 text-[#F6C445]">
                  <Play className="w-3 h-3 text-[#48B89F]" />
                  Automated Test Suite (pytest pattern)
                </span>
                <span className="text-[10px] text-[#48B89F] bg-[#48B89F]/10 px-2 py-0.5 rounded border border-[#48B89F]/30 font-bold">
                  {evaluationReport.passedCount} / {evaluationReport.totalCount} assertions passed
                </span>
              </div>

              {/* Terminal-style raw test run lines */}
              <div className="space-y-1.5 mb-3 bg-[#17120C] p-3 rounded-lg border border-[#FDF8EE]/10 font-mono text-xs">
                {evaluationReport.tests.map((test) => (
                  <div
                    key={test.id}
                    className={`flex items-start justify-between gap-2 ${
                      test.passed ? 'text-[#48B89F]' : 'text-[#F28B82]'
                    }`}
                  >
                    <span>{test.outputStr}</span>
                    <span className="text-[10px] opacity-75 shrink-0">
                      {test.passed ? '0.01s' : 'FAIL'}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t border-[#FDF8EE]/10 text-[11px] text-[#FDF8EE]/50 flex items-center justify-between">
                  <span>rootdir: /retrospeed/python_studio</span>
                  <span className="text-[#48B89F] font-bold">
                    {evaluationReport.allPassed
                      ? '4 passed in 0.04s — All test assertions passed ✓'
                      : `${evaluationReport.passedCount} passed, ${evaluationReport.totalCount - evaluationReport.passedCount} failed`}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="shrink-0 p-3 flex items-center justify-between border-t-2 border-[#2D2319]">
            <button
              onClick={() => {
                completeLock.current = false;
                setPhase('type');
                setCurrentIndex(0);
                setTypedChars([]);
                setErrors(0);
                setStartTime(null);
                setIsFinished(false);
                if (onRetry) onRetry();
              }}
              className="px-3 py-2 rounded-lg border-2 border-[#2D2319] bg-[#FDF8EE] font-bold text-xs flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retry snippet
            </button>
            <button
              onClick={() => {
                const elapsed = Math.max(1, Math.round(((Date.now() - (startTime || Date.now())) || 8000) / 1000));
                const finalWpm = Math.round((code.length / 5) / (elapsed / 60));
                const finalAcc = Math.round((code.length / (code.length + errors)) * 100);
                if (onComplete) onComplete({
                  lessonId: lesson?.id,
                  title: lesson?.title,
                  wpm: finalWpm,
                  accuracy: finalAcc,
                  errors,
                  durationSeconds: elapsed,
                  score: 750 + finalWpm * 10,
                  points: 750 + finalWpm * 10,
                  stars: finalAcc >= 95 ? 5 : finalAcc >= 85 ? 4 : 3
                });
              }}
              className="px-4 py-2 rounded-xl bg-[#48B89F] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] font-black text-sm text-[#2D2319] flex items-center gap-1.5 cursor-pointer"
            >
              Next lesson <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export { analyzePythonSyntax, evaluateLearnerCode, generateProgressiveHints };

function Metric({ label, value, accent }) {
  return (
    <div className="bg-[#FDF8EE] px-3 py-1 rounded-lg border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] text-center">
      <span className="text-[9px] font-bold text-[#2D2319]/60 block uppercase">{label}</span>
      <span className="text-sm font-black" style={{ color: accent || '#2D2319' }}>{value}</span>
    </div>
  );
}
