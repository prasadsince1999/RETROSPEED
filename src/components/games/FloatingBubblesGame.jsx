import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  RotateCcw, 
  Trophy, 
  Flame, 
  Sparkles, 
  Waves 
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
  OCEAN_BG: '#70B9D9',
  CORAL_REEF: '#2D2319',
  SEABED: '#48A0C4'
};

export default function FloatingBubblesGame({
  lesson,
  onComplete,
  onExit,
  targetKeySet = ['e', 'i', 'r', 'u', 'f', 'j', 'd', 'k']
}) {
  const canvasRef = useRef(null);

  const keys = lesson?.targetKeys && lesson.targetKeys.length > 0 
    ? lesson.targetKeys 
    : targetKeySet;

  const totalBubblesTarget = 30;

  const [hudState, setHudState] = useState({
    remaining: totalBubblesTarget,
    score: 0,
    lives: 3,
    streak: 0,
    wpm: 0,
    accuracy: 100
  });

  const [gameState, setGameState] = useState('playing');

  const engineRef = useRef({
    bubbles: [],
    particles: [],
    totalPopped: 0,
    lives: 3,
    score: 0,
    streak: 0,
    totalHits: 0,
    totalMisses: 0,
    startTime: performance.now(),
    lastSpawnTime: performance.now(),
    isOver: false
  });

  // Spawn rising bubble
  const spawnBubble = useCallback(() => {
    const engine = engineRef.current;
    const char = keys[Math.floor(Math.random() * keys.length)].toUpperCase();
    const colors = [COLOR_TOKENS.PAPER_CREAM, COLOR_TOKENS.MUSTARD, COLOR_TOKENS.MINT, COLOR_TOKENS.LILAC, COLOR_TOKENS.CORAL];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const x = Math.random() * (720 - 80) + 80;

    engine.bubbles.push({
      id: Math.random().toString(36).substring(2, 7),
      char,
      color,
      x,
      y: 440,
      radius: 26,
      speed: 0.8 + Math.random() * 0.5,
      wobblePhase: Math.random() * Math.PI * 2
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

    // Find bubble closest to ceiling matching key
    const candidates = engine.bubbles.filter(b => b.char === key);
    if (candidates.length > 0) {
      candidates.sort((a, b) => a.y - b.y); // Closest to top
      const target = candidates[0];

      sound.playKeyClick();
      engine.totalHits++;
      engine.streak++;
      engine.score += 100 + engine.streak * 15;
      engine.totalPopped++;

      // Spawn water splash droplets
      for (let k = 0; k < 14; k++) {
        engine.particles.push({
          x: target.x,
          y: target.y,
          vx: (Math.random() - 0.5) * 7,
          vy: (Math.random() - 0.5) * 7,
          color: target.color,
          size: Math.random() * 5 + 3,
          life: 1.0
        });
      }

      engine.bubbles = engine.bubbles.filter(b => b.id !== target.id);

      if (engine.totalPopped >= totalBubblesTarget) {
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
      remaining: Math.max(0, totalBubblesTarget - engine.totalPopped),
      score: engine.score,
      lives: engine.lives,
      streak: engine.streak,
      wpm,
      accuracy
    });
  }, [totalBubblesTarget, onComplete, onExit]);

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
      const t = time * 0.003;

      // 1. Draw Deep Ocean Blue Backdrop
      ctx.fillStyle = COLOR_TOKENS.OCEAN_BG;
      ctx.fillRect(0, 0, width, height);

      // Coral Seabed at Bottom
      ctx.fillStyle = COLOR_TOKENS.SEABED;
      ctx.fillRect(0, height - 60, width, 60);
      ctx.strokeStyle = COLOR_TOKENS.CHARCOAL;
      ctx.lineWidth = 3;
      ctx.strokeRect(0, height - 60, width, 60);

      // Coral Silhouette Shapes
      ctx.fillStyle = COLOR_TOKENS.CORAL_REEF;
      ctx.beginPath();
      ctx.moveTo(40, height - 60);
      ctx.lineTo(60, height - 120);
      ctx.lineTo(80, height - 80);
      ctx.lineTo(110, height - 140);
      ctx.lineTo(130, height - 60);
      ctx.moveTo(width - 150, height - 60);
      ctx.lineTo(width - 120, height - 130);
      ctx.lineTo(width - 90, height - 80);
      ctx.lineTo(width - 60, height - 110);
      ctx.lineTo(width - 30, height - 60);
      ctx.fill();

      // Ceiling Boundary Line
      const ceilingY = 50;
      ctx.strokeStyle = COLOR_TOKENS.CORAL;
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.moveTo(0, ceilingY);
      ctx.lineTo(width, ceilingY);
      ctx.stroke();
      ctx.setLineDash([]);

      // 2. Spawn Bubbles
      if (!engine.isOver && now - engine.lastSpawnTime > 1500 && engine.bubbles.length < 6) {
        spawnBubble();
        engine.lastSpawnTime = now;
      }

      // 3. Update & Draw Rising Bubbles
      for (let i = engine.bubbles.length - 1; i >= 0; i--) {
        const bubble = engine.bubbles[i];
        bubble.y -= bubble.speed;
        const wobbleX = Math.sin(t + bubble.wobblePhase) * 6;

        // Escape past ceiling
        if (bubble.y - bubble.radius <= ceilingY) {
          sound.playError();
          engine.lives = Math.max(0, engine.lives - 1);
          engine.streak = 0;
          engine.bubbles.splice(i, 1);

          if (engine.lives <= 0) {
            engine.isOver = true;
            setGameState('gameover');
          }
          continue;
        }

        const bX = bubble.x + wobbleX;
        const bY = bubble.y;

        // Hard Drop Shadow
        ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
        ctx.beginPath();
        ctx.arc(bX + 4, bY + 4, bubble.radius, 0, Math.PI * 2);
        ctx.fill();

        // Bubble Solid Fill
        ctx.fillStyle = bubble.color;
        ctx.beginPath();
        ctx.arc(bX, bY, bubble.radius, 0, Math.PI * 2);
        ctx.fill();

        // Bubble Stroke
        ctx.strokeStyle = COLOR_TOKENS.CHARCOAL;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Bubble Specular Shine Arc
        ctx.strokeStyle = COLOR_TOKENS.PAPER_CREAM;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(bX - 8, bY - 8, bubble.radius * 0.45, Math.PI * 1.1, Math.PI * 1.7);
        ctx.stroke();

        // Letter Stamp
        ctx.font = 'black 20px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
        ctx.fillText(bubble.char, bX, bY);
      }

      // 4. Update & Draw Splash Droplets
      for (let pIdx = engine.particles.length - 1; pIdx >= 0; pIdx--) {
        const pt = engine.particles[pIdx];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life -= 0.05;

        if (pt.life <= 0) {
          engine.particles.splice(pIdx, 1);
        } else {
          ctx.fillStyle = pt.color;
          ctx.fillRect(pt.x, pt.y, pt.size, pt.size);
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
  }, [handleKeyDown, spawnBubble]);

  const handleRestart = () => {
    sound.playKeyClick();
    const engine = engineRef.current;
    engine.bubbles = [];
    engine.particles = [];
    engine.totalPopped = 0;
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

          <span className="px-3 py-1 rounded-xl bg-[#4BA3E3] border-2 border-[#2D2319] font-black uppercase text-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
            🫧 Floating Bubbles // Deep Trench Diver
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
          <div className="text-[10px] font-bold text-[#2D2319]/80 uppercase">Bubbles Left</div>
          <div className="text-base sm:text-lg font-black text-[#2D2319] font-display mt-0.5">{hudState.remaining} / {totalBubblesTarget}</div>
        </div>

        <div className="bg-[#C3A6E8] p-2.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]">
          <div className="text-[10px] font-bold text-[#2D2319]/80 uppercase">Combo Streak</div>
          <div className="text-base sm:text-lg font-black text-[#2D2319] font-display mt-0.5">🔥 {hudState.streak}</div>
        </div>

      </div>

      {/* Main Canvas Arena */}
      <div className="my-2 flex items-center justify-center">
        <div className="border-3 border-[#2D2319] rounded-2xl shadow-[6px_6px_0px_#2D2319] overflow-hidden bg-[#70B9D9]">
          <canvas
            ref={canvasRef}
            style={{ width: '800px', height: '480px', display: 'block' }}
          />
        </div>
      </div>

      {/* Helper Bar */}
      <div className="border-t border-[#2D2319]/20 pt-2 flex items-center justify-between text-[11px] font-mono text-[#2D2319]/70">
        <div>Type the letter inside floating bubbles before they reach the ocean surface ceiling!</div>
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
            <div className="text-3xl">🫧 🌊</div>
            <h3 className="text-xl font-black font-display text-[#2D2319]">Ocean Diver Champion!</h3>
            <p className="text-xs font-mono text-[#2D2319]/70">You popped all {totalBubblesTarget} deep sea bubbles!</p>
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
            <h3 className="text-xl font-black font-display text-[#2D2319]">Bubbles Escaped!</h3>
            <p className="text-xs font-mono text-[#2D2319]/70">Bubbles reached the surface.</p>
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
