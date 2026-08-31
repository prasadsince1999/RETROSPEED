// Patch Terminal Workshop Game
// Clean cream code editor terminal: Type code tokens before the line falls off the screen.
import React, { useState, useEffect, useRef, useCallback } from 'react';
import GameShell from './common/GameShell';
import { sound } from '../../utils/audio';

const CODE_LINES = [
  'const speed = 60;',
  'if (accuracy >= 95) {',
  'return nextLesson();',
  'import { sound } from "./audio";',
  'export default function App() {',
  'const [score, setScore] = useState(0);',
  'useEffect(() => { init(); }, []);',
  'const target = items.find(x => x.id);',
  'git commit -m "feat: patch complete"',
  'SELECT name, wpm FROM typists;',
  'let mut buffer = String::new();',
  'fn calculate_speed(wpm: u32) -> bool'
];

export default function PatchTerminalGame({
  onComplete,
  onExit
}) {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [linesPatched, setLinesPatched] = useState(0);
  const [lineY, setLineY] = useState(60);
  const [isPaused, setIsPaused] = useState(false);

  const currentCode = CODE_LINES[lineIndex % CODE_LINES.length];
  const totalGoal = 15;

  // Line Falling Timer Loop
  useEffect(() => {
    if (isPaused || lives <= 0) return;

    const interval = setInterval(() => {
      setLineY(prev => {
        if (prev > 340) {
          // Line fell off bottom!
          sound.playErrorBuzz();
          setLives(l => {
            const next = l - 1;
            if (next <= 0 && onComplete) {
              onComplete({
                modeId: 'patch-terminal',
                wpm: 35,
                accuracy: 80,
                chars: hits,
                errors: misses + 1,
                durationSeconds: 40,
                score,
                stars: 2
              });
            }
            return Math.max(0, next);
          });
          setStreak(0);
          setLineIndex(i => i + 1);
          setCharIndex(0);
          return 60;
        }
        return prev + 1.2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPaused, lives, hits, misses, score, onComplete]);

  const handleKeyDown = useCallback((e) => {
    if (isPaused || lives <= 0) return;
    const key = e.key;

    if (key.length === 1 || key === ' ') {
      const expected = currentCode[charIndex];

      if (key === expected) {
        sound.playKeyClick();
        setHits(prev => prev + 1);
        setStreak(prev => prev + 1);
        setScore(prev => prev + 20 + streak * 3);

        const nextChar = charIndex + 1;
        if (nextChar >= currentCode.length) {
          // Line Patched!
          sound.playSuccess();
          setLineIndex(prev => prev + 1);
          setCharIndex(0);
          setLineY(60);
          setLinesPatched(prev => {
            const next = prev + 1;
            if (next >= totalGoal && onComplete) {
              setTimeout(() => {
                const acc = Math.round((hits / (hits + misses + 1)) * 100);
                onComplete({
                  modeId: 'patch-terminal',
                  wpm: 52,
                  accuracy: acc,
                  chars: hits + 1,
                  errors: misses,
                  durationSeconds: 50,
                  score: score + 600,
                  stars: 5
                });
              }, 300);
            }
            return next;
          });
        } else {
          setCharIndex(nextChar);
        }
      } else {
        sound.playErrorBuzz();
        setMisses(prev => prev + 1);
        setStreak(0);
      }
    }
  }, [isPaused, lives, currentCode, charIndex, hits, misses, streak, score, onComplete]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const accPct = (hits + misses) > 0 ? Math.round((hits / (hits + misses)) * 100) : 100;

  return (
    <div className="w-full h-full">
      <GameShell
        title="PATCH TERMINAL"
        subtitle="CODE SYNTAX WORKBENCH"
        score={score}
        streak={streak}
        lives={lives}
        wpm={52}
        accuracy={accPct}
        isPaused={isPaused}
        onTogglePause={() => setIsPaused(prev => !prev)}
        onRestart={() => {
          setScore(0);
          setStreak(0);
          setLives(3);
          setLineIndex(0);
          setCharIndex(0);
          setLineY(60);
          setLinesPatched(0);
        }}
        onExit={onExit}
      >
        <div className="w-full h-full flex flex-col items-center justify-between p-4 max-w-3xl mx-auto">
          
          {/* Terminal Window Frame */}
          <div className="relative w-full h-[380px] bg-[#FAF3E0] border-3 border-[#2D2319] rounded-2xl shadow-[6px_6px_0px_#2D2319] overflow-hidden p-6 font-mono select-none">
            
            {/* Terminal Titlebar */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-[#C3A6E8] border-b-2 border-[#2D2319] px-3 flex items-center justify-between text-xs font-bold">
              <span>PATCH_TERMINAL.RS // WORKBENCH</span>
              <span>100% OFFLINE</span>
            </div>

            {/* Falling Code Line */}
            <div 
              className="absolute left-6 right-6 transition-all duration-75"
              style={{ top: `${lineY}px` }}
            >
              <div className="bg-[#FDF8EE] border-2 border-[#2D2319] rounded-xl p-3 shadow-[3px_3px_0px_#2D2319] text-base sm:text-lg font-black inline-block">
                <span className="bg-[#48B89F] text-[#2D2319] px-1 rounded">
                  {currentCode.slice(0, charIndex)}
                </span>
                <span className="bg-[#F6C445] text-[#2D2319] underline px-0.5 animate-pulse">
                  {currentCode[charIndex] || ''}
                </span>
                <span className="text-[#2D2319]/70">
                  {currentCode.slice(charIndex + 1)}
                </span>
              </div>
            </div>

            {/* Bottom Deadline Rail */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#F28B82] border-t-2 border-[#2D2319]" />
          </div>

          <div className="text-xs font-mono text-[#2D2319]/70 font-bold mt-2">
            Lines Patched: {linesPatched} / {totalGoal}
          </div>

        </div>
      </GameShell>
    </div>
  );
}
