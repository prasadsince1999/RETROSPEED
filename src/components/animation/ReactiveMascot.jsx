import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { Bot, Sparkles, Zap, Heart, AlertCircle } from 'lucide-react';
import RiveAnimation from './RiveAnimation';

/**
 * Mascot State Machine States:
 * - 'idle': Breathing, gentle head sway, soft visor glow, periodic blinks.
 * - 'typing': Focused eyes, antenna emits electric arcs, tracking keystrokes.
 * - 'turbo': 50+ WPM - cool sunglasses, twin rocket flame thrusters, gold/plasma halo.
 * - 'typo': Triggered on error for 600ms - spiral dizzy eyes, wobble shake, sweat droplet / sparks.
 */
export default function ReactiveMascot({
  isTyping = false,
  wpm = 0,
  hasError = false,
  accuracy = 100,
  streak = 0,
  compact = false,
  className = '',
  speechBubble = null
}) {
  const [mascotState, setMascotState] = useState('idle');
  const [errorCooldown, setErrorCooldown] = useState(false);
  const [clickCheer, setClickCheer] = useState(false);
  const typoTimeoutRef = useRef(null);

  // Trigger typo state for 600ms when hasError flips
  useEffect(() => {
    if (hasError) {
      setErrorCooldown(true);
      if (typoTimeoutRef.current) clearTimeout(typoTimeoutRef.current);
      typoTimeoutRef.current = setTimeout(() => {
        setErrorCooldown(false);
      }, 600);
    }
  }, [hasError]);

  // Compute active state machine state
  useEffect(() => {
    if (errorCooldown) {
      setMascotState('typo');
    } else if (wpm >= 50) {
      setMascotState('turbo');
    } else if (isTyping) {
      setMascotState('typing');
    } else {
      setMascotState('idle');
    }
  }, [errorCooldown, wpm, isTyping]);

  // Mascot dynamic cheer phrases
  const currentCheer = useMemo(() => {
    if (speechBubble) return speechBubble;
    if (mascotState === 'typo') return "Ouch! Shake it off!";
    if (mascotState === 'turbo') return "HYPERSPEED ENGAGED! 🔥";
    if (streak >= 50) return "Incredible rhythm! ⚡";
    if (streak >= 25) return "You're on fire! ✨";
    if (isTyping) return "Keep flowing...";
    return "Ready when you are!";
  }, [speechBubble, mascotState, streak, isTyping]);

  // Procedural Canvas Renderer for KeyBot Mascot
  const fallbackRender = useCallback(({ ctx, width, height, time, delta }) => {
    const cx = width / 2;
    const cy = height * 0.52;
    const size = Math.min(width, height) * 0.72;

    const state = mascotState;
    const isTypo = state === 'typo';
    const isTurbo = state === 'turbo';
    const isTypingState = state === 'typing';

    // Head sway and breathing motion
    let headOffsetY = Math.sin(time * 2.5) * 3;
    let headAngle = Math.sin(time * 1.8) * 0.04;

    if (isTypingState) {
      headOffsetY = Math.sin(time * 12) * 2;
      headAngle = Math.sin(time * 8) * 0.06;
    } else if (isTurbo) {
      headOffsetY = Math.sin(time * 24) * 3 - 2;
      headAngle = Math.sin(time * 16) * 0.08;
    } else if (isTypo) {
      // Violent cringe shake
      headOffsetY = (Math.random() - 0.5) * 6;
      headAngle = (Math.random() - 0.5) * 0.2;
    }

    ctx.save();
    ctx.translate(cx, cy + headOffsetY);
    ctx.rotate(headAngle);

    // 1. Turbo Flame Thrusters & Aura
    if (isTurbo) {
      // Golden / plasma halo aura
      const auraPulse = Math.sin(time * 10) * 0.2 + 0.8;
      const auraGrad = ctx.createRadialGradient(0, 0, size * 0.2, 0, 0, size * 0.8 * auraPulse);
      auraGrad.addColorStop(0, 'rgba(245, 158, 11, 0.4)');
      auraGrad.addColorStop(0.6, 'rgba(239, 68, 68, 0.2)');
      auraGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.8, 0, Math.PI * 2);
      ctx.fill();

      // Rocket flame jet plumes underneath
      const flameLen = (Math.sin(time * 30) * 0.3 + 1) * (size * 0.38);
      const flameGrad = ctx.createLinearGradient(0, size * 0.32, 0, size * 0.32 + flameLen);
      flameGrad.addColorStop(0, '#ffffff');
      flameGrad.addColorStop(0.3, '#fde047');
      flameGrad.addColorStop(0.7, '#ea580c');
      flameGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');

      // Left Thruster
      ctx.beginPath();
      ctx.moveTo(-size * 0.22, size * 0.3);
      ctx.lineTo(-size * 0.28, size * 0.3 + flameLen);
      ctx.lineTo(-size * 0.16, size * 0.3);
      ctx.fillStyle = flameGrad;
      ctx.fill();

      // Right Thruster
      ctx.beginPath();
      ctx.moveTo(size * 0.16, size * 0.3);
      ctx.lineTo(size * 0.28, size * 0.3 + flameLen);
      ctx.lineTo(size * 0.22, size * 0.3);
      ctx.fillStyle = flameGrad;
      ctx.fill();
    }

    // 2. KeyBot Head Chassis (Futuristic Rounded Chamfer Box)
    const headW = size * 0.68;
    const headH = size * 0.54;
    const headR = 14;

    // Body gradient
    const bodyGrad = ctx.createLinearGradient(0, -headH / 2, 0, headH / 2);
    if (isTurbo) {
      bodyGrad.addColorStop(0, '#f8fafc');
      bodyGrad.addColorStop(1, '#cbd5e1');
    } else if (isTypo) {
      bodyGrad.addColorStop(0, '#ffe4e6');
      bodyGrad.addColorStop(1, '#fecdd3');
    } else {
      bodyGrad.addColorStop(0, '#f8fafc');
      bodyGrad.addColorStop(1, '#e2e8f0');
    }

    // Outer Head Shadow & Glow
    ctx.shadowColor = isTurbo ? '#f59e0b' : isTypo ? '#f43f5e' : isTypingState ? '#38bdf8' : 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = isTurbo ? 18 : isTypingState ? 12 : isTypo ? 16 : 8;

    // Rounded rectangle head
    ctx.beginPath();
    ctx.roundRect(-headW / 2, -headH / 2, headW, headH, headR);
    ctx.fillStyle = bodyGrad;
    ctx.fill();

    // Chassis Border Stroke
    ctx.strokeStyle = isTurbo ? '#f59e0b' : isTypo ? '#f43f5e' : isTypingState ? '#0284c7' : '#94a3b8';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.shadowBlur = 0; // reset shadow

    // 3. Antenna on top
    const antH = size * 0.18;
    ctx.beginPath();
    ctx.moveTo(0, -headH / 2);
    ctx.lineTo(0, -headH / 2 - antH);
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Antenna Energy Bulb / Orb
    const antPulse = Math.sin(time * (isTypingState ? 16 : 4)) * 0.3 + 0.7;
    const bulbColor = isTurbo ? '#ef4444' : isTypo ? '#f43f5e' : isTypingState ? '#38bdf8' : '#10b981';
    
    ctx.beginPath();
    ctx.arc(0, -headH / 2 - antH - 3, 5 + (isTypingState ? 1 : 0), 0, Math.PI * 2);
    ctx.fillStyle = bulbColor;
    ctx.shadowColor = bulbColor;
    ctx.shadowBlur = 10 * antPulse;
    ctx.fill();
    ctx.shadowBlur = 0;

    // 4. Robot Face Visor (Glossy Dark Display)
    const visorW = headW * 0.8;
    const visorH = headH * 0.58;
    const visorY = -headH * 0.06;

    ctx.beginPath();
    ctx.roundRect(-visorW / 2, visorY - visorH / 2, visorW, visorH, 8);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 5. Expressive Visor Eyes & Emotion
    const eyeSpacing = visorW * 0.28;
    const eyeY = visorY;
    const eyeColor = isTurbo ? '#fde047' : isTypo ? '#fb7185' : isTypingState ? '#38bdf8' : '#34d399';

    // Blink calculation for idle
    const blinkCycle = time % 3.5;
    const isBlinking = (!isTypo && !isTypingState && !isTurbo) && (blinkCycle > 3.3 && blinkCycle < 3.45);

    if (isTypo) {
      // Shocked "X" / Spiral Eyes + Sweat Drop
      ctx.strokeStyle = eyeColor;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';

      // Left Eye X
      ctx.beginPath();
      ctx.moveTo(-eyeSpacing - 6, eyeY - 6);
      ctx.lineTo(-eyeSpacing + 6, eyeY + 6);
      ctx.moveTo(-eyeSpacing + 6, eyeY - 6);
      ctx.lineTo(-eyeSpacing - 6, eyeY + 6);
      ctx.stroke();

      // Right Eye X
      ctx.beginPath();
      ctx.moveTo(eyeSpacing - 6, eyeY - 6);
      ctx.lineTo(eyeSpacing + 6, eyeY + 6);
      ctx.moveTo(eyeSpacing + 6, eyeY - 6);
      ctx.lineTo(eyeSpacing - 6, eyeY + 6);
      ctx.stroke();

      // Sweat Droplet
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(headW / 2 + 4, -headH / 2 + 6);
      ctx.bezierCurveTo(headW / 2 + 10, -headH / 2 + 12, headW / 2 + 10, -headH / 2 + 20, headW / 2 + 4, -headH / 2 + 20);
      ctx.bezierCurveTo(headW / 2 - 2, -headH / 2 + 20, headW / 2 - 2, -headH / 2 + 12, headW / 2 + 4, -headH / 2 + 6);
      ctx.fill();

    } else if (isTurbo) {
      // Cool 80s Cyberpunk Sunglasses / Visor
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.moveTo(-visorW * 0.44, eyeY - 7);
      ctx.lineTo(visorW * 0.44, eyeY - 7);
      ctx.lineTo(visorW * 0.38, eyeY + 8);
      ctx.lineTo(0, eyeY + 4);
      ctx.lineTo(-visorW * 0.38, eyeY + 8);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Sunglasses reflective neon streak
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-visorW * 0.25, eyeY - 4);
      ctx.lineTo(-visorW * 0.1, eyeY + 4);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(visorW * 0.1, eyeY - 4);
      ctx.lineTo(visorW * 0.25, eyeY + 4);
      ctx.stroke();

    } else if (isBlinking) {
      // Slit eyes during blink
      ctx.strokeStyle = eyeColor;
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-eyeSpacing - 7, eyeY);
      ctx.lineTo(-eyeSpacing + 7, eyeY);
      ctx.moveTo(eyeSpacing - 7, eyeY);
      ctx.lineTo(eyeSpacing + 7, eyeY);
      ctx.stroke();

    } else if (isTypingState) {
      // Focused energetic eyes with pupil tracking
      const pupilShiftX = Math.sin(time * 10) * 2;

      ctx.fillStyle = eyeColor;
      ctx.shadowColor = eyeColor;
      ctx.shadowBlur = 8;

      // Left Eye
      ctx.beginPath();
      ctx.roundRect(-eyeSpacing - 6 + pupilShiftX, eyeY - 7, 12, 14, 4);
      ctx.fill();

      // Right Eye
      ctx.beginPath();
      ctx.roundRect(eyeSpacing - 6 + pupilShiftX, eyeY - 7, 12, 14, 4);
      ctx.fill();

      ctx.shadowBlur = 0;

    } else {
      // Happy round eyes in idle mode
      ctx.fillStyle = eyeColor;
      ctx.shadowColor = eyeColor;
      ctx.shadowBlur = 6;

      ctx.beginPath();
      ctx.arc(-eyeSpacing, eyeY, 6, 0, Math.PI * 2);
      ctx.arc(eyeSpacing, eyeY, 6, 0, Math.PI * 2);
      ctx.fill();

      // Eye glint
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-eyeSpacing - 2, eyeY - 2, 2, 0, Math.PI * 2);
      ctx.arc(eyeSpacing - 2, eyeY - 2, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
    }

    // 6. Cute Headphone / Ear bolts on side of head
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.roundRect(-headW / 2 - 4, -headH * 0.15, 4, headH * 0.3, 2);
    ctx.roundRect(headW / 2, -headH * 0.15, 4, headH * 0.3, 2);
    ctx.fill();

    ctx.restore();
  }, [mascotState]);

  const handleMascotClick = () => {
    setClickCheer(true);
    setTimeout(() => setClickCheer(false), 1200);
  };

  if (compact) {
    return (
      <div 
        onClick={handleMascotClick}
        title="KeyBot Companion - Click to interact!"
        className={`relative flex items-center space-x-2 bg-slate-950 text-white rounded-xl px-2.5 py-1 border shadow-md cursor-pointer hover:border-sky-500 transition-all select-none ${
          mascotState === 'turbo' 
            ? 'border-rose-500 shadow-rose-500/20' 
            : mascotState === 'typo' 
            ? 'border-rose-400 animate-shake' 
            : 'border-slate-800'
        } ${className}`}
      >
        {/* Mascot Canvas */}
        <div className="w-9 h-9 shrink-0">
          <RiveAnimation
            fallbackRender={fallbackRender}
            inputs={{ isTyping, wpm, hasError, state: mascotState }}
            width={36}
            height={36}
            className="w-full h-full"
          />
        </div>

        {/* Status Tag */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-1">
            <span className="text-[9px] uppercase tracking-wider font-mono text-slate-400 font-bold leading-none">
              KEYBOT
            </span>
            {mascotState === 'turbo' && (
              <span className="text-[9px] font-black text-rose-400 font-mono">⚡TURBO</span>
            )}
          </div>
          <span className="text-xs font-semibold text-sky-300 font-mono leading-tight truncate max-w-[90px]">
            {clickCheer ? "Let's Go! 🚀" : currentCheer}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleMascotClick}
      className={`relative flex flex-col items-center p-3 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 text-white border shadow-xl transition-all duration-300 cursor-pointer select-none hover:shadow-2xl ${
        mascotState === 'turbo' 
          ? 'border-amber-500/80 shadow-amber-500/20' 
          : mascotState === 'typo' 
          ? 'border-rose-500 shadow-rose-500/30 animate-shake' 
          : 'border-slate-800'
      } ${className}`}
    >
      {/* Speech Bubble on top */}
      <div className="relative mb-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 text-center shadow-md animate-in fade-in zoom-in-95 max-w-[160px]">
        <div className="font-mono text-[11px] leading-tight">
          {clickCheer ? "You're typing great! 🌟" : currentCheer}
        </div>
        {/* Bubble pointer */}
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800 border-r border-b border-slate-700 rotate-45" />
      </div>

      {/* Main Mascot Canvas Stage */}
      <div className="w-28 h-28 flex items-center justify-center">
        <RiveAnimation
          fallbackRender={fallbackRender}
          inputs={{ isTyping, wpm, hasError, state: mascotState }}
          width={112}
          height={112}
          className="w-full h-full"
        />
      </div>

      {/* Mascot Name & Mode Tag */}
      <div className="mt-1 flex items-center space-x-1.5">
        <Bot className="w-3.5 h-3.5 text-sky-400" />
        <span className="text-xs font-black font-mono tracking-wider text-slate-200">
          KEYBOT
        </span>
        <span 
          className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase ${
            mascotState === 'turbo' 
              ? 'bg-rose-500 text-white' 
              : mascotState === 'typo' 
              ? 'bg-rose-500/30 text-rose-300' 
              : mascotState === 'typing' 
              ? 'bg-sky-500 text-white' 
              : 'bg-slate-800 text-slate-400'
          }`}
        >
          {mascotState}
        </span>
      </div>
    </div>
  );
}
