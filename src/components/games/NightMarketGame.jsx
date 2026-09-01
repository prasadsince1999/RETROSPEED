// Night Market Game
// Market order slips slide across the counter from the right: Type the item name to stamp PAID and pack the order.
import React, { useState, useEffect, useRef, useCallback } from 'react';
import GameShell from './common/GameShell';
import { sound } from '../../utils/audio';

const CHIT_ITEMS = [
  'chai', 'samosa', 'mango', 'kulfi', 'ginger', 'clove',
  'cardamom', 'pepper', 'jalebi', 'roti', 'paratha', 'paneer',
  'halwa', 'ladoo', 'biryani', 'masala', 'dosa', 'idli'
];

export default function NightMarketGame({
  lesson = null,
  onComplete,
  onExit
}) {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [ordersPacked, setOrdersPacked] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [screenNudge, setScreenNudge] = useState(false);

  const canvasRef = useRef(null);
  const chitsRef = useRef([]);
  const lastSpawnRef = useRef(0);
  const totalGoal = 20;

  // Filter items to lesson keys
  const rawKeys = lesson?.keys || [];
  const cleanKeys = rawKeys.filter(k => k && k !== ' ');

  const activeItemsPool = React.useMemo(() => {
    if (cleanKeys.length === 0) return CHIT_ITEMS;
    const matching = CHIT_ITEMS.filter(w => w.split('').every(ch => cleanKeys.includes(ch)));
    if (matching.length >= 4) return matching;

    const fallbackItems = ['chai', 'samosa', 'mango', 'clove', 'pepper', 'roti', 'halwa', 'ladoo', 'dosa', 'idli', 'rice', 'tea', 'bread', 'card', 'box'];
    const validFallback = fallbackItems.filter(w => w.split('').every(ch => cleanKeys.includes(ch)));
    if (validFallback.length >= 3) return validFallback;

    return CHIT_ITEMS;
  }, [cleanKeys]);

  const spawnChit = useCallback(() => {
    const item = activeItemsPool[Math.floor(Math.random() * activeItemsPool.length)];
    const newChit = {
      id: Date.now() + Math.random(),
      item,
      typedChars: 0,
      x: 750,
      y: 180 + Math.random() * 120,
      speed: 1.2 + Math.min(1.5, ordersPacked * 0.06),
      isPacked: false
    };
    chitsRef.current.push(newChit);
  }, [activeItemsPool, ordersPacked]);

  const handleKeyDown = useCallback((e) => {
    if (isPaused || lives <= 0) return;
    const key = e.key.toLowerCase();

    if (key.length === 1) {
      // Find active chit closest to left
      const activeChit = chitsRef.current.find(c => !c.isPacked && c.x > 80 && c.x < 720);

      if (activeChit && activeChit.item[activeChit.typedChars] === key) {
        activeChit.typedChars += 1;
        sound.playKeyClick();
        setHits(prev => prev + 1);

        if (activeChit.typedChars >= activeChit.item.length) {
          // Order Packed & Stamped PAID!
          activeChit.isPacked = true;
          sound.playSuccess();
          setStreak(prev => prev + 1);
          setScore(prev => prev + 120 + streak * 10);
          setOrdersPacked(prev => {
            const next = prev + 1;
            if (next >= totalGoal && onComplete) {
              setTimeout(() => {
                const acc = Math.round((hits / (hits + misses + 1)) * 100);
                onComplete({
                  modeId: 'night-market',
                  wpm: 42,
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
      } else {
        sound.playErrorBuzz();
        setMisses(prev => prev + 1);
        setStreak(0);
        setScreenNudge(true);
        setTimeout(() => setScreenNudge(false), 200);
      }
    }
  }, [isPaused, lives, hits, misses, streak, score, ordersPacked, onComplete]);

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

    const render = (timestamp) => {
      if (!isPaused && lives > 0) {
        if (timestamp - lastSpawnRef.current > 2200 && chitsRef.current.length < 4) {
          spawnChit();
          lastSpawnRef.current = timestamp;
        }

        chitsRef.current.forEach(chit => {
          if (chit.isPacked) {
            chit.y += 4; // Slides down to packed counter
          } else {
            chit.x -= chit.speed;
          }
        });

        // Check if chit reached packing limit (x < 60)
        chitsRef.current = chitsRef.current.filter(chit => {
          if (chit.x < 60 && !chit.isPacked) {
            setLives(prev => Math.max(0, prev - 1));
            sound.playErrorBuzz();
            return false;
          }
          return chit.y < canvas.height + 50;
        });
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Wooden market table surface
      ctx.fillStyle = '#FDF8EE';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Market Counter Shelf
      ctx.fillStyle = '#FAF3E0';
      ctx.fillRect(0, 160, canvas.width, 180);
      ctx.strokeStyle = '#2D2319';
      ctx.lineWidth = 3;
      ctx.strokeRect(0, 160, canvas.width, 180);

      // Packing Basket zone on left
      ctx.fillStyle = '#FAF3E0';
      ctx.fillRect(20, 170, 70, 160);
      ctx.strokeRect(20, 170, 70, 160);
      ctx.fillStyle = '#2D2319';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('DISPATCH', 25, 255);

      // Draw Order Chits
      chitsRef.current.forEach(chit => {
        ctx.save();
        ctx.translate(chit.x, chit.y);

        // Chit Shadow
        ctx.fillStyle = '#2D2319';
        ctx.fillRect(4, 4, 110, 48);

        // Chit Paper Body
        ctx.fillStyle = chit.isPacked ? '#C7E8CA' : '#FFFFFF';
        ctx.fillRect(0, 0, 110, 48);
        ctx.strokeStyle = '#2D2319';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(0, 0, 110, 48);

        // Chit Item Name
        const typed = chit.item.slice(0, chit.typedChars);
        const remaining = chit.item.slice(chit.typedChars);

        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'left';

        ctx.fillStyle = '#48B89F';
        ctx.fillText(typed, 12, 28);
        const typedWidth = ctx.measureText(typed).width;

        ctx.fillStyle = '#2D2319';
        ctx.fillText(remaining, 12 + typedWidth, 28);

        // Stamped PAID label
        if (chit.isPacked) {
          ctx.fillStyle = '#10B981';
          ctx.font = 'black 10px monospace';
          ctx.fillText('PAID ✓', 65, 42);
        }

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, lives, spawnChit]);

  const activeChit = chitsRef.current.find(c => !c.isPacked && c.x > 80);
  const accPct = (hits + misses) > 0 ? Math.round((hits / (hits + misses)) * 100) : 100;

  return (
    <div className={`w-full h-full ${screenNudge ? 'translate-x-1' : ''} transition-transform`}>
      <GameShell
        title="NIGHT MARKET"
        subtitle="ORDER DISPATCH"
        score={score}
        streak={streak}
        lives={lives}
        wpm={42}
        accuracy={accPct}
        targetWord={activeChit?.item || 'chai'}
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
            Orders Dispatched: {ordersPacked} / {totalGoal}
          </div>
        </div>
      </GameShell>
    </div>
  );
}
