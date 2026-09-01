import React, { useEffect, useState, useRef } from 'react';
import { 
  Gamepad2,
  RotateCcw, 
  ArrowRight, 
  Map, 
  Star, 
  Award, 
  Zap, 
  Target, 
  CheckCircle2, 
  Trophy, 
  Sparkles,
  Flame,
  Crown,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Modal, Button, MetricTile, Badge } from '../ui';
import { sound } from '../utils/audio';

/**
 * Animated Particle Burst for individual star stamps
 */
function StarParticles({ active, color = '#f59e0b' }) {
  if (!active) return null;

  // 8 radial particle trajectories
  const particles = [
    { x: '24px', y: '-24px', rot: '45deg', size: 'w-2 h-2' },
    { x: '-24px', y: '-24px', rot: '-45deg', size: 'w-1.5 h-1.5' },
    { x: '28px', y: '16px', rot: '120deg', size: 'w-2 h-2' },
    { x: '-28px', y: '16px', rot: '-120deg', size: 'w-1.5 h-1.5' },
    { x: '0px', y: '-32px', rot: '0deg', size: 'w-2.5 h-2.5' },
    { x: '0px', y: '30px', rot: '180deg', size: 'w-2 h-2' },
    { x: '32px', y: '-4px', rot: '90deg', size: 'w-1.5 h-1.5' },
    { x: '-32px', y: '-4px', rot: '-90deg', size: 'w-2 h-2' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {particles.map((p, idx) => (
        <span
          key={idx}
          className="absolute rounded-full animate-star-particle"
          style={{
            backgroundColor: color,
            width: idx % 2 === 0 ? '6px' : '4px',
            height: idx % 2 === 0 ? '6px' : '4px',
            boxShadow: `0 0 8px ${color}, 0 0 14px #fbbf24`,
            '--tw-translate-x': p.x,
            '--tw-translate-y': p.y
          }}
        />
      ))}
      <span className="absolute w-12 h-12 rounded-full border-2 border-amber-300 animate-ripple-ring opacity-75" />
    </div>
  );
}

export default function ScoreModal({
  lesson,
  stats,
  courseTitle,
  isArcade = false,
  onNextLesson,
  onNext,
  onRetry,
  onGoToMap,
  onExit
}) {
  const handleNext = () => {
    if (typeof onNextLesson === 'function') onNextLesson();
    else if (typeof onNext === 'function') onNext();
    else if (typeof onExit === 'function') onExit();
  };

  const handleExit = () => {
    if (typeof onGoToMap === 'function') onGoToMap();
    else if (typeof onExit === 'function') onExit();
  };

  const handleRetry = () => {
    if (typeof onRetry === 'function') onRetry();
  };

  const [poppedStars, setPoppedStars] = useState(0);
  const [shineStars, setShineStars] = useState({});
  const [starParticles, setStarParticles] = useState({});
  
  // Rolling number states
  const [displayPoints, setDisplayPoints] = useState(0);
  const [displayWpm, setDisplayWpm] = useState(0);
  const [displayAccuracy, setDisplayAccuracy] = useState(0);
  const [rollingComplete, setRollingComplete] = useState(false);

  const targetAccuracy = Math.round(stats?.accuracy ?? 100);
  const targetWpm = Math.round(stats?.wpm ?? 0);
  const goalWpm = lesson?.goalWpm || 20;
  const timeTaken = stats?.time ? `${stats.time}s` : '15s';
  const targetPoints = stats?.points ?? 560;
  const errors = stats?.errors ?? 0;

  // Determine total stars earned (1 to 5)
  const earnedStars = Math.max(1, Math.min(5, 
    stats?.stars !== undefined 
      ? stats.stars 
      : targetAccuracy >= 98 ? 5 
      : targetAccuracy >= 92 ? 4 
      : targetAccuracy >= 82 ? 3 
      : targetAccuracy >= 70 ? 2 
      : 1
  ));

  // Trigger Victory Fanfare, Radial Fireworks, and Star State Machine
  useEffect(() => {
    // 1. Initial Side Cannon Confetti
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 60,
      origin: { x: 0.05, y: 0.7 },
      colors: ['#0284c7', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#38bdf8']
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 60,
      origin: { x: 0.95, y: 0.7 },
      colors: ['#0284c7', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#38bdf8']
    });

    // 2. Play Audio Victory Fanfare
    sound.playVictoryFanfare();

    // 3. Center Radial Fireworks Burst at 300ms
    const timerRadial = setTimeout(() => {
      confetti({
        particleCount: 90,
        spread: 110,
        startVelocity: 38,
        origin: { x: 0.5, y: 0.45 },
        colors: ['#fbbf24', '#f59e0b', '#38bdf8', '#34d399', '#f472b6', '#a78bfa'],
        shapes: ['circle', 'square']
      });
    }, 300);

    // 4. Staggered 5-Star Pop-In State Machine
    const starTimers = [];
    for (let i = 1; i <= earnedStars; i++) {
      const delay = 350 + i * 260;
      const t = setTimeout(() => {
        setPoppedStars(i);
        sound.playStarPop(i);

        // Trigger individual star particle explosion
        setStarParticles(prev => ({ ...prev, [i]: true }));
        setTimeout(() => {
          setStarParticles(prev => ({ ...prev, [i]: false }));
        }, 700);

        // Trigger golden specular shine sweep right after stamp
        setTimeout(() => {
          setShineStars(prev => ({ ...prev, [i]: true }));
        }, 120);

        // If last star pops and is 5 stars, launch extra golden star shower
        if (i === 5 && earnedStars === 5) {
          confetti({
            particleCount: 65,
            spread: 90,
            origin: { x: 0.5, y: 0.4 },
            colors: ['#f59e0b', '#fbbf24', '#fde047', '#ffffff'],
            shapes: ['star']
          });
        }
      }, delay);
      starTimers.push(t);
    }

    return () => {
      clearTimeout(timerRadial);
      starTimers.forEach(t => clearTimeout(t));
    };
  }, [earnedStars]);

  // 5. XP / Points Rolling Counter Animation
  useEffect(() => {
    let startTime = null;
    const duration = 1300; // 1.3s smooth roll
    let lastTick = 0;
    let animationFrameId;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min(1, (timestamp - startTime) / duration);
      
      // Smooth ease-out cubic curve
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentPoints = Math.round(targetPoints * easeOut);
      const currentWpm = Math.round(targetWpm * easeOut);
      const currentAcc = Math.round(targetAccuracy * easeOut);

      setDisplayPoints(currentPoints);
      setDisplayWpm(currentWpm);
      setDisplayAccuracy(currentAcc);

      // Throttled sound tick during rolling
      if (timestamp - lastTick > 75 && progress < 0.95) {
        sound.playCounterTick(0.8 + progress * 0.5);
        lastTick = timestamp;
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setRollingComplete(true);
        setDisplayPoints(targetPoints);
        setDisplayWpm(targetWpm);
        setDisplayAccuracy(targetAccuracy);
      }
    };

    const startTimeout = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animateCount);
    }, 250);

    return () => {
      clearTimeout(startTimeout);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [targetPoints, targetWpm, targetAccuracy]);

  // Keyboard shortcuts: Enter = Next Lesson, Tab = Retry, M/Esc = Map
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        handleRetry();
      } else if (e.key === 'm' || e.key === 'M' || e.key === 'Escape') {
        e.preventDefault();
        handleExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handleRetry, handleExit]);

  if (!lesson || !stats) return null;

  // Dynamic Victory Title based on performance
  const getVictoryTitle = () => {
    if (earnedStars === 5) return '✨ Flawless Master! Pure Perfection ✨';
    if (earnedStars === 4) return '⚡ Lightning Reflexes! Stellar Speed ⚡';
    if (earnedStars === 3) return '🌟 Great Victory! Solid Precision 🌟';
    return '💪 Mission Accomplished! Keep Going 💪';
  };

  return (
    <Modal
      isOpen={true}
      size="lg"
      showCloseButton={false}
      closeOnOverlayClick={false}
      className="p-0 text-center relative overflow-hidden bg-[var(--rs-paper)] border-2 border-[#2D2319] rounded-2xl shadow-[8px_8px_0px_#2D2319]"
    >
      <div className="p-6 sm:p-7 select-none">
        {/* Top Victory Fanfare Banner Header */}
        <div className="flex flex-col items-center animate-banner-drop">
          <div className="inline-flex items-center space-x-2 bg-[#fef08a] text-slate-950 px-4 py-1 rounded-md border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] font-mono font-black text-xs uppercase">
            {isArcade || stats?.isArcade || lesson?.isArcade ? (
              <>
                <Gamepad2 className="w-4 h-4 text-slate-950" />
                <span>ARCADE VICTORY</span>
                <Sparkles className="w-4 h-4 text-amber-600" />
              </>
            ) : (
              <>
                <Crown className="w-4 h-4 fill-amber-500 text-amber-900" />
                <span>VICTORY FANFARE</span>
                <Sparkles className="w-4 h-4 text-amber-600" />
              </>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display mt-2.5">
            {isArcade || stats?.isArcade || lesson?.isArcade ? 'High Score Achieved!' : 'Stage Conquered!'}
          </h2>
          
          <p className="text-xs font-mono font-bold text-slate-800 mt-1 bg-amber-100 px-3 py-0.5 rounded border border-slate-900 inline-block shadow-[1px_1px_0_#0f172a]">
            {getVictoryTitle()}
          </p>

          <p className="text-xs font-mono font-semibold text-slate-600 mt-1">
            {isArcade || stats?.isArcade || lesson?.isArcade ? (
              <>
                Minigame: <span className="text-slate-900 font-bold">{stats?.title || lesson?.title || 'Arcade Game'}</span>
              </>
            ) : (
              <>
                Lesson {lesson?.id}: <span className="text-slate-900 font-bold">{lesson?.title}</span>
              </>
            )}
          </p>
        </div>

        {/* 5-Star Pop-In State Machine with Specular Shine & Particle Bursts */}
        <div className="flex items-center justify-center space-x-2 sm:space-x-3 my-5 py-1">
          {[1, 2, 3, 4, 5].map((starNum) => {
            const isPopped = starNum <= poppedStars;
            const isShining = shineStars[starNum];
            const hasParticle = starParticles[starNum];
            const isStarEarned = starNum <= earnedStars;

            return (
              <div
                key={starNum}
                className="relative flex items-center justify-center"
              >
                {/* Star Particle Burst Component */}
                <StarParticles active={hasParticle} color="#f59e0b" />

                {/* Star Capsule Container */}
                <div
                  className={`relative overflow-hidden rounded-xl p-1.5 transition-all duration-300 border-2 border-slate-900 transform ${
                    isPopped
                      ? 'bg-[#fef08a] shadow-[3px_3px_0_#0f172a] scale-105'
                      : isStarEarned
                      ? 'bg-slate-100 scale-75 opacity-40'
                      : 'bg-slate-100 scale-75 opacity-20 grayscale'
                  }`}
                >
                  <Star 
                    className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors duration-200 ${
                      isPopped
                        ? 'fill-amber-400 text-slate-950 stroke-[1.5]' 
                        : 'fill-slate-200 text-slate-400 stroke-[1.5]'
                    }`} 
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Solid XP / Points Banner Card */}
        <div className="bg-[#fef9c3] rounded-xl p-3.5 mb-5 border-2 border-slate-900 shadow-[3px_3px_0_#0f172a]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-[#f59e0b] text-slate-950 flex items-center justify-center border-2 border-slate-900 shadow-[2px_2px_0_#0f172a]">
                <Trophy className="w-5 h-5 fill-white text-slate-950" />
              </div>
              <div className="text-left font-mono">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900">EXPERIENCE POINTS EARNED</span>
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                    +{displayPoints.toLocaleString()}
                  </span>
                  <span className="text-xs font-black text-amber-700">XP</span>
                </div>
              </div>
            </div>

            {/* Bonus Breakdown Badges */}
            <div className="flex flex-wrap gap-1.5 justify-end font-mono">
              <span className="px-2 py-0.5 rounded bg-[#48bb78] text-slate-950 font-mono text-[10px] font-black border border-slate-900 shadow-[1px_1px_0_#0f172a]">
                {targetAccuracy === 100 ? '100% PERFECT' : `${targetAccuracy}% ACC`}
              </span>
              {targetWpm >= goalWpm && (
                <span className="px-2 py-0.5 rounded bg-[#1888ff] text-white font-mono text-[10px] font-black border border-slate-900 shadow-[1px_1px_0_#0f172a]">
                  SPEED GOAL MET
                </span>
              )}
              <span className="px-2 py-0.5 rounded bg-[#f59e0b] text-slate-950 font-mono text-[10px] font-black border border-slate-900 shadow-[1px_1px_0_#0f172a]">
                {earnedStars}★ MULTIPLIER
              </span>
            </div>
          </div>
        </div>

        {/* Performance Metric Tiles Grid */}
        <div className="grid grid-cols-3 gap-3 mb-5 font-mono">
          {/* Speed (WPM) */}
          <div className="bg-white p-3 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] text-center">
            <div className="text-[10px] font-bold text-slate-500 uppercase">SPEED</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 my-0.5">
              {displayWpm} <span className="text-xs text-slate-500 font-bold">WPM</span>
            </div>
            <div className="text-[10px] font-bold text-sky-700">Goal: {goalWpm} WPM</div>
          </div>

          {/* Accuracy (%) */}
          <div className="bg-white p-3 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] text-center">
            <div className="text-[10px] font-bold text-slate-500 uppercase">ACCURACY</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-700 my-0.5">
              {displayAccuracy}%
            </div>
            <div className="text-[10px] font-bold text-slate-500">{errors > 0 ? `${errors} typos` : '0 errors'}</div>
          </div>

          {/* Time Elapsed */}
          <div className="bg-white p-3 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] text-center">
            <div className="text-[10px] font-bold text-slate-500 uppercase">TIME</div>
            <div className="text-lg sm:text-xl font-black text-slate-900 my-0.5 truncate">
              {timeTaken}
            </div>
            <div className="text-[10px] font-bold text-amber-700">{targetPoints} pts</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 font-mono">
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              handleNext();
            }}
            className="w-full py-3 rounded-xl bg-[#1888ff] hover:bg-[#38bdf8] text-white font-black text-sm border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center space-x-2 uppercase font-display cursor-pointer"
          >
            <span>{isArcade || stats?.isArcade || lesson?.isArcade ? 'Play More Games' : 'Continue to Next Level'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => {
                sound.playKeyClick();
                handleRetry();
              }}
              className="py-2 rounded-xl bg-white hover:bg-slate-100 text-[#2D2319] font-bold text-xs border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center space-x-1.5 cursor-pointer font-mono"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Play Again</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playKeyClick();
                handleExit();
              }}
              className="py-2 rounded-xl bg-white hover:bg-slate-100 text-[#2D2319] font-bold text-xs border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center space-x-1.5 cursor-pointer font-mono"
            >
              {isArcade || stats?.isArcade || lesson?.isArcade ? (
                <>
                  <Gamepad2 className="w-3.5 h-3.5" />
                  <span>Arcade Hub</span>
                </>
              ) : (
                <>
                  <Map className="w-3.5 h-3.5" />
                  <span>{String(lesson?.id || '').startsWith('spine-') ? 'Curriculum Hub' : 'Course Map'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Helper Keyboard Shortcut Hints */}
        <div className="text-[10px] font-mono text-slate-500 mt-4 pt-2.5 border-t border-slate-200 flex items-center justify-center space-x-2">
          <span>Tip: Press</span>
          <kbd className="px-1.5 py-0.2 bg-slate-100 border border-slate-900 rounded font-bold text-slate-900 shadow-[1px_1px_0_#0f172a]">
            Enter
          </kbd>
          <span>next,</span>
          <kbd className="px-1.5 py-0.2 bg-slate-100 border border-slate-900 rounded font-bold text-slate-900 shadow-[1px_1px_0_#0f172a]">
            Tab
          </kbd>
          <span>retry,</span>
          <kbd className="px-1.5 py-0.2 bg-slate-100 border border-slate-900 rounded font-bold text-slate-900 shadow-[1px_1px_0_#0f172a]">
            M
          </kbd>
          <span>map</span>
        </div>
      </div>
    </Modal>
  );
}


