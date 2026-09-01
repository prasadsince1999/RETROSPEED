// Local Line Workshop Game
// Two commuter train coaches on a railway track: Clean words accelerate, typos slam the brakes.
import React, { useState, useEffect, useRef, useCallback } from 'react';
import GameShell from './common/GameShell';
import { sound } from '../../utils/audio';
import { getWordsForLesson } from './common/wordGenerator';

const WORD_BANK = [
  'train', 'track', 'signal', 'speed', 'coach', 'ticket', 'station',
  'express', 'rail', 'engine', 'wheel', 'route', 'line', 'swift',
  'motion', 'journey', 'arrive', 'depart', 'window', 'pass', 'lead'
];

export default function LocalLineGame({
  lesson = null,
  onComplete,
  onExit
}) {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [wordIndex, setWordIndex] = useState(0);
  const [inputCharIndex, setInputCharIndex] = useState(0);
  const [playerDistance, setPlayerDistance] = useState(150);
  const [rivalDistance, setRivalDistance] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [screenNudge, setScreenNudge] = useState(false);

  const canvasRef = useRef(null);
  const targetGoalDistance = 600;

  // Filter word bank guaranteed to only keys taught in this lesson
  const activeWordBank = React.useMemo(() => {
    return getWordsForLesson(lesson, WORD_BANK);
  }, [lesson]);

  const currentWord = activeWordBank[wordIndex % activeWordBank.length];

  const handleKeyDown = useCallback((e) => {
    if (isPaused || lives <= 0) return;
    const key = e.key.toLowerCase();

    if (key.length === 1) {
      const expectedChar = currentWord[inputCharIndex];

      if (key === expectedChar) {
        // Correct Keystroke
        sound.playKeyClick();
        setHits(prev => prev + 1);
        setStreak(prev => prev + 1);
        setScore(prev => prev + 25 + streak * 5);
        setPlayerDistance(prev => prev + 12);

        if (inputCharIndex + 1 >= currentWord.length) {
          // Word Complete!
          sound.playSuccess();
          setInputCharIndex(0);
          setWordIndex(prev => prev + 1);
          setScore(prev => prev + 100);

          if (playerDistance >= targetGoalDistance) {
            setTimeout(() => {
              if (onComplete) {
                const acc = Math.round((hits / (hits + misses + 1)) * 100);
                onComplete({
                  modeId: 'local-line',
                  wpm: 40,
                  accuracy: acc,
                  chars: hits + 1,
                  errors: misses,
                  durationSeconds: 45,
                  score: score + 500,
                  stars: 5
                });
              }
            }, 300);
          }
        } else {
          setInputCharIndex(prev => prev + 1);
        }
      } else {
        // Typo! Slams Brakes!
        sound.playErrorBuzz();
        setMisses(prev => prev + 1);
        setStreak(0);
        setPlayerDistance(prev => Math.max(50, prev - 15));
        setScreenNudge(true);
        setTimeout(() => setScreenNudge(false), 200);

        setLives(prev => {
          const next = prev - 1;
          if (next <= 0 && onComplete) {
            onComplete({
              modeId: 'local-line',
              wpm: 25,
              accuracy: 75,
              chars: hits,
              errors: misses + 1,
              durationSeconds: 30,
              score,
              stars: 2
            });
          }
          return Math.max(0, next);
        });
      }
    }
  }, [isPaused, lives, currentWord, inputCharIndex, playerDistance, hits, misses, streak, score, onComplete]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Main Canvas Render Loop
  useEffect(() => {
    let animId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const render = () => {
      if (!isPaused && lives > 0) {
        // Rival train creeps forward steadily
        setRivalDistance(prev => prev + 0.45);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Paper desk canvas
      ctx.fillStyle = '#FDF8EE';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Railway Tracks (Dual Lines with sleepers)
      ctx.strokeStyle = '#2D2319';
      ctx.lineWidth = 3;

      // Track 1 (Player Top Track)
      ctx.beginPath();
      ctx.moveTo(0, 140);
      ctx.lineTo(canvas.width, 140);
      ctx.moveTo(0, 190);
      ctx.lineTo(canvas.width, 190);
      ctx.stroke();

      // Track 1 Sleepers
      for (let x = 0; x < canvas.width; x += 25) {
        ctx.fillStyle = '#FAF3E0';
        ctx.fillRect(x, 135, 6, 60);
        ctx.strokeRect(x, 135, 6, 60);
      }

      // Track 2 (Rival Bottom Track)
      ctx.beginPath();
      ctx.moveTo(0, 280);
      ctx.lineTo(canvas.width, 280);
      ctx.moveTo(0, 330);
      ctx.lineTo(canvas.width, 330);
      ctx.stroke();

      // Track 2 Sleepers
      for (let x = 0; x < canvas.width; x += 25) {
        ctx.fillStyle = '#FAF3E0';
        ctx.fillRect(x, 275, 6, 60);
        ctx.strokeRect(x, 275, 6, 60);
      }

      // Draw Player Train Coach (Mint Green #48B89F)
      const pX = Math.min(canvas.width - 150, playerDistance);
      ctx.fillStyle = '#2D2319';
      ctx.fillRect(pX + 4, 135 + 4, 110, 50); // Hard Shadow
      ctx.fillStyle = '#48B89F';
      ctx.fillRect(pX, 135, 110, 50);
      ctx.strokeStyle = '#2D2319';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(pX, 135, 110, 50);

      // Player Coach Windows
      ctx.fillStyle = '#FDF8EE';
      ctx.fillRect(pX + 15, 145, 20, 18);
      ctx.strokeRect(pX + 15, 145, 20, 18);
      ctx.fillRect(pX + 45, 145, 20, 18);
      ctx.strokeRect(pX + 45, 145, 20, 18);
      ctx.fillRect(pX + 75, 145, 20, 18);
      ctx.strokeRect(pX + 75, 145, 20, 18);

      ctx.fillStyle = '#2D2319';
      ctx.font = 'bold 10px monospace';
      ctx.fillText('YOU', pX + 42, 178);

      // Draw Rival Train Coach (Mustard #F6C445)
      const rX = Math.min(canvas.width - 150, rivalDistance);
      ctx.fillStyle = '#2D2319';
      ctx.fillRect(rX + 4, 275 + 4, 110, 50);
      ctx.fillStyle = '#F6C445';
      ctx.fillRect(rX, 275, 110, 50);
      ctx.strokeRect(rX, 275, 110, 50);

      ctx.fillStyle = '#FDF8EE';
      ctx.fillRect(rX + 15, 285, 20, 18);
      ctx.strokeRect(rX + 15, 285, 20, 18);
      ctx.fillRect(rX + 45, 285, 20, 18);
      ctx.strokeRect(rX + 45, 285, 20, 18);
      ctx.fillRect(rX + 75, 285, 20, 18);
      ctx.strokeRect(rX + 75, 285, 20, 18);

      ctx.fillStyle = '#2D2319';
      ctx.font = 'bold 10px monospace';
      ctx.fillText('RIVAL', rX + 38, 318);

      // Finish Terminus Line
      ctx.fillStyle = '#FAF3E0';
      ctx.fillRect(canvas.width - 40, 100, 30, 260);
      ctx.strokeRect(canvas.width - 40, 100, 30, 260);
      ctx.fillStyle = '#2D2319';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('TERMINUS', canvas.width - 38, 90);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, lives, playerDistance, rivalDistance]);

  const accPct = (hits + misses) > 0 ? Math.round((hits / (hits + misses)) * 100) : 100;

  return (
    <div className={`w-full h-full ${screenNudge ? 'translate-x-1' : ''} transition-transform`}>
      <GameShell
        title="LOCAL LINE"
        subtitle="COMMUTER RAIL"
        score={score}
        streak={streak}
        lives={lives}
        wpm={40}
        accuracy={accPct}
        targetWord={currentWord}
        inputBuffer={currentWord.slice(0, inputCharIndex)}
        isPaused={isPaused}
        onTogglePause={() => setIsPaused(prev => !prev)}
        onRestart={() => {
          setScore(0);
          setStreak(0);
          setLives(3);
          setPlayerDistance(150);
          setRivalDistance(100);
          setInputCharIndex(0);
          setWordIndex(0);
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
          
          {/* Active Word Target Banner */}
          <div className="mt-3 flex items-center space-x-2">
            <span className="font-mono text-xs font-bold text-[#2D2319]/70">TYPE TO ACCELERATE:</span>
            <div className="flex space-x-1">
              {currentWord.split('').map((c, i) => {
                const isTyped = i < inputCharIndex;
                const isCurrent = i === inputCharIndex;
                return (
                  <span
                    key={i}
                    className={`px-2 py-1 rounded border-2 border-[#2D2319] font-mono text-sm font-black ${
                      isTyped ? 'bg-[#48B89F] text-[#2D2319]' : isCurrent ? 'bg-[#F6C445] text-[#2D2319]' : 'bg-[#FAF3E0] text-[#2D2319]/60'
                    }`}
                  >
                    {c}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </GameShell>
    </div>
  );
}
