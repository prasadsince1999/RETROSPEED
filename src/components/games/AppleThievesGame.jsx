import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  RotateCcw, 
  Trophy, 
  Flame, 
  Sparkles, 
  Apple, 
  Target 
} from 'lucide-react';
import { sound } from '../../utils/audio';

const COLOR_TOKENS = {
  CORAL: '#F28B82',
  MUSTARD: '#F6C445',
  MINT: '#48B89F',
  SKY: '#4BA3E3',
  LILAC: '#C3A6E8',
  PAPER_CREAM: '#FDF8EE',
  CHARCOAL: '#2D2319',
  ORCHARD_CANOPY: '#48B89F',
  TREE_TRUNK: '#7D5A50',
  GRASS_BASE: '#A2C579'
};

export default function AppleThievesGame({
  lesson,
  onComplete,
  onExit,
  targetKeySet = ['v', 'b', 'n', 'm', 'c', 'x', 'z']
}) {
  const canvasRef = useRef(null);

  const keys = lesson?.targetKeys && lesson.targetKeys.length > 0 
    ? lesson.targetKeys 
    : targetKeySet;

  const totalApplesTarget = 30;

  const [hudState, setHudState] = useState({
    remaining: totalApplesTarget,
    score: 0,
    lives: 3,
    streak: 0,
    wpm: 0,
    accuracy: 100
  });

  const [gameState, setGameState] = useState('playing');

  const engineRef = useRef({
    apples: [],
    acorns: [],
    particles: [],
    raccoon: {
      x: 400,
      y: 430
    },
    totalHarvested: 0,
    lives: 3,
    score: 0,
    streak: 0,
    totalHits: 0,
    totalMisses: 0,
    startTime: performance.now(),
    lastSpawnTime: performance.now(),
    isOver: false
  });

  // Spawn dangling / falling apple
  const spawnApple = useCallback(() => {
    const engine = engineRef.current;
    const char = keys[Math.floor(Math.random() * keys.length)].toUpperCase();
    const x = Math.random() * (720 - 80) + 80;

    engine.apples.push({
      id: Math.random().toString(36).substring(2, 7),
      char,
      color: COLOR_TOKENS.CORAL,
      x,
      y: 90,
      radius: 20,
      speed: 0.7 + Math.random() * 0.4
    });
  }, [keys]);

  // Handle Keystrokes
  const handleKeyDown = useCallback((event) => {
    const engine = engineRef.current;
    if (engine.isOver) return;

    if (event.key === 'Escape') {
      if (onExit) onExit();
      return;
    }

    const key = event.key.toUpperCase();
    if (key.length > 1) return;

    // Find apple closest to ground matching key
    const candidates = engine.apples.filter(a => a.char === key);
    if (candidates.length > 0) {
      candidates.sort((a, b) => b.y - a.y);
      const target = candidates[0];

      sound.playKeyClick();
      engine.totalHits++;
      engine.streak++;
      engine.score += 100 + engine.streak * 15;
      engine.totalHarvested++;

      // Raccoon fires acorn projectile
      engine.acorns.push({
        x: engine.raccoon.x,
        y: engine.raccoon.y,
        targetX: target.x,
        targetY: target.y,
        speed: 16
      });

      // Remove apple and spawn leaf flutter particles
      engine.apples = engine.apples.filter(a => a.id !== target.id);

      for (let k = 0; k < 12; k++) {
        engine.particles.push({
          x: target.x,
          y: target.y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          color: [COLOR_TOKENS.CORAL, COLOR_TOKENS.MINT, COLOR_TOKENS.MUSTARD][k % 3],
          life: 1.0
        });
      }

      if (engine.totalHarvested >= totalApplesTarget) {
        engine.isOver = true;
        setGameState('victory');
        sound.playTada();
        confetti({ particleCount: 100, spread: 80 });
        if (onComplete) {
          onComplete({
            wpm: Math.round((engine.totalHits / 5) / (Math.max(1, (performance.now() - engine.startTime) / 60000))),
            accuracy: Math.round((engine.totalHits / (engine.totalHits + engine.totalMisses)) * 100),
            score: engine.score,
            stars: 5
          });
        }
      }
    } else {
      // Mistype
      sound.playError();
      engine.totalMisses++;
      engine.streak = 0;
      engine.lives = Math.max(0, engine.lives - 1);

      if (engine.lives <= 0) {
        engine.isOver = true;
        setGameState('gameover');
      }
    }

    const elapsedMinutes = Math.max(0.1, (performance.now() - engine.startTime) / 60000);
    const totalEntries = engine.totalHits + engine.totalMisses;
    const accuracy = totalEntries > 0 ? Math.round((engine.totalHits / totalEntries) * 100) : 100;
    const wpm = Math.round((engine.totalHits / 5) / elapsedMinutes);

    setHudState({
      remaining: Math.max(0, totalApplesTarget - engine.totalHarvested),
      score: engine.score,
      lives: engine.lives,
      streak: engine.streak,
      wpm,
      accuracy
    });
  }, [totalApplesTarget, onComplete, onExit]);

  // Main Canvas Render Loop
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    const dpr = window.devicePixelRatio || 1;
    const width = 800;
    const height = 480;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = false;

    const render = (time) => {
      const engine = engineRef.current;
      const now = performance.now();

      // 1. Draw Autumn Paper Cream Backdrop
      ctx.fillStyle = COLOR_TOKENS.PAPER_CREAM;
      ctx.fillRect(0, 0, width, height);

      // Top Orchard Tree Canopy in Solid Mint Green
      ctx.fillStyle = COLOR_TOKENS.ORCHARD_CANOPY;
      ctx.beginPath();
      ctx.arc(120, 30, 110, 0, Math.PI * 2);
      ctx.arc(300, 20, 130, 0, Math.PI * 2);
      ctx.arc(500, 25, 120, 0, Math.PI * 2);
      ctx.arc(680, 30, 110, 0, Math.PI * 2);
      ctx.fill();

      // Canopy Border
      ctx.strokeStyle = COLOR_TOKENS.CHARCOAL;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Bottom Grass Base
      const grassY = height - 60;
      ctx.fillStyle = COLOR_TOKENS.GRASS_BASE;
      ctx.fillRect(0, grassY, width, 60);
      ctx.strokeStyle = COLOR_TOKENS.CHARCOAL;
      ctx.lineWidth = 4;
      ctx.strokeRect(0, grassY, width, 60);

      // 2. Spawn Apples
      if (!engine.isOver && now - engine.lastSpawnTime > 1500 && engine.apples.length < 6) {
        spawnApple();
        engine.lastSpawnTime = now;
      }

      // 3. Update & Draw Apples
      for (let i = engine.apples.length - 1; i >= 0; i--) {
        const apple = engine.apples[i];
        apple.y += apple.speed;

        if (apple.y + apple.radius >= grassY) {
          sound.playError();
          engine.lives = Math.max(0, engine.lives - 1);
          engine.streak = 0;
          engine.apples.splice(i, 1);

          if (engine.lives <= 0) {
            engine.isOver = true;
            setGameState('gameover');
          }
          continue;
        }

        // Hard Drop Shadow
        ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
        ctx.beginPath();
        ctx.arc(apple.x + 3, apple.y + 3, apple.radius, 0, Math.PI * 2);
        ctx.fill();

        // Apple Solid Fill (Coral Red)
        ctx.fillStyle = apple.color;
        ctx.beginPath();
        ctx.arc(apple.x, apple.y, apple.radius, 0, Math.PI * 2);
        ctx.fill();

        // Apple Outer Border
        ctx.strokeStyle = COLOR_TOKENS.CHARCOAL;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Apple Leaf Stem
        ctx.fillStyle = COLOR_TOKENS.MINT;
        ctx.fillRect(apple.x - 2, apple.y - apple.radius - 5, 4, 6);

        // Letter Stamp
        ctx.font = 'black 16px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
        ctx.fillText(apple.char, apple.x, apple.y);
      }

      // 4. Update & Draw Slingshot Acorns
      for (let aIdx = engine.acorns.length - 1; aIdx >= 0; aIdx--) {
        const acorn = engine.acorns[aIdx];
        const dx = acorn.targetX - acorn.x;
        const dy = acorn.targetY - acorn.y;
        const dist = Math.hypot(dx, dy);

        if (dist <= acorn.speed) {
          engine.acorns.splice(aIdx, 1);
        } else {
          acorn.x += (dx / dist) * acorn.speed;
          acorn.y += (dy / dist) * acorn.speed;

          ctx.fillStyle = COLOR_TOKENS.MUSTARD;
          ctx.beginPath();
          ctx.arc(acorn.x, acorn.y, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = COLOR_TOKENS.CHARCOAL;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // 5. Draw Raccoon Bandit at Bottom Center
      const racX = engine.raccoon.x;
      const racY = engine.raccoon.y;

      // Raccoon Body Shadow
      ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
      ctx.fillRect(racX - 16 + 3, racY - 20 + 3, 32, 28);
      // Raccoon Body
      ctx.fillStyle = COLOR_TOKENS.MUSTARD;
      ctx.fillRect(racX - 16, racY - 20, 32, 28);
      ctx.strokeStyle = COLOR_TOKENS.CHARCOAL;
      ctx.lineWidth = 2.5;
      ctx.strokeRect(racX - 16, racY - 20, 32, 28);

      // Bandit Eye Mask
      ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
      ctx.fillRect(racX - 14, racY - 14, 28, 8);
      // Eyes
      ctx.fillStyle = COLOR_TOKENS.PAPER_CREAM;
      ctx.fillRect(racX - 8, racY - 12, 4, 4);
      ctx.fillRect(racX + 4, racY - 12, 4, 4);

      // Wooden Slingshot in Hands
      ctx.strokeStyle = COLOR_TOKENS.TREE_TRUNK;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(racX, racY - 20);
      ctx.lineTo(racX, racY - 34);
      ctx.lineTo(racX - 8, racY - 44);
      ctx.moveTo(racX, racY - 34);
      ctx.lineTo(racX + 8, racY - 44);
      ctx.stroke();

      // 6. Update & Draw Particles
      for (let pIdx = engine.particles.length - 1; pIdx >= 0; pIdx--) {
        const pt = engine.particles[pIdx];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life -= 0.05;

        if (pt.life <= 0) {
          engine.particles.splice(pIdx, 1);
        } else {
          ctx.fillStyle = pt.color;
          ctx.fillRect(pt.x, pt.y, 4, 4);
        }
      }

      if (!engine.isOver) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, [handleKeyDown, spawnApple]);

  const handleRestart = () => {
    sound.playKeyClick();
    const engine = engineRef.current;
    engine.apples = [];
    engine.acorns = [];
    engine.particles = [];
    engine.totalHarvested = 0;
    engine.lives = 3;
    engine.score = 0;
    engine.streak = 0;
    engine.totalHits = 0;
    engine.totalMisses = 0;
    engine.startTime = performance.now();
    engine.isOver = false;
    setGameState('playing');
  };

  return (
    <div className="w-full h-full flex flex-col justify-between font-sans select-none bg-[#FDF8EE] p-3 sm:p-5 overflow-y-auto">
      
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#2D2319] pb-3 font-mono text-xs">
        
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              if (onExit) onExit();
            }}
            className="px-3 py-1.5 bg-[#FAF3E0] hover:bg-white border-2 border-[#2D2319] rounded-xl font-bold flex items-center space-x-1.5 shadow-[2px_2px_0px_#2D2319]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit Arcade</span>
          </button>

          <span className="px-3 py-1 rounded-xl bg-[#48B89F] border-2 border-[#2D2319] font-black uppercase text-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
            🍎 Apple Thieves // Orchard Harvest
          </span>
        </div>

        {/* Target Keys & Lives */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-[#FAF3E0] px-2.5 py-1 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
            <span className="font-bold text-[#2D2319]/70">Keys:</span>
            <span className="font-mono font-black text-[#2D2319] uppercase tracking-wider">
              ( {keys.slice(0, 6).join(' ')} )
            </span>
          </div>

          <div className="flex items-center space-x-1 bg-[#FAF3E0] px-3 py-1 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
            {[...Array(3)].map((_, idx) => (
              <span key={idx} className="text-sm">
                {idx < hudState.lives ? '❤️' : '🖤'}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-1 bg-[#F6C445] px-3 py-1 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
            <Trophy className="w-3.5 h-3.5 text-[#2D2319]" />
            <span className="font-black text-xs text-[#2D2319]">{hudState.score}</span>
          </div>
        </div>

      </div>

      {/* 4 Neo-Brutalist HUD Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-2.5 font-mono">
        
        <div className="bg-[#4BA3E3] p-2.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]">
          <div className="text-[10px] font-bold text-[#2D2319]/80 uppercase">Speed (WPM)</div>
          <div className="text-base sm:text-lg font-black text-[#2D2319] font-display mt-0.5">{hudState.wpm} WPM</div>
        </div>

        <div className="bg-[#48B89F] p-2.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]">
          <div className="text-[10px] font-bold text-[#2D2319]/80 uppercase">Accuracy</div>
          <div className="text-base sm:text-lg font-black text-[#2D2319] font-display mt-0.5">{hudState.accuracy}%</div>
        </div>

        <div className="bg-[#F6C445] p-2.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]">
          <div className="text-[10px] font-bold text-[#2D2319]/80 uppercase">Apples Left</div>
          <div className="text-base sm:text-lg font-black text-[#2D2319] font-display mt-0.5">{hudState.remaining} / {totalApplesTarget}</div>
        </div>

        <div className="bg-[#F28B82] p-2.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]">
          <div className="text-[10px] font-bold text-[#2D2319]/80 uppercase">Combo Streak</div>
          <div className="text-base sm:text-lg font-black text-[#2D2319] font-display mt-0.5">🔥 {hudState.streak}</div>
        </div>

      </div>

      {/* Main Canvas Arena */}
      <div className="my-2 flex items-center justify-center">
        <div className="border-3 border-[#2D2319] rounded-2xl shadow-[6px_6px_0px_#2D2319] overflow-hidden bg-[#FDF8EE]">
          <canvas
            ref={canvasRef}
            style={{ width: '800px', height: '480px', display: 'block' }}
          />
        </div>
      </div>

      {/* Helper Bar */}
      <div className="border-t border-[#2D2319]/20 pt-2 flex items-center justify-between text-[11px] font-mono text-[#2D2319]/70">
        <div>Type the letter on falling apples to aim the bandit slingshot and harvest before they touch the ground!</div>
        <button
          type="button"
          onClick={handleRestart}
          className="px-3 py-1 bg-[#FAF3E0] hover:bg-white border border-[#2D2319] rounded-lg font-bold flex items-center space-x-1 text-[#2D2319]"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Restart</span>
        </button>
      </div>

      {/* Victory Modal */}
      {gameState === 'victory' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2319]/60 backdrop-blur-[1px] animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-[#FDF8EE] border-2 border-[#2D2319] rounded-2xl shadow-[6px_6px_0px_#2D2319] overflow-hidden p-6 text-center space-y-4 font-sans">
            <div className="text-3xl">🍎 🦝</div>
            <h3 className="text-xl font-black font-display text-[#2D2319]">Orchard Harvest Master!</h3>
            <p className="text-xs font-mono text-[#2D2319]/70">You harvested all {totalApplesTarget} orchard apples!</p>
            <div className="bg-[#FAF3E0] p-3 rounded-xl border border-[#2D2319] text-xs font-mono space-y-1">
              <div>Final Score: <span className="font-bold">{hudState.score} pts</span></div>
              <div>Accuracy: <span className="font-bold">{hudState.accuracy}%</span></div>
            </div>
            <div className="flex justify-center space-x-3 pt-2">
              <button
                type="button"
                onClick={handleRestart}
                className="px-4 py-2 bg-[#F6C445] border-2 border-[#2D2319] rounded-xl font-display font-black text-xs"
              >
                Play Again
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onExit) onExit();
                }}
                className="px-4 py-2 bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl font-display font-bold text-xs"
              >
                Return to Hub
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {gameState === 'gameover' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2319]/60 backdrop-blur-[1px] animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-[#FDF8EE] border-2 border-[#2D2319] rounded-2xl shadow-[6px_6px_0px_#2D2319] overflow-hidden p-6 text-center space-y-4 font-sans">
            <div className="text-3xl">💔</div>
            <h3 className="text-xl font-black font-display text-[#2D2319]">Orchard Overrun!</h3>
            <p className="text-xs font-mono text-[#2D2319]/70">Apples fell to the ground.</p>
            <div className="flex justify-center space-x-3 pt-2">
              <button
                type="button"
                onClick={handleRestart}
                className="px-4 py-2 bg-[#F6C445] border-2 border-[#2D2319] rounded-xl font-display font-black text-xs"
              >
                Retry
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onExit) onExit();
                }}
                className="px-4 py-2 bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl font-display font-bold text-xs"
              >
                Return to Hub
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
