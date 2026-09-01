import React from 'react';
import { Volume2 } from 'lucide-react';

/**
 * High-Contrast Retro Ink Caption Bar
 * Displays the current narration beat in clear, crisp typography.
 */
export default function MotionCaptionBar({ currentBeat, totalBeats, isVisible = true }) {
  if (!isVisible || !currentBeat) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-2 select-none animate-in fade-in duration-150">
      <div className="w-full bg-[#2D2319] text-[#FDF8EE] border-2 border-[#2D2319] rounded-xl p-3 sm:p-4 shadow-[4px_4px_0px_rgba(45,35,25,0.4)] flex items-center space-x-3 transition-all duration-200">
        
        {/* Left: Volume/Speaker Icon Badge */}
        <div className="w-8 h-8 rounded-lg bg-[#F6C445] text-[#2D2319] border border-[#2D2319] flex items-center justify-center shrink-0 shadow-[1px_1px_0px_#000000]">
          <Volume2 className="w-4 h-4 stroke-[2.5]" />
        </div>

        {/* Center: Current Line */}
        <div className="flex-1 min-w-0">
          <p className="text-sm sm:text-base md:text-lg font-bold font-sans leading-snug tracking-normal">
            {currentBeat.line}
          </p>
        </div>

        {/* Right: Beat Index Indicator */}
        {currentBeat.id && totalBeats && (
          <div className="hidden sm:inline-flex px-2 py-1 rounded bg-[#453625] text-amber-300 font-mono text-[10px] font-bold shrink-0 border border-amber-400/20">
            {currentBeat.id} / {totalBeats}
          </div>
        )}

      </div>
    </div>
  );
}
