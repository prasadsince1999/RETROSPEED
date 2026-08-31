import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Zap, 
  Target, 
  Clock, 
  Flame, 
  Star, 
  RotateCcw, 
  ArrowLeft, 
  CheckCircle2, 
  Award, 
  Play, 
  Sparkles 
} from 'lucide-react';
import { sound } from '../utils/audio';
import { recordQuickDrillResult, recordDailyChallengeResult } from '../utils/storage';

// Keyword Banks for Drills
const KEYWORD_BANKS = {
  easy: [
    'time', 'year', 'people', 'water', 'sound', 'great', 'world', 'hand', 'place', 'small',
    'quick', 'speed', 'touch', 'flame', 'spark', 'craft', 'track', 'plant', 'house', 'light',
    'river', 'forest', 'green', 'space', 'earth', 'ocean', 'tiger', 'eagle', 'stone', 'cloud'
  ],
  medium: [
    'keyboard', 'accuracy', 'velocity', 'keystroke', 'adventure', 'curriculum', 'harmonic', 'rhythm',
    'chronicle', 'discovery', 'precision', 'benchmark', 'algorithm', 'interface', 'frequency',
    'navigation', 'synthesize', 'ecosystem', 'innovator', 'vocabulary', 'monument', 'sculpture'
  ],
  hard: [
    'function()', 'const data = []', 'async/await', 'return result;', 'import { sound }',
    'console.log()', 'Promise.all()', 'display: flex;', 'border-radius', 'calc(100vh - 2rem)',
    'export default', 'useEffect(() => {})', 'useState(true)', 'transform: rotate(45deg)',
    'retrospeed_v1', 'throw new Error()', 'margin: 0 auto;'
  ],
  daily: [
    'quantum', 'velocity', 'keyboard', 'retro', 'precision', 'galaxy', 'matrix', 'compass',
    'chronicle', 'harmonic', 'artisan', 'sapphire', 'horizon', 'blueprint', 'monument',
    'catalyst', 'synergy', 'spectrum', 'glacier', 'nebula', 'avalanche', 'zenith',
    'odyssey', 'heritage', 'pioneer'
  ]
};

export default function QuickDrillPlayer({
  mode = 'quick', // 'quick' | 'daily'
  difficulty = 'easy', // 'easy' | 'medium' | 'hard'
  timeLimit = 60, // in seconds
  userProgress = {},
  onComplete,
  onExit
}) {
  const [wordList, setWordList] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const [finishedStats, setFinishedStats] = useState(null);
  
  const timerRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize randomized word list
  useEffect(() => {
    const bank = mode === 'daily' 
      ? KEYWORD_BANKS.daily 
      : (KEYWORD_BANKS[difficulty] || KEYWORD_BANKS.easy);
    
    // Shuffle
    const shuffled = [...bank].sort(() => Math.random() - 0.5);
    // Expand to 60 words by repeating shuffled copies
    const expanded = [...shuffled, ...shuffled, ...shuffled];
    setWordList(expanded);
    setTimeLeft(timeLimit);
    setCurrentWordIndex(0);
    setCurrentInput('');
    setHasStarted(false);
    setIsFinished(false);
    setTotalKeystrokes(0);
    setCorrectKeystrokes(0);
    setErrorCount(0);
    setWordsCompleted(0);
    setCurrentStreak(0);
    setMaxStreak(0);
    setFinishedStats(null);
  }, [mode, difficulty, timeLimit]);

  // Focus input automatically
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [hasStarted, isFinished]);

  // Escape key handler to exit drill
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        sound.playKeyClick();
        if (onExit) onExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExit]);

  // Countdown timer loop
  useEffect(() => {
    if (hasStarted && !isFinished && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            finishDrill();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [hasStarted, isFinished, timeLeft]);

  // Calculate live stats
  const elapsedSeconds = Math.max(1, timeLimit - timeLeft);
  const liveWpm = hasStarted ? Math.round(((correctKeystrokes / 5) / elapsedSeconds) * 60) : 0;
  const liveAccuracy = totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 100;

  const currentTargetWord = wordList[currentWordIndex] || '';

  // Finish drill session
  const finishDrill = () => {
    if (isFinished) return;
    setIsFinished(true);
    sound.playTada();

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const finalElapsed = Math.max(1, timeLimit - timeLeft);
    const finalWpm = Math.round(((correctKeystrokes / 5) / finalElapsed) * 60);
    const finalAcc = totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 100;
    const finalPoints = Math.round(wordsCompleted * 45 + finalWpm * 10 + finalAcc * 2);

    const resultPayload = {
      difficulty,
      timeLimit,
      wpm: finalWpm,
      accuracy: finalAcc,
      points: finalPoints,
      errors: errorCount,
      durationSeconds: finalElapsed,
      wordsCompleted,
      keywordsTyped: wordsCompleted,
      stars: finalWpm >= 50 ? 5 : (finalWpm >= 30 ? 4 : 3)
    };

    let saveRes;
    if (mode === 'daily') {
      saveRes = recordDailyChallengeResult(userProgress, resultPayload);
    } else {
      saveRes = recordQuickDrillResult(userProgress, resultPayload);
    }

    setFinishedStats({
      ...resultPayload,
      xpEarned: saveRes.xpEarned || saveRes.xpReward || 150,
      updatedProgress: saveRes.updatedProgress
    });

    if (onComplete) {
      onComplete(saveRes.updatedProgress, resultPayload);
    }
  };

  // Handle typing key events
  const handleInputChange = (e) => {
    if (isFinished) return;
    const val = e.target.value;

    if (!hasStarted) {
      setHasStarted(true);
    }

    // Check if user pressed space to complete word
    if (val.endsWith(' ')) {
      const trimmed = val.trim();
      if (trimmed === currentTargetWord) {
        // Full word correct!
        sound.playWordSuccess();
        setWordsCompleted((prev) => prev + 1);
        setCurrentStreak((prev) => {
          const next = prev + 1;
          if (next > maxStreak) setMaxStreak(next);
          return next;
        });
      } else {
        // Mistyped word
        sound.playError();
        setErrorCount((prev) => prev + 1);
        setCurrentStreak(0);
      }

      setCurrentInput('');
      const nextIdx = currentWordIndex + 1;
      setCurrentWordIndex(nextIdx);

      // In daily mode, check if 25 words reached
      if (mode === 'daily' && wordsCompleted + 1 >= 25) {
        finishDrill();
      }
      return;
    }

    // Normal character typing
    setTotalKeystrokes((prev) => prev + 1);

    // Verify current prefix
    if (currentTargetWord.startsWith(val)) {
      sound.playKeyClick();
      setCorrectKeystrokes((prev) => prev + 1);
    } else {
      sound.playError();
      setErrorCount((prev) => prev + 1);
      setCurrentStreak(0);
    }

    setCurrentInput(val);
  };

  const handleRestart = () => {
    sound.playKeyClick();
    const bank = mode === 'daily' 
      ? KEYWORD_BANKS.daily 
      : (KEYWORD_BANKS[difficulty] || KEYWORD_BANKS.easy);
    const shuffled = [...bank].sort(() => Math.random() - 0.5);
    setWordList([...shuffled, ...shuffled, ...shuffled]);
    setTimeLeft(timeLimit);
    setCurrentWordIndex(0);
    setCurrentInput('');
    setHasStarted(false);
    setIsFinished(false);
    setTotalKeystrokes(0);
    setCorrectKeystrokes(0);
    setErrorCount(0);
    setWordsCompleted(0);
    setCurrentStreak(0);
    setFinishedStats(null);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between font-sans select-none bg-[#FDF8EE] p-4 sm:p-6 overflow-y-auto">
      
      {/* Top HUD: Title, WPM, Timer, Accuracy, Combo Streak & Back */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#2D2319] pb-3 font-mono text-xs">
        
        {/* Left: Mode Badge & Back Button */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              if (onExit) onExit();
            }}
            className="px-3 py-1.5 bg-[#FAF3E0] hover:bg-white border-2 border-[#2D2319] rounded-xl font-bold flex items-center space-x-1.5 shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit Drill</span>
          </button>

          <span className="px-2.5 py-1 rounded-xl bg-[#C3A6E8] border-2 border-[#2D2319] font-black uppercase text-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
            {mode === 'daily' ? '📅 Daily Sprint' : `⚡ Quick Play [${difficulty.toUpperCase()}]`}
          </span>
        </div>

        {/* Center: Live KPI Gauges */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          
          {/* Speed WPM */}
          <div className="flex items-center space-x-1.5 bg-[#FAF3E0] px-3 py-1 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
            <Zap className="w-4 h-4 text-[#F6C445] fill-[#F6C445]" />
            <span className="font-bold text-[#2D2319]/70">WPM:</span>
            <span className="font-black text-sm text-[#2D2319]">{liveWpm}</span>
          </div>

          {/* Accuracy % */}
          <div className="flex items-center space-x-1.5 bg-[#FAF3E0] px-3 py-1 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
            <Target className="w-4 h-4 text-[#48B89F]" />
            <span className="font-bold text-[#2D2319]/70">Acc:</span>
            <span className="font-black text-sm text-[#2D2319]">{liveAccuracy}%</span>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center space-x-1.5 bg-[#FAF3E0] px-3 py-1 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
            <Clock className={`w-4 h-4 ${timeLeft <= 10 ? 'text-[#F28B82] animate-pulse' : 'text-[#4BA3E3]'}`} />
            <span className="font-bold text-[#2D2319]/70">Time:</span>
            <span className={`font-black text-sm ${timeLeft <= 10 ? 'text-[#F28B82]' : 'text-[#2D2319]'}`}>
              {timeLeft}s
            </span>
          </div>

          {/* Streak Flame */}
          <div className="flex items-center space-x-1 bg-[#FAF3E0] px-2.5 py-1 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
            <Flame className="w-4 h-4 text-[#F28B82] fill-[#F28B82]" />
            <span className="font-black text-[#2D2319]">{currentStreak}</span>
          </div>

        </div>

      </div>

      {/* Main Practice Stream Board */}
      <div className="my-6 space-y-6 flex flex-col items-center justify-center max-w-3xl mx-auto w-full">
        
        {/* Helper prompt banner */}
        {!hasStarted && !isFinished && (
          <div className="text-center font-mono text-xs font-bold text-[#2D2319]/70 bg-[#FAF3E0] px-4 py-1.5 rounded-full border border-[#2D2319]/30 animate-bounce">
            ⌨️ Type the highlighted keyword and press <span className="underline font-black text-[#2D2319]">Space</span> to advance!
          </div>
        )}

        {/* Word Stream Horizontal Capsule Container */}
        <div className="w-full bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_#2D2319] relative min-h-[160px] flex flex-col items-center justify-center">
          
          {/* Target Word Stream */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-lg sm:text-2xl font-mono select-none">
            {wordList.slice(Math.max(0, currentWordIndex - 2), currentWordIndex + 6).map((word, idx) => {
              const actualIdx = Math.max(0, currentWordIndex - 2) + idx;
              const isCurrent = actualIdx === currentWordIndex;
              const isPast = actualIdx < currentWordIndex;

              if (isCurrent) {
                return (
                  <div 
                    key={actualIdx} 
                    className="relative px-3.5 py-1.5 rounded-xl bg-[#FDF8EE] border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] font-black text-[#2D2319] flex items-center scale-110 transition-transform"
                  >
                    {/* Render character by character with cursor */}
                    {word.split('').map((char, cIdx) => {
                      const typedChar = currentInput[cIdx];
                      const isTyped = typedChar !== undefined;
                      const isCorrect = isTyped && typedChar === char;
                      const isCursor = cIdx === currentInput.length;

                      return (
                        <span 
                          key={cIdx} 
                          className={`relative ${
                            isCorrect 
                              ? 'text-[#48B89F]' 
                              : isTyped 
                              ? 'text-[#F28B82] bg-red-100 rounded-xs line-through' 
                              : 'text-[#2D2319]'
                          }`}
                        >
                          {char}
                          {isCursor && (
                            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#F6C445] animate-ping" />
                          )}
                        </span>
                      );
                    })}
                  </div>
                );
              }

              return (
                <span
                  key={actualIdx}
                  className={`px-2.5 py-1 font-bold ${
                    isPast 
                      ? 'text-[#2D2319]/30 line-through' 
                      : 'text-[#2D2319]/70'
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </div>

          {/* Hidden Input field capturing keystrokes */}
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={handleInputChange}
            disabled={isFinished}
            className="opacity-0 absolute inset-0 w-full h-full cursor-text"
            autoFocus
          />

        </div>

        {/* Words Completed Progress Bar */}
        <div className="w-full space-y-1 font-mono text-xs">
          <div className="flex justify-between font-bold text-[#2D2319]">
            <span>Keywords Completed:</span>
            <span>{wordsCompleted} {mode === 'daily' ? '/ 25 (Daily Target)' : 'words'}</span>
          </div>
          <div className="w-full h-3 bg-[#FAF3E0] border-2 border-[#2D2319] rounded-full overflow-hidden p-0.5 flex">
            <div 
              className="h-full bg-[#48B89F] rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, mode === 'daily' ? (wordsCompleted / 25) * 100 : (wordsCompleted * 4))}%` }}
            />
          </div>
        </div>

      </div>

      {/* Bottom Footer with Control Shortcut Hints */}
      <div className="border-t border-[#2D2319]/20 pt-3 flex items-center justify-between text-[11px] font-mono text-[#2D2319]/70">
        <div className="flex items-center space-x-2">
          <span className="px-1.5 py-0.5 rounded bg-[#FAF3E0] border border-[#2D2319] text-[#2D2319] font-bold">Space</span>
          <span>Next Word</span>
          <span className="mx-1">•</span>
          <span className="px-1.5 py-0.5 rounded bg-[#FAF3E0] border border-[#2D2319] text-[#2D2319] font-bold">Esc</span>
          <span>Exit</span>
        </div>

        <button
          type="button"
          onClick={handleRestart}
          className="px-3 py-1 bg-[#FAF3E0] hover:bg-white border border-[#2D2319] rounded-lg font-bold flex items-center space-x-1.5 text-[#2D2319]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restart Drill</span>
        </button>
      </div>

      {/* Completion Modal */}
      {isFinished && finishedStats && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2319]/60 backdrop-blur-[1px] animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-[#FDF8EE] border-2 border-[#2D2319] rounded-2xl shadow-[6px_6px_0px_#2D2319] overflow-hidden animate-in zoom-in-95 duration-150 font-sans">
            
            {/* Modal Titlebar: Solid Mustard */}
            <div className="bg-[#F6C445] text-[#2D2319] px-4 py-2 border-b-2 border-[#2D2319] flex items-center justify-between font-mono font-bold text-xs">
              <span className="font-display font-black uppercase">DRILL_RESULTS.EXE // COMPLETE</span>
              <button
                type="button"
                onClick={() => {
                  sound.playKeyClick();
                  if (onExit) onExit();
                }}
                className="w-5 h-5 bg-[#F28B82] border border-[#2D2319] rounded flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Content & Metrics */}
            <div className="p-6 space-y-5 text-center">
              
              <div className="space-y-1">
                <div className="text-3xl">🎉</div>
                <h3 className="text-xl font-black font-display text-[#2D2319]">
                  {mode === 'daily' ? 'Daily Sprint Completed!' : 'Drill Finished!'}
                </h3>
                <p className="text-xs text-[#2D2319]/70 font-mono">
                  {finishedStats.wordsCompleted} keywords typed in {finishedStats.durationSeconds}s
                </p>
              </div>

              {/* KPI Results Grid */}
              <div className="grid grid-cols-3 gap-2.5 font-mono text-xs">
                
                <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-2.5 shadow-[2px_2px_0px_#2D2319]">
                  <div className="text-[10px] text-[#2D2319]/70 font-bold uppercase">Speed</div>
                  <div className="text-lg font-black text-[#2D2319] font-display mt-0.5">
                    {finishedStats.wpm} <span className="text-[10px] font-mono">WPM</span>
                  </div>
                </div>

                <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-2.5 shadow-[2px_2px_0px_#2D2319]">
                  <div className="text-[10px] text-[#2D2319]/70 font-bold uppercase">Accuracy</div>
                  <div className="text-lg font-black text-[#2D2319] font-display mt-0.5">
                    {finishedStats.accuracy}%
                  </div>
                </div>

                <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-2.5 shadow-[2px_2px_0px_#2D2319]">
                  <div className="text-[10px] text-[#2D2319]/70 font-bold uppercase">XP Earned</div>
                  <div className="text-lg font-black text-[#48B89F] font-display mt-0.5">
                    +{finishedStats.xpEarned} XP
                  </div>
                </div>

              </div>

              {/* Actions */}
              <div className="flex items-center justify-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="px-4 py-2 bg-[#FAF3E0] hover:bg-white border-2 border-[#2D2319] rounded-xl font-bold font-display text-xs text-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5"
                >
                  Retry Drill
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playKeyClick();
                    if (onExit) onExit();
                  }}
                  className="px-6 py-2 bg-[#48B89F] hover:bg-[#3ca089] border-2 border-[#2D2319] rounded-xl font-black font-display text-xs text-white shadow-[3px_3px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5"
                >
                  Return to Home
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
