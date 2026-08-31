import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  RotateCcw, 
  Shield, 
  Trophy, 
  Flame, 
  Crosshair, 
  Zap 
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
  SPACE_DARK: '#1E1B18',
  SPACE_GRID: '#2E2822'
};

export default function MonsterAttackGame({
  lesson,
  onComplete,
  onExit,
  targetKeySet = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';']
}) {
  const canvasRef = useRef(null);

  const keys = lesson?.targetKeys && lesson.targetKeys.length > 0 
    ? lesson.targetKeys 
    : targetKeySet;

  const totalMonstersTarget = 30;

  const [hudState, setHudState] = useState({
    remaining: totalMonstersTarget,
    score: 0,
    lives: 3,
    streak: 0,
    wpm: 0,
    accuracy: 100
  });

  const [gameState, setGameState] = useState('playing');

  const engineRef = useRef({
    monsters: [],
    lasers: [],
    particles: [],
    turret: {
      x: 400,
      y: 450,
      angle: -Math.PI / 2
    },
    totalDefeated: 0,
    lives: 3,
    score: 0,
    streak: 0,
    totalHits: 0,
    totalMisses: 0,
    startTime: performance.now(),
    lastSpawnTime: performance.now(),
    isOver: false
  });

  // Spawn monster invader
  const spawnMonster = useCallback(() => {
    const engine = engineRef.current;
    const char = keys[Math.floor(Math.random() * keys.length)].toUpperCase();
    const colors = [COLOR_TOKENS.CORAL, COLOR_TOKENS.MUSTARD, COLOR_TOKENS.MINT, COLOR_TOKENS.SKY, COLOR_TOKENS.LILAC];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const x = Math.random() * (720 - 80) + 80;

    engine.monsters.push({
      id: Math.random().toString(36).substring(2, 7),
      char,
      color,
      x,
      y: 30,
      speed: 0.8 + Math.random() * 0.5,
      size: 28,
      type: Math.floor(Math.random() * 3) // 0: Saucer, 1: Octopus, 2: Drone
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

    // Find monster matching key closest to bottom
    const candidates = engine.monsters.filter(m => m.char === key);
    if (candidates.length > 0) {
      candidates.sort((a, b) => b.y - a.y);
      const target = candidates[0];

      sound.playKeyClick();
      engine.totalHits++;
      engine.streak++;
      engine.score += 120 + engine.streak * 15;
      engine.totalDefeated++;

      // Rotate turret to face monster
      const dx = target.x - engine.turret.x;
      const dy = target.y - engine.turret.y;
      engine.turret.angle = Math.atan2(dy, dx);

      // Spawn laser bolt
      engine.lasers.push({
        x: engine.turret.x,
        y: engine.turret.y,
        targetX: target.x,
        targetY: target.y,
        color: COLOR_TOKENS.MINT,
        speed: 18
      });

      // Remove monster and spawn explosion
      engine.monsters = engine.monsters.filter(m => m.id !== target.id);

      for (let k = 0; k < 12; k++) {
        engine.particles.push({
          x: target.x,
          y: target.y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          color: target.color,
          life: 1.0
        });
      }

      if (engine.totalDefeated >= totalMonstersTarget) {
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
      // Miss
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
      remaining: Math.max(0, totalMonstersTarget - engine.totalDefeated),
      score: engine.score,
      lives: engine.lives,
      streak: engine.streak,
      wpm,
      accuracy
    });
  }, [totalMonstersTarget, onComplete, onExit]);

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

      // 1. Draw Dark Starfield Background
      ctx.fillStyle = COLOR_TOKENS.SPACE_DARK;
      ctx.fillRect(0, 0, width, height);

      // Solid Sparkle Stars ✦
      ctx.fillStyle = COLOR_TOKENS.MUSTARD;
      ctx.font = '12px "Courier New", monospace';
      ctx.fillText('✦', 60, 80);
      ctx.fillText('✦', 220, 140);
      ctx.fillText('✦', 480, 70);
      ctx.fillText('✦', 710, 110);
      ctx.fillText('✦', 150, 320);
      ctx.fillText('✦', 650, 380);

      // Planetary Ring Silhouette
      ctx.strokeStyle = COLOR_TOKENS.SPACE_GRID;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(width / 2, height / 2 - 30, 260, 90, 0.2, 0, Math.PI * 2);
      ctx.stroke();

      // 2. Spawn Monsters periodically
      if (!engine.isOver && now - engine.lastSpawnTime > 1600 && engine.monsters.length < 6) {
        spawnMonster();
        engine.lastSpawnTime = now;
      }

      // 3. Draw Defense Barrier Line
      const barrierY = height - 70;
      ctx.strokeStyle = COLOR_TOKENS.CORAL;
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.moveTo(0, barrierY);
      ctx.lineTo(width, barrierY);
      ctx.stroke();
      ctx.setLineDash([]);

      // 4. Update & Draw Monster Invaders
      for (let i = engine.monsters.length - 1; i >= 0; i--) {
        const monster = engine.monsters[i];
        monster.y += monster.speed;

        // Check if crossed barrier
        if (monster.y >= barrierY) {
          sound.playError();
          engine.lives = Math.max(0, engine.lives - 1);
          engine.streak = 0;
          engine.monsters.splice(i, 1);

          if (engine.lives <= 0) {
            engine.isOver = true;
            setGameState('gameover');
          }
          continue;
        }

        // Draw Invader Body (Retro 8-bit style)
        ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
        ctx.fillRect(monster.x - 20 + 3, monster.y - 15 + 3, 40, 30);
        ctx.fillStyle = monster.color;
        ctx.fillRect(monster.x - 20, monster.y - 15, 40, 30);
        ctx.strokeStyle = COLOR_TOKENS.CHARCOAL;
        ctx.lineWidth = 2.5;
        ctx.strokeRect(monster.x - 20, monster.y - 15, 40, 30);

        // Alien Antennas
        ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
        ctx.fillRect(monster.x - 14, monster.y - 20, 4, 6);
        ctx.fillRect(monster.x + 10, monster.y - 20, 4, 6);

        // Letter Stamp Badge
        ctx.fillStyle = COLOR_TOKENS.PAPER_CREAM;
        ctx.fillRect(monster.x - 10, monster.y - 10, 20, 20);
        ctx.strokeRect(monster.x - 10, monster.y - 10, 20, 20);

        ctx.font = 'black 14px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
        ctx.fillText(monster.char, monster.x, monster.y);
      }

      // 5. Update & Draw Lasers
      for (let lIdx = engine.lasers.length - 1; lIdx >= 0; lIdx--) {
        const laser = engine.lasers[lIdx];
        const dx = laser.targetX - laser.x;
        const dy = laser.targetY - laser.y;
        const dist = Math.hypot(dx, dy);

        if (dist <= laser.speed) {
          engine.lasers.splice(lIdx, 1);
        } else {
          laser.x += (dx / dist) * laser.speed;
          laser.y += (dy / dist) * laser.speed;

          ctx.fillStyle = COLOR_TOKENS.MINT;
          ctx.beginPath();
          ctx.arc(laser.x, laser.y, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 6. Draw Dual Defense Turret at Bottom Center
      const turretX = engine.turret.x;
      const turretY = engine.turret.y;

      ctx.save();
      ctx.translate(turretX, turretY);
      ctx.rotate(engine.turret.angle + Math.PI / 2);

      // Turret Barrels
      ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
      ctx.fillRect(-12, -30, 6, 24);
      ctx.fillRect(6, -30, 6, 24);

      // Turret Dome
      ctx.fillStyle = COLOR_TOKENS.SKY;
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = COLOR_TOKENS.CHARCOAL;
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.restore();

      // 7. Update & Draw Particles
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
  }, [handleKeyDown, spawnMonster]);

  const handleRestart = () => {
    sound.playKeyClick();
    const engine = engineRef.current;
    engine.monsters = [];
    engine.lasers = [];
    engine.particles = [];
    engine.totalDefeated = 0;
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

          <span className="px-3 py-1 rounded-xl bg-[#C3A6E8] border-2 border-[#2D2319] font-black uppercase text-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
            👾 Monster Attack // Orbital Defense
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
          <div className="text-[10px] font-bold text-[#2D2319]/80 uppercase">Invaders Left</div>
          <div className="text-base sm:text-lg font-black text-[#2D2319] font-display mt-0.5">{hudState.remaining} / {totalMonstersTarget}</div>
        </div>

        <div className="bg-[#F28B82] p-2.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]">
          <div className="text-[10px] font-bold text-[#2D2319]/80 uppercase">Combo Streak</div>
          <div className="text-base sm:text-lg font-black text-[#2D2319] font-display mt-0.5">🔥 {hudState.streak}</div>
        </div>

      </div>

      {/* Main Canvas Arena */}
      <div className="my-2 flex items-center justify-center">
        <div className="border-3 border-[#2D2319] rounded-2xl shadow-[6px_6px_0px_#2D2319] overflow-hidden bg-[#1E1B18]">
          <canvas
            ref={canvasRef}
            style={{ width: '800px', height: '480px', display: 'block' }}
          />
        </div>
      </div>

      {/* Helper Bar */}
      <div className="border-t border-[#2D2319]/20 pt-2 flex items-center justify-between text-[11px] font-mono text-[#2D2319]/70">
        <div>Type the letter on descending invaders to aim dual plasma cannons and fire lasers!</div>
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
            <div className="text-3xl">👾 🚀</div>
            <h3 className="text-xl font-black font-display text-[#2D2319]">Orbit Defended!</h3>
            <p className="text-xs font-mono text-[#2D2319]/70">You cleared all {totalMonstersTarget} alien spacecraft!</p>
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
            <h3 className="text-xl font-black font-display text-[#2D2319]">Perimeter Breached!</h3>
            <p className="text-xs font-mono text-[#2D2319]/70">Aliens breached the lower defense barrier line.</p>
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
