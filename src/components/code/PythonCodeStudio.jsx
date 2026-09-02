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
  RotateCcw
} from 'lucide-react';
import VirtualKeyboard from '../VirtualKeyboard';
import { sound } from '../../utils/audio';
import { getVisualComponentForLesson } from './visuals';

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
  const [showHands, setShowHands] = useState(true);
  const [isCompiling, setIsCompiling] = useState(false);
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
    completeLock.current = false;
  }, [lesson?.id, code]);

  const targetChar = currentIndex < code.length ? code[currentIndex] : null;

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
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        sound.playKeyClick();
        setPhase('type');
      }
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
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-4 shadow-[4px_4px_0px_#2D2319]">
          <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-[#2D2319]/15 shrink-0">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-[#F6C445]" />
              <h3 className="font-mono font-black text-xs uppercase tracking-wider text-[#2D2319]">Learn first</h3>
            </div>
            <span className="text-[10px] font-mono font-bold bg-[#F6C445] px-2.5 py-0.5 rounded-full border border-[#2D2319] text-[#2D2319]">{analogy}</span>
          </div>
          <p className="text-sm font-mono text-[#2D2319]/90 leading-relaxed font-medium py-3 shrink-0">{concept}</p>
          <div className="flex-1 min-h-0 overflow-y-auto">{getVisualComponentForLesson(lesson?.rawId || lesson?.codeId || lesson?.id, lesson?.chapter)}</div>
          <div className="shrink-0 pt-3 flex items-center justify-between border-t border-[#2D2319]/15">
            <span className="text-[11px] font-mono text-[#2D2319]/60">Enter or Space also continues</span>
            <button
              onClick={() => { sound.playKeyClick(); setPhase('type'); }}
              className="px-4 py-2 rounded-xl bg-[#F6C445] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] font-black text-sm text-[#2D2319] flex items-center gap-1.5"
            >
              Start typing <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {phase === 'type' && (
        <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3">
            <div className="lg:col-span-8 bg-[#2D2319] text-[#FDF8EE] border-2 border-[#2D2319] rounded-2xl shadow-[4px_4px_0px_#2D2319] overflow-hidden flex flex-col min-h-0">
              <div className="bg-[#211A13] px-4 py-2 border-b border-[#FDF8EE]/20 flex items-center justify-between text-xs font-mono shrink-0">
                <div className="flex items-center space-x-2"><Code2 className="w-3.5 h-3.5 text-[#F6C445]" /><span className="font-bold">main.py</span></div>
                <span className="text-[10px] text-[#FDF8EE]/60">Ln {codeLines.findIndex((l) => l.chars.some((c) => c.globalIdx === currentIndex)) + 1 || 1}</span>
              </div>
              <div className="p-4 font-mono text-sm leading-relaxed overflow-auto flex-1 min-h-0">
                {codeLines.map((line) => (
                  <div key={line.lineNum} className="flex items-baseline space-x-3">
                    <span className="text-[10px] font-mono text-[#FDF8EE]/30 select-none w-5 text-right shrink-0">{String(line.lineNum).padStart(2, '0')}</span>
                    <div className="flex-1 whitespace-pre">
                      {line.chars.map(({ char, globalIdx }) => {
                        const isTyped = globalIdx < currentIndex;
                        const isCurrent = globalIdx === currentIndex;
                        let colorClass = 'text-[#FDF8EE]/40';
                        if (isTyped) colorClass = 'text-[#48B89F] font-bold';
                        else if (isCurrent) colorClass = 'text-[#F6C445] font-black bg-[#F6C445]/20 rounded ring-2 ring-[#F6C445] animate-pulse';
                        return <span key={globalIdx} className={colorClass}>{char === '\n' ? '\u21B5' : char}</span>;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4 bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl shadow-[4px_4px_0px_#2D2319] overflow-hidden flex flex-col min-h-0">
              <div className="bg-[#2D2319] text-[#FDF8EE] px-4 py-2 flex items-center justify-between text-xs font-mono shrink-0">
                <div className="flex items-center space-x-2"><TerminalIcon className="w-3.5 h-3.5 text-[#48B89F]" /><span className="font-bold">Terminal</span></div>
                <span className="text-[10px]">Standby</span>
              </div>
              <div className="p-3.5 bg-[#1F1912] text-[#FDF8EE] font-mono text-xs flex-1">
                <div className="text-[#F6C445] text-[11px] font-bold">$ python -u main.py</div>
                <div className="text-[#FDF8EE]/40 pt-2">Waiting until the snippet is typed.</div>
              </div>
            </div>
          </div>
          {showKeyboard && (
            <div className="shrink-0 bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-2 shadow-[3px_3px_0px_#2D2319]">
              <div className="flex items-center justify-between mb-1 px-1">
                <span className="text-[10px] font-mono font-bold text-[#2D2319]/70 flex items-center gap-1.5">
                  <Keyboard className="w-3.5 h-3.5" />
                  Target: <strong className="bg-[#FDF8EE] px-1.5 py-0.5 rounded border border-[#2D2319]">{targetChar === ' ' ? 'Space' : targetChar === '\n' ? 'Enter' : targetChar === '\t' ? 'Tab' : targetChar || 'Done'}</strong>
                </span>
                <button onClick={() => setShowHands((p) => !p)} className="text-[10px] font-mono font-bold underline">{showHands ? 'Hide hands' : 'Show hands'}</button>
              </div>
              <VirtualKeyboard activeChar={targetChar} layout="qwerty" showHands={showHands} />
            </div>
          )}
        </div>
      )}

      {phase === 'run' && (
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl shadow-[4px_4px_0px_#2D2319]">
          <div className="bg-[#2D2319] text-[#FDF8EE] px-4 py-2 flex items-center justify-between text-xs font-mono shrink-0">
            <div className="flex items-center space-x-2"><TerminalIcon className="w-3.5 h-3.5 text-[#48B89F]" /><span className="font-bold">Python 3.12 Terminal</span></div>
            <span className="text-[10px]">{isCompiling ? 'Compiling' : 'Exit 0'}</span>
          </div>
          <div className="flex-1 p-5 bg-[#1F1912] text-[#FDF8EE] font-mono text-sm overflow-auto">
            <div className="text-[#F6C445] font-bold">$ python -u main.py</div>
            <pre className="text-[#48B89F] whitespace-pre-wrap pt-3">{expectedOutput}</pre>
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
              className="px-3 py-2 rounded-lg border-2 border-[#2D2319] bg-[#FDF8EE] font-bold text-xs flex items-center gap-1"
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
              className="px-4 py-2 rounded-xl bg-[#48B89F] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] font-black text-sm text-[#2D2319] flex items-center gap-1.5"
            >
              Next lesson <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Metric({ label, value, accent }) {
  return (
    <div className="bg-[#FDF8EE] px-3 py-1 rounded-lg border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] text-center">
      <span className="text-[9px] font-bold text-[#2D2319]/60 block uppercase">{label}</span>
      <span className="text-sm font-black" style={{ color: accent || '#2D2319' }}>{value}</span>
    </div>
  );
}
