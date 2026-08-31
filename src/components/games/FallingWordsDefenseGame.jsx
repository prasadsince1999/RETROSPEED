import React, { useEffect, useRef, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  RotateCcw, 
  Shield, 
  Zap, 
  Target, 
  Activity, 
  Sparkles, 
  Flame, 
  Trophy 
} from 'lucide-react';
import { TelemetryCollector } from '../../utils/telemetryEngine';
import { DDAController } from '../../utils/ddaEngine';
import { LEXICON_BANKS } from '../../utils/lexiconTrie';
import { sound } from '../../utils/audio';

// System Design Tokens (Neo-Brutalism)
export const COLOR_TOKENS = {
  CORAL: '#F28B82',
  MUSTARD: '#F6C445',
  MINT: '#48B89F',
  SKY: '#4BA3E3',
  LILAC: '#C3A6E8',
  PAPER_CREAM: '#FDF8EE',
  CHARCOAL: '#2D2319',
  SURFACE_ALT: '#FAF3E0'
};

export default function FallingWordsDefenseGame({
  onComplete,
  onExit,
  initialDifficulty = 0.3
}) {
  const canvasRef = useRef(null);
  
  // HUD Telemetry Metrics State
  const [metrics, setMetrics] = useState({
    wpm: 0,
    accuracy: 100,
    flusterIndex: 0,
    difficultyFactor: initialDifficulty,
    health: 100,
    score: 0,
    wave: 1,
    streak: 0
  });

  const [gameStateStatus, setGameStateStatus] = useState('playing'); // 'playing' | 'gameover' | 'victory'

  // Mutable Game Engine References (Prevents Stale Closures in RAF)
  const engineRef = useRef({
    telemetry: new TelemetryCollector(),
    dda: new DDAController({ initialDifficulty }),
    words: [],
    projectiles: [],
    particles: [],
    lockedWordId: null,
    score: 0,
    streak: 0,
    health: 100,
    wave: 1,
    wordsDefeatedInWave: 0,
    waveTarget: 15,
    lastSpawnTime: performance.now(),
    screenShakeTime: 0,
    shakeIntensity: 0,
    isOver: false,
    startTime: performance.now()
  });

  // Spawn a new falling word entity
  const spawnWord = (now, difficulty) => {
    const engine = engineRef.current;
    const pool = difficulty > 0.6 
      ? [...LEXICON_BANKS.hard, ...LEXICON_BANKS.medium] 
      : (difficulty > 0.35 ? LEXICON_BANKS.medium : LEXICON_BANKS.easy);
    
    const text = pool[Math.floor(Math.random() * pool.length)].toUpperCase();
    const colors = [COLOR_TOKENS.CORAL, COLOR_TOKENS.SKY, COLOR_TOKENS.LILAC, COLOR_TOKENS.MUSTARD];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const canvasWidth = 800;
    const cardWidth = Math.max(90, text.length * 13 + 24);
    const x = Math.max(20, Math.min(canvasWidth - cardWidth - 20, Math.random() * (canvasWidth - cardWidth)));

    const wordEntity = {
      id: Math.random().toString(36).substring(2, 9),
      text,
      typedIndex: 0,
      x,
      y: 10,
      width: cardWidth,
      height: 34,
      speed: 0.6 + difficulty * 1.5 + (engine.wave - 1) * 0.2,
      color,
      state: 'IDLE' // 'IDLE' | 'TARGET_LOCKED' | 'IMPACT_CLEAR'
    };

    engine.words.push(wordEntity);
    engine.lastSpawnTime = now;
  };

  // Handle Keystrokes
  const handleKeyDown = useCallback((event) => {
    const engine = engineRef.current;
    if (engine.isOver) return;

    const key = event.key.toUpperCase();
    if (key.length > 1 && key !== 'BACKSPACE') return; // Ignore modifier keys
    if (event.key === 'Escape') {
      if (onExit) onExit();
      return;
    }

    const now = performance.now();
    engine.telemetry.recordKeyDown(event.key, now);

    // 1. Target Selection if no word is locked
    if (!engine.lockedWordId) {
      // Priority function P(w) selecting matching word closest to bottom boundary
      const candidates = engine.words.filter(w => w.text.startsWith(key));
      if (candidates.length > 0) {
        // Sort by highest Y (closest to bottom)
        candidates.sort((a, b) => b.y - a.y);
        const target = candidates[0];
        engine.lockedWordId = target.id;
        target.state = 'TARGET_LOCKED';
        target.typedIndex = 1;
        
        sound.playKeyClick();
        engine.streak++;
        
        // Spawn particle at target
        engine.particles.push({
          x: target.x + 15,
          y: target.y + 17,
          vx: (Math.random() - 0.5) * 4,
          vy: -Math.random() * 3,
          color: COLOR_TOKENS.MINT,
          life: 1.0
        });
      } else {
        // Typo
        sound.playError();
        engine.telemetry.markLastError(true);
        engine.streak = 0;
      }
    } else {
      // 2. Matching character on locked word
      const lockedWord = engine.words.find(w => w.id === engine.lockedWordId);
      if (lockedWord) {
        const expectedChar = lockedWord.text[lockedWord.typedIndex];
        if (key === expectedChar) {
          lockedWord.typedIndex++;
          sound.playKeyClick();
          engine.streak++;

          // Check if word is fully typed
          if (lockedWord.typedIndex === lockedWord.text.length) {
            // Spawn Quadratic Bézier Turret Projectile
            const turretOrigin = { x: 400, y: 470 };
            const targetPos = { x: lockedWord.x + lockedWord.width / 2, y: lockedWord.y + 17 };
            const controlPoint = { 
              x: (turretOrigin.x + targetPos.x) / 2 + (Math.random() - 0.5) * 80, 
              y: Math.min(turretOrigin.y, targetPos.y) - 60 
            };

            engine.projectiles.push({
              id: Math.random().toString(36).substring(2, 7),
              targetWordId: lockedWord.id,
              targetPos,
              p0: turretOrigin,
              pC: controlPoint,
              pT: targetPos,
              tau: 0.0,
              speed: 0.08
            });

            lockedWord.state = 'PROJECTILE_IN_FLIGHT';
            engine.lockedWordId = null;
          }
        } else {
          // Mistyped character on locked word
          sound.playError();
          engine.telemetry.markLastError(true);
          engine.streak = 0;
        }
      }
    }

    // Refresh DDA and live telemetry
    const liveMetrics = engine.telemetry.getLiveMetrics(now);
    const ddaRes = engine.dda.update(liveMetrics, now);

    setMetrics({
      wpm: liveMetrics.iwpm,
      accuracy: liveMetrics.accuracy,
      flusterIndex: liveMetrics.flusterIndex,
      difficultyFactor: ddaRes.difficulty,
      health: engine.health,
      score: engine.score,
      wave: engine.wave,
      streak: engine.streak
    });
  }, [onExit]);

  const handleKeyUp = useCallback((event) => {
    engineRef.current.telemetry.recordKeyUp(event.key, performance.now());
  }, []);

  // Main Canvas Render & Game Loop
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    const dpr = window.devicePixelRatio || 1;
    const width = 800;
    const height = 500;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = false;

    const render = (time) => {
      const engine = engineRef.current;
      const now = performance.now();

      // Clear & Background
      ctx.fillStyle = COLOR_TOKENS.PAPER_CREAM;
      ctx.fillRect(0, 0, width, height);

      // 1. Handle Screen Shake Matrix Displacement
      ctx.save();
      if (engine.shakeIntensity > 0) {
        const elapsedShake = (now - engine.screenShakeTime) / 1000;
        if (elapsedShake < 0.3) {
          const decay = Math.exp(-elapsedShake * 10);
          const shakeX = (Math.random() - 0.5) * engine.shakeIntensity * decay;
          const shakeY = (Math.random() - 0.5) * engine.shakeIntensity * decay;
          ctx.translate(shakeX, shakeY);
        } else {
          engine.shakeIntensity = 0;
        }
      }

      // 2. Draw Defensive Boundary Perimeter Line
      const perimeterY = height - 55;
      ctx.beginPath();
      ctx.moveTo(0, perimeterY);
      ctx.lineTo(width, perimeterY);
      ctx.strokeStyle = COLOR_TOKENS.CORAL;
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Perimeter Label
      ctx.fillStyle = COLOR_TOKENS.CORAL;
      ctx.font = 'bold 10px "Courier New", monospace';
      ctx.fillText('── DEFENSIVE PERIMETER BOUNDARY ──', 20, perimeterY - 6);

      // 3. Draw Player Turret Base at Bottom Center
      const turretX = width / 2;
      const turretY = height - 25;
      ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
      ctx.fillRect(turretX - 30, turretY, 60, 20);
      ctx.fillStyle = COLOR_TOKENS.SKY;
      ctx.fillRect(turretX - 26, turretY + 3, 52, 14);
      ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
      ctx.beginPath();
      ctx.arc(turretX, turretY, 14, Math.PI, 0);
      ctx.fill();

      // 4. Word Entity Spawner driven by DDA
      const ddaParams = engine.dda.getScaledParameters();
      if (!engine.isOver && now - engine.lastSpawnTime > ddaParams.fallingSpawnIntervalMs && engine.words.length < ddaParams.maxActiveWordsOnScreen) {
        spawnWord(now, engine.dda.difficulty);
      }

      // 5. Update & Render Falling Word Entities
      for (let i = engine.words.length - 1; i >= 0; i--) {
        const word = engine.words[i];

        if (word.state !== 'IMPACT_CLEAR') {
          word.y += word.speed;
        }

        // Check Perimeter Breach
        if (word.y + word.height >= perimeterY && word.state !== 'IMPACT_CLEAR') {
          sound.playError();
          engine.health = Math.max(0, engine.health - 20);
          engine.streak = 0;
          engine.screenShakeTime = now;
          engine.shakeIntensity = 10.0;
          
          if (engine.lockedWordId === word.id) {
            engine.lockedWordId = null;
          }
          engine.words.splice(i, 1);

          if (engine.health <= 0) {
            engine.isOver = true;
            setGameStateStatus('gameover');
          }
          continue;
        }

        // Render Word Card (Neo-Brutalist 3px Border + 4px Hard Drop Shadow)
        const isLocked = word.id === engine.lockedWordId;

        // Hard Drop Shadow
        ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
        ctx.fillRect(word.x + 4, word.y + 4, word.width, word.height);

        // Solid Fill Card
        ctx.fillStyle = isLocked ? COLOR_TOKENS.MUSTARD : word.color;
        ctx.fillRect(word.x, word.y, word.width, word.height);

        // Solid Border
        ctx.strokeStyle = COLOR_TOKENS.CHARCOAL;
        ctx.lineWidth = 3;
        ctx.strokeRect(word.x, word.y, word.width, word.height);

        // Text Rendering
        ctx.font = 'bold 15px "Courier New", monospace';
        ctx.textBaseline = 'middle';

        const typedPart = word.text.substring(0, word.typedIndex);
        const remainingPart = word.text.substring(word.typedIndex);

        // Render typed portion in Mint
        ctx.fillStyle = COLOR_TOKENS.MINT;
        ctx.fillText(typedPart, word.x + 10, word.y + word.height / 2);

        // Render remaining portion in Charcoal Dark
        const typedWidth = ctx.measureText(typedPart).width;
        ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
        ctx.fillText(remainingPart, word.x + 10 + typedWidth, word.y + word.height / 2);
      }

      // 6. Update & Render Quadratic Bézier Projectiles
      for (let pIdx = engine.projectiles.length - 1; pIdx >= 0; pIdx--) {
        const proj = engine.projectiles[pIdx];
        proj.tau += proj.speed;

        // Bézier Interpolation: P(tau) = (1-tau)^2 * P0 + 2(1-tau)tau * PC + tau^2 * PT
        const tau = proj.tau;
        const invTau = 1 - tau;
        const curX = invTau * invTau * proj.p0.x + 2 * invTau * tau * proj.pC.x + tau * tau * proj.pT.x;
        const curY = invTau * invTau * proj.p0.y + 2 * invTau * tau * proj.pC.y + tau * tau * proj.pT.y;

        // Render Projectile Head & Trail
        ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
        ctx.beginPath();
        ctx.arc(curX + 2, curY + 2, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = COLOR_TOKENS.MINT;
        ctx.beginPath();
        ctx.arc(curX, curY, 6, 0, Math.PI * 2);
        ctx.fill();

        // Check Collision with target
        if (proj.tau >= 1.0) {
          sound.playWordSuccess();
          engine.screenShakeTime = now;
          engine.shakeIntensity = 8.0;
          engine.score += 150 + engine.streak * 20;
          engine.wordsDefeatedInWave++;

          // Spawn burst particles
          for (let k = 0; k < 12; k++) {
            engine.particles.push({
              x: proj.targetPos.x,
              y: proj.targetPos.y,
              vx: (Math.random() - 0.5) * 8,
              vy: (Math.random() - 0.5) * 8,
              color: [COLOR_TOKENS.MINT, COLOR_TOKENS.MUSTARD, COLOR_TOKENS.SKY][k % 3],
              life: 1.0
            });
          }

          // Remove target word entity
          engine.words = engine.words.filter(w => w.id !== proj.targetWordId);
          engine.projectiles.splice(pIdx, 1);

          // Wave check
          if (engine.wordsDefeatedInWave >= engine.waveTarget) {
            engine.wave++;
            engine.wordsDefeatedInWave = 0;
            engine.waveTarget += 5;
            sound.playTada();
          }
        }
      }

      // 7. Update & Render Particles
      for (let pI = engine.particles.length - 1; pI >= 0; pI--) {
        const pt = engine.particles[pI];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life -= 0.04;

        if (pt.life <= 0) {
          engine.particles.splice(pI, 1);
        } else {
          ctx.fillStyle = pt.color;
          ctx.fillRect(pt.x, pt.y, 4, 4);
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
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [handleKeyDown, handleKeyUp]);

  const handleRestart = () => {
    sound.playKeyClick();
    const engine = engineRef.current;
    engine.telemetry.reset();
    engine.dda.reset(initialDifficulty);
    engine.words = [];
    engine.projectiles = [];
    engine.particles = [];
    engine.lockedWordId = null;
    engine.score = 0;
    engine.streak = 0;
    engine.health = 100;
    engine.wave = 1;
    engine.wordsDefeatedInWave = 0;
    engine.isOver = false;
    setGameStateStatus('playing');
  };

  return (
    <div className="w-full h-full flex flex-col justify-between font-sans select-none bg-[#FDF8EE] p-3 sm:p-5 overflow-y-auto">
      
      {/* Top Bar: Title, Back button, Wave & Health */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#2D2319] pb-3 font-mono text-xs">
        
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              if (onExit) onExit();
            }}
            className="px-3 py-1.5 bg-[#FAF3E0] hover:bg-white border-2 border-[#2D2319] rounded-xl font-bold flex items-center space-x-1.5 shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit Game</span>
          </button>

          <span className="px-3 py-1 rounded-xl bg-[#C3A6E8] border-2 border-[#2D2319] font-black uppercase text-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
            ☄️ Meteor Words // Falling Defense
          </span>
        </div>

        {/* Health & Wave Pill */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 bg-[#FAF3E0] px-3 py-1 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
            <Shield className="w-4 h-4 text-[#F28B82]" />
            <span className="font-bold text-[#2D2319]/70">Shield:</span>
            <span className={`font-black text-sm ${metrics.health <= 40 ? 'text-[#F28B82]' : 'text-[#48B89F]'}`}>
              {metrics.health}%
            </span>
          </div>

          <div className="flex items-center space-x-1.5 bg-[#FAF3E0] px-3 py-1 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
            <Trophy className="w-4 h-4 text-[#F6C445]" />
            <span className="font-bold text-[#2D2319]/70">Score:</span>
            <span className="font-black text-sm text-[#2D2319]">{metrics.score}</span>
          </div>
        </div>

      </div>

      {/* 4 Neo-Brutalist HUD Telemetry Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3 font-mono">
        
        {/* SPEED */}
        <div className="bg-[#F6C445] p-2.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]">
          <div className="text-[10px] font-bold text-[#2D2319]/80 uppercase">Speed (IWPM)</div>
          <div className="text-base sm:text-lg font-black text-[#2D2319] font-display mt-0.5">{metrics.wpm} WPM</div>
        </div>

        {/* ACCURACY */}
        <div className="bg-[#48B89F] p-2.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]">
          <div className="text-[10px] font-bold text-[#2D2319]/80 uppercase">Accuracy</div>
          <div className="text-base sm:text-lg font-black text-[#2D2319] font-display mt-0.5">{metrics.accuracy}%</div>
        </div>

        {/* FLUSTER INDEX */}
        <div className="bg-[#F28B82] p-2.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]">
          <div className="text-[10px] font-bold text-[#2D2319]/80 uppercase">Fluster Index (FI)</div>
          <div className="text-base sm:text-lg font-black text-[#2D2319] font-display mt-0.5">{metrics.flusterIndex}</div>
        </div>

        {/* DDA LEVEL */}
        <div className="bg-[#C3A6E8] p-2.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]">
          <div className="text-[10px] font-bold text-[#2D2319]/80 uppercase">DDA Difficulty (D)</div>
          <div className="text-base sm:text-lg font-black text-[#2D2319] font-display mt-0.5">{metrics.difficultyFactor}</div>
        </div>

      </div>

      {/* Main Canvas Engine Container */}
      <div className="my-2 flex items-center justify-center">
        <div className="border-3 border-[#2D2319] rounded-2xl shadow-[6px_6px_0px_#2D2319] overflow-hidden bg-[#FDF8EE]">
          <canvas
            ref={canvasRef}
            style={{ width: '800px', height: '500px', display: 'block' }}
          />
        </div>
      </div>

      {/* Helper Bar */}
      <div className="border-t border-[#2D2319]/20 pt-2 flex items-center justify-between text-[11px] font-mono text-[#2D2319]/70">
        <div>Type the first letter of any falling keyword to lock target, then finish the word to fire!</div>
        <button
          type="button"
          onClick={handleRestart}
          className="px-3 py-1 bg-[#FAF3E0] hover:bg-white border border-[#2D2319] rounded-lg font-bold flex items-center space-x-1 text-[#2D2319]"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Restart</span>
        </button>
      </div>

      {/* Game Over Modal */}
      {gameStateStatus === 'gameover' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2319]/60 backdrop-blur-[1px] animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-[#FDF8EE] border-2 border-[#2D2319] rounded-2xl shadow-[6px_6px_0px_#2D2319] overflow-hidden p-6 text-center space-y-4 font-sans">
            <div className="text-3xl">💥</div>
            <h3 className="text-xl font-black font-display text-[#2D2319]">Perimeter Breached!</h3>
            <p className="text-xs font-mono text-[#2D2319]/70">Your base shield collapsed under meteor impact.</p>
            <div className="bg-[#FAF3E0] p-3 rounded-xl border border-[#2D2319] text-xs font-mono">
              <div>Final Score: <span className="font-bold">{metrics.score} pts</span></div>
              <div>Top Speed: <span className="font-bold">{metrics.wpm} WPM</span></div>
            </div>
            <div className="flex justify-center space-x-3 pt-2">
              <button
                type="button"
                onClick={handleRestart}
                className="px-4 py-2 bg-[#F6C445] border-2 border-[#2D2319] rounded-xl font-display font-black text-xs"
              >
                Try Again
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
