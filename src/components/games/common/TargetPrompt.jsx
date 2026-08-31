import React from 'react';
import { Sparkles, Target, Zap, Flame } from 'lucide-react';
import TargetAuraHalo from './TargetAuraHalo';

export default function TargetPrompt({
  word = '',
  targetChar = '',
  typedIndex = 0,
  theme = 'gold',
  label = 'Target:',
  showHalo = true,
  className = ''
}) {
  const characters = word ? word.split('') : targetChar ? [targetChar] : [];
  const currentChar = characters[typedIndex] || targetChar || '';

  // Theme styling for prompt keycap
  const getThemeStyles = () => {
    switch (theme) {
      case 'space':
      case 'cosmos':
        return {
          bg: 'bg-indigo-950/80 border-cyan-400/40 text-cyan-200',
          haloTheme: 'cyan',
          activeBg: 'bg-cyan-400 text-slate-950 shadow-[0_0_15px_#22d3ee]',
          icon: <Zap className="w-3.5 h-3.5 text-cyan-400" />
        };
      case 'temple':
      case 'desert':
        return {
          bg: 'bg-amber-950/80 border-amber-500/40 text-amber-200',
          haloTheme: 'gold',
          activeBg: 'bg-amber-400 text-slate-950 shadow-[0_0_15px_#f59e0b]',
          icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        };
      case 'ocean':
      case 'bubble':
        return {
          bg: 'bg-sky-950/80 border-sky-400/40 text-sky-200',
          haloTheme: 'cyan',
          activeBg: 'bg-sky-400 text-slate-950 shadow-[0_0_15px_#38bdf8]',
          icon: <Sparkles className="w-3.5 h-3.5 text-sky-300" />
        };
      case 'orchard':
      case 'apple':
        return {
          bg: 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200',
          haloTheme: 'emerald',
          activeBg: 'bg-emerald-400 text-slate-950 shadow-[0_0_15px_#34d399]',
          icon: <Target className="w-3.5 h-3.5 text-emerald-400" />
        };
      case 'ninja':
      case 'balloon':
      default:
        return {
          bg: 'bg-slate-900/80 border-white/20 text-slate-200',
          haloTheme: 'gold',
          activeBg: 'bg-amber-400 text-slate-950 shadow-[0_0_15px_#fbbf24]',
          icon: <Target className="w-3.5 h-3.5 text-amber-400" />
        };
    }
  };

  const themeStyle = getThemeStyles();

  return (
    <div className={`relative inline-flex items-center space-x-3 px-5 py-2 rounded-2xl border backdrop-blur-md shadow-2xl ${themeStyle.bg} ${className}`}>
      {/* Label and Icon */}
      <div className="flex items-center space-x-1.5 text-xs font-black uppercase tracking-wider opacity-80 select-none">
        {themeStyle.icon}
        <span>{label}</span>
      </div>

      {/* Target Word Sequence Display */}
      <div className="flex items-center space-x-1.5 font-mono text-xl sm:text-2xl font-black">
        {characters.map((char, idx) => {
          const isTyped = idx < typedIndex;
          const isCurrent = idx === typedIndex;

          if (isCurrent && showHalo) {
            return (
              <TargetAuraHalo
                key={`target-char-${idx}`}
                theme={themeStyle.haloTheme}
                size={40}
                showArrows={true}
                showSunburst={false}
                arrowDistance={14}
              >
                <span className={`inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-lg font-mono font-black text-xl transition-transform scale-110 ${themeStyle.activeBg}`}>
                  {char === ' ' ? '␣' : char}
                </span>
              </TargetAuraHalo>
            );
          }

          return (
            <span
              key={`target-char-${idx}`}
              className={`inline-flex items-center justify-center min-w-[28px] h-7 px-1.5 rounded transition-all duration-150 ${
                isTyped
                  ? 'opacity-30 line-through text-slate-400 scale-90'
                  : isCurrent
                  ? `scale-110 ${themeStyle.activeBg}`
                  : 'text-white opacity-80'
              }`}
            >
              {char === ' ' ? '␣' : char}
            </span>
          );
        })}
      </div>
    </div>
  );
}
