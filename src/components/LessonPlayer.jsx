import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  ArrowLeft, 
  RotateCcw, 
  Check, 
  AlertTriangle, 
  Keyboard, 
  Code, 
  LayoutList,
  Terminal,
  Clock,
  Target,
  Sparkles,
  Volume2,
  VolumeX
} from 'lucide-react';
import VirtualKeyboard from './VirtualKeyboard';
import NewKeyIntro from './NewKeyIntro';
import CourseContextHeaders from './CourseContextHeaders';
import { sound } from '../utils/audio';
import { getKeyForChar } from '../data/keyboardLayout';
import { calculateStarsFromAttempt } from '../utils/storage';

function formatTimer(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default function LessonPlayer({ 
  lesson = {}, 
  course = {},
  courseId,
  programId,
  onComplete, 
  onExit,
  layout = 'qwerty',
  keyboardEnabled: initialKeyboard = true,
  handsEnabled: initialHands = true,
  theme = 'bone'
}) {
  const [mode, setMode] = useState('practice');
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
  const [keyboardEnabled, setKeyboardEnabled] = useState(initialKeyboard);
  const [handsEnabled, setHandsEnabled] = useState(initialHands);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [viewMode, setViewMode] = useState('stream');

  const containerRef = useRef(null);
  const keyStatsRef = useRef({});
  const typingTimerRef = useRef(null);

  // Initialize lesson
  useEffect(() => {
    const text = lesson.text || "ffff jjjj ff jj fff jjj fj fj jjf";
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
    keyStatsRef.current = {};

    const rawTitle = (lesson.title || '').toLowerCase();
    const isIntroApplicable = 
      lesson.type === 'intro' || 
      lesson.type === 'keys' || 
      lesson.hasIntro ||
      /^(?:Keys?|Space\s*Bar|The\s*Shift\s*Key)/i.test(lesson.title || '') ||
      Array.isArray(lesson.introSequence);

    if (isIntroApplicable && !lesson.skipIntro) {
      setMode('intro');
    } else {
      setMode('practice');
    }

    const isCodeCourse = courseId === 'syntax-forge' || lesson.renderEngine === 'code';
    setViewMode(isCodeCourse ? 'code' : 'stream');
  }, [lesson, courseId]);

  // Live Timer & WPM
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

  // Reset practice drill
  const handleReset = () => {
    sound.playKeyClick();
    setCurrentIndex(0);
    setTokenStatuses(new Array(tokens.length).fill('pending'));
    setErrors(0);
    setTotalKeystrokes(0);
    setHasStarted(false);
    setStartTime(null);
    setLiveWpm(0);
    setLiveAccuracy(100);
    setElapsedSeconds(0);
    keyStatsRef.current = {};
  };

  // Keyboard Event Handler for Practice Mode
  useEffect(() => {
    if (mode !== 'practice') return;

    const handleKeyDown = (e) => {
      // 1. Let system shortcuts pass through
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const key = e.key;

      // 2. Prevent default browser behavior for practice keys
      if (key === ' ' || key === 'Tab' || key === 'Backspace') {
        e.preventDefault();
      }

      // 3. Highlight virtual keyboard keycap
      const keyDef = getKeyForChar(key, layout);
      if (keyDef) {
        setPressedKeyId(keyDef.id);
        setTimeout(() => setPressedKeyId(null), 120);
      }

      // 4. Ignore non-printable modifier & function keys
      const nonPrintableKeys = [
        'Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 
        'Home', 'End', 'PageUp', 'PageDown', 'Insert', 'Delete',
        'NumLock', 'ScrollLock', 'Pause', 'ContextMenu',
        'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
        'Dead', 'Unidentified', 'Process', 'AltGraph'
      ];
      if (nonPrintableKeys.includes(key)) return;

      if (currentIndex >= tokens.length) return;

      if (!hasStarted) {
        setHasStarted(true);
        setStartTime(Date.now());
      }
      setTotalKeystrokes(prev => prev + 1);

      const expectedChar = tokens[currentIndex];
      const isMatch = 
        (key === expectedChar) || 
        (key === 'Enter' && expectedChar === '\n') || 
        (key === 'Tab' && expectedChar === '\t') || 
        ((expectedChar === '’' || expectedChar === '‘') && key === "'") || 
        ((expectedChar === '“' || expectedChar === '”') && key === '"') || 
        ((expectedChar === '—' || expectedChar === '–') && key === '-') || 
        ((expectedChar === '…') && key === '.') || 
        ((expectedChar === '\u00A0') && key === ' ');

      const charKey = (expectedChar === '\n' ? 'enter' : expectedChar === '\t' ? 'tab' : expectedChar).toLowerCase();
      if (!keyStatsRef.current[charKey]) {
        keyStatsRef.current[charKey] = { hits: 0, misses: 0 };
      }

      if (isMatch) {
        sound.playKeyClick();
        keyStatsRef.current[charKey].hits += 1;
        
        const nextStatuses = [...tokenStatuses];
        nextStatuses[currentIndex] = 'correct';
        setTokenStatuses(nextStatuses);

        const nextIdx = currentIndex + 1;
        setCurrentIndex(nextIdx);
        setLiveAccuracy(Math.round((nextIdx / (totalKeystrokes + 1)) * 100));

        // Lesson finished!
        if (nextIdx >= tokens.length) {
          const duration = Math.max(1, (Date.now() - (startTime || Date.now())) / 1000);
          const durationMin = Math.max(0.01, duration / 60);
          const grossWpm = Math.round((tokens.length / 5) / durationMin);
          const netWpm = Math.max(0, Math.round(((tokens.length / 5) - errors) / durationMin));
          const totalTaps = totalKeystrokes + 1;
          const accuracy = Math.min(100, Math.max(0, Math.round(((totalTaps - errors) / totalTaps) * 100)));
          const stars = calculateStarsFromAttempt({
            wpm: netWpm,
            accuracy,
            goalWpm: lesson.goalWpm || 15,
            minWpm: lesson.minWpm || null,
            minAccuracy: lesson.minAccuracy || 80
          });

          setTimeout(() => {
            onComplete({ 
              wpm: netWpm, 
              grossWpm,
              accuracy, 
              stars, 
              points: Math.max(50, 400 + stars * 120 + netWpm * 5), 
              time: Math.round(duration), 
              durationSeconds: Math.round(duration),
              errors,
              lessonTitle: lesson.title,
              keyStats: { ...keyStatsRef.current }
            });
          }, 300);
        }
      } else {
        sound.playErrorBuzz();
        keyStatsRef.current[charKey].misses += 1;
        const nextErrors = errors + 1;
        setErrors(nextErrors);
        setErrorKeyId(keyDef?.id || null);
        setTimeout(() => setErrorKeyId(null), 200);

        const nextStatuses = [...tokenStatuses];
        nextStatuses[currentIndex] = 'error';
        setTokenStatuses(nextStatuses);
        setLiveAccuracy(Math.round((currentIndex / (totalKeystrokes + 1)) * 100));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, currentIndex, tokens, tokenStatuses, hasStarted, startTime, errors, totalKeystrokes, lesson, onComplete, layout]);

  // Target Key for Virtual Keyboard highlighting
  const activeChar = mode === 'practice' && currentIndex < tokens.length ? tokens[currentIndex] : 'f';

  // Progress percentage
  const progressPercent = Math.min(100, Math.round((currentIndex / Math.max(1, tokens.length)) * 100));

  // Parse text into lines for multi-line stream rendering
  const lines = useMemo(() => {
    const res = [];
    let currentLine = [];
    tokens.forEach((char, idx) => {
      currentLine.push({ char, idx, status: tokenStatuses[idx], isCurrent: idx === currentIndex });
      if (char === '\n') {
        res.push(currentLine);
        currentLine = [];
      }
    });
    if (currentLine.length > 0) res.push(currentLine);
    return res;
  }, [tokens, tokenStatuses, currentIndex]);

  // If in New Key Intro mode, render the authentic EdClub-style Introduction page
  if (mode === 'intro') {
    return (
      <NewKeyIntro
        lesson={lesson}
        layout={layout}
        onFinish={() => {
          sound.playKeyClick();
          setMode('practice');
        }}
        onExit={onExit}
      />
    );
  }

  return (
    <div className="w-full flex flex-col justify-between py-2 px-2 sm:px-6 max-w-5xl mx-auto font-sans select-none animate-in fade-in duration-200">
      
      {/* Top Header Bar: Clean & Minimal (Back button, Title, Tools, Stats) */}
      <div className="flex items-center justify-between border-b border-[#2D2319]/15 pb-2.5 mb-4">
        
        {/* Left: Back to Map & Title */}
        <div className="flex items-center space-x-3">
          <button 
            type="button"
            onClick={() => {
              sound.playKeyClick();
              onExit();
            }}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#2D2319] font-mono text-xs font-bold border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Map</span>
          </button>

          <div className="flex items-center space-x-2 font-mono text-xs font-bold text-[#2D2319]">
            <span className="px-2 py-0.5 rounded-md bg-[#C7E8CA] border border-[#2D2319]">
              Lesson {lesson.id}
            </span>
            <span className="font-bold text-sm hidden md:inline truncate max-w-xs">
              {lesson.title}
            </span>
          </div>
        </div>

        {/* Center / Right: Minimalist Tools & Live Stats */}
        <div className="flex items-center space-x-2.5 font-mono text-xs">
          
          {/* Target Keys Badge */}
          {lesson.keys && lesson.keys.length > 0 && (
            <div className="hidden sm:flex items-center space-x-1 px-2.5 py-1 bg-white border border-[#2D2319] rounded-lg font-mono text-xs text-slate-700">
              <span className="text-slate-400 font-bold">KEYS:</span>
              <span className="font-bold text-slate-900 font-mono">( {lesson.keys.filter(k => k !== ' ' && k !== '\n').join(' ')} )</span>
            </div>
          )}

          {/* Minimal Live Stats Pill */}
          <div className="flex items-center space-x-3 px-3 py-1 bg-slate-900 text-white rounded-lg border-2 border-slate-900 shadow-[1px_1px_0_#0f172a] text-xs">
            <div className="flex items-center space-x-1 text-emerald-400 font-bold">
              <span>{liveAccuracy}%</span>
            </div>
            <div className="w-px h-3.5 bg-slate-700" />
            <div className="flex items-center space-x-1 text-sky-300 font-bold">
              <span>{currentIndex}/{tokens.length}</span>
            </div>
            <div className="w-px h-3.5 bg-slate-700" />
            <div className="flex items-center space-x-1 text-amber-300 font-bold">
              <span>{formatTimer(elapsedSeconds)}</span>
            </div>
          </div>

          {/* Restart Button */}
          <button 
            type="button"
            onClick={handleReset} 
            title="Restart Lesson"
            className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-[#2D2319] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Keyboard Toggle */}
          <button 
            type="button"
            onClick={() => setKeyboardEnabled(prev => !prev)} 
            title={keyboardEnabled ? 'Hide Keyboard' : 'Show Keyboard'}
            className={`p-1.5 rounded-lg border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer ${
              keyboardEnabled ? 'bg-[#C7E8CA] text-[#2D2319]' : 'bg-white text-slate-400'
            }`}
          >
            <Keyboard className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Dynamic Course Context Headers (if applicable) */}
      <CourseContextHeaders 
        lesson={lesson} 
        courseId={courseId || lesson.courseId} 
        programId={programId || lesson.programId} 
      />

      {/* CENTER STAGE: CLEAN MULTI-LINE TYPING PRACTICE (Matching Image 5) */}
      <div className="my-auto py-6 sm:py-8 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        
        <div className="w-full bg-white/60 p-6 sm:p-8 rounded-2xl border-2 border-slate-200/80 shadow-sm relative font-mono text-2xl sm:text-3xl leading-loose tracking-widest text-left select-none">
          
          {lines.map((line, lineIdx) => (
            <div key={lineIdx} className="flex flex-wrap items-center my-1.5 relative">
              {line.map(({ char, idx, status, isCurrent }) => {
                const isFirstPending = isCurrent && !hasStarted;

                return (
                  <span key={idx} className="relative inline-block">
                    
                    {/* Floating Blue "Start Typing" Tooltip Bubble on First Key */}
                    {isFirstPending && (
                      <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#1888ff] text-white text-[11px] font-bold font-mono px-2.5 py-0.5 rounded-md shadow-md whitespace-nowrap animate-bounce z-20">
                        Start Typing
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1888ff] rotate-45" />
                      </div>
                    )}

                    {/* Character Renderer */}
                    <span 
                      className={`inline-block transition-colors duration-75 relative ${
                        char === ' ' ? 'w-4 sm:w-5' : ''
                      } ${
                        status === 'correct'
                          ? 'text-slate-800 font-bold'
                          : status === 'error'
                          ? 'text-rose-600 bg-rose-100 rounded px-0.5'
                          : isCurrent
                          ? 'text-slate-950 font-black'
                          : 'text-slate-400'
                      }`}
                    >
                      {char === '\n' ? '' : char}

                      {/* Solid Blue Underline Cursor */}
                      {isCurrent && (
                        <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#1888ff] rounded-full animate-pulse" />
                      )}
                    </span>

                  </span>
                );
              })}
            </div>
          ))}

        </div>

      </div>

      {/* VIRTUAL KEYBOARD & HANDS GUIDE */}
      {keyboardEnabled && (
        <div className="w-full max-w-[680px] mx-auto transition-all duration-300 my-auto">
          <VirtualKeyboard 
            activeChar={activeChar} 
            pressedKeyId={pressedKeyId} 
            errorKeyId={errorKeyId} 
            layout={layout} 
            theme={theme}
            showHands={handsEnabled}
            handFilter={lesson.hand || 'both'}
          />
        </div>
      )}

      {/* BOTTOM PROGRESS BAR */}
      <div className="w-full max-w-xl mx-auto pt-4 pb-2 select-none">
        <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-300 shadow-inner">
          <div 
            className="h-full bg-emerald-400 rounded-full transition-all duration-300"
            style={{ width: `${Math.max(3, progressPercent)}%` }}
          />
        </div>
      </div>

    </div>
  );
}
