// Drop Chits Workshop Game
// Paper chits fall from the top sorting rail: Type the word to stamp and clear before they hit the desk bottom.
import React, { useState, useEffect, useRef, useCallback } from 'react';
import GameShell from './common/GameShell';
import { sound } from '../../utils/audio';

const WORDS_BANK = [
  'swift', 'pencil', 'rubber', 'carbon', 'ruler', 'index',
  'ledger', 'binder', 'staple', 'folder', 'postal', 'packet',
  'canvas', 'format', 'output', 'script', 'drawer', 'ticket'
];

export default function DropChitsGame({
  onComplete,
  onExit
}) {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [chitsCleared, setChitsCleared] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [screenNudge, setScreenNudge] = useState(false);

  const canvasRef = useRef(null);
  const chitsRef = useRef([]);
  const lastSpawnRef = useRef(0);
  const totalGoal = 25;

  const spawnChit = useCallback(() => {
    const word = WORDS_BANK[Math.floor(Math.random() * WORDS_BANK.length)];
    const newChit = {
      id: Date.now() + Math.random(),
      word,
      typedChars: 0,
      x: 80 + Math.random() * 600,
      y: 40,
      speed: 1.0 + Math.min(1.4, chitsCleared * 0.05),
      isCleared: false
    };
    chitsRef.current.push(newChit);
  }, [chitsCleared]);

  const handleKeyDown = useCallback((e) => {
    if (isPaused || lives <= 0) return;
    const key = e.key.toLowerCase();

    if (key.length === 1) {
      // Find lowest chit or matched prefix
      let matched = false;

      for (let chit of chitsRef.current) {
        if (!chit.isCleared && chit.word[chit.typedChars] === key) {
          matched = true;
          chit.typedChars += 1;
          sound.playKeyClick();
          setHits(prev => prev + 1);

          if (chit.typedChars >= chit.word.length) {
            chit.isCleared = true;
            sound.playSuccess();
            setStreak(prev => prev + 1);
            setScore(prev => prev + 100 + streak * 10);
            setChitsCleared(prev => {
              const next = prev + 1;
              if (next >= totalGoal && onComplete) {
                setTimeout(() => {
                  const acc = Math.round((hits / (hits + misses + 1)) * 100);
                  onComplete({
                    modeId: 'drop-chits',
                    wpm: 45,
                    accuracy: acc,
                    chars: hits + 1,
                    errors: misses,
                    durationSeconds: 45,
                    score: score + 500,
                    stars: 5
                  });
                }, 300);
              }
              return next;
            });
          }
          break;
        }
      }

      if (!matched) {
        sound.playErrorBuzz();
        setMisses(prev => prev + 1);
        setStreak(0);
        setScreenNudge(true);
        setTimeout(() => setScreenNudge(false), 200);
      }
    }
  }, [isPaused, lives, hits, misses, streak, score, chitsCleared, onComplete]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Main Canvas Loop
  useEffect(() => {
    let animId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const render = (timestamp) => {
      if (!isPaused && lives > 0) {
        if (timestamp - lastSpawnRef.current > 2000 && chitsRef.current.length < 5) {
          spawnChit();
          lastSpawnRef.current = timestamp;
        }

        chitsRef.current.forEach(c => {
          if (c.isCleared) {
            c.y -= 4; // Zips up
          } else {
            c.y += c.speed;
          }
        });

        // Filter out chits that hit bottom (y > 380)
        chitsRef.current = chitsRef.current.filter(c => {
          if (c.y > 380 && !c.isCleared) {
            setLives(prev => Math.max(0, prev - 1));
            sound.playErrorBuzz();
            return false;
          }
          return c.y > -50;
        });
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Paper desk canvas
      ctx.fillStyle = '#FDF8EE';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Top Hanging Rail
      ctx.fillStyle = '#FAF3E0';
      ctx.fillRect(0, 0, canvas.width, 30);
      ctx.strokeStyle = '#2D2319';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 30);
      ctx.lineTo(canvas.width, 30);
      ctx.stroke();

      // Bottom Collection Line
      ctx.fillStyle = '#F28B82';
      ctx.fillRect(0, 390, canvas.width, 30);
      ctx.strokeRect(0, 390, canvas.width, 30);

      // Draw Falling Chits
      chitsRef.current.forEach(c => {
        ctx.save();
        ctx.translate(c.x, c.y);

        // Chit Shadow
        ctx.fillStyle = '#2D2319';
        ctx.fillRect(4, 4, 100, 38);

        // Chit Card
        ctx.fillStyle = c.isCleared ? '#48B89F' : '#FFFFFF';
        ctx.fillRect(0, 0, 100, 38);
        ctx.strokeStyle = '#2D2319';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(0, 0, 100, 38);

        // Word text
        const typed = c.word.slice(0, c.typedChars);
        const unTyped = c.word.slice(c.typedChars);

        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'center';

        ctx.fillStyle = '#48B89F';
        ctx.fillText(typed, 35, 24);
        ctx.fillStyle = '#2D2319';
        ctx.fillText(unTyped, 65, 24);

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, lives, spawnChit]);

  const activeChit = chitsRef.current.find(c => !c.isCleared);
  const accPct = (hits + misses) > 0 ? Math.round((hits / (hits + misses)) * 100) : 100;

  return (
    <div className={`w-full h-full ${screenNudge ? 'translate-x-1' : ''} transition-transform`}>
      <GameShell
        title="DROP SLIPS"
        subtitle="SORTING RAIL"
        score={score}
        streak={streak}
        lives={lives}
        wpm={45}
        accuracy={accPct}
        targetWord={activeChit?.word || 'pencil'}
        isPaused={isPaused}
        onTogglePause={() => setIsPaused(prev => !prev)}
        onRestart={() => {
          setScore(0);
          setStreak(0);
          setLives(3);
          setHits(0);
          setMisses(0);
          chitsRef.current = [];
        }}
        onExit={onExit}
      >
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
          <canvas
            ref={canvasRef}
            width={800}
            height={420}
            className="w-full max-w-3xl aspect-[800/420] border-3 border-[#2D2319] rounded-2xl shadow-[4px_4px_0px_#2D2319] bg-[#FDF8EE]"
          />
          <div className="text-xs font-mono text-[#2D2319]/70 font-bold mt-2">
            Slips Cleared: {chitsCleared} / {totalGoal}
          </div>
        </div>
      </GameShell>
    </div>
  );
}
