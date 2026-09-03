import React from 'react';
import { Lock, Check, Sparkles } from 'lucide-react';

export function StageBossMilestoneGate({ 
  fromStage, 
  toStage, 
  stageIndex,
  isUnlocked, 
  completedLevels, 
  totalLevels, 
  onInspectGate,
  onJumpToActive
}) {
  return (
    <div className="my-10 relative flex flex-col items-center justify-center select-none">
      <div className="w-full h-1 bg-[#2D2319]/20 absolute top-1/2 -translate-y-1/2 z-0" />

      <div className={`relative z-10 w-full max-w-xl p-4 sm:p-5 rounded-2xl border-2 border-[#2D2319] shadow-[4px_4px_0px_#2D2319] flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-200 ${
        isUnlocked ? 'bg-[#C7E8CA]' : 'bg-[var(--rs-paper-alt)]'
      }`}>
        
        {/* Left: Gate Badge & Lore */}
        <div className="flex items-center space-x-3 text-center sm:text-left">
          <div className={`w-11 h-11 rounded-xl border-2 border-[#2D2319] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#2D2319] ${
            isUnlocked ? 'bg-[#10B981] text-white' : 'bg-[#F6C445] text-[#2D2319]'
          }`}>
            {isUnlocked ? <Check className="w-6 h-6 stroke-[3]" /> : <Lock className="w-5 h-5 stroke-[2.5]" />}
          </div>

          <div>
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <span className="font-mono text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-white text-[#2D2319] border border-[#2D2319]">
                STAGE GATE #{stageIndex + 1}
              </span>
              <span className="font-mono text-xs font-bold text-[#2D2319]/70">
                {isUnlocked ? 'UNLOCKED' : `${completedLevels}/${totalLevels} Cleared`}
              </span>
            </div>
            <h4 className="font-display font-black text-base sm:text-lg text-[#2D2319] leading-tight mt-0.5">
              {toStage?.title || 'Next Milestone Stage'}
            </h4>
          </div>
        </div>

        {/* Right: Progress & Action */}
        <div className="flex items-center space-x-3 shrink-0">
          {!isUnlocked && (
            <button
              type="button"
              onClick={onJumpToActive}
              className="px-3.5 py-1.5 rounded-xl bg-[#F6C445] hover:bg-[#eab308] text-[#2D2319] font-mono text-xs font-black border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            >
              Resume Drill
            </button>
          )}
          {isUnlocked && (
            <div className="px-3 py-1 rounded-xl bg-white text-emerald-800 font-mono text-xs font-black border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>PASSED</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
