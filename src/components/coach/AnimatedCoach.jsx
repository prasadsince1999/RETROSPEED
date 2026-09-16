import React, { useState, useEffect, useMemo } from 'react';
import { Bot, Sparkles, Flame, Lightbulb, Trophy } from 'lucide-react';
import { IDLE_MESSAGES, getCoachSpeechMessage } from './coachMessages';

/**
 * AnimatedCoach Mascot Component ("Coach Byte")
 * 
 * An emotive, interactive vector mascot coach built with clean scalable SVG and state machine.
 * 
 * States:
 * - idle: Calm blinking eye animation and rhythmic breathing motion.
 * - focus: Leaning in with focused eyes when the user starts typing.
 * - streak: Excited bounce, cheering mouth, and celebration particles when streak hits 10+, 25+, 50+.
 * - error: Supportive guidance expression (head tilt, encouraging eyes) with a gentle tip.
 * - victory: Celebratory star particles and happy bounce on lesson completion.
 * 
 * Props:
 * @param {string} state - 'idle' | 'focus' | 'streak' | 'error' | 'victory'
 * @param {number} streak - Current combo streak count
 * @param {string} tip - Optional custom tip or error guidance
 * @param {number} wpm - Optional live WPM
 * @param {boolean} compact - Compact layout for narrow screens
 * @param {string} className - Optional wrapper class names
 */
export default function AnimatedCoach({
  state = 'idle',
  streak = 0,
  tip = null,
  wpm = 0,
  compact = false,
  className = ''
}) {
  const [isBlinking, setIsBlinking] = useState(false);
  const [randomIdleIndex, setRandomIdleIndex] = useState(0);

  // Natural blinking effect for idle and focus states
  useEffect(() => {
    if (state !== 'idle' && state !== 'focus') return;

    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3200);

    return () => clearInterval(blinkInterval);
  }, [state]);

  // Rotate idle hints every 10 seconds
  useEffect(() => {
    if (state !== 'idle') return;
    const hintInterval = setInterval(() => {
      setRandomIdleIndex(prev => (prev + 1) % IDLE_MESSAGES.length);
    }, 10000);
    return () => clearInterval(hintInterval);
  }, [state]);

  // Derive dynamic contextual message
  const speechMessage = useMemo(() => {
    return getCoachSpeechMessage({ state, streak, tip, wpm, randomIdleIndex });
  }, [state, streak, tip, wpm, randomIdleIndex]);

  // Streak particle level
  const particleTier = streak >= 50 ? 3 : streak >= 25 ? 2 : streak >= 10 ? 1 : 0;

  // Mascot posture and animation styles based on state
  const mascotPostureClass = useMemo(() => {
    switch (state) {
      case 'focus':
        return 'transform -rotate-2 translate-y-1 scale-[1.02] transition-transform duration-300';
      case 'streak':
        return 'animate-bounce transition-transform duration-200';
      case 'error':
        return 'transform rotate-6 translate-y-0.5 transition-transform duration-300';
      case 'victory':
        return 'transform -translate-y-2 scale-105 transition-transform duration-300 animate-pulse';
      case 'idle':
      default:
        return 'animate-float transition-transform duration-500';
    }
  }, [state]);

  // Status Badge Label & Color Scheme
  const statusBadge = useMemo(() => {
    switch (state) {
      case 'streak':
        return {
          icon: <Flame className="w-3 h-3 text-amber-500 animate-pulse" />,
          label: `${streak}x COMBO`,
          bgClass: 'bg-amber-400 text-slate-950 font-black'
        };
      case 'focus':
        return {
          icon: <Sparkles className="w-3 h-3 text-sky-400" />,
          label: wpm > 0 ? `${wpm} WPM` : 'FOCUS',
          bgClass: 'bg-sky-100 text-sky-800 font-bold'
        };
      case 'error':
        return {
          icon: <Lightbulb className="w-3 h-3 text-amber-600" />,
          label: 'COACH TIP',
          bgClass: 'bg-amber-100 text-amber-900 font-bold'
        };
      case 'victory':
        return {
          icon: <Trophy className="w-3 h-3 text-emerald-600" />,
          label: 'VICTORY!',
          bgClass: 'bg-emerald-100 text-emerald-900 font-black'
        };
      case 'idle':
      default:
        return {
          icon: <Bot className="w-3 h-3 text-slate-600" />,
          label: 'ONLINE',
          bgClass: 'bg-slate-100 text-slate-700 font-bold'
        };
    }
  }, [state, streak, wpm]);

  if (compact) {
    return (
      <div className={`flex items-center space-x-2.5 px-3 py-1.5 bg-white/95 rounded-xl border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] text-xs max-w-sm ${className}`}>
        <div className="w-7 h-7 shrink-0">
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-xs">
            <rect x="24" y="32" width="112" height="96" rx="22" fill="#FAF3E0" stroke="#2D2319" strokeWidth="6" />
            <rect x="36" y="44" width="88" height="72" rx="14" fill="#1E293B" stroke="#0F172A" strokeWidth="4" />
            {state === 'streak' || state === 'victory' ? (
              <>
                <path d="M 48 76 Q 58 60 68 76" stroke="#FACC15" strokeWidth="6" strokeLinecap="round" fill="none" />
                <path d="M 92 76 Q 102 60 112 76" stroke="#FACC15" strokeWidth="6" strokeLinecap="round" fill="none" />
                <path d="M 68 94 Q 80 112 92 94 Z" fill="#EF4444" />
              </>
            ) : state === 'error' ? (
              <>
                <circle cx="58" cy="74" r="7" fill="#38BDF8" />
                <circle cx="102" cy="74" r="7" fill="#38BDF8" />
                <path d="M 70 98 Q 80 103 90 98" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" fill="none" />
              </>
            ) : (
              <>
                <rect x="52" y={isBlinking ? "72" : "62"} width="12" height={isBlinking ? "4" : "20"} rx="6" fill="#38BDF8" />
                <rect x="96" y={isBlinking ? "72" : "62"} width="12" height={isBlinking ? "4" : "20"} rx="6" fill="#38BDF8" />
                <path d="M 70 96 Q 80 102 90 96" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" fill="none" />
              </>
            )}
          </svg>
        </div>
        <div className="flex-1 truncate">
          <span className="font-bold text-[#2D2319] block truncate">{speechMessage}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center select-none w-36 sm:w-40 md:w-44 pointer-events-auto ${className}`}>
      
      {/* 1. DYNAMIC SPEECH BUBBLE WITH RETRO SHADOW & POINTER */}
      <div className="w-full relative mb-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
        <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-xl p-2 sm:p-2.5 shadow-[2px_2px_0px_#2D2319] relative text-left">
          
          {/* Top Bar: Coach Badge & Status */}
          <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#2D2319]/15">
            <div className="flex items-center space-x-1.5 text-[#2D2319]">
              <span className="text-xs">🤖</span>
              <span className="font-mono text-[9px] font-black tracking-wide text-slate-800 uppercase">
                COACH BYTE
              </span>
            </div>

            <div className={`flex items-center space-x-1 px-1.5 py-0.5 rounded text-[9px] border border-[#2D2319]/25 shadow-xs ${statusBadge.bgClass}`}>
              {statusBadge.icon}
              <span className="leading-tight">{statusBadge.label}</span>
            </div>
          </div>

          {/* Contextual Message Text */}
          <p className="font-sans text-[11px] sm:text-xs font-semibold text-[#2D2319] leading-snug min-h-[1.75rem] flex items-center">
            {speechMessage}
          </p>

          {/* Speech Bubble Pointer / Caret */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#FAF3E0] border-r-2 border-b-2 border-[#2D2319] rotate-45" />
        </div>
      </div>

      {/* 2. VECTOR MASCOT STAGE */}
      <div className={`relative w-24 h-24 sm:w-28 sm:h-28 ${mascotPostureClass}`}>
        
        {/* CELEBRATION PARTICLES (10+, 25+, 50+ & Victory) */}
        {(state === 'streak' || state === 'victory') && (
          <div className="absolute inset-0 pointer-events-none overflow-visible">
            {/* Particle 1: Top Left */}
            <span className="absolute -top-3 -left-2 text-base sm:text-lg animate-bounce duration-300">
              {particleTier >= 2 ? '🔥' : '✨'}
            </span>
            {/* Particle 2: Top Right */}
            <span className="absolute -top-4 -right-1 text-base sm:text-lg animate-pulse duration-500">
              {particleTier >= 3 ? '⚡' : '🌟'}
            </span>
            {/* Particle 3: Mid Left */}
            <span className="absolute top-10 -left-4 text-sm animate-bounce duration-700">
              {particleTier >= 2 ? '⚡' : '⭐'}
            </span>
            {/* Particle 4: Mid Right */}
            <span className="absolute top-12 -right-4 text-sm animate-ping duration-1000">
              {particleTier >= 3 ? '💎' : '✨'}
            </span>
            {/* Particle 5: Top Center Burst (50+) */}
            {particleTier >= 3 && (
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-lg animate-bounce">
                👑
              </span>
            )}
          </div>
        )}

        {/* Supportive Glow / Heart Particle for Error */}
        {state === 'error' && (
          <div className="absolute -top-3 right-2 pointer-events-none animate-bounce">
            <span className="text-base">💡</span>
          </div>
        )}

        {/* MAIN SCALABLE SVG MASCOT */}
        <svg 
          viewBox="0 0 160 160" 
          className="w-full h-full drop-shadow-[2px_3px_0px_rgba(45,35,25,0.25)]"
        >
          <defs>
            {/* Glow Filter for Digital Eyes & Neon Elements */}
            <filter id="coachGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* CRT Screen Gradient */}
            <linearGradient id="crtScreenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>

            {/* Chassis 3D Gradient */}
            <linearGradient id="chassisGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FAF3E0" />
              <stop offset="100%" stopColor="#EDE2C8" />
            </linearGradient>

            {/* Gold Antenna Orb Gradient */}
            <radialGradient id="antennaGold" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="70%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </radialGradient>

            {/* Cyan Antenna Orb Gradient */}
            <radialGradient id="antennaCyan" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="70%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </radialGradient>
          </defs>

          {/* DESK SHADOW */}
          <ellipse cx="80" cy="150" rx="46" ry="7" fill="#2D2319" opacity="0.22" />

          {/* BASE STAND */}
          <path 
            d="M 64 128 L 56 146 L 104 146 L 96 128 Z" 
            fill="#D4C5B0" 
            stroke="#2D2319" 
            strokeWidth="2.5" 
            strokeLinejoin="round" 
          />
          <line x1="60" y1="141" x2="100" y2="141" stroke="#2D2319" strokeWidth="1.5" opacity="0.4" />

          {/* ANTENNA STEM & ORB */}
          <g id="coach-antenna">
            <line 
              x1="92" 
              y1="34" 
              x2="106" 
              y2="14" 
              stroke="#2D2319" 
              strokeWidth="3" 
              strokeLinecap="round" 
            />
            
            {/* Radiating Antenna Glow Ring (Streak & Victory) */}
            {(state === 'streak' || state === 'victory') && (
              <circle 
                cx="106" 
                cy="14" 
                r="11" 
                fill="none" 
                stroke="#FACC15" 
                strokeWidth="2" 
                opacity="0.75" 
                className="animate-ping" 
              />
            )}

            {/* Antenna Orb Ball */}
            <circle 
              cx="106" 
              cy="14" 
              r="7" 
              fill={state === 'streak' || state === 'victory' ? "url(#antennaGold)" : "url(#antennaCyan)"} 
              stroke="#2D2319" 
              strokeWidth="2" 
              filter="url(#coachGlow)"
            />
          </g>

          {/* ROBOT MONITOR CHASSIS BODY */}
          <rect 
            x="24" 
            y="32" 
            width="112" 
            height="96" 
            rx="22" 
            ry="22" 
            fill="url(#chassisGrad)" 
            stroke="#2D2319" 
            strokeWidth="3" 
          />

          {/* RETRO TOP VISOR / COACH SWEATBAND */}
          <path 
            d="M 28 46 Q 80 40 132 46 L 131 52 Q 80 46 29 52 Z" 
            fill="#F28B82" 
            stroke="#2D2319" 
            strokeWidth="2" 
          />
          {/* Runner Wing Badge on Headband */}
          <circle cx="80" cy="48" r="4.5" fill="#F6C445" stroke="#2D2319" strokeWidth="1.5" />

          {/* RETRO KNOBS / DIALS (Bottom Right of Monitor) */}
          <circle cx="123" cy="112" r="3" fill="#F6C445" stroke="#2D2319" strokeWidth="1.5" />
          <circle cx="114" cy="112" r="2.5" fill="#48B89F" stroke="#2D2319" strokeWidth="1.5" />

          {/* DARK CRT SCREEN FRAME */}
          <rect 
            x="34" 
            y="54" 
            width="92" 
            height="62" 
            rx="14" 
            ry="14" 
            fill="url(#crtScreenGrad)" 
            stroke="#0F172A" 
            strokeWidth="2" 
          />

          {/* CRT SCANLINES (SUBTLE RETRO TOUCH) */}
          <line x1="38" y1="64" x2="122" y2="64" stroke="#ffffff" strokeWidth="0.5" opacity="0.08" />
          <line x1="38" y1="74" x2="122" y2="74" stroke="#ffffff" strokeWidth="0.5" opacity="0.08" />
          <line x1="38" y1="84" x2="122" y2="84" stroke="#ffffff" strokeWidth="0.5" opacity="0.08" />
          <line x1="38" y1="94" x2="122" y2="94" stroke="#ffffff" strokeWidth="0.5" opacity="0.08" />
          <line x1="38" y1="104" x2="122" y2="104" stroke="#ffffff" strokeWidth="0.5" opacity="0.08" />

          {/* ROSY BLUSH CHEEKS (Lights up in streak & victory) */}
          <ellipse 
            cx="48" 
            cy="94" 
            rx="6.5" 
            ry="4" 
            fill="#FB7185" 
            opacity={state === 'streak' || state === 'victory' ? 0.9 : 0.4} 
          />
          <ellipse 
            cx="112" 
            cy="94" 
            rx="6.5" 
            ry="4" 
            fill="#FB7185" 
            opacity={state === 'streak' || state === 'victory' ? 0.9 : 0.4} 
          />

          {/* 3. EMOTIVE EYES (STATE-DRIVEN) */}
          <g id="coach-eyes" filter="url(#coachGlow)">
            {/* STATE: STREAK (Joyful Arched Eyes ^ ^ or Golden Stars) */}
            {state === 'streak' && (
              <>
                {streak >= 25 ? (
                  /* 5-Pointed Star Eyes for high combos */
                  <>
                    <polygon 
                      points="58,66 61,74 69,74 63,79 65,87 58,82 51,87 53,79 47,74 55,74" 
                      fill="#FACC15" 
                    />
                    <polygon 
                      points="102,66 105,74 113,74 107,79 109,87 102,82 95,87 97,79 91,74 99,74" 
                      fill="#FACC15" 
                    />
                  </>
                ) : (
                  /* Cheerful upward arches ^ ^ */
                  <>
                    <path 
                      d="M 48 78 Q 58 64 68 78" 
                      stroke="#FACC15" 
                      strokeWidth="5" 
                      strokeLinecap="round" 
                      fill="none" 
                    />
                    <path 
                      d="M 92 78 Q 102 64 112 78" 
                      stroke="#FACC15" 
                      strokeWidth="5" 
                      strokeLinecap="round" 
                      fill="none" 
                    />
                  </>
                )}
              </>
            )}

            {/* STATE: VICTORY (Celebratory Wink & Star) */}
            {state === 'victory' && (
              <>
                {/* Left Eye: Shining Gold Star */}
                <polygon 
                  points="58,66 61,74 69,74 63,79 65,87 58,82 51,87 53,79 47,74 55,74" 
                  fill="#FACC15" 
                />
                {/* Right Eye: Happy Upward Wink Arc */}
                <path 
                  d="M 92 78 Q 102 64 112 78" 
                  stroke="#FACC15" 
                  strokeWidth="5" 
                  strokeLinecap="round" 
                  fill="none" 
                />
              </>
            )}

            {/* STATE: FOCUS (Keen Focused Determined Eyes with Brows) */}
            {state === 'focus' && (
              <>
                {/* Determined Furrowed Eyebrows */}
                <line x1="50" y1="65" x2="68" y2="70" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
                <line x1="110" y1="65" x2="92" y2="70" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
                
                {/* Focused Slanted Eyes */}
                <ellipse cx="58" cy="77" rx="7" ry="9" fill="#38BDF8" transform="rotate(-6 58 77)" />
                <circle cx="59" cy="76" r="3" fill="#FFFFFF" />
                
                <ellipse cx="102" cy="77" rx="7" ry="9" fill="#38BDF8" transform="rotate(6 102 77)" />
                <circle cx="101" cy="76" r="3" fill="#FFFFFF" />

                {/* Focus Target Crosshairs */}
                <line x1="58" y1="71" x2="58" y2="83" stroke="#0284C7" strokeWidth="1.5" opacity="0.6" />
                <line x1="52" y1="77" x2="64" y2="77" stroke="#0284C7" strokeWidth="1.5" opacity="0.6" />
                <line x1="102" y1="71" x2="102" y2="83" stroke="#0284C7" strokeWidth="1.5" opacity="0.6" />
                <line x1="96" y1="77" x2="108" y2="77" stroke="#0284C7" strokeWidth="1.5" opacity="0.6" />
              </>
            )}

            {/* STATE: ERROR (Supportive, Reassuring, Empathetic Eyes) */}
            {state === 'error' && (
              <>
                {/* Gentle curved, empathetic eyebrows */}
                <path d="M 50 67 Q 58 63 66 69" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M 110 67 Q 102 63 94 69" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                {/* Caring, gentle pupils */}
                <circle cx="58" cy="77" r="7" fill="#38BDF8" />
                <circle cx="60" cy="75" r="3" fill="#FFFFFF" />
                <circle cx="56" cy="79" r="1.5" fill="#FFFFFF" />

                <circle cx="102" cy="77" r="7" fill="#38BDF8" />
                <circle cx="104" cy="75" r="3" fill="#FFFFFF" />
                <circle cx="100" cy="79" r="1.5" fill="#FFFFFF" />
              </>
            )}

            {/* STATE: IDLE (Calm, friendly blinking capsules) */}
            {state === 'idle' && (
              <>
                {isBlinking ? (
                  /* Blinking slit */
                  <>
                    <rect x="51" y="76" width="14" height="3" rx="1.5" fill="#38BDF8" />
                    <rect x="95" y="76" width="14" height="3" rx="1.5" fill="#38BDF8" />
                  </>
                ) : (
                  /* Open friendly eyes */
                  <>
                    <rect x="51" y="66" width="14" height="20" rx="7" fill="#38BDF8" />
                    <circle cx="55" cy="72" r="3" fill="#FFFFFF" />
                    <circle cx="60" cy="79" r="1.5" fill="#FFFFFF" />

                    <rect x="95" y="66" width="14" height="20" rx="7" fill="#38BDF8" />
                    <circle cx="99" cy="72" r="3" fill="#FFFFFF" />
                    <circle cx="104" cy="79" r="1.5" fill="#FFFFFF" />
                  </>
                )}
              </>
            )}
          </g>

          {/* 4. EMOTIVE MOUTH (STATE-DRIVEN) */}
          <g id="coach-mouth">
            {state === 'streak' || state === 'victory' ? (
              /* Big cheering open mouth with tongue & white teeth */
              <g>
                <path 
                  d="M 68 94 Q 80 114 92 94 Z" 
                  fill="#EF4444" 
                  stroke="#2D2319" 
                  strokeWidth="2" 
                />
                {/* Tooth */}
                <rect x="74" y="94" width="12" height="3.5" rx="1" fill="#FFFFFF" />
                {/* Tongue */}
                <path d="M 72 104 Q 80 101 88 104 Q 80 112 72 104 Z" fill="#F472B6" />
              </g>
            ) : state === 'focus' ? (
              /* Determined smirk */
              <path 
                d="M 70 98 Q 80 99 90 96" 
                stroke="#38BDF8" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                fill="none" 
              />
            ) : state === 'error' ? (
              /* Reassuring gentle smile */
              <path 
                d="M 72 98 Q 80 102 88 98" 
                stroke="#38BDF8" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                fill="none" 
              />
            ) : (
              /* Friendly calm smile */
              <path 
                d="M 70 96 Q 80 103 90 96" 
                stroke="#38BDF8" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                fill="none" 
              />
            )}
          </g>

          {/* 5. ROBOT ARMS & HANDS (STATE-DRIVEN) */}
          <g id="coach-hands">
            {state === 'streak' || state === 'victory' ? (
              /* Cheering hands pumped in the air */
              <>
                <path 
                  d="M 24 80 Q 14 62 18 50" 
                  stroke="#2D2319" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  fill="none" 
                />
                <circle cx="18" cy="48" r="7" fill="#FAF3E0" stroke="#2D2319" strokeWidth="2.5" />

                <path 
                  d="M 136 80 Q 146 62 142 50" 
                  stroke="#2D2319" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  fill="none" 
                />
                <circle cx="142" cy="48" r="7" fill="#FAF3E0" stroke="#2D2319" strokeWidth="2.5" />
              </>
            ) : state === 'focus' ? (
              /* Hands positioned forward typing */
              <>
                <path 
                  d="M 24 84 Q 28 100 38 104" 
                  stroke="#2D2319" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  fill="none" 
                />
                <circle cx="40" cy="105" r="6" fill="#FAF3E0" stroke="#2D2319" strokeWidth="2.5" />

                <path 
                  d="M 136 84 Q 132 100 122 104" 
                  stroke="#2D2319" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  fill="none" 
                />
                <circle cx="120" cy="105" r="6" fill="#FAF3E0" stroke="#2D2319" strokeWidth="2.5" />
              </>
            ) : state === 'error' ? (
              /* One hand giving thumbs-up, one resting */
              <>
                {/* Left hand thumbs-up */}
                <path 
                  d="M 24 82 Q 12 78 16 70" 
                  stroke="#2D2319" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  fill="none" 
                />
                <circle cx="16" cy="68" r="6" fill="#FAF3E0" stroke="#2D2319" strokeWidth="2.5" />
                {/* Thumb */}
                <line x1="16" y1="65" x2="16" y2="59" stroke="#2D2319" strokeWidth="3" strokeLinecap="round" />

                {/* Right hand resting */}
                <circle cx="138" cy="92" r="6.5" fill="#FAF3E0" stroke="#2D2319" strokeWidth="2.5" />
              </>
            ) : (
              /* Idle relaxed hands resting beside chassis */
              <>
                <circle cx="20" cy="92" r="6.5" fill="#FAF3E0" stroke="#2D2319" strokeWidth="2.5" />
                <circle cx="140" cy="92" r="6.5" fill="#FAF3E0" stroke="#2D2319" strokeWidth="2.5" />
              </>
            )}
          </g>

        </svg>

      </div>

    </div>
  );
}
