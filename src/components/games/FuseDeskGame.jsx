// Fuse Box Game
// Manila envelope on cream desk with ticking red fuse bar: Type words containing the target root.
import React, { useState, useEffect, useRef, useCallback } from 'react';
import GameShell from './common/GameShell';
import { sound } from '../../utils/audio';

const ROOT_PROMPTS = [
  'TR', 'ST', 'EX', 'CON', 'RE', 'PL', 'FL', 'GR', 'UN', 'IN', 'TH', 'SH', 'CH', 'SP'
];

export default function FuseDeskGame({
  lesson = null,
  onComplete,
  onExit
}) {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [rootIndex, setRootIndex] = useState(0);
  const [inputWord, setInputWord] = useState('');
  const [fuseTime, setFuseTime] = useState(10); // 10s per word
  const [wordsSubmitted, setWordsSubmitted] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [usedWords, setUsedWords] = useState(new Set());

  // Derive roots based on taught keys
  const rawKeys = lesson?.keys || [];
  const cleanKeys = rawKeys.filter(k => k && k !== ' ').map(k => k.toUpperCase());

  const activeRoots = React.useMemo(() => {
    if (cleanKeys.length === 0) return ROOT_PROMPTS;
    const matching = ROOT_PROMPTS.filter(r => r.split('').every(ch => cleanKeys.includes(ch)));
    return matching.length >= 3 ? matching : ROOT_PROMPTS;
  }, [cleanKeys]);

  const currentRoot = activeRoots[rootIndex % activeRoots.length];
  const totalGoal = 12;

  // Fuse Countdown Loop
  useEffect(() => {
    if (isPaused || lives <= 0) return;

    const interval = setInterval(() => {
      setFuseTime(prev => {
        if (prev <= 0.1) {
          // Fuse burned down!
          sound.playErrorBuzz();
          setLives(l => {
            const next = l - 1;
            if (next <= 0 && onComplete) {
              onComplete({
                modeId: 'fuse-desk',
                wpm: 30,
                accuracy: 80,
                chars: wordsSubmitted * 5,
                errors: 3,
                durationSeconds: 35,
                score,
                stars: 2
              });
            }
            return Math.max(0, next);
          });
          setStreak(0);
          setRootIndex(r => r + 1);
          setInputWord('');
          return 10;
        }
        return prev - 0.1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPaused, lives, wordsSubmitted, score, onComplete]);

  const handleKeyDown = useCallback((e) => {
    if (isPaused || lives <= 0) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const cleaned = inputWord.trim().toUpperCase();

      if (cleaned.length >= 3 && cleaned.includes(currentRoot) && !usedWords.has(cleaned)) {
        // Valid Word!
        sound.playSuccess();
        setUsedWords(prev => new Set([...prev, cleaned]));
        setScore(prev => prev + 150 + streak * 20);
        setStreak(prev => prev + 1);
        setFuseTime(10);
        setInputWord('');
        setRootIndex(prev => prev + 1);

        setWordsSubmitted(prev => {
          const next = prev + 1;
          if (next >= totalGoal && onComplete) {
            setTimeout(() => {
              onComplete({
                modeId: 'fuse-desk',
                wpm: 48,
                accuracy: 98,
                chars: next * 6,
                errors: 3 - lives,
                durationSeconds: 45,
                score: score + 600,
                stars: 5
              });
            }, 300);
          }
          return next;
        });
      } else {
        // Invalid or duplicated word
        sound.playErrorBuzz();
        setInputWord('');
      }
    } else if (e.key === 'Backspace') {
      setInputWord(prev => prev.slice(0, -1));
    } else if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
      sound.playKeyClick();
      setInputWord(prev => prev + e.key.toUpperCase());
    }
  }, [isPaused, lives, inputWord, currentRoot, usedWords, streak, score, onComplete]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const fusePercent = Math.max(0, Math.min(100, (fuseTime / 10) * 100));

  return (
    <div className="w-full h-full">
      <GameShell
        title="FUSE BOX"
        subtitle="ROOT VOCABULARY"
        score={score}
        streak={streak}
        lives={lives}
        wpm={48}
        accuracy={98}
        inputBuffer={inputWord}
        isPaused={isPaused}
        onTogglePause={() => setIsPaused(prev => !prev)}
        onRestart={() => {
          setScore(0);
          setStreak(0);
          setLives(3);
          setInputWord('');
          setFuseTime(10);
          setUsedWords(new Set());
          setWordsSubmitted(0);
        }}
        onExit={onExit}
      >
        <div className="w-full h-full flex flex-col items-center justify-center p-6 space-y-6 max-w-xl mx-auto">
          
          {/* Manila Envelope Card */}
          <div className="w-full bg-[#FAF3E0] border-3 border-[#2D2319] rounded-2xl p-8 shadow-[6px_6px_0px_#2D2319] text-center space-y-5">
            
            <div className="text-xs font-mono font-bold text-[#2D2319]/70 uppercase tracking-wider">
              TYPE A WORD CONTAINING THIS ROOT:
            </div>

            {/* Big Root Chip */}
            <div className="inline-block px-8 py-3 rounded-2xl bg-[#F6C445] border-3 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] font-mono text-4xl sm:text-5xl font-black text-[#2D2319]">
              {currentRoot}
            </div>

            {/* Red Fuse Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono font-bold text-[#2D2319]/70">
                <span>FUSE TIMER</span>
                <span>{fuseTime.toFixed(1)}s</span>
              </div>
              <div className="w-full bg-[#FDF8EE] border-2 border-[#2D2319] rounded-lg h-4 p-0.5 shadow-[1px_1px_0px_#2D2319] overflow-hidden">
                <div
                  className={`h-full border border-[#2D2319] rounded-[3px] transition-all duration-100 ${
                    fusePercent < 30 ? 'bg-[#EF4444]' : 'bg-[#F28B82]'
                  }`}
                  style={{ width: `${fusePercent}%` }}
                />
              </div>
            </div>

            {/* Live Typing Word Box */}
            <div className="bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl p-3 shadow-[2px_2px_0px_#2D2319] font-mono text-xl font-black text-[#2D2319] min-h-[50px] flex items-center justify-center">
              {inputWord || <span className="opacity-30 italic text-base">Type word + Space/Enter</span>}
            </div>

          </div>

          <div className="text-xs font-mono text-[#2D2319]/70 font-bold">
            Root Words Submitted: {wordsSubmitted} / {totalGoal}
          </div>

        </div>
      </GameShell>
    </div>
  );
}
