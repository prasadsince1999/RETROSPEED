// Press Room Workshop Game (Replaces Balloon Valley)
// Single-key reflex drill: Rubber stamp slams down onto moving paper slips.
import React, { useState, useEffect, useRef, useCallback } from 'react';
import GameShell from './common/GameShell';
import { sound } from '../../utils/audio';

export default function PressRoomGame({
  lesson = null,
  onComplete,
  onExit
}) {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [slipsCompleted, setSlipsCompleted] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [stampDown, setStampDown] = useState(false);
  const [screenNudge, setScreenNudge] = useState(false);

  const canvasRef = useRef(null);
  const slipsRef = useRef([]);
  const lastSpawnRef = useRef(0);
  const totalGoal = 30;

  // Key bank: from lesson or default home row
  const keyPool = lesson?.targetKeys && lesson.targetKeys.length > 0
    ? lesson.targetKeys.filter(k => k !== ' ' && k !== 'all')
    : ['f', 'j', 'd', 'k', 's', 'l', 'a', ';'];

  const spawnSlip = useCallback(() => {
    const char = keyPool[Math.floor(Math.random() * keyPool.length)];
    const newSlip = {
      id: Date.now() + Math.random(),
      char,
      x: 0,
      y: 260,
      width: 64,
      height: 72,
      speed: 1.8 + Math.min(2.5, hits * 0.08),
      isStamped: false,
      stampScale: 0
    };
    slipsRef.current.push(newSlip);
  }, [keyPool, hits]);

  // Handle keystroke
  const handleKeyDown = useCallback((e) => {
    if (isPaused || lives <= 0) return;
    const pressed = e.key.toLowerCase();

    // Find active slip closest to the stamp zone (x between 250 and 450)
    const activeSlip = slipsRef.current.find(s => !s.isStamped && s.x > 80 && s.x < 650);

    if (activeSlip && activeSlip.char.toLowerCase() === pressed) {
      // Correct Stamp!
      activeSlip.isStamped = true;
      activeSlip.stampScale = 1.2;
      setStampDown(true);
      setTimeout(() => setStampDown(false), 120);

      sound.playKeyClick();
      setHits(prev => prev + 1);
      setStreak(prev => prev + 1);
      setScore(prev => prev + 100 + streak * 15);
      setSlipsCompleted(prev => {
        const next = prev + 1;
        if (next >= totalGoal) {
          setTimeout(() => {
            if (onComplete) {
              const acc = Math.round((hits / (hits + misses + 1)) * 100);
              onComplete({
                modeId: 'press-room',
                wpm: 35,
                accuracy: acc,
                chars: next,
                errors: misses,
                durationSeconds: 40,
                score: score + 500,
                stars: acc >= 95 ? 5 : acc >= 85 ? 4 : 3
              });
            }
          }, 400);
        }
        return next;
      });
    } else {
      // Missed Key / Mispress
      sound.playErrorBuzz();
      setMisses(prev => prev + 1);
      setStreak(0);
      setScreenNudge(true);
      setTimeout(() => setScreenNudge(false), 200);
    }
  }, [isPaused, lives, hits, misses, streak, score, onComplete]);

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
        // Spawn periodic slips
        if (timestamp - lastSpawnRef.current > 1800 && slipsRef.current.length < 5) {
          spawnSlip();
          lastSpawnRef.current = timestamp;
        }

        // Move slips
        slipsRef.current.forEach(slip => {
          slip.x += slip.speed;
        });

        // Check slip missed (off screen right)
        slipsRef.current = slipsRef.current.filter(slip => {
          if (slip.x > canvas.width && !slip.isStamped) {
            setLives(prev => {
              const next = prev - 1;
              if (next <= 0 && onComplete) {
                onComplete({
                  modeId: 'press-room',
                  wpm: 20,
                  accuracy: 80,
                  chars: hits,
                  errors: misses + 1,
                  durationSeconds: 30,
                  score,
                  stars: 2
                });
              }
              return Math.max(0, next);
            });
            sound.playErrorBuzz();
            return false;
          }
          return slip.x <= canvas.width + 100;
        });
      }

      // Draw Playfield
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background Paper Desk Grid
      ctx.fillStyle = '#FDF8EE';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Conveyor Belt Line
      ctx.fillStyle = '#FAF3E0';
      ctx.fillRect(0, 240, canvas.width, 110);
      ctx.strokeStyle = '#2D2319';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 240);
      ctx.lineTo(canvas.width, 240);
      ctx.moveTo(0, 350);
      ctx.lineTo(canvas.width, 350);
      ctx.stroke();

      // Stamp Zone Target Box
      ctx.fillStyle = '#FAF3E0';
      ctx.fillRect(360, 245, 90, 100);
      ctx.strokeStyle = '#F6C445';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.strokeRect(360, 245, 90, 100);
      ctx.setLineDash([]);

      // Draw Paper Slips
      slipsRef.current.forEach(slip => {
        ctx.save();
        ctx.translate(slip.x, slip.y);

        // Slip Shadow
        ctx.fillStyle = '#2D2319';
        ctx.fillRect(4, 4, slip.width, slip.height);

        // Slip Paper Body
        ctx.fillStyle = slip.isStamped ? '#C7E8CA' : '#FFFFFF';
        ctx.fillRect(0, 0, slip.width, slip.height);
        ctx.strokeStyle = '#2D2319';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(0, 0, slip.width, slip.height);

        // Slip Target Letter
        ctx.fillStyle = '#2D2319';
        ctx.font = 'bold 26px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(slip.char.toUpperCase(), slip.width / 2, slip.height / 2 - (slip.isStamped ? 10 : 0));

        // If Stamped, draw "APPROVED" red stamp ink
        if (slip.isStamped) {
          ctx.fillStyle = '#48B89F';
          ctx.strokeStyle = '#2D2319';
          ctx.lineWidth = 1.5;
          ctx.font = 'black 10px monospace';
          ctx.fillText('STAMPED', slip.width / 2, slip.height / 2 + 16);
        }

        ctx.restore();
      });

      // Mechanical Rubber Stamp Arm
      ctx.save();
      const stampY = stampDown ? 210 : 130;
      ctx.fillStyle = '#FAF3E0';
      ctx.fillRect(385, 0, 40, stampY);
      ctx.strokeStyle = '#2D2319';
      ctx.lineWidth = 3;
      ctx.strokeRect(385, 0, 40, stampY);

      // Stamp Head Base
      ctx.fillStyle = stampDown ? '#48B89F' : '#F6C445';
      ctx.fillRect(360, stampY, 90, 30);
      ctx.strokeRect(360, stampY, 90, 30);

      ctx.fillStyle = '#2D2319';
      ctx.font = 'black 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('PRESS', 405, stampY + 18);
      ctx.restore();

      animId = requestAnimationFrame(updateAndDraw);
    };

    animId = requestAnimationFrame(updateAndDraw);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, lives, hits, misses, score, spawnSlip, stampDown, onComplete]);

  // Find next target char for HUD
  const activeChar = slipsRef.current.find(s => !s.isStamped && s.x > 80)?.char || keyPool[0];
  const accPct = (hits + misses) > 0 ? Math.round((hits / (hits + misses)) * 100) : 100;

  return (
    <div className={`w-full h-full ${screenNudge ? 'translate-x-1' : ''} transition-transform`}>
      <GameShell
        title="PRESS ROOM"
        subtitle="STAMP FACTORY"
        score={score}
        streak={streak}
        lives={lives}
        wpm={35}
        accuracy={accPct}
        targetChar={activeChar}
        isPaused={isPaused}
        onTogglePause={() => setIsPaused(prev => !prev)}
        onRestart={() => {
          setScore(0);
          setStreak(0);
          setLives(3);
          setHits(0);
          setMisses(0);
          slipsRef.current = [];
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
            Progress: {slipsCompleted} / {totalGoal} slips stamped
          </div>
        </div>
      </GameShell>
    </div>
  );
}
