import React, { useEffect, useRef, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  RotateCcw, 
  Flame, 
  Zap, 
  Flag, 
  Award, 
  Car, 
  ShieldAlert 
} from 'lucide-react';
import { TelemetryCollector } from '../../utils/telemetryEngine';
import { DDAController } from '../../utils/ddaEngine';
import { LEXICON_BANKS } from '../../utils/lexiconTrie';
import { sound } from '../../utils/audio';

const COLOR_TOKENS = {
  CORAL: '#F28B82',
  MUSTARD: '#F6C445',
  MINT: '#48B89F',
  SKY: '#4BA3E3',
  LILAC: '#C3A6E8',
  PAPER_CREAM: '#FDF8EE',
  CHARCOAL: '#2D2319',
  ASPHALT: '#E5DFD3'
};

// Track Obstacle Definitions
const OBSTACLE_TYPES = [
  { id: 'shift_barrier', label: 'CAPITALIZATION BARRIER', color: COLOR_TOKENS.CORAL, penalty: 0.4 },
  { id: 'pinky_chicane', label: 'PUNCTUATION CHICANE', color: COLOR_TOKENS.MUSTARD, penalty: 0.3 },
  { id: 'number_slick', label: 'NUMERICAL OIL SLICK', color: COLOR_TOKENS.LILAC, penalty: 0.6 }
];

export default function TypingRacerGame({
  onComplete,
  onExit,
  targetTrackDistance = 2500 // meters
}) {
  const canvasRef = useRef(null);

  const [raceHud, setRaceHud] = useState({
    iwpm: 0,
    speedKmH: 0,
    position: 4,
    distanceTraveled: 0,
    streak: 0,
    turboActive: false,
    currentObstacle: null
  });

  const [isFinished, setIsFinished] = useState(false);

  const engineRef = useRef({
    telemetry: new TelemetryCollector(),
    dda: new DDAController(),
    // Track & Words
    wordStream: [],
    currentWordIndex: 0,
    currentInput: '',
    // Player racer physics
    playerDist: 0,
    playerSpeed: 0,
    streak: 0,
    turboMultiplier: 1.0,
    isTurboActive: false,
    engineDrag: 1.0,
    // AI Ghost racers (ARIMA stochastic parameters)
    ghosts: [
      { id: 'ghost_1', name: 'Cyber Phantom', color: COLOR_TOKENS.CORAL, dist: 0, baseWpm: 48, speed: 0, phi: 0.6, variance: 4 },
      { id: 'ghost_2', name: 'Neon Scribe', color: COLOR_TOKENS.LILAC, dist: 0, baseWpm: 42, speed: 0, phi: 0.5, variance: 3.5 },
      { id: 'ghost_3', name: 'Turbo Bot', color: COLOR_TOKENS.MUSTARD, dist: 0, baseWpm: 36, speed: 0, phi: 0.7, variance: 5 }
    ],
    lastTime: performance.now(),
    isOver: false,
    startTime: performance.now()
  });

  // Initialize track words & obstacles
  useEffect(() => {
    const words = [];
    const pool = [...LEXICON_BANKS.easy, ...LEXICON_BANKS.medium];

    for (let i = 0; i < 70; i++) {
      const isObstacle = i > 0 && i % 8 === 0;
      let text = pool[Math.floor(Math.random() * pool.length)];

      if (isObstacle) {
        const obsType = OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)];
        if (obsType.id === 'shift_barrier') {
          text = text.charAt(0).toUpperCase() + text.slice(1);
        } else if (obsType.id === 'pinky_chicane') {
          text = text + ';';
        } else if (obsType.id === 'number_slick') {
          text = text + '42';
        }
        words.push({ text, obstacle: obsType });
      } else {
        words.push({ text, obstacle: null });
      }
    }

    engineRef.current.wordStream = words;
    engineRef.current.currentWordIndex = 0;
    engineRef.current.currentInput = '';
    engineRef.current.playerDist = 0;
  }, []);

  // Handle typing inputs
  const handleKeyDown = useCallback((event) => {
    const engine = engineRef.current;
    if (engine.isOver) return;

    if (event.key === 'Escape') {
      if (onExit) onExit();
      return;
    }

    const key = event.key;
    const now = performance.now();
    engine.telemetry.recordKeyDown(key, now);

    const curWordObj = engine.wordStream[engine.currentWordIndex];
    if (!curWordObj) return;
    const targetWord = curWordObj.text;

    // Check if space pressed to submit word
    if (event.code === 'Space') {
      event.preventDefault();
      const typed = engine.currentInput.trim();

      if (typed === targetWord) {
        // Correct Word!
        sound.playWordSuccess();
        engine.streak++;
        engine.currentWordIndex++;
        engine.currentInput = '';

        // Check turbo boost threshold (streak >= 10)
        if (engine.streak >= 10) {
          engine.isTurboActive = true;
          engine.turboMultiplier = 2.0 * (1 + 0.1 * Math.log(engine.streak));
        } else {
          engine.isTurboActive = false;
          engine.turboMultiplier = 1 + 0.08 * Math.log(1 + engine.streak);
        }
        engine.engineDrag = 1.0;
      } else {
        // Mistyped word
        sound.playError();
        engine.telemetry.markLastError(true);
        engine.streak = 0;
        engine.isTurboActive = false;
        engine.turboMultiplier = 1.0;

        // Apply obstacle penalties if word was an obstacle
        if (curWordObj.obstacle) {
          engine.engineDrag = 1.8; // High drag penalty
        }
        engine.currentInput = '';
        engine.currentWordIndex++;
      }
      return;
    }

    if (event.key === 'Backspace') {
      engine.currentInput = engine.currentInput.slice(0, -1);
      return;
    }

    if (key.length === 1) {
      sound.playKeyClick();
      engine.currentInput += key;
    }
  }, [onExit]);

  const handleKeyUp = useCallback((event) => {
    engineRef.current.telemetry.recordKeyUp(event.key, performance.now());
  }, []);

  // Main Canvas Render & Physics Loop
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
    const height = 480;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = false;

    const render = (time) => {
      const engine = engineRef.current;
      const now = performance.now();
      const dt = Math.min(0.1, (now - engine.lastTime) / 1000);
      engine.lastTime = now;

      // 1. Calculate Live Telemetry IWPM
      const telemetry = engine.telemetry.getLiveMetrics(now);
      const iwpm = telemetry.iwpm;

      // 2. Sigmoidal Velocity Transfer: v = vmin + (vmax - vmin) / (1 + exp(-(iwpm - mu)/sigma))
      const vMin = 15;
      const vMax = 130;
      const muTarget = 50;
      const sigmaV = 14;
      const baseSpeedKmH = vMin + (vMax - vMin) / (1 + Math.exp(-(iwpm - muTarget) / sigmaV));
      
      const effectiveSpeed = (baseSpeedKmH * engine.turboMultiplier) / engine.engineDrag;
      engine.playerSpeed = effectiveSpeed;
      engine.playerDist += (effectiveSpeed * 0.28) * dt * 8; // Convert km/h to track distance

      // 3. Update AI Ghost Racers with ARIMA Model: v(t) = v_bar + phi*(v(t-1) - v_bar) + eps
      engine.ghosts.forEach(ghost => {
        const noise = (Math.random() - 0.5) * ghost.variance;
        const targetGhostSpeed = ghost.baseWpm * 1.8;
        ghost.speed = targetGhostSpeed + ghost.phi * (ghost.speed - targetGhostSpeed) + noise;
        ghost.dist += (ghost.speed * 0.28) * dt * 8;
      });

      // 4. Calculate Placement Position
      const allRacers = [
        { id: 'player', dist: engine.playerDist },
        ...engine.ghosts.map(g => ({ id: g.id, dist: g.dist }))
      ].sort((a, b) => b.dist - a.dist);

      const playerRank = allRacers.findIndex(r => r.id === 'player') + 1;

      // 5. Draw Canvas Multi-Lane Neo-Brutalist Track
      ctx.fillStyle = COLOR_TOKENS.PAPER_CREAM;
      ctx.fillRect(0, 0, width, height);

      // Track Road Surface
      const roadTop = 130;
      const roadHeight = 280;
      ctx.fillStyle = COLOR_TOKENS.ASPHALT;
      ctx.fillRect(0, roadTop, width, roadHeight);
      ctx.strokeStyle = COLOR_TOKENS.CHARCOAL;
      ctx.lineWidth = 4;
      ctx.strokeRect(0, roadTop, width, roadHeight);

      // 4 Lanes (Player Lane 0, Ghosts 1, 2, 3)
      const laneHeight = roadHeight / 4;
      for (let l = 1; l < 4; l++) {
        ctx.beginPath();
        ctx.moveTo(0, roadTop + l * laneHeight);
        ctx.lineTo(width, roadTop + l * laneHeight);
        ctx.strokeStyle = COLOR_TOKENS.CHARCOAL;
        ctx.lineWidth = 2;
        ctx.setLineDash([12, 12]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw Animated Road Stripes
      const stripeOffset = (engine.playerDist * 4) % 40;
      ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
      for (let s = -40; s < width + 40; s += 40) {
        ctx.fillRect(s - stripeOffset, roadTop - 4, 16, 4);
        ctx.fillRect(s - stripeOffset, roadTop + roadHeight, 16, 4);
      }

      // 6. Draw AI Ghost Racers
      engine.ghosts.forEach((ghost, gIdx) => {
        const laneY = roadTop + (gIdx + 1) * laneHeight + laneHeight / 2;
        // Relative screen position based on distance delta with player
        const relDist = ghost.dist - engine.playerDist;
        const screenX = Math.max(30, Math.min(width - 90, 160 + relDist * 1.2));

        // Ghost Car Body
        ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
        ctx.fillRect(screenX + 4, laneY - 10 + 4, 60, 24);
        ctx.fillStyle = ghost.color;
        ctx.fillRect(screenX, laneY - 10, 60, 24);
        ctx.strokeStyle = COLOR_TOKENS.CHARCOAL;
        ctx.lineWidth = 2;
        ctx.strokeRect(screenX, laneY - 10, 60, 24);

        // Wheels
        ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
        ctx.fillRect(screenX + 8, laneY - 14, 12, 5);
        ctx.fillRect(screenX + 40, laneY - 14, 12, 5);
        ctx.fillRect(screenX + 8, laneY + 13, 12, 5);
        ctx.fillRect(screenX + 40, laneY + 13, 12, 5);

        // Ghost Name Tag
        ctx.font = 'bold 9px "Courier New", monospace';
        ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
        ctx.fillText(ghost.name, screenX, laneY - 16);
      });

      // 7. Draw Player Racecar (Lane 0)
      const playerLaneY = roadTop + laneHeight / 2;
      const playerScreenX = 160;

      // Turbo Flame Trail
      if (engine.isTurboActive) {
        ctx.fillStyle = COLOR_TOKENS.CORAL;
        ctx.beginPath();
        ctx.moveTo(playerScreenX - 4, playerLaneY);
        ctx.lineTo(playerScreenX - 35, playerLaneY - 8);
        ctx.lineTo(playerScreenX - 25, playerLaneY);
        ctx.lineTo(playerScreenX - 40, playerLaneY + 8);
        ctx.closePath();
        ctx.fill();
      }

      // Player Car Body
      ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
      ctx.fillRect(playerScreenX + 4, playerLaneY - 12 + 4, 70, 28);
      ctx.fillStyle = COLOR_TOKENS.SKY;
      ctx.fillRect(playerScreenX, playerLaneY - 12, 70, 28);
      ctx.strokeStyle = COLOR_TOKENS.CHARCOAL;
      ctx.lineWidth = 3;
      ctx.strokeRect(playerScreenX, playerLaneY - 12, 70, 28);

      // Windshield & Number
      ctx.fillStyle = COLOR_TOKENS.MUSTARD;
      ctx.fillRect(playerScreenX + 38, playerLaneY - 8, 16, 20);
      ctx.strokeStyle = COLOR_TOKENS.CHARCOAL;
      ctx.strokeRect(playerScreenX + 38, playerLaneY - 8, 16, 20);

      // Player Wheels
      ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
      ctx.fillRect(playerScreenX + 10, playerLaneY - 17, 14, 6);
      ctx.fillRect(playerScreenX + 48, playerLaneY - 17, 14, 6);
      ctx.fillRect(playerScreenX + 10, playerLaneY + 15, 14, 6);
      ctx.fillRect(playerScreenX + 48, playerLaneY + 15, 14, 6);

      // 8. Draw Top Word Stream Carousel (Words to type)
      const curWordObj = engine.wordStream[engine.currentWordIndex];
      const nextWordObj = engine.wordStream[engine.currentWordIndex + 1];

      if (curWordObj) {
        // Target Word Box
        ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
        ctx.fillRect(width / 2 - 160 + 4, 25 + 4, 320, 56);
        ctx.fillStyle = curWordObj.obstacle ? curWordObj.obstacle.color : COLOR_TOKENS.PAPER_CREAM;
        ctx.fillRect(width / 2 - 160, 25, 320, 56);
        ctx.strokeStyle = COLOR_TOKENS.CHARCOAL;
        ctx.lineWidth = 3;
        ctx.strokeRect(width / 2 - 160, 25, 320, 56);

        // Word Text
        ctx.font = 'bold 20px "Courier New", monospace';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = COLOR_TOKENS.CHARCOAL;
        
        const targetText = curWordObj.text;
        const currentTyped = engine.currentInput;
        const isPrefixCorrect = targetText.startsWith(currentTyped);

        ctx.fillText(targetText, width / 2 - 140, 48);

        // Subtitle / Obstacle alert
        ctx.font = 'bold 11px "Courier New", monospace';
        ctx.fillStyle = curWordObj.obstacle ? COLOR_TOKENS.CHARCOAL : '#666';
        ctx.fillText(curWordObj.obstacle ? `⚠️ ${curWordObj.obstacle.label}` : 'Type exact word & press Space!', width / 2 - 140, 68);

        // Typed prefix overlay
        if (currentTyped) {
          ctx.fillStyle = isPrefixCorrect ? COLOR_TOKENS.MINT : COLOR_TOKENS.CORAL;
          ctx.font = 'bold 20px "Courier New", monospace';
          ctx.fillText(currentTyped, width / 2 - 140, 48);
        }
      }

      // 9. Check Finish Line (targetTrackDistance)
      if (engine.playerDist >= targetTrackDistance && !engine.isOver) {
        engine.isOver = true;
        setIsFinished(true);
        sound.playTada();
        confetti({ particleCount: 100, spread: 80 });
      }

      // Update React HUD state
      setRaceHud({
        iwpm,
        speedKmH: Math.round(effectiveSpeed),
        position: playerRank,
        distanceTraveled: Math.round(engine.playerDist),
        streak: engine.streak,
        turboActive: engine.isTurboActive,
        currentObstacle: curWordObj?.obstacle?.label || null
      });

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
  }, [handleKeyDown, handleKeyUp, targetTrackDistance]);

  const handleRestart = () => {
    sound.playKeyClick();
    const engine = engineRef.current;
    engine.playerDist = 0;
    engine.streak = 0;
    engine.currentWordIndex = 0;
    engine.currentInput = '';
    engine.isOver = false;
    engine.ghosts.forEach(g => { g.dist = 0; g.speed = 0; });
    setIsFinished(false);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between font-sans select-none bg-[#FDF8EE] p-3 sm:p-5 overflow-y-auto">
      
      {/* Top HUD: Title, Back Button, Position & Speedometer */}
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
            <span>Exit Race</span>
          </button>

          <span className="px-3 py-1 rounded-xl bg-[#F28B82] border-2 border-[#2D2319] font-black uppercase text-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
            🏎️ Velocity Grand Prix // Typing Racer
          </span>
        </div>

        {/* Position & Distance */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 bg-[#F6C445] px-3 py-1 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
            <Award className="w-4 h-4 text-[#2D2319]" />
            <span className="font-bold text-[#2D2319]/80">Rank:</span>
            <span className="font-black text-sm text-[#2D2319]">
              {raceHud.position === 1 ? '🥇 1st' : raceHud.position === 2 ? '🥈 2nd' : raceHud.position === 3 ? '🥉 3rd' : '4th'}
            </span>
          </div>

          <div className="flex items-center space-x-1.5 bg-[#FAF3E0] px-3 py-1 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319]">
            <Flag className="w-4 h-4 text-[#48B89F]" />
            <span className="font-bold text-[#2D2319]/70">Track:</span>
            <span className="font-black text-sm text-[#2D2319]">{raceHud.distanceTraveled} / {targetTrackDistance}m</span>
          </div>
        </div>

      </div>

      {/* 4 Neo-Brutalist HUD Metric Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-2.5 font-mono">
        
        <div className="bg-[#4BA3E3] p-2.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]">
          <div className="text-[10px] font-bold text-[#2D2319]/80 uppercase">Velocity</div>
          <div className="text-base sm:text-lg font-black text-[#2D2319] font-display mt-0.5">{raceHud.speedKmH} KM/H</div>
        </div>

        <div className="bg-[#F6C445] p-2.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]">
          <div className="text-[10px] font-bold text-[#2D2319]/80 uppercase">15-Key IWPM</div>
          <div className="text-base sm:text-lg font-black text-[#2D2319] font-display mt-0.5">{raceHud.iwpm} WPM</div>
        </div>

        <div className="bg-[#C7E8CA] p-2.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]">
          <div className="text-[10px] font-bold text-[#2D2319]/80 uppercase">Turbo Boost</div>
          <div className="text-base sm:text-lg font-black text-[#2D2319] font-display mt-0.5">
            {raceHud.turboActive ? '🔥 2.0x NITRO' : `Streak: ${raceHud.streak}`}
          </div>
        </div>

        <div className="bg-[#FAF3E0] p-2.5 rounded-xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319]">
          <div className="text-[10px] font-bold text-[#2D2319]/80 uppercase">Track Sector</div>
          <div className="text-xs sm:text-sm font-black text-[#2D2319] truncate mt-1">
            {raceHud.currentObstacle || 'Clear Straightaway'}
          </div>
        </div>

      </div>

      {/* Main Racer Canvas */}
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
        <div>Type words in the upper box and press <span className="font-bold underline text-[#2D2319]">Space</span> to accelerate! Maintain streaks for Turbo.</div>
        <button
          type="button"
          onClick={handleRestart}
          className="px-3 py-1 bg-[#FAF3E0] hover:bg-white border border-[#2D2319] rounded-lg font-bold flex items-center space-x-1 text-[#2D2319]"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Restart Race</span>
        </button>
      </div>

      {/* Finish Race Modal */}
      {isFinished && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2319]/60 backdrop-blur-[1px] animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-[#FDF8EE] border-2 border-[#2D2319] rounded-2xl shadow-[6px_6px_0px_#2D2319] overflow-hidden p-6 text-center space-y-4 font-sans">
            <div className="text-3xl">🏁</div>
            <h3 className="text-xl font-black font-display text-[#2D2319]">Finish Line Reached!</h3>
            <p className="text-xs font-mono text-[#2D2319]/70">You finished the Grand Prix circuit!</p>
            <div className="bg-[#FAF3E0] p-3 rounded-xl border border-[#2D2319] text-xs font-mono">
              <div>Final Position: <span className="font-bold">{raceHud.position === 1 ? '1st Place 🏆' : `${raceHud.position}th Place`}</span></div>
              <div>Top Velocity: <span className="font-bold">{raceHud.speedKmH} KM/H</span></div>
            </div>
            <div className="flex justify-center space-x-3 pt-2">
              <button
                type="button"
                onClick={handleRestart}
                className="px-4 py-2 bg-[#F6C445] border-2 border-[#2D2319] rounded-xl font-display font-black text-xs"
              >
                Race Again
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
