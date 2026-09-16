import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  ArrowLeft, 
  RotateCcw, 
  Check, 
  AlertTriangle, 
  Keyboard, 
  Hand,
  Sparkles,
  Volume2,
  VolumeX,
  Layers,
  ChevronDown,
  Palette,
  Settings,
  Bot,
  Flame
} from 'lucide-react';
import VirtualKeyboard from './VirtualKeyboard';
import HandGuide from './HandGuide';
import NewKeyIntro from './NewKeyIntro';
import CourseContextHeaders from './CourseContextHeaders';
import AnimatedCoach from './coach/AnimatedCoach';
import { sound } from '../utils/audio';
import { getKeyForChar } from '../data/keyboardLayout';
import { calculateStarsFromAttempt } from '../utils/storage';
import { formatDrillText } from '../utils/lessonFormat';

function formatTimer(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}


// 12 Theme Presets with high-contrast icon and color palette
const THEME_PRESETS = [
  { id: 'bone', name: 'Vintage 90s', bg: '#B9D2E8', icon: '🚗' },
  { id: 'vintage', name: 'Mac Classic Paper', bg: '#F7F1E1', icon: '🦊' },
  { id: 'neo-mint', name: 'Neo Mint', bg: '#D4E8DC', icon: '✈️' },
  { id: 'lavender', name: 'Pastel Dreamscape', bg: '#E3D7F4', icon: '🐦' },
  { id: 'bubblegum', name: 'Bubblegum Pink', bg: '#FDE2E4', icon: '🐧' },
  { id: 'campfire', name: 'Campfire Night', bg: '#1e293b', icon: '🔥' },
  { id: 'space', name: 'Deep Space', bg: '#0f172a', icon: '👨‍🚀' },
  { id: 'robots-dark', name: 'Dark Robots', bg: '#18181b', icon: '🤖' },
  { id: 'matrix', name: 'Matrix Terminal', bg: '#022c22', icon: '📟' },
  { id: 'robots-green', name: 'Light Green Robots', bg: '#f0fdf4', icon: '🦾' },
  { id: 'robots-blue', name: 'Light Blue Robots', bg: '#f0f9ff', icon: '⚙️' },
  { id: 'tea-fox', name: 'Cozy Tea Fox', bg: '#fef3c7', icon: '🐕' },
];

// 8 Keycap Style Presets with 2x2 miniature previews
const KEYCAP_STYLES = [
  {
    id: 'standard',
    name: 'Standard',
    previewContainerClass: 'bg-slate-100 border border-slate-300',
    qKeyClass: 'bg-white border border-slate-300 text-slate-700 rounded-xs',
    wKeyClass: 'bg-white border border-slate-300 text-slate-700 rounded-xs',
    aKeyClass: 'bg-white border border-slate-300 text-slate-700 rounded-xs',
    sKeyClass: 'bg-white border border-slate-300 text-slate-700 rounded-xs',
  },
  {
    id: 'glass',
    name: 'Glass',
    previewContainerClass: 'bg-sky-100/60 border border-sky-200',
    qKeyClass: 'bg-white/80 border border-sky-300 text-sky-900 rounded-sm',
    wKeyClass: 'bg-white/80 border border-sky-300 text-sky-900 rounded-sm',
    aKeyClass: 'bg-white/80 border border-sky-300 text-sky-900 rounded-sm',
    sKeyClass: 'bg-white/80 border border-sky-300 text-sky-900 rounded-sm',
  },
  {
    id: 'wobbly',
    name: 'Wobbly',
    previewContainerClass: 'bg-slate-50 border-2 border-slate-400',
    qKeyClass: 'bg-white border-2 border-slate-600 text-slate-900 rounded-md font-serif',
    wKeyClass: 'bg-white border-2 border-slate-600 text-slate-900 rounded-md font-serif',
    aKeyClass: 'bg-white border-2 border-slate-600 text-slate-900 rounded-md font-serif',
    sKeyClass: 'bg-white border-2 border-slate-600 text-slate-900 rounded-md font-serif',
  },
  {
    id: 'cartoon',
    name: 'Cartoon',
    previewContainerClass: 'bg-amber-50 border-2 border-black',
    qKeyClass: 'bg-white border-2 border-black text-black font-black rounded-xs',
    wKeyClass: 'bg-white border-2 border-black text-black font-black rounded-xs',
    aKeyClass: 'bg-white border-2 border-black text-black font-black rounded-xs',
    sKeyClass: 'bg-white border-2 border-black text-black font-black rounded-xs',
  },
  {
    id: 'marble',
    name: 'Marble',
    previewContainerClass: 'bg-slate-200 border border-slate-400',
    qKeyClass: 'bg-slate-100 border border-slate-400 text-slate-800 rounded-xs',
    wKeyClass: 'bg-slate-100 border border-slate-400 text-slate-800 rounded-xs',
    aKeyClass: 'bg-slate-100 border border-slate-400 text-slate-800 rounded-xs',
    sKeyClass: 'bg-slate-100 border border-slate-400 text-slate-800 rounded-xs',
  },
  {
    id: 'classic',
    name: 'Classic',
    previewContainerClass: 'bg-[#d6cbba] border border-[#a89b88]',
    qKeyClass: 'bg-[#ede5d8] border border-[#b5a794] text-[#3d3124] rounded-xs',
    wKeyClass: 'bg-[#ede5d8] border border-[#b5a794] text-[#3d3124] rounded-xs',
    aKeyClass: 'bg-[#ede5d8] border border-[#b5a794] text-[#3d3124] rounded-xs',
    sKeyClass: 'bg-[#ede5d8] border border-[#b5a794] text-[#3d3124] rounded-xs',
  },
  {
    id: 'modern',
    name: 'Modern',
    previewContainerClass: 'bg-slate-100 border border-slate-200',
    qKeyClass: 'bg-white text-slate-500 rounded-sm shadow-xs',
    wKeyClass: 'bg-white text-slate-500 rounded-sm shadow-xs',
    aKeyClass: 'bg-white text-slate-500 rounded-sm shadow-xs',
    sKeyClass: 'bg-white text-slate-500 rounded-sm shadow-xs',
  },
  {
    id: 'colorful',
    name: 'Colorful',
    previewContainerClass: 'bg-slate-100 border border-slate-300',
    qKeyClass: 'bg-sky-200 border border-sky-400 text-sky-800 font-bold rounded-xs',
    wKeyClass: 'bg-lime-200 border border-lime-400 text-lime-800 font-bold rounded-xs',
    aKeyClass: 'bg-amber-200 border border-amber-400 text-amber-800 font-bold rounded-xs',
    sKeyClass: 'bg-rose-200 border border-rose-400 text-rose-800 font-bold rounded-xs',
  },
];

// Dynamic stage font scaling configuration (TypingClub/EdClub Authentic Scaling)
const FONT_SIZES = {
  small: {
    fontSizeClass: 'text-base sm:text-lg md:text-xl',
    cellHeight: 'h-7 sm:h-8',
    underlineHeight: 'h-[2px] sm:h-[2.5px]',
    lineMargin: 'my-1 sm:my-1.5'
  },
  normal: {
    fontSizeClass: 'text-lg sm:text-2xl md:text-3xl',
    cellHeight: 'h-8 sm:h-9 md:h-10',
    underlineHeight: 'h-[2.5px] sm:h-[3px]',
    lineMargin: 'my-1.5 sm:my-2'
  },
  large: {
    fontSizeClass: 'text-xl sm:text-3xl md:text-4xl',
    cellHeight: 'h-9 sm:h-11 md:h-12',
    underlineHeight: 'h-[3px] sm:h-[3.5px]',
    lineMargin: 'my-2 sm:my-2.5'
  },
  xlarge: {
    fontSizeClass: 'text-2xl sm:text-4xl md:text-5xl',
    cellHeight: 'h-11 sm:h-13 md:h-14',
    underlineHeight: 'h-[3.5px] sm:h-[4px]',
    lineMargin: 'my-2.5 sm:my-3'
  },
  accessible: {
    fontSizeClass: 'text-xl sm:text-3xl md:text-4xl',
    cellHeight: 'h-9 sm:h-11 md:h-12',
    underlineHeight: 'h-[3px] sm:h-[3.5px]',
    lineMargin: 'my-2 sm:my-2.5'
  }
};

// Reusable iOS / EdClub toggle switch
function ToggleSwitch({ enabled, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`w-11 h-6 rounded-full p-0.5 transition-all cursor-pointer relative active:scale-95 active:translate-y-0.5 ${
        enabled ? 'bg-[#1888ff]' : 'bg-slate-300'
      }`}
    >
      <div
        className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

export default function LessonPlayer({ 
  lesson = {}, 
  course = {},
  courseId,
  programId,
  onComplete, 
  onExit,
  layout: initialLayout = 'qwerty',
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

  // Popover Menu Control ('settings' | 'appearance' | 'audio' | 'keyboard' | 'hand' | null)
  const [activeMenu, setActiveMenu] = useState(null);

  // Settings Popover States (Image 1)
  const [liveStatsEnabled, setLiveStatsEnabled] = useState(true);
  const [wordSpeedEnabled, setWordSpeedEnabled] = useState(true);
  const [blockOnError, setBlockOnError] = useState(false);
  const [blockThreshold, setBlockThreshold] = useState(2); // 1 | 2 | 3 strikes

  // Appearance Popover States (Image 2)
  const [fontSize, setFontSize] = useState('normal'); // 'small' | 'normal' | 'large' | 'xlarge'
  const [accessibleFontSize, setAccessibleFontSize] = useState(false);
  const [fontFace, setFontFace] = useState('Droid Sans Mono, monospace');
  const [activeThemeId, setActiveThemeId] = useState(theme || 'bone');

  // Audio / Voice Popover States (Image 3)
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [voiceOver, setVoiceOver] = useState(false);
  const [voiceNarrator, setVoiceNarrator] = useState('default');
  const [readLetters, setReadLetters] = useState(false);
  const [fullyGuided, setFullyGuided] = useState(false);
  const [soundVolume, setSoundVolume] = useState(0.8);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [speechPitch, setSpeechPitch] = useState(1.0);
  const [availableVoices, setAvailableVoices] = useState([]);

  // Keyboard Popover States (Image 4)
  const [keyboardEnabled, setKeyboardEnabled] = useState(initialKeyboard);
  const [keyboardLayout, setKeyboardLayout] = useState(initialLayout || 'qwerty');
  const [keycapStyle, setKeycapStyle] = useState('standard');

  // Hand Guide States
  const [handsEnabled, setHandsEnabled] = useState(initialHands);
  const [handFilter, setHandFilter] = useState('both'); // 'both' | 'left' | 'right'

  // Streak & Coach Mascot States
  const [currentStreak, setCurrentStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [coachEnabled, setCoachEnabled] = useState(true);
  const [coachState, setCoachState] = useState('idle'); // 'idle' | 'focus' | 'streak' | 'error' | 'victory'
  const [currentTip, setCurrentTip] = useState(null);

  const toolbarClusterRef = useRef(null);
  const keyStatsRef = useRef({});
  const charErrorsRef = useRef(0);
  const coachErrorTimeoutRef = useRef(null);

  // Close any active popover on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (toolbarClusterRef.current && !toolbarClusterRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Web Speech API Voice discovery
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const updateVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) setAvailableVoices(v);
    };
    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speakText = (text) => {
    if (!voiceOver || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = soundVolume;
      utterance.rate = speechRate;
      utterance.pitch = speechPitch;
      if (voiceNarrator !== 'default') {
        const selected = availableVoices.find(v => v.name === voiceNarrator);
        if (selected) utterance.voice = selected;
      }
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore audio synthesis errors gracefully
    }
  };

  // Initialize lesson
  useEffect(() => {
    const defaultText = "ffff jjjj ff jj fff\njjj fj fj jjf ffj\nfff jjj ffj jjf\nfjfj fffj jjjf ffjj";
    const rawText = lesson.text || defaultText;
    const text = formatDrillText(rawText);
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
    setCurrentStreak(0);
    setHighestStreak(0);
    setCoachState('idle');
    setCurrentTip(null);
    keyStatsRef.current = {};
    charErrorsRef.current = 0;

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
  }, [lesson, courseId]);

  // Coach Idle Detection: revert from 'focus' to 'idle' when typing pauses for 3.5s
  useEffect(() => {
    if (!hasStarted || coachState === 'victory' || currentIndex >= tokens.length) return;
    const timer = setTimeout(() => {
      setCoachState(prev => (prev !== 'victory' ? 'idle' : prev));
    }, 3500);
    return () => clearTimeout(timer);
  }, [currentIndex, hasStarted, coachState, tokens.length]);

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
        const acc = Math.round((Math.max(0, totalKeystrokes - errors) / totalKeystrokes) * 100);
        setLiveAccuracy(Math.min(100, Math.max(0, acc)));
      }
    }, 150);

    return () => clearInterval(interval);
  }, [hasStarted, startTime, currentIndex, totalKeystrokes, errors]);

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
    setCurrentStreak(0);
    setHighestStreak(0);
    setCoachState('idle');
    setCurrentTip(null);
    if (coachErrorTimeoutRef.current) clearTimeout(coachErrorTimeoutRef.current);
    keyStatsRef.current = {};
    charErrorsRef.current = 0;
  };

  // Keyboard Event Handler for Practice Mode
  useEffect(() => {
    if (mode !== 'practice') return;

    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const key = e.key;

      if (key === ' ' || key === 'Tab' || key === 'Backspace') {
        e.preventDefault();
      }

      const keyDef = getKeyForChar(key, keyboardLayout);
      if (keyDef) {
        setPressedKeyId(keyDef.id);
        setTimeout(() => setPressedKeyId(null), 120);
      }

      // Backspace navigation: allows stepping back and clearing keystrokes
      if (key === 'Backspace') {
        if (currentIndex > 0) {
          const prevIdx = currentIndex - 1;
          const nextStatuses = [...tokenStatuses];
          const wasError = nextStatuses[prevIdx] === 'error';
          nextStatuses[prevIdx] = 'pending';
          setTokenStatuses(nextStatuses);
          setCurrentIndex(prevIdx);
          charErrorsRef.current = 0;
          if (wasError && errors > 0) {
            setErrors(prev => Math.max(0, prev - 1));
          }
          if (soundEnabled) sound.playKeyClick();
        }
        return;
      }

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

      const nextErrors = isMatch ? errors : errors + 1;
      const nextTotalKeystrokes = totalKeystrokes + 1;

      if (isMatch) {
        charErrorsRef.current = 0;
        if (soundEnabled) sound.playKeyClick();
        if (readLetters) speakText(key === ' ' ? 'space' : key);
        keyStatsRef.current[charKey].hits += 1;

        // Streak increment & coach state update
        setCurrentStreak(prev => {
          const next = prev + 1;
          setHighestStreak(h => Math.max(h, next));
          if (next >= 10) {
            setCoachState('streak');
          } else {
            setCoachState('focus');
          }
          return next;
        });
        if (coachErrorTimeoutRef.current) {
          clearTimeout(coachErrorTimeoutRef.current);
          coachErrorTimeoutRef.current = null;
        }

        const nextStatuses = [...tokenStatuses];
        nextStatuses[currentIndex] = 'correct';
        setTokenStatuses(nextStatuses);

        const nextIdx = currentIndex + 1;
        setCurrentIndex(nextIdx);
        setLiveAccuracy(Math.min(100, Math.max(0, Math.round(((nextTotalKeystrokes - nextErrors) / nextTotalKeystrokes) * 100))));

        // Lesson finished!
        if (nextIdx >= tokens.length) {
          setCoachState('victory');
          const duration = Math.max(1, (Date.now() - (startTime || Date.now())) / 1000);
          const durationMin = Math.max(0.01, duration / 60);
          const grossWpm = Math.round((tokens.length / 5) / durationMin);
          const netWpm = Math.max(0, Math.round(((tokens.length / 5) - nextErrors) / durationMin));
          const accuracy = Math.min(100, Math.max(0, Math.round(((nextTotalKeystrokes - nextErrors) / nextTotalKeystrokes) * 100)));
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
              errors: nextErrors,
              lessonTitle: lesson.title,
              keyStats: { ...keyStatsRef.current }
            });
          }, 300);
        }
      } else {
        // Wrong key press
        charErrorsRef.current += 1;
        if (soundEnabled) sound.playErrorBuzz();
        keyStatsRef.current[charKey].misses += 1;
        setErrors(nextErrors);
        setErrorKeyId(keyDef?.id || null);
        setTimeout(() => setErrorKeyId(null), 200);

        // Streak reset & coach supportive guidance
        setCurrentStreak(0);
        setCoachState('error');

        // Contextual encouraging tips
        const contextualTips = [
          expectedChar === ' ' ? "Use your dominant thumb for the Space bar!" :
          (expectedChar >= 'A' && expectedChar <= 'Z') ? "Hold Shift with the opposite hand for capital letters." :
          (expectedChar === 'f' || expectedChar === 'j') ? "Feel for the raised tactile bumps on F and J." :
          "Take a breath! Return your fingers to the home row.",
          "Accuracy builds velocity — let the speed come naturally.",
          "Soft, relaxed fingers! Keep your wrists floating.",
          "Smooth rhythm is faster than rushing. You've got this!"
        ];
        const selectedTip = contextualTips[Math.floor(Math.random() * contextualTips.length)];
        setCurrentTip(selectedTip);

        if (coachErrorTimeoutRef.current) clearTimeout(coachErrorTimeoutRef.current);
        coachErrorTimeoutRef.current = setTimeout(() => {
          setCoachState(prev => (prev === 'error' ? 'focus' : prev));
        }, 2500);

        const shouldBlock = blockOnError && charErrorsRef.current >= blockThreshold;

        if (shouldBlock) {
          // Block on error strike: highlight red and keep cursor on active character
          const nextStatuses = [...tokenStatuses];
          nextStatuses[currentIndex] = 'error';
          setTokenStatuses(nextStatuses);
          setLiveAccuracy(Math.min(100, Math.max(0, Math.round(((nextTotalKeystrokes - nextErrors) / nextTotalKeystrokes) * 100))));
          return;
        } else {
          // Non-blocking mode: mark error and advance cursor
          const nextStatuses = [...tokenStatuses];
          nextStatuses[currentIndex] = 'error';
          setTokenStatuses(nextStatuses);

          const nextIdx = currentIndex + 1;
          setCurrentIndex(nextIdx);
          setLiveAccuracy(Math.min(100, Math.max(0, Math.round(((nextTotalKeystrokes - nextErrors) / nextTotalKeystrokes) * 100))));

          if (nextIdx >= tokens.length) {
            setCoachState('victory');
            const duration = Math.max(1, (Date.now() - (startTime || Date.now())) / 1000);
            const durationMin = Math.max(0.01, duration / 60);
            const grossWpm = Math.round((tokens.length / 5) / durationMin);
            const netWpm = Math.max(0, Math.round(((tokens.length / 5) - nextErrors) / durationMin));
            const accuracy = Math.min(100, Math.max(0, Math.round(((nextTotalKeystrokes - nextErrors) / nextTotalKeystrokes) * 100)));
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
                errors: nextErrors,
                lessonTitle: lesson.title,
                keyStats: { ...keyStatsRef.current }
              });
            }, 300);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, currentIndex, tokens, tokenStatuses, hasStarted, startTime, errors, totalKeystrokes, lesson, onComplete, keyboardLayout, soundEnabled, blockOnError, blockThreshold, readLetters, voiceOver]);

  // Target Key for Virtual Keyboard & Hand highlighting
  const activeChar = mode === 'practice' && currentIndex < tokens.length ? tokens[currentIndex] : 'f';

  // Progress percentage
  const progressPercent = Math.min(100, Math.round((currentIndex / Math.max(1, tokens.length)) * 100));

  // Parse text into lines, keeping words and spaces structured for authentic left-aligned layout
  const lines = useMemo(() => {
    const res = [];
    let currentLine = [];
    let currentWordTokens = [];

    tokens.forEach((char, idx) => {
      const item = { char, idx, status: tokenStatuses[idx], isCurrent: idx === currentIndex };
      if (char === '\n') {
        if (currentWordTokens.length > 0) {
          currentLine.push({ type: 'word', tokens: currentWordTokens });
          currentWordTokens = [];
        }
        currentLine.push({ type: 'newline', token: item });
        res.push(currentLine);
        currentLine = [];
      } else if (char === ' ') {
        if (currentWordTokens.length > 0) {
          currentLine.push({ type: 'word', tokens: currentWordTokens });
          currentWordTokens = [];
        }
        currentLine.push({ type: 'space', token: item });
      } else {
        currentWordTokens.push(item);
      }
    });

    if (currentWordTokens.length > 0) {
      currentLine.push({ type: 'word', tokens: currentWordTokens });
    }
    if (currentLine.length > 0) {
      res.push(currentLine);
    }
    return res;
  }, [tokens, tokenStatuses, currentIndex]);

  // Active font size configuration
  const currentSize = accessibleFontSize ? FONT_SIZES.accessible : (FONT_SIZES[fontSize] || FONT_SIZES.normal);

  // Active theme configuration
  const activeThemeConfig = THEME_PRESETS.find(t => t.id === activeThemeId) || THEME_PRESETS[0];

  // If in New Key Intro mode, render the authentic EdClub-style Introduction page
  if (mode === 'intro') {
    return (
      <NewKeyIntro
        lesson={lesson}
        layout={keyboardLayout}
        onFinish={() => {
          sound.playKeyClick();
          onComplete({
            isIntro: true,
            wpm: lesson.goalWpm || 20,
            grossWpm: lesson.goalWpm || 20,
            accuracy: 100,
            stars: 5,
            points: 250,
            time: 25,
            durationSeconds: 25,
            errors: 0,
            lessonTitle: lesson.title,
            keyStats: { ...keyStatsRef.current }
          });
        }}
        onExit={onExit}
      />
    );
  }

  return (
    <div 
      className="w-full h-full min-h-0 flex-1 flex flex-col justify-between py-1.5 sm:py-2 px-3 sm:px-6 md:px-8 font-sans select-none animate-in fade-in duration-200 transition-colors duration-300 overflow-hidden"
      style={{ backgroundColor: activeThemeConfig.bg }}
    >
      
      {/* TOP HEADER BAR: CLEAN, INTUITIVE & MINIMAL */}
      <div className="flex items-center justify-between border-b border-[#2D2319]/15 pb-1.5 mb-1 shrink-0">
        
        {/* Left: Back to Map & Title */}
        <div className="flex items-center space-x-3">
          <button 
            type="button"
            onClick={() => {
              sound.playKeyClick();
              onExit();
            }}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#2D2319] font-mono text-xs font-bold border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:scale-95 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1.5 cursor-pointer"
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

        {/* Center / Right: Minimalist Tools, Stats & Parity Popovers */}
        <div className="flex items-center space-x-2 font-mono text-xs relative" ref={toolbarClusterRef}>
          
          {/* Target Keys Badge */}
          {lesson.keys && lesson.keys.length > 0 && (
            <div className="hidden sm:flex items-center space-x-1 px-2.5 py-1 bg-white border border-[#2D2319] rounded-lg font-mono text-xs text-slate-700">
              <span className="text-slate-400 font-bold">KEYS:</span>
              <span className="font-bold text-slate-900 font-mono">( {lesson.keys.filter(k => k !== ' ' && k !== '\n').join(' ')} )</span>
            </div>
          )}

          {/* Live Stats Pill (Image 1 toggleable) */}
          {liveStatsEnabled && (
            <div className="flex items-center space-x-2.5 px-3 py-1 bg-slate-900 text-white rounded-lg border-2 border-slate-900 shadow-[1px_1px_0_#0f172a] text-xs">
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
          )}

          {/* Subtle Streak Combo Badge */}
          {currentStreak >= 3 && (
            <div 
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg border-2 border-[#2D2319] font-mono text-xs font-black shadow-[1px_1px_0px_#2D2319] transition-all animate-combo-pop ${
                currentStreak >= 50
                  ? 'bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 text-slate-950 ring-2 ring-amber-300'
                  : currentStreak >= 25
                  ? 'bg-amber-400 text-[#2D2319]'
                  : currentStreak >= 10
                  ? 'bg-[#F28B82] text-[#2D2319]'
                  : 'bg-white text-slate-800'
              }`}
              title={`Current Streak: ${currentStreak} (Highest: ${highestStreak})`}
            >
              <span className="text-xs select-none">🔥</span>
              <span>{currentStreak}x Combo!</span>
            </div>
          )}

          {/* 1. RESTART BUTTON */}
          <button 
            type="button"
            onClick={handleReset} 
            title="Restart Lesson"
            className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-[#2D2319] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] active:scale-95 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* COACH MASCOT TOGGLE */}
          <button 
            type="button"
            onClick={() => setCoachEnabled(prev => !prev)} 
            title={coachEnabled ? "Hide Coach Mascot" : "Show Coach Mascot"}
            className={`p-1.5 rounded-lg border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] active:scale-95 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer ${
              coachEnabled ? 'bg-[#C7E8CA] text-[#2D2319]' : 'bg-white text-slate-400'
            }`}
          >
            <Bot className="w-4 h-4" />
          </button>

          {/* 2. KEYBOARD POPOVER TOGGLE (Image 4) */}
          <div className="relative">
            <button 
              type="button"
              onClick={() => setActiveMenu(prev => prev === 'keyboard' ? null : 'keyboard')} 
              title="Keyboard Guide & Keycap Style"
              className={`p-1.5 rounded-lg border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] active:scale-95 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer ${
                keyboardEnabled || activeMenu === 'keyboard' ? 'bg-[#C7E8CA] text-[#2D2319]' : 'bg-white text-slate-400'
              }`}
            >
              <Keyboard className="w-4 h-4" />
            </button>

            {/* Keyboard Guide Popover (Exact match to Image 4) */}
            {activeMenu === 'keyboard' && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319] p-3.5 z-40 font-sans animate-in fade-in zoom-in-95 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]">
                
                {/* Keyboard Guide Toggle */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-sm font-medium text-slate-700">Keyboard Guide</span>
                  <ToggleSwitch enabled={keyboardEnabled} onChange={setKeyboardEnabled} />
                </div>

                {/* Keyboard Layout Dropdown */}
                <div className="flex items-center justify-between py-3 border-b border-slate-200">
                  <span className="text-sm font-medium text-slate-700">Keyboard Layout</span>
                  <div className="relative flex items-center space-x-1 border-b border-slate-300 pb-0.5">
                    <Keyboard className="w-3.5 h-3.5 text-slate-500" />
                    <select
                      value={keyboardLayout}
                      onChange={(e) => setKeyboardLayout(e.target.value)}
                      className="appearance-none bg-transparent pr-4 pl-1 text-xs sm:text-sm font-medium text-slate-800 cursor-pointer focus:outline-none"
                    >
                      <option value="qwerty">United States</option>
                      <option value="dvorak">Dvorak</option>
                      <option value="colemak">Colemak</option>
                    </select>
                    <ChevronDown className="w-3 h-3 text-slate-500 absolute right-0 pointer-events-none" />
                  </div>
                </div>

                {/* 8 Keycap Styles (4x2 Grid) */}
                <div className="grid grid-cols-4 gap-2 pt-3">
                  {KEYCAP_STYLES.map((style) => {
                    const isSelected = keycapStyle === style.id;
                    return (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setKeycapStyle(style.id)}
                        className="flex flex-col items-center p-1 rounded-lg hover:bg-slate-50 active:scale-95 active:translate-y-0.5 transition-all cursor-pointer relative"
                      >
                        {/* 2x2 Mini Keycap Preview */}
                        <div className={`grid grid-cols-2 gap-0.5 p-1 rounded ${style.previewContainerClass}`}>
                          <span className={`w-3.5 h-3.5 flex items-center justify-center text-[8px] font-bold ${style.qKeyClass}`}>Q</span>
                          <span className={`w-3.5 h-3.5 flex items-center justify-center text-[8px] font-bold ${style.wKeyClass}`}>W</span>
                          <span className={`w-3.5 h-3.5 flex items-center justify-center text-[8px] font-bold ${style.aKeyClass}`}>A</span>
                          <span className={`w-3.5 h-3.5 flex items-center justify-center text-[8px] font-bold ${style.sKeyClass}`}>S</span>
                        </div>
                        <span className={`text-[11px] mt-1 ${isSelected ? 'text-[#1888ff] font-bold' : 'text-slate-600'}`}>
                          {style.name}
                        </span>
                        {isSelected && (
                          <span className="w-6 h-0.5 bg-[#1888ff] rounded-full mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

              </div>
            )}
          </div>

          {/* 3. HAND GUIDE POPOVER TOGGLE */}
          <div className="relative">
            <button 
              type="button"
              onClick={() => setActiveMenu(prev => prev === 'hand' ? null : 'hand')} 
              title="Hand Guide Options"
              className={`p-1.5 rounded-lg border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] active:scale-95 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center space-x-0.5 ${
                handsEnabled || activeMenu === 'hand' ? 'bg-[#C7E8CA] text-[#2D2319]' : 'bg-white text-slate-400'
              }`}
            >
              <Hand className="w-4 h-4" />
            </button>

            {/* Hand Guide Dropdown Popover */}
            {activeMenu === 'hand' && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319] p-3.5 z-40 font-sans animate-in fade-in zoom-in-95 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]">
                
                {/* Hand Guide Switch */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-sm font-medium text-slate-700">Hand Guide</span>
                  <ToggleSwitch enabled={handsEnabled} onChange={setHandsEnabled} />
                </div>

                {/* Hand Filter Mode Options */}
                {handsEnabled && (
                  <div className="grid grid-cols-3 gap-2 pt-3">
                    <button
                      type="button"
                      onClick={() => setHandFilter('both')}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center active:scale-95 active:translate-y-0.5 transition-all cursor-pointer ${
                        handFilter === 'both'
                          ? 'border-[#1888ff] bg-sky-50 text-[#1888ff] font-bold shadow-sm'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base">👐</span>
                      <span className="text-[10px] mt-1 leading-tight">Both Hands</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHandFilter('left')}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center active:scale-95 active:translate-y-0.5 transition-all cursor-pointer ${
                        handFilter === 'left'
                          ? 'border-[#1888ff] bg-sky-50 text-[#1888ff] font-bold shadow-sm'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base">🤚</span>
                      <span className="text-[10px] mt-1 leading-tight">Left Hand</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHandFilter('right')}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center active:scale-95 active:translate-y-0.5 transition-all cursor-pointer ${
                        handFilter === 'right'
                          ? 'border-[#1888ff] bg-sky-50 text-[#1888ff] font-bold shadow-sm'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base">✋</span>
                      <span className="text-[10px] mt-1 leading-tight">Right Hand</span>
                    </button>
                  </div>
                )}

              </div>
            )}
          </div>

          {/* 4. AUDIO / VOICE POPOVER TOGGLE (Image 3) */}
          <div className="relative">
            <button 
              type="button"
              onClick={() => setActiveMenu(prev => prev === 'audio' ? null : 'audio')} 
              title="Audio & Voice Options"
              className={`p-1.5 rounded-lg border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] active:scale-95 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer ${
                soundEnabled || voiceOver || activeMenu === 'audio' ? 'bg-[#C7E8CA] text-[#2D2319]' : 'bg-white text-slate-400'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Audio & Voice Popover (Exact match to Image 3) */}
            {activeMenu === 'audio' && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319] p-3.5 z-40 font-sans animate-in fade-in zoom-in-95 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]">
                
                {/* Keyboard Sound Toggle */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-sm font-medium text-slate-700">Keyboard Sound</span>
                  <ToggleSwitch enabled={soundEnabled} onChange={setSoundEnabled} />
                </div>

                {/* Voice Over Toggle */}
                <div className="flex items-center justify-between py-3 border-b border-slate-200">
                  <span className="text-sm font-medium text-slate-700">Voice Over</span>
                  <ToggleSwitch enabled={voiceOver} onChange={setVoiceOver} />
                </div>

                {/* Voice Narrator, Read Letters, Fully Guided */}
                <div className="py-2 space-y-2.5 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Voice Narrator</span>
                    <div className="relative">
                      <select
                        value={voiceNarrator}
                        onChange={(e) => setVoiceNarrator(e.target.value)}
                        className="appearance-none bg-transparent border-b border-slate-300 pr-5 pl-2 py-0.5 text-xs font-medium text-slate-800 cursor-pointer focus:outline-none focus:border-[#1888ff] max-w-[130px] truncate"
                      >
                        <option value="default">Default</option>
                        {availableVoices.map((v) => (
                          <option key={v.name} value={v.name}>{v.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-3 h-3 text-slate-500 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Read Letters</span>
                    <ToggleSwitch enabled={readLetters} onChange={setReadLetters} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Fully Guided</span>
                    <ToggleSwitch enabled={fullyGuided} onChange={setFullyGuided} />
                  </div>
                </div>

                {/* Volume Slider */}
                <div className="pt-2.5">
                  <span className="text-xs font-medium text-slate-600 block mb-1">Volume</span>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={soundVolume}
                    onChange={(e) => setSoundVolume(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1888ff]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                    <span>Low</span>
                    <span>Normal</span>
                    <span>High</span>
                  </div>
                </div>

                {/* Speech Rate Slider */}
                <div className="pt-2">
                  <span className="text-xs font-medium text-slate-600 block mb-1">Speech Rate</span>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={speechRate}
                    onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1888ff]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                    <span>0.5X</span>
                    <span>1X</span>
                    <span>1.5X</span>
                    <span>2X</span>
                  </div>
                </div>

                {/* Pitch Slider */}
                <div className="pt-2">
                  <span className="text-xs font-medium text-slate-600 block mb-1">Pitch</span>
                  <input
                    type="range"
                    min="0.7"
                    max="1.3"
                    step="0.05"
                    value={speechPitch}
                    onChange={(e) => setSpeechPitch(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1888ff]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                    <span>Low</span>
                    <span>Normal</span>
                    <span>High</span>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* 5. APPEARANCE / THEME POPOVER TOGGLE (Image 2) */}
          <div className="relative">
            <button 
              type="button"
              onClick={() => setActiveMenu(prev => prev === 'appearance' ? null : 'appearance')} 
              title="Appearance & Font Options"
              className={`p-1.5 rounded-lg border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] active:scale-95 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer ${
                activeMenu === 'appearance' ? 'bg-[#C7E8CA] text-[#2D2319]' : 'bg-white text-slate-600'
              }`}
            >
              <Palette className="w-4 h-4" />
            </button>

            {/* Appearance Popover (Exact match to Image 2) */}
            {activeMenu === 'appearance' && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319] p-3.5 z-40 font-sans animate-in fade-in zoom-in-95 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]">
                
                {/* Font Size Selector */}
                <div className="flex items-end justify-around pb-3 border-b border-slate-200">
                  {[
                    { id: 'small', textClass: 'text-sm', label: 'Small' },
                    { id: 'normal', textClass: 'text-xl', label: 'Normal' },
                    { id: 'large', textClass: 'text-2xl', label: 'Large' },
                    { id: 'xlarge', textClass: 'text-3xl', label: 'Very Large' },
                  ].map(({ id, textClass, label }) => {
                    const isSelected = !accessibleFontSize && fontSize === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          setFontSize(id);
                          setAccessibleFontSize(false);
                        }}
                        className={`flex flex-col items-center px-2 py-1 relative cursor-pointer active:scale-95 active:translate-y-0.5 transition-all ${
                          isSelected ? 'text-[#1888ff] font-bold' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <span className={`font-serif leading-none mb-1 ${textClass}`}>A</span>
                        <span className="text-xs">{label}</span>
                        {isSelected && (
                          <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-[#1888ff] rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Extra Large Accessible Mode */}
                <div className="flex items-center justify-between py-3 border-b border-slate-200">
                  <span className="text-sm font-medium text-slate-700">Extra Large (Accessible)</span>
                  <ToggleSwitch 
                    enabled={accessibleFontSize} 
                    onChange={setAccessibleFontSize} 
                  />
                </div>

                {/* Font Face Dropdown */}
                <div className="flex items-center justify-between py-3 border-b border-slate-200">
                  <span className="text-sm font-medium text-slate-700">Font Face</span>
                  <div className="relative">
                    <select
                      value={fontFace}
                      onChange={(e) => setFontFace(e.target.value)}
                      className="appearance-none bg-transparent border-b border-slate-300 pr-6 pl-2 py-1 text-xs sm:text-sm font-medium text-slate-800 cursor-pointer focus:outline-none focus:border-[#1888ff]"
                    >
                      <option value="Droid Sans Mono, monospace">Droid Sans Mono</option>
                      <option value="'Courier New', Courier, monospace">Courier New</option>
                      <option value="Consolas, Monaco, monospace">Consolas</option>
                      <option value="monospace">Monospace</option>
                      <option value="Inter, system-ui, sans-serif">Inter</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* 12 Theme Wallpapers (4x3 Grid) */}
                <div className="grid grid-cols-4 gap-3 pt-3">
                  {THEME_PRESETS.map((t) => {
                    const isSelected = activeThemeId === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setActiveThemeId(t.id)}
                        title={t.name}
                        className={`w-11 h-11 rounded-full flex items-center justify-center p-0.5 border border-slate-200 active:scale-95 active:translate-y-0.5 transition-all cursor-pointer ${
                          isSelected ? 'ring-2 ring-[#1888ff] ring-offset-2 scale-105' : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: t.bg }}
                      >
                        <span className="text-base select-none">{t.icon}</span>
                      </button>
                    );
                  })}
                </div>

              </div>
            )}
          </div>

          {/* 6. SETTINGS POPOVER TOGGLE (Image 1) */}
          <div className="relative">
            <button 
              type="button"
              onClick={() => setActiveMenu(prev => prev === 'settings' ? null : 'settings')} 
              title="Practice Drill Settings"
              className={`p-1.5 rounded-lg border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] active:scale-95 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer ${
                activeMenu === 'settings' ? 'bg-[#C7E8CA] text-[#2D2319]' : 'bg-white text-slate-600'
              }`}
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Settings Popover (Exact match to Image 1) */}
            {activeMenu === 'settings' && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319] p-3.5 z-40 font-sans animate-in fade-in zoom-in-95 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]">
                
                {/* Live WPM & Accuracy Toggle */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-sm font-medium text-slate-700">Show live WPM and accuracy</span>
                  <ToggleSwitch enabled={liveStatsEnabled} onChange={setLiveStatsEnabled} />
                </div>

                {/* Speed on each word Toggle */}
                <div className="flex items-center justify-between py-3 border-b border-slate-200">
                  <span className="text-sm font-medium text-slate-700">Show speed on each word</span>
                  <ToggleSwitch enabled={wordSpeedEnabled} onChange={setWordSpeedEnabled} />
                </div>

                {/* Block on error(s) Toggle & Strikes Selector */}
                <div className="pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Block on error(s)</span>
                    <ToggleSwitch enabled={blockOnError} onChange={setBlockOnError} />
                  </div>

                  {/* 1st / 2nd / 3rd Attempt Selector (Image 1) */}
                  <div className="flex items-center justify-around pt-3">
                    {[
                      { id: 1, label: '1st' },
                      { id: 2, label: '2nd' },
                      { id: 3, label: '3rd' },
                    ].map(({ id, label }) => {
                      const isSelected = blockThreshold === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setBlockThreshold(id)}
                          className={`text-xl font-medium px-4 py-1 relative cursor-pointer active:scale-95 active:translate-y-0.5 transition-all ${
                            isSelected ? 'text-[#1888ff] font-bold' : 'text-slate-700 hover:text-slate-900'
                          }`}
                        >
                          {label}
                          {isSelected && (
                            <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#1888ff] rounded-full" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>

      {/* Dynamic Course Context Headers (if applicable) */}
      <CourseContextHeaders 
        lesson={lesson} 
        courseId={courseId || lesson.courseId} 
        programId={programId || lesson.programId} 
      />

      {/* CENTER STAGE: LEFT-ALIGNED TYPING STAGE WITH AUTHENTIC TYPINGCLUB LAYOUT */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center my-auto py-1 sm:py-2 w-full relative">
        
        <div className="w-fit max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-8 relative box-border">
          
          {/* Left-Anchored "START TYPING" Bookmark Tab */}
          {!hasStarted && (
            <div className="hidden sm:flex absolute -left-10 md:-left-14 lg:-left-16 top-0 flex-col items-center justify-center bg-[#1888ff] text-white px-2 py-2 sm:py-2.5 rounded-lg shadow-md select-none pointer-events-none transition-all duration-200 animate-in fade-in z-20">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider leading-tight text-center">
                Start<br />Typing
              </span>
            </div>
          )}

          {/* Typing Text Block - Strictly Left-Aligned, Natural Monospace Kerning */}
          <div 
            className={`w-full relative select-none leading-relaxed tracking-normal transition-all duration-200 z-10 ${currentSize.fontSizeClass}`}
            style={{ fontFamily: fontFace }}
          >
            {lines.map((lineItems, lineIdx) => (
              <div 
                key={lineIdx} 
                className={`w-full flex flex-wrap items-center justify-start ${currentSize.lineMargin} relative`}
              >
                {lineItems.map((item, itemIdx) => {
                  if (item.type === 'word') {
                    const isWordActive = item.tokens.some(t => t.isCurrent);
                    return (
                      <span key={itemIdx} className="relative inline-flex items-center flex-nowrap">
                        {/* Active Word Cap / Roof (TypingClub/EdClub Word Boundary Indicator) */}
                        {isWordActive && (
                          <span className="absolute -top-1 sm:-top-1.5 -left-0.5 -right-0.5 h-[calc(100%+6px)] border-t-2 border-r-2 border-slate-300/80 rounded-tr pointer-events-none" />
                        )}

                        {item.tokens.map(({ char, idx, status, isCurrent }) => (
                          <span
                            key={idx}
                            className={`relative inline-block transition-colors duration-75 select-none ${
                              status === 'correct'
                                ? 'text-emerald-700 font-bold'
                                : status === 'error'
                                ? 'text-rose-600 bg-rose-100 rounded-xs font-bold'
                                : isCurrent
                                ? 'text-slate-950 font-black'
                                : 'text-slate-500 font-normal'
                            }`}
                          >
                            {char}

                            {/* Solid Blue Underline Cursor */}
                            {isCurrent && (
                              <span 
                                className={`absolute -bottom-0.5 left-0 right-0 ${currentSize.underlineHeight} bg-[#1888ff] rounded-full pointer-events-none`} 
                              />
                            )}
                          </span>
                        ))}
                      </span>
                    );
                  }

                  if (item.type === 'space') {
                    const { idx, status, isCurrent } = item.token;
                    return (
                      <span key={itemIdx} className="relative inline-block w-[1ch] select-none">
                        &nbsp;
                        {status === 'error' && (
                          <span className="absolute inset-0 bg-rose-200 border-b-2 border-rose-500 rounded-xs" />
                        )}
                        {isCurrent && (
                          <span 
                            className={`absolute -bottom-0.5 left-0 right-0 ${currentSize.underlineHeight} bg-[#1888ff] rounded-full pointer-events-none`} 
                          />
                        )}
                      </span>
                    );
                  }

                  if (item.type === 'newline') {
                    const { idx, status, isCurrent } = item.token;
                    return (
                      <span key={itemIdx} className="relative inline-flex items-center ml-1 select-none">
                        <span className={`text-xs font-mono opacity-60 ${
                          status === 'correct' ? 'text-emerald-600 font-bold' : isCurrent ? 'text-sky-600 font-bold' : 'text-slate-400'
                        }`}>
                          ↵
                        </span>
                        {isCurrent && (
                          <span 
                            className={`absolute -bottom-0.5 left-0 right-0 ${currentSize.underlineHeight} bg-[#1888ff] rounded-full pointer-events-none`} 
                          />
                        )}
                      </span>
                    );
                  }

                  return null;
                })}
              </div>
            ))}

            {/* Full-Width Baseline Divider Rule */}
            <div className="w-full border-b border-slate-300/80 mt-3 sm:mt-5" />
          </div>

        </div>

      </div>

      {/* UNIFIED KEYBOARD + HAND GRAPHIC MODE + COACH IN KEYBOARD UPPER AREA */}
      <div className="w-full max-w-6xl mx-auto my-auto py-0.5 relative flex items-center justify-center shrink-0">
        
        {/* 1. Dual Mode: When both Keyboard and Hands are enabled */}
        {keyboardEnabled && handsEnabled && (
          <div className="w-full max-w-[760px] mx-auto transition-all duration-300">
            <VirtualKeyboard 
              activeChar={activeChar} 
              pressedKeyId={pressedKeyId} 
              errorKeyId={errorKeyId} 
              layout={keyboardLayout} 
              theme={theme}
              showHands={true}
              handFilter={handFilter}
              keycapStyle={keycapStyle}
            />
          </div>
        )}

        {/* 2. Keyboard-Only Mode: VirtualKeyboard rendered without hands */}
        {keyboardEnabled && !handsEnabled && (
          <div className="w-full max-w-[760px] mx-auto transition-all duration-300">
            <VirtualKeyboard 
              activeChar={activeChar} 
              pressedKeyId={pressedKeyId} 
              errorKeyId={errorKeyId} 
              layout={keyboardLayout} 
              theme={theme}
              showHands={false}
              keycapStyle={keycapStyle}
            />
          </div>
        )}

        {/* 3. Hands-Only Mode: Standalone HandGuide rendered without virtual keyboard */}
        {!keyboardEnabled && handsEnabled && (
          <div className="w-full max-w-lg mx-auto transition-all duration-300">
            <HandGuide 
              activeChar={activeChar}
              layout={keyboardLayout}
              handFilter={handFilter}
              liveWpm={hasStarted ? liveWpm : null}
              liveAccuracy={hasStarted ? liveAccuracy : null}
            />
          </div>
        )}

        {/* Coach Mascot - Moved down and aligned with keyboard upper area */}
        {coachEnabled && (
          <div className="hidden lg:flex absolute right-0 xl:right-2 2xl:right-6 top-0 -translate-y-8 xl:-translate-y-12 z-20 pointer-events-auto flex-col items-end">
            <AnimatedCoach 
              state={coachState} 
              streak={currentStreak} 
              tip={currentTip} 
              wpm={liveWpm}
            />
          </div>
        )}

      </div>

      {/* Compact coach view for mobile / tablet screens */}
      {coachEnabled && (
        <div className="lg:hidden w-full flex justify-center z-20 my-1 shrink-0">
          <AnimatedCoach 
            state={coachState} 
            streak={currentStreak} 
            tip={currentTip} 
            wpm={liveWpm}
            compact={true}
          />
        </div>
      )}

      {/* BOTTOM PROGRESS BAR */}
      <div className="w-full max-w-xl mx-auto pt-1 pb-0.5 select-none shrink-0">
        <div className="h-2 w-full bg-slate-200/80 rounded-full overflow-hidden p-0.5 border border-slate-300 shadow-inner">
          <div 
            className="h-full bg-emerald-400 rounded-full transition-all duration-300"
            style={{ width: `${Math.max(3, progressPercent)}%` }}
          />
        </div>
      </div>

    </div>
  );
}
