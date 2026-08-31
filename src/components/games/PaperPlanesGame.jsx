// Paper Planes Workshop Game (Replaces Bubble Burster / Floating Bubbles)
// Folded paper notes rise from desk: Typing the word launches the plane off the top rail.
import React, { useState, useEffect, useRef, useCallback } from 'react';
import GameShell from './common/GameShell';
import { sound } from '../../utils/audio';

const WORDS_POOL = [
  'fly', 'wing', 'fold', 'sky', 'soar', 'glide', 'paper', 'draft',
  'air', 'loop', 'craft', 'plane', 'wind', 'lift', 'breeze', 'glide'
];

export default function PaperPlanesGame({
  onComplete,
  onExit
}) {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [planesLaunched, setPlanesLaunched] = useState(0);
  const [inputBuffer, setInputBuffer] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [screenNudge, setScreenNudge] = useState(false);

  const canvasRef = useRef(null);
  const planesRef = useRef([]);
  const lastSpawnRef = useRef(0);
  const totalGoal = 20;

  const spawnPlane = useCallback(() => {
    const word = WORDS_POOL[Math.floor(Math.random() * WORDS_POOL.length)];
    const newPlane = {
      id: Date.now() + Math.random(),
      word,
      typedChars: 0,
      x: 100 + Math.random() * 550,
      y: 400,
      speed: 0.9 + Math.min(1.2, planesLaunched * 0.05),
      isLaunched: false,
      launchVy: 0
    };
    planesRef.current.push(newPlane);
  }, [planesLaunched]);

  // Handle typing input
  const handleKeyDown = useCallback((e) => {
    if (isPaused || lives <= 0) return;
    const key = e.key.toLowerCase();

    if (key.length === 1) {
      // Find a plane that matches current typed sequence or begins with key
      let matched = false;

      for (let plane of planesRef.current) {
        if (!plane.isLaunched && plane.word[plane.typedChars] === key) {
          matched = true;
          plane.typedChars += 1;
          sound.playKeyClick();
          setHits(prev => prev + 1);

          if (plane.typedChars >= plane.word.length) {
            // Plane completely typed -> Swoop Launch!
            plane.isLaunched = true;
            plane.launchVy = -8;
            sound.playSuccess();
            setStreak(prev => prev + 1);
            setScore(prev => prev + 100 + streak * 10);
            setPlanesLaunched(prev => {
              const next = prev + 1;
              if (next >= totalGoal && onComplete) {
                setTimeout(() => {
                  const acc = Math.round((hits / (hits + misses + 1)) * 100);
                  onComplete({
                    modeId: 'paper-planes',
                    wpm: 38,
                    accuracy: acc,
                    chars: hits + 1,
                    errors: misses,
                    durationSeconds: 40,
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
  }, [isPaused, lives, hits, misses, streak, score, planesLaunched, onComplete]);

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

    const updateAndDraw = (timestamp) => {
      if (!isPaused && lives > 0) {
        if (timestamp - lastSpawnRef.current > 2000 && planesRef.current.length < 4) {
          spawnPlane();
          lastSpawnRef.current = timestamp;
        }

        planesRef.current.forEach(plane => {
          if (plane.isLaunched) {
            plane.y += plane.launchVy;
            plane.x += 2;
          } else {
            plane.y -= plane.speed;
          }
        });

        // Filter missed planes
        planesRef.current = planesRef.current.filter(plane => {
          if (plane.y < 20 && !plane.isLaunched) {
            setLives(prev => Math.max(0, prev - 1));
            sound.playErrorBuzz();
            return false;
          }
          return plane.y > -50;
        });
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Paper desk canvas
      ctx.fillStyle = '#FDF8EE';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Soft desk grid lines
      ctx.strokeStyle = '#2D2319';
      ctx.lineWidth = 0.5;
      ctx.setLineDash([4, 6]);
      for (let y = 50; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Draw Origami Paper Planes
      planesRef.current.forEach(plane => {
        ctx.save();
        ctx.translate(plane.x, plane.y);

        // Plane Origami Triangle Polygon
        ctx.fillStyle = plane.isLaunched ? '#48B89F' : '#FAF3E0';
        ctx.strokeStyle = '#2D2319';
        ctx.lineWidth = 2.5;

        ctx.beginPath();
        ctx.moveTo(0, -25);
        ctx.lineTo(40, 20);
        ctx.lineTo(0, 10);
        ctx.lineTo(-40, 20);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Center crease
        ctx.beginPath();
        ctx.moveTo(0, -25);
        ctx.lineTo(0, 10);
        ctx.stroke();

        // Word Label Chip
        const typedStr = plane.word.slice(0, plane.typedChars);
        const unTypedStr = plane.word.slice(plane.typedChars);

        ctx.fillStyle = '#FDF8EE';
        ctx.fillRect(-35, 24, 70, 20);
        ctx.strokeRect(-35, 24, 70, 20);

        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';

        // Stamped word text
        ctx.fillStyle = '#48B89F';
        ctx.fillText(typedStr, -15, 38);
        ctx.fillStyle = '#2D2319';
        ctx.fillText(unTypedStr, 15, 38);

        ctx.restore();
      });

      animId = requestAnimationFrame(updateAndDraw);
    };

    animId = requestAnimationFrame(updateAndDraw);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, lives, spawnPlane]);

  const activePlane = planesRef.current.find(p => !p.isLaunched);
  const accPct = (hits + misses) > 0 ? Math.round((hits / (hits + misses)) * 100) : 100;

  return (
    <div className={`w-full h-full ${screenNudge ? 'translate-x-1' : ''} transition-transform`}>
      <GameShell
        title="PAPER PLANES"
        subtitle="ORIGAMI FLIGHT"
        score={score}
        streak={streak}
        lives={lives}
        wpm={38}
        accuracy={accPct}
        targetWord={activePlane?.word || 'fold'}
        isPaused={isPaused}
        onTogglePause={() => setIsPaused(prev => !prev)}
        onRestart={() => {
          setScore(0);
          setStreak(0);
          setLives(3);
          setHits(0);
          setMisses(0);
          planesRef.current = [];
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
            Planes Launched: {planesLaunched} / {totalGoal}
          </div>
        </div>
      </GameShell>
    </div>
  );
}
