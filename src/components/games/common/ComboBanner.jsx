import React from 'react';
import { Flame, Zap, Award, Sparkles, Star } from 'lucide-react';

/**
 * Reusable animated combo banner for celebrating typing streaks.
 */
export default function ComboBanner({ banner }) {
  if (!banner) return null;

  const { title, multiplier, badge, color = 'from-amber-500 to-orange-600', icon, points } = banner;

  return (
    <div className="absolute top-4 inset-x-0 z-40 flex justify-center pointer-events-none animate-combo-pop">
      <div
        className={`px-6 py-2 rounded-2xl bg-gradient-to-r ${color} text-white font-black text-lg sm:text-xl shadow-2xl border-2 border-white/40 flex items-center space-x-3 backdrop-blur-md`}
      >
        {icon ? (
          <span className="text-2xl">{icon}</span>
        ) : (
          <Flame className="w-5 h-5 text-amber-300 animate-bounce" />
        )}
        <span className="drop-shadow-lg tracking-wide">{title}</span>
        {badge && (
          <span className="text-xs px-2.5 py-0.5 rounded-lg bg-black/40 text-amber-300 border border-white/30 font-mono">
            {badge}
          </span>
        )}
        {points && (
          <span className="text-xs px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 font-mono font-bold">
            {points}
          </span>
        )}
      </div>
    </div>
  );
}
