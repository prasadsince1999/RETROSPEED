import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  RotateCcw, 
  Trophy, 
  Flame, 
  Hammer, 
  Sparkles, 
  Shield 
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
  SANDSTONE: '#EADBC8',
  SAND_GROUND: '#DAC0A3'
};

export default function TempleBashGame({
  lesson,
  onComplete,
  onExit,
  targetKeySet = ['g', 'h', 't', 'y', 'f', 'j', 'd', 'k']
}) {
  const canvasRef = useRef(null);

  const keys = lesson?.targetKeys && lesson.targetKeys.length > 0 
    ? lesson.targetKeys 
    : targetKeySet;

  const totalRunesTarget = 30;

  const [hudState, setHudState] = useState({
    remaining: totalRunesTarget,
    score: 0,
    lives: 3,
    streak: 0,
    wpm: 0,
    accuracy: 100
  });

  const [gameState, setGameState] = useState('playing');

  const engineRef = useRef({
    runes: [],
    particles: [],
    hammer: {
      x: 400,
      y: 200,
      angle: 0,
      isSmashing: false,
      smashTau: 0,
      targetRune: null
    },
    totalSmashed: 0,
    lives: 3,
    score: 0,
    streak: 0,
    totalHits: 0,
    totalMisses: 0,
    startTime: performance.now(),
    lastSpawnTime: performance.now(),
    screenShakeTime: 0,
    shakeIntensity: 0,
    isOver: false
  });

  // Spawn rune monolith block
  const spawnRune = useCallback(() => {
    const engine = engineRef.current;
    const char = keys[Math.floor(Math.random() * keys.length)].toUpperCase();
    const colors = [COLOR_TOKENS.MUSTARD, COLOR_TOKENS.CORAL, COLOR_TOKENS.SKY, COLOR_TOKENS.LILAC, COLOR_TOKENS.MINT];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const x = Math.random() * (700 - 100) + 100;

    engine.runes.push({
      id: Math.random().toString(36).substring(2, 7),
      char,
      color,
      x,
      y: 20,
      width: 44,
      height: 48,
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

    // Find rune closest to ground matching key
    const candidates = engine.runes.filter(r => r.char === key);
    if (candidates.length > 0) {
      candidates.sort((a, b) => b.y - a.y);
      const target = candidates[0];

      sound.playKeyClick();
      engine.totalHits++;
      engine.streak++;
      engine.score += 110 + engine.streak * 15;
      engine.totalSmashed++;

      // Trigger Hammer Smash
      engine.hammer.isSmashing = true;
      engine.hammer.targetRune = { x: target.x + target.width / 2, y: target.y + target.height / 2 };
      engine.hammer.smashTau = 0;

      // Screen shake
      engine.screenShakeTime = performance.now();
      engine.shakeIntensity = 8.0;

      // Spawn stone rubble particles
      for (let k = 0; k < 12; k++) {
        engine.particles.push({
          x: target.x + target.width / 2,
          y: target.y + target.height / 2,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8 - 2,
          color: target.color,
          size: Math.random() * 6 + 4,
          life: 1.0
        });
      }

      engine.runes = engine.runes.filter(r => r.id !== target.id);

      if (engine.totalSmashed >= totalRunesTarget) {
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
      // Mistyped key
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
      remaining: Math.max(0, totalRunesTarget - engine.totalSmashed),
      score: engine.score,
      lives: engine.lives,
      streak: engine.streak,
      wpm,
      accuracy
    });
  }, [totalRunesTarget, onComplete, onExit]);

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

      // 1. Draw Sandstone Desert Backdrop
      ctx.fillStyle = COLOR_TOKENS.SANDSTONE;
      ctx.fillRect(0, 0, width, height);

      // Handle Screen Shake
      ctx.save();
      if (engine.shakeIntensity > 0) {
        const elapsed = (now - engine.screenShakeTime) / 1000;
        if (elapsed < 0.25) {
          const decay = Math.exp(-elapsed * 10);
          ctx.translate((Math.random() - 0.5) * engine.shakeIntensity * decay, (Math.random() - 0.5) * engine.shakeIntensity * decay);
        } else {
          engine.shakeIntensity = 0;
        }
      }

      // Temple Sandstone Pillars in Background
      ctx.fillStyle = COLOR_TOKENS.PAPER_CREAM;
      ctx.fillRect(60, 40, 50, height - 120);
      ctx.fillRect(width - 110, 40, 50, height - 120);
      ctx.strokeStyle = COLOR_TOKENS.CHARCOAL;
      ctx.lineWidth = 3;
      ctx.strokeRect(60, 40, 50, height - 120);
      ctx.strokeRect(width - 110, 40, 50, height - 120);

      // Sand Ground Ledge
      const groundY = height - 70;
      ctx.fillStyle = COLOR_TOKENS.SAND_GROUND;
      ctx.fillRect(0, groundY, width, 70);
      ctx.strokeStyle = COLOR_TOKENS.CHARCOAL;
      ctx.lineWidth = 4;
      ctx.strokeRect(0, groundY, width, 70);

      // 2. Spawn Runes
      if (!engine.isOver && now - engine.lastSpawnTime > 1500 && engine.runes.length < 6) {
        spawnRune();
        engine.lastSpawnTime = now;
      }

      // 3. Update & Draw Rune Monoliths
      for (let i = engine.runes.length - 1; i >= 0; i--) {
        const rune = engine.runes[i];
        rune.y += rune.speed;

        if (rune.y + rune.height >= groundY) {
          sound.playError();
          engine.lives = Math.max(0, engine.lives - 1);
          engine.streak = 0;
          engine.runes.splice(i, 1);

          if (engine.lives <= 0) {
            engine.isOver = true;
            setGameState('gameover');
          }
          continue;
        }

        // Hard Drop Shadow
        ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
        ctx.fillRect(rune.x + 4, rune.y + 4, rune.width, rune.height);

        // Rune Body
        ctx.fillStyle = rune.color;
        ctx.fillRect(rune.x, rune.y, rune.width, rune.height);
        ctx.strokeStyle = COLOR_TOKENS.CHARCOAL;
        ctx.lineWidth = 3;
        ctx.strokeRect(rune.x, rune.y, rune.width, rune.height);

        // Rune Hieroglyph Letter
        ctx.font = 'black 22px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
        ctx.fillText(rune.char, rune.x + rune.width / 2, rune.y + rune.height / 2);
      }

      // 4. Update & Draw War Hammer
      const hammer = engine.hammer;
      if (hammer.isSmashing && hammer.targetRune) {
        hammer.smashTau += 0.15;
        if (hammer.smashTau <= 1.0) {
          ctx.save();
          ctx.translate(hammer.targetRune.x, hammer.targetRune.y);
          ctx.rotate(Math.sin(hammer.smashTau * Math.PI) * 0.8 - 0.4);

          // Hammer Handle
          ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
          ctx.fillRect(-4, -60, 8, 60);

          // Heavy Golden Hammer Head
          ctx.fillStyle = COLOR_TOKENS.MUSTARD;
          ctx.fillRect(-22, -80, 44, 24);
          ctx.strokeStyle = COLOR_TOKENS.CHARCOAL;
          ctx.lineWidth = 3;
          ctx.strokeRect(-22, -80, 44, 24);

          ctx.restore();
        } else {
          hammer.isSmashing = false;
          hammer.targetRune = null;
        }
      }

      // 5. Update & Draw Rubble Particles
      for (let pIdx = engine.particles.length - 1; pIdx >= 0; pIdx--) {
        const pt = engine.particles[pIdx];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vy += 0.2;
        pt.life -= 0.05;

        if (pt.life <= 0) {
          engine.particles.splice(pIdx, 1);
        } else {
          ctx.fillStyle = pt.color;
          ctx.fillRect(pt.x, pt.y, pt.size, pt.size);
        }
      }

      ctx.restore();

      if (!engine.isOver) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, [handleKeyDown, spawnRune]);

  const handleRestart = () => {
    sound.playKeyClick();
    const engine = engineRef.current;
    engine.runes = [];
    engine.particles = [];
    engine.totalSmashed = 0;
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

          <span className="px-3 py-1 rounded-xl bg-[#F6C445] border-2 border-[#2D2319] font-black uppercase text-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
            🏺 Temple Bash // Desert Rune Hammer
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
          <div className="text-[10px] font-bold text-[#2D2319]/80 uppercase">Runes Smashed</div>
          <div className="text-base sm:text-lg font-black text-[#2D2319] font-display mt-0.5">{hudState.remaining} / {totalRunesTarget}</div>
        </div>

        <div className="bg-[#C3A6E8] p-2.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]">
          <div className="text-[10px] font-bold text-[#2D2319]/80 uppercase">Combo Streak</div>
          <div className="text-base sm:text-lg font-black text-[#2D2319] font-display mt-0.5">🔥 {hudState.streak}</div>
        </div>

      </div>

      {/* Main Canvas Arena */}
      <div className="my-2 flex items-center justify-center">
        <div className="border-3 border-[#2D2319] rounded-2xl shadow-[6px_6px_0px_#2D2319] overflow-hidden bg-[#EADBC8]">
          <canvas
            ref={canvasRef}
            style={{ width: '800px', height: '480px', display: 'block' }}
          />
        </div>
      </div>

      {/* Helper Bar */}
      <div className="border-t border-[#2D2319]/20 pt-2 flex items-center justify-between text-[11px] font-mono text-[#2D2319]/70">
        <div>Type the letter on falling hieroglyph rune blocks to swing your golden war hammer!</div>
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
            <div className="text-3xl">🏺 🔨</div>
            <h3 className="text-xl font-black font-display text-[#2D2319]">Temple Conquered!</h3>
            <p className="text-xs font-mono text-[#2D2319]/70">You demolished all {totalRunesTarget} hieroglyphic monoliths!</p>
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
            <h3 className="text-xl font-black font-display text-[#2D2319]">Temple Collapsed!</h3>
            <p className="text-xs font-mono text-[#2D2319]/70">Runes breached the sanctuary perimeter.</p>
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
