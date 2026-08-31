// Pit Lane Workshop Game
// Two typewriter racers on a paper road: Live WPM dictates engine speed.
import React, { useState, useEffect, useRef, useCallback } from 'react';
import GameShell from './common/GameShell';
import { sound } from '../../utils/audio';

const RACE_TEXT = "The typewriter carriage glides across the desk. Steady fingers tap with rhythm and precision. Speed comes naturally when tension fades away.";

export default function PitLaneGame({
  onComplete,
  onExit
}) {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [charIndex, setCharIndex] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [playerProgress, setPlayerProgress] = useState(0);
  const [ghostProgress, setGhostProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const canvasRef = useRef(null);

  const handleKeyDown = useCallback((e) => {
    if (isPaused || lives <= 0) return;
    const key = e.key;

    if (!startTime) {
      setStartTime(Date.now());
    }

    if (key.length === 1 || key === ' ') {
      const expected = RACE_TEXT[charIndex];

      if (key === expected) {
        sound.playKeyClick();
        setHits(prev => prev + 1);
        setStreak(prev => prev + 1);
        setScore(prev => prev + 10 + streak * 2);

        const nextIndex = charIndex + 1;
        setCharIndex(nextIndex);
        setPlayerProgress(Math.round((nextIndex / RACE_TEXT.length) * 100));

        if (nextIndex >= RACE_TEXT.length && onComplete) {
          const duration = Math.max(1, Math.round((Date.now() - (startTime || Date.now())) / 1000));
          const wpm = Math.round((RACE_TEXT.length / 5) / (duration / 60));
          const acc = Math.round((hits / (hits + misses + 1)) * 100);

          sound.playSuccess();
          setTimeout(() => {
            onComplete({
              modeId: 'pit-lane',
              wpm,
              accuracy: acc,
              chars: RACE_TEXT.length,
              errors: misses,
              durationSeconds: duration,
              score: score + 600,
              stars: wpm >= 45 ? 5 : wpm >= 30 ? 4 : 3
            });
          }, 300);
        }
      } else {
        sound.playErrorBuzz();
        setMisses(prev => prev + 1);
        setStreak(0);
      }
    }
  }, [isPaused, lives, charIndex, hits, misses, streak, score, startTime, onComplete]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Ghost progress animation loop
  useEffect(() => {
    let animId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const render = () => {
      if (!isPaused && lives > 0 && startTime) {
        // Ghost advances at steady 38 WPM
        setGhostProgress(prev => Math.min(100, prev + 0.08));
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Paper track background
      ctx.fillStyle = '#FDF8EE';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Two Paper Road Lanes
      ctx.fillStyle = '#FAF3E0';
      ctx.fillRect(40, 100, canvas.width - 80, 80);
      ctx.strokeStyle = '#2D2319';
      ctx.lineWidth = 3;
      ctx.strokeRect(40, 100, canvas.width - 80, 80);

      ctx.fillStyle = '#FAF3E0';
      ctx.fillRect(40, 220, canvas.width - 80, 80);
      ctx.strokeRect(40, 220, canvas.width - 80, 80);

      // Finish Line (Black/White checkered strip)
      const finishX = canvas.width - 70;
      for (let y = 100; y < 300; y += 15) {
        ctx.fillStyle = (y / 15) % 2 === 0 ? '#2D2319' : '#FDF8EE';
        ctx.fillRect(finishX, y, 15, 15);
      }

      // Draw Player Racer (Typewriter Car #48B89F)
      const pX = 50 + (playerProgress / 100) * (canvas.width - 160);
      ctx.fillStyle = '#2D2319';
      ctx.fillRect(pX + 4, 115 + 4, 70, 50); // Hard Shadow
      ctx.fillStyle = '#48B89F';
      ctx.fillRect(pX, 115, 70, 50);
      ctx.strokeStyle = '#2D2319';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(pX, 115, 70, 50);

      ctx.fillStyle = '#2D2319';
      ctx.font = 'black 11px monospace';
      ctx.fillText('YOU', pX + 22, 145);

      // Draw Ghost Racer (Typewriter Car #F6C445)
      const gX = 50 + (ghostProgress / 100) * (canvas.width - 160);
      ctx.fillStyle = '#2D2319';
      ctx.fillRect(gX + 4, 235 + 4, 70, 50);
      ctx.fillStyle = '#F6C445';
      ctx.fillRect(gX, 235, 70, 50);
      ctx.strokeRect(gX, 235, 70, 50);

      ctx.fillStyle = '#2D2319';
      ctx.font = 'black 11px monospace';
      ctx.fillText('GHOST', gX + 16, 265);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, lives, startTime, playerProgress, ghostProgress]);

  const accPct = (hits + misses) > 0 ? Math.round((hits / (hits + misses)) * 100) : 100;
  const currentDuration = startTime ? Math.max(1, Math.round((Date.now() - startTime) / 1000)) : 1;
  const currentWpm = Math.round((hits / 5) / (currentDuration / 60));

  return (
    <div className="w-full h-full">
      <GameShell
        title="PIT LANE"
        subtitle="TYPEWRITER SPRINT"
        score={score}
        streak={streak}
        lives={lives}
        wpm={currentWpm}
        accuracy={accPct}
        isPaused={isPaused}
        onTogglePause={() => setIsPaused(prev => !prev)}
        onRestart={() => {
          setScore(0);
          setStreak(0);
          setLives(3);
          setCharIndex(0);
          setHits(0);
          setMisses(0);
          setPlayerProgress(0);
          setGhostProgress(0);
          setStartTime(null);
        }}
        onExit={onExit}
      >
        <div className="w-full h-full flex flex-col items-center justify-between p-4 space-y-4">
          <canvas
            ref={canvasRef}
            width={800}
            height={320}
            className="w-full max-w-3xl aspect-[800/320] border-3 border-[#2D2319] rounded-2xl shadow-[4px_4px_0px_#2D2319] bg-[#FDF8EE]"
          />

          {/* Typing Text Stream */}
          <div className="w-full max-w-3xl bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-4 shadow-[3px_3px_0px_#2D2319] font-mono text-sm leading-relaxed">
            <span className="bg-[#48B89F] text-[#2D2319] font-bold px-1 rounded">
              {RACE_TEXT.slice(0, charIndex)}
            </span>
            <span className="bg-[#F6C445] text-[#2D2319] font-bold underline px-0.5">
              {RACE_TEXT[charIndex]}
            </span>
            <span className="text-[#2D2319]/70">
              {RACE_TEXT.slice(charIndex + 1)}
            </span>
          </div>
        </div>
      </GameShell>
    </div>
  );
}
