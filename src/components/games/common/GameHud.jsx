import React from 'react';
import { Menu, Award, Sparkles } from 'lucide-react';

/**
 * Reusable Minimal Top HUD Bar for Arcade Games.
 */
export default function GameHud({
  title = '',
  subtitle = '',
  icon = null,
  score = 0,
  itemsLeft = 0,
  totalItems = 0,
  targetsQueue = [],
  onOpenMenu = () => {}
}) {
  return (
    <div className="relative z-30 px-5 py-2.5 flex items-center justify-between border-b border-white/10 bg-slate-950/50 backdrop-blur-md">
      {/* Top-Left: Minimal Hamburger Menu Button '≡' */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onOpenMenu}
          className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 border border-white/15 backdrop-blur-md transition-all flex items-center justify-center text-white shadow-sm group"
          title="Game Menu (≡)"
        >
          <Menu className="w-5 h-5 text-slate-200 group-hover:text-white transition-colors" />
        </button>

        {/* Subtitle / Game Title */}
        <div className="hidden md:flex flex-col">
          <div className="text-[10px] uppercase tracking-widest text-slate-300 font-extrabold flex items-center space-x-1.5">
            {icon || <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
            <span>{subtitle || title}</span>
          </div>
          <h2 className="text-sm font-black font-display text-white tracking-wide leading-tight">
            {title}
          </h2>
        </div>
      </div>

      {/* Top-Right: Target List Queue, Remaining Count & Live Score */}
      <div className="flex items-center space-x-3">
        {targetsQueue && targetsQueue.length > 0 && (
          <div className="hidden lg:flex items-center space-x-1.5 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
            <span className="text-[9px] uppercase font-bold text-slate-400 mr-1">Upcoming:</span>
            {targetsQueue.slice(0, 4).map((target, idx) => (
              <span
                key={idx}
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded-lg transition-all ${
                  idx === 0
                    ? 'bg-amber-400/25 text-amber-300 border border-amber-400/40 shadow-sm'
                    : 'bg-white/5 text-slate-300 border border-white/5'
                }`}
              >
                {typeof target === 'string' ? target : target.word || target.char || target.target || ''}
              </span>
            ))}
          </div>
        )}

        {itemsLeft !== undefined && (
          <div className="hidden sm:flex items-center space-x-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15 backdrop-blur-sm">
            <span className="text-[10px] uppercase font-bold text-slate-300">Remaining:</span>
            <span className="text-sm font-black font-mono text-white leading-none">
              {itemsLeft}{totalItems ? `/${totalItems}` : ''}
            </span>
          </div>
        )}

        <div className="flex items-center space-x-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-3.5 py-1.5 rounded-xl border border-amber-400/30 backdrop-blur-md shadow-inner">
          <Award className="w-4 h-4 text-amber-400" />
          <div className="flex flex-col text-right">
            <span className="text-[8px] uppercase font-bold text-amber-300/80 tracking-wider">Score</span>
            <span className="text-base font-black text-amber-300 font-mono leading-none">{score}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
