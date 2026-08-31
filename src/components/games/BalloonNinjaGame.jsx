import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  RotateCcw, 
  Heart, 
  Trophy, 
  Flame, 
  Sparkles, 
  Zap, 
  Eye, 
  EyeOff 
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
  CLIFF_TOP: '#48B89F',
  CLIFF_ROCK: '#2D2319',
  MOUNTAIN: '#A3C8DE',
  SKY_BG: '#C5DCED'
};

const BALLOON_COLORS = [
  COLOR_TOKENS.MUSTARD,
  COLOR_TOKENS.SKY,
  COLOR_TOKENS.CORAL,
  COLOR_TOKENS.MINT,
  COLOR_TOKENS.LILAC
];

export default function BalloonNinjaGame({
  lesson,
  onComplete,
  onExit,
  targetKeySet = ['f', 'j', 'd', 'k', 's', 'l', 'a', ';']
}) {
  const canvasRef = useRef(null);

  // Lesson Target Keys
  const keys = lesson?.targetKeys && lesson.targetKeys.length > 0 
    ? lesson.targetKeys 
    : targetKeySet;

  const totalBalloonsTarget = 30;

  // React State for HUD
  const [hudState, setHudState] = useState({
    remaining: totalBalloonsTarget,
    popped: 0,
    score: 0,
    lives: 3,
    streak: 0,
    wpm: 0,
    accuracy: 100,
    activeTargetKey: 'F'
  });

  const [gameState, setGameState] = useState('playing'); // 'playing' | 'gameover' | 'victory'

  // Mutable Game Engine Reference
  const engineRef = useRef({
    balloons: [],
    particles: [],
    ninja: {
      x: 80,
      y: 380,
      baseX: 80,
      baseY: 380,
      isSlashing: false,
      slashTarget: null,
      slashTau: 0,
      slashSpeed: 0.12
    },
    activeBalloonIndex: 0,
    totalPopped: 0,
    remainingToSpawn: totalBalloonsTarget,
    lives: 3,
    score: 0,
    streak: 0,
    totalHits: 0,
    totalMisses: 0,
    startTime: performance.now(),
    isOver: false
  });

  // Spawn a wave of balloons
  const spawnInitialBalloons = useCallback(() => {
    const engine = engineRef.current;
    engine.balloons = [];
    
    // Spawn 5 initial balloons along a gentle sine curve
    for (let i = 0; i < 5; i++) {
      const char = keys[Math.floor(Math.random() * keys.length)].toUpperCase();
      const color = BALLOON_COLORS[i % BALLOON_COLORS.length];
      const startX = 220 + i * 110;
      const baseY = 160 + Math.sin(i * 1.2) * 50;

      engine.balloons.push({
        id: Math.random().toString(36).substring(2, 7),
        char,
        color,
        x: startX,
        y: baseY,
        baseY: baseY,
        phase: i * 0.8,
        radius: 26,
        isPopped: false
      });
    }
    engine.activeBalloonIndex = 0;
  }, [keys]);

  useEffect(() => {
    spawnInitialBalloons();
  }, [spawnInitialBalloons]);

  // Handle Keystroke
  const handleKeyDown = useCallback((event) => {
    const engine = engineRef.current;
    if (engine.isOver) return;

    if (event.key === 'Escape') {
      if (onExit) onExit();
      return;
    }

    const key = event.key.toUpperCase();
    if (key.length > 1) return;

    const activeBalloon = engine.balloons[engine.activeBalloonIndex];
    if (!activeBalloon || activeBalloon.isPopped) return;

    if (key === activeBalloon.char) {
      // MATCH! Trigger Katana Slash
      sound.playKeyClick();
      engine.totalHits++;
      engine.streak++;
      engine.score += 100 + engine.streak * 15;
      engine.totalPopped++;

      // Trigger Ninja Parabolic Slash
      engine.ninja.isSlashing = true;
      engine.ninja.slashTarget = { x: activeBalloon.x, y: activeBalloon.y };
      engine.ninja.slashTau = 0;

      activeBalloon.isPopped = true;

      // Pop Particles
      for (let k = 0; k < 14; k++) {
        engine.particles.push({
          x: activeBalloon.x,
          y: activeBalloon.y,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8 - 2,
          color: activeBalloon.color,
          size: Math.random() * 5 + 3,
          life: 1.0
        });
      }

      // Check Victory
      if (engine.totalPopped >= totalBalloonsTarget) {
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
      } else {
        // Advance to next balloon or replenish wave
        const remainingUnpopped = engine.balloons.filter(b => !b.isPopped);
        if (remainingUnpopped.length <= 1) {
          spawnInitialBalloons();
        } else {
          // Advance index
          let nextIdx = engine.activeBalloonIndex + 1;
          while (nextIdx < engine.balloons.length && engine.balloons[nextIdx].isPopped) {
            nextIdx++;
          }
          if (nextIdx >= engine.balloons.length) {
            nextIdx = engine.balloons.findIndex(b => !b.isPopped);
          }
          engine.activeBalloonIndex = Math.max(0, nextIdx);
        }
      }
    } else {
      // Mistyped Key
      sound.playError();
      engine.totalMisses++;
      engine.streak = 0;
      engine.lives = Math.max(0, engine.lives - 1);

      if (engine.lives <= 0) {
        engine.isOver = true;
        setGameState('gameover');
      }
    }

    // Update React HUD
    const activeTarget = engine.balloons[engine.activeBalloonIndex]?.char || ' ';
    const elapsedMinutes = Math.max(0.1, (performance.now() - engine.startTime) / 60000);
    const totalEntries = engine.totalHits + engine.totalMisses;
    const accuracy = totalEntries > 0 ? Math.round((engine.totalHits / totalEntries) * 100) : 100;
    const wpm = Math.round((engine.totalHits / 5) / elapsedMinutes);

    setHudState({
      remaining: Math.max(0, totalBalloonsTarget - engine.totalPopped),
      popped: engine.totalPopped,
      score: engine.score,
      lives: engine.lives,
      streak: engine.streak,
      wpm,
      accuracy,
      activeTargetKey: activeTarget
    });
  }, [spawnInitialBalloons, totalBalloonsTarget, onComplete, onExit]);

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
      const t = time * 0.002;

      // 1. Draw Solid Retro Sky Background
      ctx.fillStyle = COLOR_TOKENS.SKY_BG;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Distant Karst Mountain Silhouette in Solid Slate-Denim
      ctx.fillStyle = COLOR_TOKENS.MOUNTAIN;
      ctx.beginPath();
      ctx.moveTo(140, height - 120);
      ctx.lineTo(260, 180);
      ctx.lineTo(340, 240);
      ctx.lineTo(460, 140);
      ctx.lineTo(580, 260);
      ctx.lineTo(690, 190);
      ctx.lineTo(width, height - 120);
      ctx.lineTo(width, height);
      ctx.lineTo(140, height);
      ctx.closePath();
      ctx.fill();

      // Mountain Border Stroke
      ctx.strokeStyle = COLOR_TOKENS.CHARCOAL;
      ctx.lineWidth = 3;
      ctx.stroke();

      // 3. Draw Water Base at Bottom Right
      ctx.fillStyle = COLOR_TOKENS.SKY;
      ctx.fillRect(180, height - 90, width - 180, 90);
      ctx.strokeStyle = COLOR_TOKENS.CHARCOAL;
      ctx.lineWidth = 3;
      ctx.strokeRect(180, height - 90, width - 180, 90);

      // Floating Lilypads in Water
      ctx.fillStyle = COLOR_TOKENS.MINT;
      ctx.beginPath();
      ctx.ellipse(320, height - 45, 25, 8, 0, 0, Math.PI * 2);
      ctx.ellipse(540, height - 60, 30, 10, 0, 0, Math.PI * 2);
      ctx.ellipse(680, height - 35, 22, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      // 4. Draw Cliff Ledge at Bottom Left
      ctx.fillStyle = COLOR_TOKENS.CLIFF_ROCK;
      ctx.fillRect(0, height - 150, 190, 150);

      // Lush Grass Top on Cliff
      ctx.fillStyle = COLOR_TOKENS.CLIFF_TOP;
      ctx.fillRect(0, height - 155, 190, 20);
      ctx.strokeStyle = COLOR_TOKENS.CHARCOAL;
      ctx.lineWidth = 3;
      ctx.strokeRect(0, height - 155, 190, 20);
      ctx.strokeRect(0, height - 135, 190, 135);

      // 5. Update & Draw Balloons
      engine.balloons.forEach((balloon, bIdx) => {
        if (balloon.isPopped) return;

        // Gentle sine float
        balloon.y = balloon.baseY + Math.sin(t + balloon.phase) * 12;

        const isActive = bIdx === engine.activeBalloonIndex;

        // Active Target Radial Sunburst Aura & Pointer Arrows
        if (isActive) {
          ctx.strokeStyle = COLOR_TOKENS.MUSTARD;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(balloon.x, balloon.y, balloon.radius + 12, 0, Math.PI * 2);
          ctx.stroke();

          // Left Arrow <
          ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
          ctx.font = 'bold 20px "Courier New", monospace';
          ctx.fillText('◀', balloon.x - balloon.radius - 30, balloon.y + 6);
          // Right Arrow >
          ctx.fillText('▶', balloon.x + balloon.radius + 14, balloon.y + 6);
        }

        // Hanging Ropes & Wooden Trapeze Bar
        const barY = balloon.y + balloon.radius + 20;
        ctx.strokeStyle = COLOR_TOKENS.CHARCOAL;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(balloon.x - 12, balloon.y + balloon.radius - 4);
        ctx.lineTo(balloon.x - 12, barY);
        ctx.moveTo(balloon.x + 12, balloon.y + balloon.radius - 4);
        ctx.lineTo(balloon.x + 12, barY);
        ctx.stroke();

        // Wooden Trapeze Bar
        ctx.fillStyle = COLOR_TOKENS.MUSTARD;
        ctx.fillRect(balloon.x - 18, barY, 36, 6);
        ctx.strokeRect(balloon.x - 18, barY, 36, 6);

        // Teardrop Balloon Body (Hard Shadow + Solid Fill + 3px Charcoal Border)
        // Hard Shadow
        ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
        ctx.beginPath();
        ctx.arc(balloon.x + 4, balloon.y + 4, balloon.radius, 0, Math.PI * 2);
        ctx.fill();

        // Balloon Solid Fill
        ctx.fillStyle = balloon.color;
        ctx.beginPath();
        ctx.arc(balloon.x, balloon.y, balloon.radius, 0, Math.PI * 2);
        ctx.fill();

        // Balloon Outer Stroke
        ctx.strokeStyle = COLOR_TOKENS.CHARCOAL;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Balloon Tie Knot
        ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
        ctx.beginPath();
        ctx.moveTo(balloon.x - 5, balloon.y + balloon.radius);
        ctx.lineTo(balloon.x + 5, balloon.y + balloon.radius);
        ctx.lineTo(balloon.x, balloon.y + balloon.radius + 6);
        ctx.closePath();
        ctx.fill();

        // Letter Stamp
        ctx.font = 'black 22px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
        ctx.fillText(balloon.char, balloon.x, balloon.y);
      });

      // 6. Update & Draw Ninja Character
      const ninja = engine.ninja;
      let ninjaX = ninja.baseX;
      let ninjaY = ninja.baseY;

      if (ninja.isSlashing && ninja.slashTarget) {
        ninja.slashTau += ninja.slashSpeed;
        const tau = ninja.slashTau;

        if (tau <= 1.0) {
          // Parabolic leap: y = (1-tau)*baseY + tau*targetY - 100 * 4 * tau * (1-tau)
          ninjaX = (1 - tau) * ninja.baseX + tau * ninja.slashTarget.x;
          ninjaY = (1 - tau) * ninja.baseY + tau * ninja.slashTarget.y - 120 * Math.sin(tau * Math.PI);

          // Katana Slash Beam
          ctx.strokeStyle = COLOR_TOKENS.MINT;
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.moveTo(ninjaX - 25, ninjaY - 20);
          ctx.lineTo(ninjaX + 25, ninjaY + 20);
          ctx.stroke();
        } else {
          // Slash complete, land back
          ninja.isSlashing = false;
          ninja.slashTarget = null;
        }
      }

      // Draw Silhouette Ninja
      // Body Shadow
      ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
      ctx.fillRect(ninjaX - 14 + 3, ninjaY - 26 + 3, 28, 38);
      // Head
      ctx.beginPath();
      ctx.arc(ninjaX, ninjaY - 36, 12, 0, Math.PI * 2);
      ctx.fill();
      // Torso & Robes
      ctx.fillRect(ninjaX - 14, ninjaY - 26, 28, 38);

      // Flowing Coral Headband
      ctx.fillStyle = COLOR_TOKENS.CORAL;
      ctx.fillRect(ninjaX - 13, ninjaY - 40, 26, 5);
      ctx.beginPath();
      ctx.moveTo(ninjaX - 13, ninjaY - 38);
      ctx.lineTo(ninjaX - 32, ninjaY - 34 + Math.sin(t * 2) * 4);
      ctx.lineTo(ninjaX - 13, ninjaY - 35);
      ctx.fill();

      // Glowing Eyes
      ctx.fillStyle = COLOR_TOKENS.MUSTARD;
      ctx.fillRect(ninjaX + 2, ninjaY - 37, 4, 3);

      // Katana Sheath on Back
      ctx.strokeStyle = COLOR_TOKENS.CHARCOAL;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(ninjaX - 16, ninjaY - 35);
      ctx.lineTo(ninjaX - 6, ninjaY - 8);
      ctx.stroke();

      // 7. Update & Render Particle Sparks
      for (let pIdx = engine.particles.length - 1; pIdx >= 0; pIdx--) {
        const pt = engine.particles[pIdx];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vy += 0.2; // Gravity
        pt.life -= 0.04;

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
  }, [handleKeyDown]);

  const handleRestart = () => {
    sound.playKeyClick();
    const engine = engineRef.current;
    engine.totalPopped = 0;
    engine.lives = 3;
    engine.score = 0;
    engine.streak = 0;
    engine.totalHits = 0;
    engine.totalMisses = 0;
    engine.startTime = performance.now();
    engine.isOver = false;
    spawnInitialBalloons();
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

          <span className="px-3 py-1 rounded-xl bg-[#F28B82] border-2 border-[#2D2319] font-black uppercase text-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
            🎈 Balloon Ninja // Garden Slicer
          </span>
        </div>

        {/* Target Keys & Lives Pill */}
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
          <div className="text-[10px] font-bold text-[#2D2319]/80 uppercase">Balloons Left</div>
          <div className="text-base sm:text-lg font-black text-[#2D2319] font-display mt-0.5">{hudState.remaining} / {totalBalloonsTarget}</div>
        </div>

        <div className="bg-[#C3A6E8] p-2.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]">
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
        <div>Type the letter inside the highlighted balloon to leap and slice with your katana!</div>
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
            <div className="text-3xl">🥷 🎈</div>
            <h3 className="text-xl font-black font-display text-[#2D2319]">Balloon Ninja Master!</h3>
            <p className="text-xs font-mono text-[#2D2319]/70">You sliced all {totalBalloonsTarget} target balloons!</p>
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
            <h3 className="text-xl font-black font-display text-[#2D2319]">Out of Lives!</h3>
            <p className="text-xs font-mono text-[#2D2319]/70">You lost all 3 hearts to mistyped keystrokes.</p>
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
