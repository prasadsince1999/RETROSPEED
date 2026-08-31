import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  RotateCcw, 
  Check, 
  AlertTriangle, 
  ArrowRight, 
  Zap, 
  Target, 
  Keyboard, 
  Code, 
  LayoutList,
  Terminal,
  Clock,
  Sparkles,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { Button, Card, Badge, ProgressBar, MetricTile } from '../ui';
import VirtualKeyboard from './VirtualKeyboard';
import HandGuide from './HandGuide';
import CourseContextHeaders from './CourseContextHeaders';
import { SpeedometerGauge, TypingComboMeter, ReactiveMascot } from './animation';
import { sound } from '../utils/audio';
import { getKeyForChar } from '../data/keyboardLayout';

function getSyntaxClass(char) {
  if (char === '{' || char === '}') return 'curly';
  if (char === '(' || char === ')') return 'round';
  if (char === '[' || char === ']') return 'square';
  if (char === '<' || char === '>') return 'angle';
  if (char === ';') return 'semicolon';
  if (char === ':') return 'colon';
  if (char === ',') return 'comma';
  if (char === '.') return 'dot';
  if (['=', '+', '-', '*', '/', '%', '!', '&', '|', '^', '~', '?'].includes(char)) return 'operator';
  if (/[0-9]/.test(char)) return 'number';
  if (['"', "'", '`'].includes(char)) return 'quote';
  if (char === '\n') return 'newline';
  if (char === '\t') return 'tab';
  if (char === ' ') return 'space';
  return 'plain';
}

function formatTimer(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default function LessonPlayer({ 
  lesson, 
  course,
  courseId,
  programId,
  onComplete, 
  onExit,
  layout = 'qwerty',
  keyboardEnabled = true,
  handsEnabled = true,
  theme = 'bone'
}) {
  const [mode, setMode] = useState(lesson.type === 'intro' ? 'intro' : 'practice');
  const [introStep, setIntroStep] = useState(0); 
  const [tokens, setTokens] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tokenStatuses, setTokenStatuses] = useState([]); 
  const [pressedKeyId, setPressedKeyId] = useState(null);
  const [errorKeyId, setErrorKeyId] = useState(null);
  const [errors, setErrors] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [liveWpm, setLiveWpm] = useState(0);
  const [liveAccuracy, setLiveAccuracy] = useState(100);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [viewMode, setViewMode] = useState('code');
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [hasError, setHasError] = useState(false);

  const containerRef = useRef(null);
  const activeLineRef = useRef(null);
  const editorScrollRef = useRef(null);
  const keyStatsRef = useRef({});
  const typingTimerRef = useRef(null);

  useEffect(() => {
    const text = lesson.text || "ffff jjjj";
    const chars = text.split('');
    setTokens(chars);
    setTokenStatuses(new Array(chars.length).fill('pending'));
    setCurrentIndex(0);
    setErrors(0);
    setTotalKeystrokes(0);
    setHasStarted(false);
    setStartTime(null);
    setLiveWpm(0);
    setLiveAccuracy(100);
    setElapsedSeconds(0);
    setStreak(0);
    setMaxStreak(0);
    setIsTyping(false);
    setHasError(false);
    keyStatsRef.current = {};

    const hasCodeStructure = text.includes('\n') || text.includes('\t') || text.includes('{') || text.includes('}') || text.includes(';') || text.length > 55 || lesson.renderEngine === 'code';

    if (lesson.type === 'intro' && lesson.targetKeys && lesson.targetKeys.length > 0) {
      setMode('intro');
      setIntroStep(0);
      setViewMode('stream');
    } else {
      setMode('practice');
      setViewMode(hasCodeStructure ? 'code' : 'stream');
    }
  }, [lesson]);

  useEffect(() => {
    if (!hasStarted || !startTime) return;
    const interval = setInterval(() => {
      const durationSec = Math.floor((Date.now() - startTime) / 1000);
      setElapsedSeconds(durationSec);

      const durationMin = (Date.now() - startTime) / 60000;
      if (durationMin > 0.02) {
        const words = currentIndex / 5;
        const wpm = Math.round(words / durationMin);
        setLiveWpm(Math.max(0, wpm));
      }
      if (totalKeystrokes > 0) {
        const acc = Math.round((Math.max(0, currentIndex) / totalKeystrokes) * 100);
        setLiveAccuracy(Math.min(100, Math.max(0, acc)));
      }
    }, 150);

    return () => clearInterval(interval);
  }, [hasStarted, startTime, currentIndex, totalKeystrokes]);

  useEffect(() => {
    if (viewMode === 'code' && activeLineRef.current) {
      activeLineRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [currentIndex, viewMode]);

  let activeChar = '';
  if (mode === 'intro') {
    if (introStep === 0) activeChar = lesson.targetKeys?.[0] || 'f';
    else if (introStep === 1) activeChar = lesson.targetKeys?.[1] || 'j';
    else activeChar = '';
  } else {
    activeChar = tokens[currentIndex] || '';
  }

  const handleReset = () => {
    setCurrentIndex(0);
    setTokenStatuses(new Array(tokens.length).fill('pending'));
    setErrors(0);
    setTotalKeystrokes(0);
    setHasStarted(false);
    setStartTime(null);
    setLiveWpm(0);
    setLiveAccuracy(100);
    setElapsedSeconds(0);
    setStreak(0);
    setMaxStreak(0);
    setIsTyping(false);
    setHasError(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // 1. IME composition safety
      if (e.isComposing || e.keyCode === 229) return;

      // 2. Prevent default browser scrolling and tab navigation
      if (e.key === 'Tab' || e.key === ' ' || e.key === 'Backspace') e.preventDefault();
      if (e.key === 'Enter' && mode === 'practice') e.preventDefault();
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      const key = e.key;
      const keyDef = getKeyForChar(key, layout);
      if (keyDef) {
        setPressedKeyId(keyDef.id);
        setTimeout(() => setPressedKeyId(null), 120);
      }

      // 3. Escape key exits back to Map
      if (key === 'Escape') {
        e.preventDefault();
        onExit();
        return;
      }

      // 4. Filter non-printable modifier, navigation, and function keys from typo evaluation
      const nonPrintableKeys = [
        'Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 
        'Home', 'End', 'PageUp', 'PageDown', 'Insert', 'Delete',
        'NumLock', 'ScrollLock', 'Pause', 'ContextMenu',
        'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
        'Dead', 'Unidentified', 'Process', 'AltGraph'
      ];
      if (nonPrintableKeys.includes(key)) {
        return;
      }

      // 4. Handle Backspace in practice mode
      if (key === 'Backspace') {
        if (mode === 'practice' && tokenStatuses[currentIndex] === 'error') {
          const nextStatuses = [...tokenStatuses];
          nextStatuses[currentIndex] = 'pending';
          setTokenStatuses(nextStatuses);
          setHasError(false);
        }
        return;
      }

      setIsTyping(true);
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      typingTimerRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 750);

      if (mode === 'intro') {
        if (introStep === 0) {
          const target = lesson.targetKeys?.[0] || 'f';
          if (key === target || key.toLowerCase() === target.toLowerCase() || (target === ' ' && key === ' ') || (target === 'Enter' && key === 'Enter') || (target === 'Tab' && key === 'Tab')) {
            sound.playSuccessChime();
            lesson.targetKeys?.length > 1 ? setIntroStep(1) : setIntroStep(2);
          } else {
            sound.playErrorBuzz();
            setHasError(true);
            setTimeout(() => setHasError(false), 200);
            setErrorKeyId(keyDef?.id || null);
            setTimeout(() => setErrorKeyId(null), 200);
          }
        } else if (introStep === 1) {
          const target = lesson.targetKeys?.[1] || 'j';
          if (key === target || key.toLowerCase() === target.toLowerCase() || (target === ' ' && key === ' ') || (target === 'Enter' && key === 'Enter') || (target === 'Tab' && key === 'Tab')) {
            sound.playSuccessChime();
            setIntroStep(2);
          } else {
            sound.playErrorBuzz();
            setHasError(true);
            setTimeout(() => setHasError(false), 200);
            setErrorKeyId(keyDef?.id || null);
            setTimeout(() => setErrorKeyId(null), 200);
          }
        } else if (introStep === 2 && (key === 'Enter' || key === ' ')) {
          setMode('practice');
        }
        return;
      }

      if (currentIndex >= tokens.length) return;
      if (!hasStarted) {
        setHasStarted(true);
        setStartTime(Date.now());
      }
      setTotalKeystrokes(prev => prev + 1);

      const expectedChar = tokens[currentIndex];
      const isMatch = (key === expectedChar) || (key === 'Enter' && expectedChar === '\n') || (key === 'Tab' && expectedChar === '\t') || ((expectedChar === '’' || expectedChar === '‘') && key === "'") || ((expectedChar === '“' || expectedChar === '”') && key === '"') || ((expectedChar === '—' || expectedChar === '–') && key === '-') || ((expectedChar === '…') && key === '.') || ((expectedChar === '\u00A0') && key === ' ');

      const charKey = (expectedChar === '\n' ? 'enter' : expectedChar === '\t' ? 'tab' : expectedChar).toLowerCase();
      if (!keyStatsRef.current[charKey]) {
        keyStatsRef.current[charKey] = { hits: 0, misses: 0 };
      }

      if (isMatch) {
        sound.playKeyClick();
        setStreak(prev => {
          const next = prev + 1;
          setMaxStreak(m => Math.max(m, next));
          return next;
        });
        keyStatsRef.current[charKey].hits += 1;
        const nextStatuses = [...tokenStatuses];
        nextStatuses[currentIndex] = 'correct';
        setTokenStatuses(nextStatuses);
        const nextIdx = currentIndex + 1;
        setCurrentIndex(nextIdx);
        setLiveAccuracy(Math.round((nextIdx / (totalKeystrokes + 1)) * 100));

        if (nextIdx >= tokens.length) {
          const duration = Math.max(1, (Date.now() - (startTime || Date.now())) / 1000);
          const rawWpm = Math.round((tokens.length / 5) / (duration / 60));
          const accuracy = Math.round(((tokens.length - errors) / Math.max(1, totalKeystrokes + 1)) * 100);
          let stars = 3;
          if (accuracy >= 98 && rawWpm >= (lesson.goalWpm || 20)) stars = 5;
          else if (accuracy >= 95) stars = 4;
          else if (accuracy < 85) stars = 2;
          setTimeout(() => onComplete({ 
            wpm: Math.max(15, rawWpm), 
            accuracy: Math.max(70, accuracy), 
            stars, 
            points: 500 + stars * 100 + Math.max(0, (30 - Math.round(duration))) * 5, 
            time: Math.round(duration), 
            durationSeconds: Math.round(duration),
            errors,
            maxStreak: Math.max(maxStreak, streak + 1),
            lessonTitle: lesson.title,
            keyStats: { ...keyStatsRef.current }
          }), 350);
        }
      } else {
        sound.playErrorBuzz();
        setStreak(0);
        setHasError(true);
        setTimeout(() => setHasError(false), 250);
        keyStatsRef.current[charKey].misses += 1;
        const nextErrors = errors + 1;
        setErrors(nextErrors);
        setErrorKeyId(keyDef?.id || null);
        setTimeout(() => setErrorKeyId(null), 250);
        const nextStatuses = [...tokenStatuses];
        nextStatuses[currentIndex] = 'error';
        setTokenStatuses(nextStatuses);
        setLiveAccuracy(Math.round((currentIndex / (totalKeystrokes + 1)) * 100));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, [mode, introStep, currentIndex, tokens, tokenStatuses, hasStarted, startTime, errors, totalKeystrokes, streak, maxStreak, lesson, onComplete, layout]);

  const progressPercent = mode === 'intro' 
    ? (introStep === 0 ? 0 : introStep === 1 ? 50 : 100) 
    : Math.min(100, Math.round((currentIndex / Math.max(1, tokens.length)) * 100));
  
  const currentIntroKey = introStep === 0 ? lesson.targetKeys?.[0] : lesson.targetKeys?.[1];
  const activeIntroDef = getKeyForChar(currentIntroKey, layout);

  const codeLines = [];
  let lineChars = [];
  let lineStartIdx = 0;
  tokens.forEach((char, idx) => {
    lineChars.push({ char, index: idx, status: tokenStatuses[idx], isCurrent: idx === currentIndex, syntax: getSyntaxClass(char) });
    if (char === '\n') {
      codeLines.push({ lineNumber: codeLines.length + 1, startIdx: lineStartIdx, endIdx: idx, chars: lineChars });
      lineChars = [];
      lineStartIdx = idx + 1;
    }
  });
  if (lineChars.length > 0) codeLines.push({ lineNumber: codeLines.length + 1, startIdx: lineStartIdx, endIdx: tokens.length - 1, chars: lineChars });

  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] flex flex-col justify-between select-none py-3 px-3 sm:px-6 max-w-5xl mx-auto font-sans">
      
      {/* Top Retro OS Metrics & Navigation Window Card */}
      <div className="bg-white border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0_#0f172a] mb-3 overflow-hidden">
        
        {/* Window Top Title Strip */}
        <div className="bg-[#2c3e50] text-white px-3.5 py-1.5 flex items-center justify-between border-b-2 border-slate-900 font-mono text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-amber-400">✦</span>
            <span className="font-bold tracking-wider">TYPING_ENGINE.EXE // LESSON #{lesson.id}</span>
          </div>

          <div className="flex items-center space-x-1">
            <button className="w-4 h-4 bg-slate-700 border border-slate-900 rounded-xs flex items-center justify-center text-[9px] font-mono font-bold leading-none text-slate-300">_</button>
            <button className="w-4 h-4 bg-slate-700 border border-slate-900 rounded-xs flex items-center justify-center text-[8px] font-mono font-bold leading-none text-slate-300">□</button>
            <button onClick={onExit} className="w-4 h-4 bg-[#f87171] border border-slate-900 rounded-xs flex items-center justify-center text-[9px] font-mono font-bold leading-none text-slate-900">✕</button>
          </div>
        </div>

        <div className="p-3 bg-[#f8fafc] flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Back to Map & Lesson Title */}
          <div className="flex items-center space-x-3">
            <button 
              type="button"
              onClick={() => {
                sound.playKeyClick();
                onExit();
              }}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-900 font-mono text-xs font-bold border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Map</span>
            </button>

            <div>
              <div className="flex items-center space-x-1.5">
                <span className="px-2 py-0.2 rounded bg-slate-200 text-slate-800 font-mono text-[10px] font-bold border border-slate-400">
                  {lesson.stageTitle || lesson.stage || 'STAGE'}
                </span>
                <span className="px-2 py-0.2 rounded bg-[#1888ff] text-white font-mono text-[10px] font-bold border border-slate-900">
                  Lesson {lesson.id}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-black text-slate-900 font-display leading-tight truncate max-w-[200px] sm:max-w-xs md:max-w-md mt-0.5">
                {lesson.title}
              </h2>
            </div>
          </div>

          {/* Center: Live Performance Metrics & Animation Hub */}
          {mode === 'practice' && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              {/* KeyBot Mascot Companion */}
              <ReactiveMascot 
                isTyping={isTyping} 
                wpm={liveWpm} 
                hasError={hasError} 
                accuracy={liveAccuracy} 
                streak={streak} 
                compact={true} 
              />

              {/* Dynamic Tachometer Speedometer Gauge */}
              <SpeedometerGauge 
                wpm={liveWpm} 
                maxWpm={120} 
                compact={true} 
              />

              {/* Typing Combo Streak Tier Visualizer */}
              <TypingComboMeter 
                streak={streak} 
                maxStreak={maxStreak} 
                compact={true} 
              />

              {/* Solid Performance Metrics Hub */}
              <div className="flex items-center space-x-2 bg-slate-900 text-white rounded-xl px-3 py-1.5 border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] font-mono">
                {/* Accuracy Metric */}
                <div className="flex items-center space-x-1.5 px-1">
                  <Target className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 leading-none font-bold">ACC</span>
                    <span className={`font-black text-xs sm:text-sm leading-tight ${liveAccuracy >= 95 ? 'text-emerald-400' : liveAccuracy >= 85 ? 'text-amber-400' : 'text-rose-400'}`}>
                      {liveAccuracy}%
                    </span>
                  </div>
                </div>

                <div className="w-px h-5 bg-slate-700" />

                {/* Keystrokes Progress */}
                <div className="flex items-center space-x-1.5 px-1">
                  <Keyboard className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 leading-none font-bold">PROGRESS</span>
                    <span className="text-sky-300 font-bold text-xs leading-tight">
                      {currentIndex}<span className="text-slate-500 font-normal">/{tokens.length}</span>
                    </span>
                  </div>
                </div>

                <div className="w-px h-5 bg-slate-700" />

                {/* Live Timer */}
                <div className="flex items-center space-x-1.5 px-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 leading-none font-bold">TIME</span>
                    <span className="text-amber-300 font-bold text-xs leading-tight">
                      {formatTimer(elapsedSeconds)}
                    </span>
                  </div>
                </div>

                {errors > 0 && (
                  <>
                    <div className="w-px h-5 bg-slate-700" />
                    <div className="flex items-center space-x-1 text-rose-400 px-1 font-bold text-xs">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{errors}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Right: View switcher & Reset controls */}
          <div className="flex items-center space-x-2">
            {mode === 'practice' && (
              <button 
                type="button"
                onClick={() => {
                  sound.playKeyClick();
                  setViewMode(prev => prev === 'code' ? 'stream' : 'code');
                }}
                title={`Switch to ${viewMode === 'code' ? 'Stream' : 'Code Editor'} View`}
                className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-900 font-mono text-xs font-bold border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1.5"
              >
                {viewMode === 'code' ? <Code className="w-3.5 h-3.5 text-indigo-600" /> : <LayoutList className="w-3.5 h-3.5 text-sky-600" />}
                <span className="hidden md:inline">{viewMode === 'code' ? 'Code View' : 'Stream View'}</span>
              </button>
            )}

            <button 
              type="button"
              onClick={handleReset} 
              title="Restart Lesson"
              className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Dynamic Course Context Headers for Special Courses (Detective, Loanwords, Music, States) */}
      <CourseContextHeaders 
        lesson={lesson} 
        courseId={courseId || lesson.courseId} 
        programId={programId || lesson.programId} 
      />

      {/* Main Interactive Stage Area */}
      <div className="flex-1 flex flex-col items-center justify-center py-2">
        
        {/* Mode A: New Key Intro View */}
        {mode === 'intro' && (
          <div className="w-full max-w-2xl bg-white border-2 border-slate-900 rounded-2xl shadow-[6px_6px_0_#0f172a] text-center my-4 p-6 sm:p-8 animate-in fade-in zoom-in-95">
            {introStep < 2 ? (
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-md bg-[#1888ff] text-white font-mono text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] inline-flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>NEW KEY INTRODUCTION</span>
                </span>
                
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight font-display">
                  Type the{' '}
                  <span className="inline-flex items-center justify-center min-w-[3rem] h-11 px-3 rounded-xl bg-[#fef08a] text-slate-950 font-mono shadow-[3px_3px_0_#0f172a] mx-1 font-black text-xl border-2 border-slate-900">
                    {currentIntroKey === ' ' ? '␣ Space' : currentIntroKey === 'Enter' ? '↵ Enter' : currentIntroKey === 'Tab' ? '⇥ Tab' : currentIntroKey}
                  </span>{' '}
                  key using your{' '}
                  <span className="text-[#1888ff] underline decoration-amber-400 decoration-3 underline-offset-4">
                    {activeIntroDef?.finger ? activeIntroDef.finger.replace('-', ' ') : 'designated'}
                  </span>{' '}
                  finger.
                </h3>

                <p className="text-xs text-slate-600 max-w-md mx-auto font-medium">
                  Watch the keyboard and hand guide below to align your finger position accurately.
                </p>
              </div>
            ) : (
              <div className="space-y-5 animate-in zoom-in-95">
                <div className="w-14 h-14 rounded-2xl bg-[#48bb78] text-slate-950 border-2 border-slate-900 shadow-[4px_4px_0_#0f172a] flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight font-display">EXCELLENT!</h3>
                  <p className="text-xs text-slate-600 mt-1 font-medium">You've mastered the target keys for this section.</p>
                </div>

                <div className="flex items-center justify-center space-x-3">
                  {lesson.targetKeys?.map((k, i) => (
                    <div 
                      key={i} 
                      className="min-w-[4rem] h-14 px-3 rounded-xl bg-[#fef08a] border-2 border-slate-900 shadow-[3px_3px_0_#0f172a] flex items-center justify-center text-2xl font-black text-slate-950 font-mono"
                    >
                      {k === ' ' ? '␣' : k === 'Enter' ? '↵' : k === 'Tab' ? '⇥' : k}
                    </div>
                  ))}
                </div>

                <button 
                  type="button"
                  onClick={() => {
                    sound.playKeyClick();
                    setMode('practice');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#1888ff] hover:bg-[#38bdf8] text-white font-black text-xs sm:text-sm border-2 border-slate-900 shadow-[4px_4px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition-all inline-flex items-center space-x-2 uppercase font-display"
                >
                  <span>Start Practice</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mode B: Retro Code Editor View */}
        {mode === 'practice' && viewMode === 'code' && (
          <div className="w-full my-2 flex flex-col items-center max-w-4xl">
            <div className="w-full rounded-2xl shadow-[6px_6px_0_#0f172a] border-2 border-slate-900 bg-[#0f172a] text-slate-200 overflow-hidden font-mono">
              
              {/* Terminal Window Top Bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-[#1e293b] border-b-2 border-slate-900 select-none">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#f87171] border border-slate-900" />
                  <div className="w-3 h-3 rounded-full bg-[#fef08a] border border-slate-900" />
                  <div className="w-3 h-3 rounded-full bg-[#48bb78] border border-slate-900" />
                  <span className="text-slate-300 text-xs font-bold ml-2 flex items-center space-x-1.5">
                    <Terminal className="w-3.5 h-3.5 text-sky-400" />
                    <span>lesson_{lesson.id}.{lesson.renderEngine === 'code' ? 'src' : 'txt'}</span>
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-[11px] font-bold">
                  {tokens[currentIndex] === '\n' && (
                    <span className="px-2 py-0.5 rounded bg-sky-500 text-white border border-slate-900 shadow-[1px_1px_0_#0f172a] animate-pulse">
                      ↵ Press Enter
                    </span>
                  )}
                  {tokens[currentIndex] === '\t' && (
                    <span className="px-2 py-0.5 rounded bg-indigo-500 text-white border border-slate-900 shadow-[1px_1px_0_#0f172a] animate-pulse">
                      ⇥ Press Tab
                    </span>
                  )}
                  {tokens[currentIndex] === ' ' && (
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                      ␣ Space
                    </span>
                  )}
                </div>
              </div>

              {/* Code Editor Body */}
              <div 
                ref={editorScrollRef} 
                className="p-4 sm:p-5 max-h-[230px] sm:max-h-[270px] overflow-y-auto overflow-x-auto text-base sm:text-lg leading-relaxed whitespace-pre font-mono scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900"
              >
                {codeLines.map((line) => {
                  const isActiveLine = currentIndex >= line.startIdx && currentIndex <= line.endIdx;
                  return (
                    <div 
                      key={line.lineNumber} 
                      ref={isActiveLine ? activeLineRef : null} 
                      className={`flex items-start py-0.5 px-2 rounded-lg transition-colors duration-150 ${
                        isActiveLine 
                          ? 'bg-sky-500/15 border-l-4 border-sky-400' 
                          : 'border-l-4 border-transparent'
                      }`}
                    >
                      {/* Line Number */}
                      <span className={`w-8 text-right pr-3 select-none text-xs sm:text-sm font-mono pt-1 ${
                        isActiveLine ? 'text-sky-400 font-bold' : 'text-slate-600'
                      }`}>
                        {line.lineNumber}
                      </span>

                      {/* Characters on this line */}
                      <div className="flex-1 flex flex-wrap items-center">
                        {line.chars.map((item) => {
                          const { char, index, status, isCurrent, syntax } = item;
                          
                          if (char === '\n') {
                            return (
                              <span key={index} className="inline-flex items-center ml-1">
                                {isCurrent ? (
                                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-[#1888ff] text-white text-xs font-black border-2 border-white shadow-[2px_2px_0_#0f172a] animate-pulse">
                                    <span>↵ Enter</span>
                                  </span>
                                ) : status === 'correct' ? (
                                  <span className="text-emerald-400/50 text-xs select-none">↵</span>
                                ) : status === 'error' ? (
                                  <span className="bg-rose-500 text-white text-xs px-1 rounded font-bold animate-error-shake">↵</span>
                                ) : (
                                  <span className="text-slate-700 text-xs select-none">↵</span>
                                )}
                              </span>
                            );
                          }

                          if (char === '\t') {
                            return (
                              <span key={index} className="inline-flex items-center">
                                {isCurrent ? (
                                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-indigo-500 text-white text-xs font-black border-2 border-white shadow-[2px_2px_0_#0f172a] animate-pulse w-10 justify-center">
                                    <span>⇥ Tab</span>
                                  </span>
                                ) : status === 'correct' ? (
                                  <span className="inline-block w-8 text-emerald-400/50 text-xs select-none">⇥···</span>
                                ) : status === 'error' ? (
                                  <span className="inline-block w-8 bg-rose-500 text-white text-xs text-center rounded font-bold animate-error-shake">⇥</span>
                                ) : (
                                  <span className="inline-block w-8 text-slate-700 text-xs select-none">⇥···</span>
                                )}
                              </span>
                            );
                          }

                          if (char === ' ') {
                            return isCurrent ? (
                              <span key={index} className="inline-block w-3.5 h-6 text-center text-xs bg-[#1888ff] text-white rounded font-black border border-white shadow-[1px_1px_0_#0f172a] animate-pulse align-middle">
                                ␣
                              </span>
                            ) : status === 'error' ? (
                              <span key={index} className="inline-block w-3.5 h-6 text-center text-xs bg-rose-500 text-white rounded font-bold ring-2 ring-rose-400 animate-error-shake align-middle">
                                ␣
                              </span>
                            ) : (
                              <span key={index} className={`inline-block w-2.5 ${status === 'correct' ? 'text-emerald-400/60 font-bold' : ''}`}>
                                {' '}
                              </span>
                            );
                          }

                          let charClasses = status === 'correct'
                            ? 'text-emerald-400 font-bold'
                            : isCurrent
                            ? 'bg-[#1888ff] text-white font-black rounded px-1 -mx-0.5 border border-white shadow-[2px_2px_0_#0f172a] scale-110 inline-block z-10 animate-pulse'
                            : status === 'error'
                            ? 'bg-rose-500 text-white font-black rounded px-1 -mx-0.5 border border-white shadow-[2px_2px_0_#0f172a] inline-block animate-error-shake'
                            : (syntax === 'curly' ? 'text-amber-400 font-bold bg-amber-400/10 px-0.5 rounded border border-amber-400/20'
                            : syntax === 'round' ? 'text-sky-300 font-bold bg-sky-400/10 px-0.5 rounded border border-sky-400/20'
                            : syntax === 'square' ? 'text-fuchsia-400 font-bold bg-fuchsia-400/10 px-0.5 rounded border border-fuchsia-400/20'
                            : syntax === 'angle' ? 'text-emerald-300 font-bold bg-emerald-400/10 px-0.5 rounded border border-emerald-400/20'
                            : syntax === 'semicolon' ? 'text-rose-400 font-black bg-rose-500/15 px-0.5 rounded border border-rose-500/30'
                            : syntax === 'colon' ? 'text-indigo-300 font-bold'
                            : syntax === 'operator' ? 'text-teal-300 font-bold'
                            : syntax === 'number' ? 'text-orange-300 font-semibold'
                            : syntax === 'quote' ? 'text-lime-300 font-medium'
                            : 'text-slate-300');

                          return (
                            <span key={index} className={`transition-all duration-75 ${charClasses}`}>
                              {char}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Mode C: Retro Stream Window View */}
        {mode === 'practice' && viewMode === 'stream' && (
          <div className="w-full my-4 flex flex-col items-center">
            <div ref={containerRef} className="flex items-center space-x-2 overflow-hidden py-4 px-2 max-w-full">
              {tokens.slice(Math.max(0, currentIndex - 2), Math.max(0, currentIndex - 2) + 12).map((char, relativeIdx) => {
                const actualIdx = Math.max(0, currentIndex - 2) + relativeIdx;
                const isCurrent = actualIdx === currentIndex;
                const status = tokenStatuses[actualIdx];
                const syntax = getSyntaxClass(char);
                return (
                  <div 
                    key={actualIdx} 
                    className={`relative w-12 h-14 sm:w-14 sm:h-16 rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-mono font-black transition-all duration-150 border-2 border-slate-900 ${
                      status === 'correct' 
                        ? 'bg-[#ecfdf5] text-emerald-800 shadow-[2px_2px_0_#0f172a]' 
                        : isCurrent 
                        ? 'bg-[#fef08a] text-slate-950 scale-105 shadow-[4px_4px_0_#0f172a] -translate-y-1' 
                        : status === 'error' 
                        ? 'bg-rose-100 text-rose-800 shadow-[2px_2px_0_#0f172a] animate-error-shake' 
                        : 'bg-white text-slate-700 shadow-[2px_2px_0_#0f172a]'
                    }`}
                  >
                    {status === 'correct' && (
                      <div className="absolute -top-2 text-slate-900 bg-[#48bb78] border border-slate-900 rounded-full p-0.5 shadow-sm">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                    {isCurrent && (
                      <div className="absolute bottom-0 inset-x-0 h-1.5 bg-[#1888ff] rounded-b-lg" />
                    )}
                    <span className={`${char === '\n' || char === '\t' ? 'text-xl sm:text-2xl font-sans' : ''} ${status === 'pending' && syntax === 'curly' ? 'text-amber-600' : ''} ${status === 'pending' && syntax === 'round' ? 'text-sky-600' : ''} ${status === 'pending' && syntax === 'square' ? 'text-fuchsia-600' : ''} ${status === 'pending' && syntax === 'angle' ? 'text-emerald-600' : ''} ${status === 'pending' && syntax === 'semicolon' ? 'text-rose-600' : ''} ${status === 'pending' && syntax === 'operator' ? 'text-teal-600' : ''}`}>
                      {char === ' ' ? '␣' : char === '\n' ? '↵' : char === '\t' ? '⇥' : char}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {tokens[currentIndex] === '\n' && (
              <span className="px-3 py-1 rounded-lg bg-[#1888ff] text-white font-mono text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] mt-1 animate-pulse">
                ↵ Press Enter to continue to next line
              </span>
            )}
            {tokens[currentIndex] === '\t' && (
              <span className="px-3 py-1 rounded-lg bg-indigo-500 text-white font-mono text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] mt-1 animate-pulse">
                ⇥ Press Tab for code indentation
              </span>
            )}
          </div>
        )}

        {/* Virtual Keyboard and Tactile Hand Guide */}
        {keyboardEnabled && (
          <div className="w-full flex flex-col items-center">
            <VirtualKeyboard 
              activeChar={activeChar} 
              pressedKeyId={pressedKeyId} 
              errorKeyId={errorKeyId} 
              layout={layout} 
              theme={theme} 
            />
          </div>
        )}

        {handsEnabled && keyboardEnabled && (
          <HandGuide 
            activeChar={activeChar} 
            layout={layout} 
          />
        )}
      </div>

      {/* Bottom Retro Action & Progress Bar */}
      <div className="bg-white border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0_#0f172a] p-3 mt-3">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => { 
              sound.playKeyClick();
              if (mode === 'practice' && lesson.type === 'intro') { 
                setMode('intro'); 
                setIntroStep(0); 
              } 
            }}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-900 font-mono text-xs font-bold border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            Previous
          </button>

          {/* Retro Striped Progress Bar */}
          <div className="flex-1 max-w-md h-3.5 bg-slate-100 rounded-md border-2 border-slate-900 overflow-hidden p-0.5">
            <div 
              className="h-full rounded-xs bg-[#48bb78]"
              style={{ 
                width: `${progressPercent}%`,
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 6px)'
              }}
            />
          </div>

          <button
            type="button"
            onClick={() => { 
              sound.playKeyClick();
              if (mode === 'intro') { 
                setMode('practice'); 
              } else { 
                onComplete({ 
                  wpm: Math.max(25, liveWpm || 25), 
                  accuracy: Math.max(90, liveAccuracy || 98), 
                  stars: 5, 
                  points: 560, 
                  time: elapsedSeconds || 14, 
                  durationSeconds: elapsedSeconds || 14,
                  errors: errors || 0,
                  lessonTitle: lesson.title,
                  keyStats: { ...keyStatsRef.current }
                }); 
              } 
            }}
            className="px-3 py-1.5 rounded-lg bg-[#fef08a] hover:bg-yellow-300 text-slate-950 font-mono text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}

