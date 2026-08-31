import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { Flame, Sparkles, Zap, Award, Star } from 'lucide-react';
import RiveAnimation from './RiveAnimation';

/**
 * Tier configurations for combo streak
 */
export const COMBO_TIERS = [
  {
    tier: 0,
    min: 0,
    max: 9,
    name: 'Sparks',
    multiplier: '1x',
    multValue: 1,
    color: '#38bdf8', // sky blue
    glowColor: 'rgba(56, 189, 248, 0.4)',
    bgGradient: 'from-slate-900 to-slate-950',
    borderColor: 'border-slate-700',
    particleColors: ['#38bdf8', '#7dd3fc', '#bae6fd', '#ffffff']
  },
  {
    tier: 1,
    min: 10,
    max: 24,
    name: 'Ember',
    multiplier: '2x',
    multValue: 2,
    color: '#f59e0b', // amber
    glowColor: 'rgba(245, 158, 11, 0.6)',
    bgGradient: 'from-amber-950/80 to-slate-950',
    borderColor: 'border-amber-500/50',
    particleColors: ['#f59e0b', '#fbbf24', '#fde68a', '#ef4444']
  },
  {
    tier: 2,
    min: 25,
    max: 49,
    name: 'Blaze',
    multiplier: '3x',
    multValue: 3,
    color: '#ea580c', // orange/fire
    glowColor: 'rgba(234, 88, 12, 0.7)',
    bgGradient: 'from-orange-950/90 to-slate-950',
    borderColor: 'border-orange-500/70',
    particleColors: ['#ea580c', '#f97316', '#fdba74', '#fef08a', '#dc2626']
  },
  {
    tier: 3,
    min: 50,
    max: 99,
    name: 'Inferno',
    multiplier: '4x',
    multValue: 4,
    color: '#3b82f6', // electric blue plasma
    glowColor: 'rgba(59, 130, 246, 0.85)',
    bgGradient: 'from-blue-950/90 via-indigo-950 to-slate-950',
    borderColor: 'border-blue-400',
    particleColors: ['#3b82f6', '#60a5fa', '#93c5fd', '#38bdf8', '#c084fc', '#ffffff']
  },
  {
    tier: 4,
    min: 100,
    max: Infinity,
    name: 'Supernova',
    multiplier: '5x',
    multValue: 5,
    color: '#a855f7', // violet cosmic flame
    glowColor: 'rgba(168, 85, 247, 0.95)',
    bgGradient: 'from-purple-950/90 via-fuchsia-950 to-slate-950',
    borderColor: 'border-fuchsia-400',
    particleColors: ['#a855f7', '#c084fc', '#e879f9', '#f43f5e', '#38bdf8', '#ffffff']
  }
];

export function getComboTier(streak = 0) {
  if (streak >= 100) return COMBO_TIERS[4];
  if (streak >= 50) return COMBO_TIERS[3];
  if (streak >= 25) return COMBO_TIERS[2];
  if (streak >= 10) return COMBO_TIERS[1];
  return COMBO_TIERS[0];
}

/**
 * TypingComboMeter Component
 */
export default function TypingComboMeter({
  streak = 0,
  maxStreak = 0,
  compact = false,
  className = '',
  onMilestone
}) {
  const currentTier = useMemo(() => getComboTier(streak), [streak]);
  const prevStreakRef = useRef(streak);
  const [shockwaves, setShockwaves] = useState([]);
  const [milestonePopup, setMilestonePopup] = useState(null);
  const particlesRef = useRef([]);
  const lastSpawnTimeRef = useRef(0);

  // Check for milestone transitions
  useEffect(() => {
    const prevStreak = prevStreakRef.current;
    prevStreakRef.current = streak;

    // Milestone thresholds
    const milestones = [10, 25, 50, 100, 150, 200, 300, 500];
    const hitMilestone = milestones.find((m) => prevStreak < m && streak >= m);

    if (hitMilestone) {
      const tier = getComboTier(hitMilestone);
      // Trigger shockwave
      setShockwaves((prev) => [
        ...prev.slice(-3),
        { id: Date.now(), tier, scale: 0, opacity: 1 }
      ]);

      setMilestonePopup({
        milestone: hitMilestone,
        tierName: tier.name,
        multiplier: tier.multiplier
      });

      const timer = setTimeout(() => setMilestonePopup(null), 1400);
      if (onMilestone) onMilestone(hitMilestone, tier);

      return () => clearTimeout(timer);
    }
  }, [streak, onMilestone]);

  // Procedural Canvas Fallback Particle & Flame Engine
  const fallbackRender = useCallback(({ ctx, width, height, time, delta }) => {
    const tier = getComboTier(streak);
    const tierIdx = tier.tier;
    const isSupernova = tierIdx === 4;
    const isInferno = tierIdx === 3;
    const isBlaze = tierIdx === 2;
    const isEmber = tierIdx === 1;

    // Spawn new particles based on tier intensity
    const spawnRate = tierIdx === 0 ? 0.2 : tierIdx === 1 ? 0.06 : tierIdx === 2 ? 0.03 : 0.015;
    if (time - lastSpawnTimeRef.current > spawnRate && streak > 0) {
      lastSpawnTimeRef.current = time;
      const count = tierIdx >= 3 ? 3 : tierIdx >= 1 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        const color = tier.particleColors[Math.floor(Math.random() * tier.particleColors.length)];
        particlesRef.current.push({
          x: width * 0.5 + (Math.random() - 0.5) * (width * 0.7),
          y: height * 0.85 + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * (tierIdx * 14 + 10),
          vy: -(Math.random() * (tierIdx * 25 + 30) + 15),
          size: Math.random() * (tierIdx * 1.5 + 2.5) + 1.5,
          alpha: 1,
          decay: Math.random() * 0.8 + 0.6,
          color,
          pulse: Math.random() * Math.PI * 2,
          isSpark: Math.random() > 0.4
        });
      }
    }

    // Update and draw particles
    const activeParticles = [];
    for (let i = 0; i < particlesRef.current.length; i++) {
      const p = particlesRef.current[i];
      p.x += p.vx * delta;
      p.y += p.vy * delta;
      p.alpha -= p.decay * delta;
      p.size = Math.max(0.5, p.size - delta * 1.2);
      p.pulse += delta * 6;

      if (p.alpha > 0.02 && p.size > 0.4 && p.y > -20) {
        ctx.save();
        ctx.globalAlpha = Math.min(1, Math.max(0, p.alpha));
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = tierIdx >= 3 ? 12 : 6;

        ctx.beginPath();
        if (p.isSpark && (isInferno || isSupernova)) {
          // Diamond / star sparkle
          const s = p.size * 1.5;
          ctx.moveTo(p.x, p.y - s);
          ctx.lineTo(p.x + s * 0.5, p.y);
          ctx.lineTo(p.x, p.y + s);
          ctx.lineTo(p.x - s * 0.5, p.y);
        } else {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.restore();
        activeParticles.push(p);
      }
    }
    particlesRef.current = activeParticles.slice(-70); // cap max particles

    // Ambient bottom fire base glow
    if (streak >= 10) {
      const glowHeight = Math.min(height * 0.6, 20 + tierIdx * 10);
      const baseGrad = ctx.createLinearGradient(0, height, 0, height - glowHeight);
      baseGrad.addColorStop(0, tier.glowColor);
      baseGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.save();
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, height - glowHeight, width, glowHeight);
      ctx.restore();
    }

    // Supernova cosmic aura ripple
    if (isSupernova) {
      const auraPulse = Math.sin(time * 4) * 0.15 + 0.85;
      ctx.save();
      ctx.strokeStyle = `rgba(232, 121, 249, ${0.4 * auraPulse})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(width / 2, height / 2, width * 0.45 * auraPulse, height * 0.4 * auraPulse, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }, [streak]);

  const progressToNext = useMemo(() => {
    if (streak < 10) return (streak / 10) * 100;
    if (streak < 25) return ((streak - 10) / 15) * 100;
    if (streak < 50) return ((streak - 25) / 25) * 100;
    if (streak < 100) return ((streak - 50) / 50) * 100;
    return 100;
  }, [streak]);

  if (compact) {
    return (
      <div 
        className={`relative flex items-center space-x-2 px-3 py-1 rounded-xl bg-slate-950 text-white border shadow-md overflow-hidden transition-all duration-300 ${currentTier.borderColor} ${className}`}
        style={{
          boxShadow: streak >= 10 ? `0 0 16px ${currentTier.glowColor}` : 'none'
        }}
      >
        {/* Background Canvas Particles */}
        <div className="absolute inset-0 pointer-events-none opacity-80">
          <RiveAnimation
            fallbackRender={fallbackRender}
            inputs={{ streak, tier: currentTier.tier }}
            className="w-full h-full"
          />
        </div>

        {/* Multiplier Badge */}
        <div 
          className="relative z-10 flex items-center justify-center font-black text-xs px-1.5 py-0.5 rounded-md text-white font-mono shadow-sm transition-transform duration-200"
          style={{
            backgroundColor: currentTier.color,
            boxShadow: `0 0 8px ${currentTier.color}`
          }}
        >
          {currentTier.multiplier}
        </div>

        {/* Streak Counter */}
        <div className="relative z-10 flex flex-col">
          <div className="flex items-center space-x-1">
            <Flame 
              className={`w-3.5 h-3.5 ${streak > 0 ? 'animate-bounce' : 'opacity-40'}`} 
              style={{ color: currentTier.color }} 
            />
            <span 
              className="font-black text-sm font-mono tracking-tight"
              style={{ color: streak > 0 ? currentTier.color : '#94a3b8' }}
            >
              {streak}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">STREAK</span>
          </div>
        </div>

        {/* Milestone Burst Popup */}
        {milestonePopup && (
          <div className="absolute inset-0 bg-slate-900/95 flex items-center justify-center z-20 animate-in zoom-in-90 fade-in duration-200">
            <span className="font-black text-xs uppercase tracking-wider font-mono text-amber-300 drop-shadow flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>{milestonePopup.tierName} {milestonePopup.multiplier}!</span>
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className={`relative flex flex-col p-3 rounded-2xl bg-gradient-to-b ${currentTier.bgGradient} text-white border shadow-xl overflow-hidden transition-all duration-300 ${currentTier.borderColor} ${className}`}
      style={{
        boxShadow: streak >= 10 ? `0 0 24px ${currentTier.glowColor}` : '0 4px 12px rgba(0,0,0,0.3)'
      }}
    >
      {/* Background Live Particle Canvas */}
      <div className="absolute inset-0 pointer-events-none opacity-85">
        <RiveAnimation
          fallbackRender={fallbackRender}
          inputs={{ streak, tier: currentTier.tier }}
          className="w-full h-full"
        />
      </div>

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          <div 
            className="w-7 h-7 rounded-lg flex items-center justify-center shadow-md transition-transform duration-300"
            style={{ 
              backgroundColor: currentTier.color,
              boxShadow: `0 0 10px ${currentTier.color}`
            }}
          >
            <Flame className="w-4 h-4 text-white stroke-[2.5]" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-mono font-bold leading-none">
              COMBO STREAK
            </div>
            <div className="text-xs font-extrabold uppercase tracking-wide" style={{ color: currentTier.color }}>
              {currentTier.name}
            </div>
          </div>
        </div>

        {/* Multiplier Tag */}
        <div 
          className="px-2.5 py-0.5 rounded-full text-xs font-black font-mono text-white shadow-lg border border-white/20 animate-pulse"
          style={{ 
            backgroundColor: currentTier.color,
            boxShadow: `0 0 12px ${currentTier.color}`
          }}
        >
          {currentTier.multiplier}
        </div>
      </div>

      {/* Center Numeric Display */}
      <div className="relative z-10 my-2 flex items-baseline justify-center space-x-1.5">
        <span 
          className="text-4xl sm:text-5xl font-black font-mono tracking-tight transition-all duration-150 drop-shadow-md"
          style={{ color: streak > 0 ? currentTier.color : '#64748b' }}
        >
          {streak}
        </span>
        <span className="text-xs font-bold text-slate-400 font-mono uppercase">
          hits
        </span>
      </div>

      {/* Progress to next tier */}
      <div className="relative z-10 w-full mt-1">
        <div className="flex justify-between text-[9px] font-mono text-slate-400 mb-1">
          <span>Tier {currentTier.tier}</span>
          <span>{currentTier.tier < 4 ? `Next: ${currentTier.max + 1}` : 'MAX TIER'}</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800/90 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
          <div 
            className="h-full rounded-full transition-all duration-200"
            style={{ 
              width: `${progressToNext}%`,
              backgroundColor: currentTier.color,
              boxShadow: `0 0 8px ${currentTier.color}`
            }}
          />
        </div>
      </div>

      {/* Milestone Shockwave Overlay */}
      {milestonePopup && (
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xs flex flex-col items-center justify-center z-30 animate-in zoom-in-75 fade-in duration-200">
          <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">
            MILESTONE UNLOCKED!
          </div>
          <div 
            className="text-2xl font-black font-mono tracking-tight mt-0.5 animate-bounce"
            style={{ color: currentTier.color }}
          >
            {milestonePopup.milestone} COMBO
          </div>
          <div 
            className="text-xs font-black px-2 py-0.5 rounded-md text-white mt-1 shadow-md font-mono"
            style={{ backgroundColor: currentTier.color }}
          >
            {milestonePopup.multiplier} MULTIPLIER ACTIVE
          </div>
        </div>
      )}
    </div>
  );
}
