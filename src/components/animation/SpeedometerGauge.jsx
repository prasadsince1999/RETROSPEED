import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { Gauge, Zap, Flame } from 'lucide-react';
import RiveAnimation from './RiveAnimation';

/**
 * SpeedometerGauge Component - Analog Tachometer with Spring Physics & Turbo Redline
 */
export default function SpeedometerGauge({
  wpm = 0,
  maxWpm = 120,
  targetWpm = 40,
  compact = false,
  className = '',
  showLabel = true
}) {
  const currentNeedleValRef = useRef(0);
  const velocityRef = useRef(0);
  const isRedline = wpm >= 60;
  const isTurbo = wpm >= 80;

  // Spring Interpolation & Canvas Renderer
  const fallbackRender = useCallback(({ ctx, width, height, time, delta }) => {
    const cx = width / 2;
    const cy = height * 0.72;
    const radius = Math.min(width * 0.44, height * 0.62);

    // Spring physics integration for smooth organic needle motion
    const targetVal = Math.max(0, Math.min(maxWpm, wpm));
    const k = 45; // spring constant
    const d = 8.5; // damping
    const diff = targetVal - currentNeedleValRef.current;
    velocityRef.current += (diff * k - velocityRef.current * d) * delta;
    currentNeedleValRef.current += velocityRef.current * delta;

    // Small turbo jitter when in redline zone
    let displayVal = currentNeedleValRef.current;
    if (displayVal >= 60) {
      const jitterAmount = (displayVal - 60) * 0.035;
      displayVal += (Math.sin(time * 35) + Math.cos(time * 25)) * jitterAmount;
    }

    const startAngle = Math.PI * 0.8; // ~144 deg
    const endAngle = Math.PI * 2.2;   // ~396 deg (252 deg sweep)
    const sweepAngle = endAngle - startAngle;

    const valueRatio = Math.max(0, Math.min(1, displayVal / maxWpm));
    const currentAngle = startAngle + sweepAngle * valueRatio;

    // 1. Outer Dark Gauge Bezel & Background
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 8, startAngle - 0.08, endAngle + 0.08);
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.stroke();

    // 2. Track Background Arc
    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.5)';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.stroke();

    // 3. Active Speed Glowing Gradient Arc
    if (valueRatio > 0.01) {
      const grad = ctx.createConicGradient(startAngle, cx, cy);
      grad.addColorStop(0, '#10b981'); // Emerald
      grad.addColorStop(0.3, '#38bdf8'); // Sky
      grad.addColorStop(0.55, '#f59e0b'); // Amber
      grad.addColorStop(0.75, '#f97316'); // Orange
      grad.addColorStop(0.95, '#ef4444'); // Crimson
      grad.addColorStop(1, '#a855f7'); // Plasma Purple

      ctx.beginPath();
      ctx.arc(cx, cy, radius, startAngle, currentAngle);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 9;
      ctx.lineCap = 'round';
      ctx.shadowColor = displayVal >= 60 ? '#ef4444' : '#38bdf8';
      ctx.shadowBlur = displayVal >= 60 ? 14 : 6;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // 4. Redline Warning Zone (Past 60 WPM / ~50% of 120)
    const redlineStartAngle = startAngle + sweepAngle * 0.5;
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 6, redlineStartAngle, endAngle);
    ctx.strokeStyle = displayVal >= 60 
      ? `rgba(239, 68, 68, ${0.4 + Math.sin(time * 10) * 0.3})`
      : 'rgba(239, 68, 68, 0.25)';
    ctx.lineWidth = 3;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // 5. Dial Ticks & Scale Markings
    const numTicks = 12; // every 10 WPM
    for (let i = 0; i <= numTicks; i++) {
      const tickRatio = i / numTicks;
      const tickAngle = startAngle + sweepAngle * tickRatio;
      const isMajor = i % 2 === 0;
      const isRedlineTick = tickRatio >= 0.5;

      const innerR = radius - (isMajor ? 12 : 7);
      const outerR = radius - 2;

      const x1 = cx + Math.cos(tickAngle) * innerR;
      const y1 = cy + Math.sin(tickAngle) * innerR;
      const x2 = cx + Math.cos(tickAngle) * outerR;
      const y2 = cy + Math.sin(tickAngle) * outerR;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = isRedlineTick 
        ? (displayVal >= 60 ? '#f87171' : 'rgba(239, 68, 68, 0.6)')
        : (isMajor ? '#94a3b8' : '#475569');
      ctx.lineWidth = isMajor ? 2.5 : 1.5;
      ctx.stroke();

      // Numbers on major ticks (0, 20, 40, 60, 80, 100, 120)
      if (isMajor && width >= 140) {
        const textR = radius - 22;
        const tx = cx + Math.cos(tickAngle) * textR;
        const ty = cy + Math.sin(tickAngle) * textR + 3;

        ctx.fillStyle = isRedlineTick ? '#fca5a5' : '#64748b';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(String(i * 10), tx, ty);
      }
    }

    // 6. Analog Needle
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(currentAngle);

    // Needle shadow
    ctx.beginPath();
    ctx.moveTo(-10, 4);
    ctx.lineTo(radius - 6, 4);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Needle blade
    const needleGrad = ctx.createLinearGradient(0, 0, radius, 0);
    if (displayVal >= 80) {
      needleGrad.addColorStop(0, '#f43f5e');
      needleGrad.addColorStop(1, '#ffffff');
    } else if (displayVal >= 60) {
      needleGrad.addColorStop(0, '#ea580c');
      needleGrad.addColorStop(1, '#fde047');
    } else {
      needleGrad.addColorStop(0, '#0284c7');
      needleGrad.addColorStop(1, '#38bdf8');
    }

    ctx.beginPath();
    ctx.moveTo(-12, 0);
    ctx.lineTo(0, -3.5);
    ctx.lineTo(radius - 4, 0);
    ctx.lineTo(0, 3.5);
    ctx.closePath();
    ctx.fillStyle = needleGrad;
    ctx.shadowColor = displayVal >= 60 ? '#ef4444' : '#38bdf8';
    ctx.shadowBlur = displayVal >= 60 ? 10 : 4;
    ctx.fill();

    ctx.restore();

    // 7. Center Hub / Pivot Cap
    const hubGrad = ctx.createRadialGradient(cx - 2, cy - 2, 1, cx, cy, 14);
    hubGrad.addColorStop(0, '#e2e8f0');
    hubGrad.addColorStop(0.5, '#475569');
    hubGrad.addColorStop(1, '#0f172a');

    ctx.beginPath();
    ctx.arc(cx, cy, 12, 0, Math.PI * 2);
    ctx.fillStyle = hubGrad;
    ctx.fill();
    ctx.strokeStyle = displayVal >= 60 ? '#ef4444' : '#38bdf8';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Center jewel
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fillStyle = displayVal >= 80 ? '#f43f5e' : displayVal >= 60 ? '#f59e0b' : '#38bdf8';
    ctx.fill();

    // 8. Turbo Spark Particles in Redline Mode
    if (displayVal >= 60) {
      const sparkCount = Math.floor((displayVal - 60) / 10) + 1;
      for (let s = 0; s < sparkCount; s++) {
        const sparkAngle = currentAngle + (Math.random() - 0.5) * 0.4;
        const sparkR = radius + (Math.random() - 0.5) * 14;
        const sx = cx + Math.cos(sparkAngle) * sparkR;
        const sy = cy + Math.sin(sparkAngle) * sparkR;

        ctx.beginPath();
        ctx.arc(sx, sy, Math.random() * 2 + 1, 0, Math.PI * 2);
        ctx.fillStyle = Math.random() > 0.5 ? '#fde047' : '#ef4444';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 6;
        ctx.fill();
      }
    }

    ctx.restore();
  }, [wpm, maxWpm]);

  if (compact) {
    return (
      <div 
        className={`flex items-center space-x-2 bg-slate-950 text-white rounded-xl px-2.5 py-1 border shadow-md transition-all duration-200 ${
          isTurbo 
            ? 'border-rose-500 shadow-rose-500/30' 
            : isRedline 
            ? 'border-amber-500 shadow-amber-500/20' 
            : 'border-slate-800'
        } ${className}`}
      >
        {/* Compact Tachometer Dial */}
        <div className="w-10 h-10 shrink-0">
          <RiveAnimation
            fallbackRender={fallbackRender}
            inputs={{ wpm }}
            width={40}
            height={40}
            className="w-full h-full"
          />
        </div>

        {/* Numeric Readout */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-1">
            <span className="text-[9px] uppercase tracking-wider font-mono text-slate-400 font-bold leading-none">
              SPEED
            </span>
            {isRedline && (
              <span className="text-[9px] font-black font-mono text-rose-400 animate-pulse uppercase leading-none">
                TURBO
              </span>
            )}
          </div>
          <div className="flex items-baseline space-x-0.5">
            <span 
              className={`text-base font-black font-mono leading-tight tracking-tight ${
                isTurbo ? 'text-rose-400' : isRedline ? 'text-amber-300' : 'text-sky-300'
              }`}
            >
              {wpm}
            </span>
            <span className="text-[10px] font-mono text-slate-400 font-bold">WPM</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative flex flex-col items-center p-3 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 text-white border shadow-xl transition-all duration-300 overflow-hidden ${
        isTurbo 
          ? 'border-rose-500/80 shadow-rose-500/20' 
          : isRedline 
          ? 'border-amber-500/70 shadow-amber-500/15' 
          : 'border-slate-800 shadow-black/40'
      } ${className}`}
    >
      {/* Background Ambience / Redline glow */}
      {isRedline && (
        <div 
          className="absolute -top-10 inset-x-0 h-28 bg-gradient-to-b from-rose-500/15 to-transparent pointer-events-none animate-pulse" 
        />
      )}

      {/* Top Header Tag */}
      {showLabel && (
        <div className="w-full flex items-center justify-between z-10 mb-1">
          <div className="flex items-center space-x-1 text-slate-400">
            <Gauge className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider">TACHOMETER</span>
          </div>
          {isRedline ? (
            <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[10px] font-black font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
              <Flame className="w-3 h-3 text-rose-400 animate-bounce" />
              <span>REDLINE</span>
            </span>
          ) : (
            <span className="text-[10px] font-mono text-slate-500 font-semibold">
              0 - {maxWpm}
            </span>
          )}
        </div>
      )}

      {/* Speedometer Canvas Graphic */}
      <div className="relative w-44 h-32 flex items-center justify-center">
        <RiveAnimation
          fallbackRender={fallbackRender}
          inputs={{ wpm, isRedline, isTurbo }}
          width={176}
          height={128}
          className="w-full h-full"
        />

        {/* Embedded Digital readout in tachometer lower arc */}
        <div className="absolute bottom-1 flex flex-col items-center">
          <div className="flex items-baseline space-x-1">
            <span 
              className={`text-2xl font-black font-mono tracking-tight ${
                isTurbo 
                  ? 'text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]' 
                  : isRedline 
                  ? 'text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' 
                  : 'text-sky-300'
              }`}
            >
              {wpm}
            </span>
            <span className="text-xs font-bold text-slate-400 font-mono">WPM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
