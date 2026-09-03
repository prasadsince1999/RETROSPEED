import React from 'react';

export function JourneyAvatar({ isHopping, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`absolute -top-16 left-1/2 -translate-x-1/2 z-30 cursor-pointer select-none transition-transform group ${
        isHopping ? 'animate-avatar-hop' : 'animate-avatar-bob'
      }`}
      title="RETROSPEED Explorer • Click to cheer & hop!"
    >
      <div className="flex flex-col items-center mb-1">
        <div className="px-2.5 py-0.5 rounded-md bg-[#1888ff] text-white font-black text-[9px] uppercase tracking-wider font-mono shadow-[2px_2px_0px_#2D2319] border-2 border-[#2D2319] flex items-center space-x-1 group-hover:scale-105 transition-transform">
          <span className="w-1.5 h-1.5 rounded-full bg-[#fef08a] animate-ping" />
          <span>YOU ARE HERE</span>
        </div>
        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-[#2D2319] -mt-0.5" />
      </div>

      <div className="relative w-14 h-14 flex items-center justify-center">
        <svg viewBox="0 0 64 64" className="w-14 h-14 drop-shadow-[2px_2px_0px_#2D2319] relative z-10">
          <rect x="14" y="24" width="36" height="28" rx="4" fill="#0369a1" stroke="#2D2319" strokeWidth="2" />
          <circle cx="32" cy="38" r="5" fill="#38bdf8" className="animate-pulse" />
          <circle cx="32" cy="38" r="2" fill="#ffffff" />
          <ellipse cx="32" cy="42" rx="14" ry="12" fill="#0284c7" stroke="#2D2319" strokeWidth="2" />
          <path d="M22 36 Q32 41 42 36" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="32" cy="22" r="13" fill="#f8fafc" stroke="#2D2319" strokeWidth="2" />
          <path d="M17 19 C17 9 47 9 47 19 Z" fill="#f59e0b" stroke="#2D2319" strokeWidth="2" />
          <ellipse cx="32" cy="19" rx="17" ry="3.5" fill="#d97706" stroke="#2D2319" strokeWidth="1.5" />
          <circle cx="32" cy="13" r="2.5" fill="#fbbf24" stroke="#2D2319" strokeWidth="1" />
          <rect x="22" y="19" width="20" height="8" rx="3" fill="#2D2319" stroke="#2D2319" strokeWidth="1.5" />
          <ellipse cx="27.5" cy="23" rx="3.5" ry="2.2" fill="#38bdf8" />
          <ellipse cx="36.5" cy="23" rx="3.5" ry="2.2" fill="#38bdf8" />
          <circle cx="28.5" cy="22" r="1" fill="#ffffff" />
          <circle cx="37.5" cy="22" r="1" fill="#ffffff" />
          <path d="M28 29 Q32 32.5 36 29" stroke="#2D2319" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
        <div className="absolute -bottom-1 w-9 h-2.5 bg-[#2D2319]/40 rounded-full animate-shadow-pulse" />
      </div>
    </div>
  );
}
