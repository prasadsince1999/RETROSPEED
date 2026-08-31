import React from 'react';

/**
 * Reusable floating score & damage particle layer.
 */
export default function FloatingPoints({ points = [] }) {
  if (!points || points.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center">
      {points.map((pt) => (
        <div
          key={pt.id}
          className={`absolute top-1/3 animate-float-fade font-black text-2xl sm:text-3xl font-mono flex items-center space-x-1.5 drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] ${
            pt.color || 'text-amber-300'
          }`}
          style={pt.style || {}}
        >
          <span>{pt.text}</span>
          {pt.multiplier && (
            <span className="text-sm bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-md ml-1 shadow">
              {pt.multiplier}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
