import React from 'react';
import { Heart, Shield, Sparkles } from 'lucide-react';

export default function LivesIndicator({
  lives = 3,
  maxLives = 3,
  type = 'ninja',
  size = 24,
  className = ''
}) {
  return (
    <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-black/40 border border-white/15 backdrop-blur-md shadow-inner select-none ${className}`}>
      {Array.from({ length: maxLives }).map((_, idx) => {
        const active = idx < lives;

        if (type === 'heart') {
          return (
            <div 
              key={`life-${idx}`} 
              className={`transition-all duration-300 ${active ? 'scale-100 filter drop-shadow-[0_0_6px_#f43f5e]' : 'scale-75 opacity-25 grayscale'}`}
            >
              <Heart size={size} className={active ? 'text-rose-500 fill-rose-500' : 'text-slate-600 fill-slate-700'} />
            </div>
          );
        }

        if (type === 'shield') {
          return (
            <div 
              key={`life-${idx}`} 
              className={`transition-all duration-300 ${active ? 'scale-100 filter drop-shadow-[0_0_6px_#38bdf8]' : 'scale-75 opacity-25 grayscale'}`}
            >
              <Shield size={size} className={active ? 'text-sky-400 fill-sky-500/40' : 'text-slate-600 fill-slate-800'} />
            </div>
          );
        }

        if (type === 'ninja') {
          return (
            <div
              key={`life-${idx}`}
              className={`relative flex items-center justify-center transition-all duration-300 ${
                active ? 'scale-100 filter drop-shadow-[0_0_6px_rgba(56,189,248,0.7)]' : 'scale-80 opacity-25 grayscale'
              }`}
            >
              <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="16" fill={active ? '#0f172a' : '#334155'} stroke={active ? '#38bdf8' : '#64748b'} strokeWidth="2" />
                <path d="M 6 15 Q 18 13 30 15 Q 30 22 18 22 Q 6 22 6 15" fill={active ? '#e2e8f0' : '#64748b'} />
                <ellipse cx="13" cy="18" rx="2" ry="2.5" fill="#0f172a" />
                <ellipse cx="23" cy="18" rx="2" ry="2.5" fill="#0f172a" />
                <circle cx="13.7" cy="17.2" r="0.7" fill="#ffffff" />
                <circle cx="23.7" cy="17.2" r="0.7" fill="#ffffff" />
                <path d="M 4 12 L 32 12" stroke={active ? '#ef4444' : '#64748b'} strokeWidth="3" strokeLinecap="round" />
                <circle cx="31" cy="12" r="2.5" fill={active ? '#ef4444' : '#64748b'} />
              </svg>
            </div>
          );
        }

        if (type === 'robot' || type === 'space') {
          return (
            <div
              key={`life-${idx}`}
              className={`relative flex items-center justify-center transition-all duration-300 ${
                active ? 'scale-100 filter drop-shadow-[0_0_6px_rgba(168,85,247,0.7)]' : 'scale-80 opacity-25 grayscale'
              }`}
            >
              <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
                <rect x="6" y="8" width="24" height="22" rx="6" fill={active ? '#1e1b4b' : '#334155'} stroke={active ? '#c084fc' : '#64748b'} strokeWidth="2" />
                <line x1="18" y1="2" x2="18" y2="8" stroke={active ? '#38bdf8' : '#64748b'} strokeWidth="2" strokeLinecap="round" />
                <circle cx="18" cy="2" r="2" fill={active ? '#38bdf8' : '#64748b'} />
                <circle cx="12" cy="18" r="3" fill={active ? '#38bdf8' : '#64748b'} />
                <circle cx="24" cy="18" r="3" fill={active ? '#38bdf8' : '#64748b'} />
                <rect x="12" y="24" width="12" height="3" rx="1.5" fill={active ? '#ec4899' : '#64748b'} />
              </svg>
            </div>
          );
        }

        if (type === 'temple' || type === 'pharaoh') {
          return (
            <div
              key={`life-${idx}`}
              className={`relative flex items-center justify-center transition-all duration-300 ${
                active ? 'scale-100 filter drop-shadow-[0_0_6px_rgba(245,158,11,0.7)]' : 'scale-80 opacity-25 grayscale'
              }`}
            >
              <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
                <polygon points="18,4 32,28 4,28" fill={active ? '#78350f' : '#334155'} stroke={active ? '#fbbf24' : '#64748b'} strokeWidth="2" />
                <polygon points="18,10 28,26 8,26" fill={active ? '#b45309' : '#1e293b'} />
                <circle cx="18" cy="18" r="3" fill={active ? '#fde047' : '#64748b'} />
              </svg>
            </div>
          );
        }

        // Default Heart
        return (
          <div 
            key={`life-${idx}`} 
            className={`transition-all duration-300 ${active ? 'scale-100 filter drop-shadow-[0_0_6px_#f43f5e]' : 'scale-75 opacity-25 grayscale'}`}
          >
            <Heart size={size} className={active ? 'text-rose-500 fill-rose-500' : 'text-slate-600 fill-slate-700'} />
          </div>
        );
      })}
    </div>
  );
}
