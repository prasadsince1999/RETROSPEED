import React from 'react';
import { X, Check, Lock, ChevronRight, Award, Layers, Star, Target, BookOpen } from 'lucide-react';
import { sound } from '../utils/audio';

export default function StageDrawer({ 
  isOpen, 
  onClose, 
  stages = [],
  userProgress = {}, 
  onSelectStage 
}) {
  // Handle Escape key
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const unlockedLevel = userProgress.unlockedLevel || 1;
  const totalStars = userProgress.totalStars || 0;
  const scores = userProgress.scores || {};
  const totalLessons = stages.length > 0 ? stages[stages.length - 1].end : 0;

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/60 select-none animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Table of Contents"
    >
      <div 
        className="w-full max-w-md bg-[var(--rs-paper)] h-full shadow-[-8px_0px_0px_#2D2319] flex flex-col justify-between animate-in slide-in-from-right duration-200 border-l-4 border-[#2D2319] font-sans text-[#2D2319]"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Retro OS Drawer Window Header Strip */}
        <div className="bg-[#C3A6E8] text-[#2D2319] p-4 border-b-2 border-[#2D2319] flex items-center justify-between font-mono">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-[#2D2319]" />
            <span className="font-black text-xs tracking-wider">TABLE_OF_CONTENTS.TXT</span>
            <span className="px-2 py-0.5 rounded bg-white text-[#2D2319] font-black text-[10px] border border-[#2D2319]">
              {stages.length} STAGES
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              onClose();
            }}
            className="w-7 h-7 bg-[#F28B82] hover:bg-rose-400 border-2 border-[#2D2319] rounded-lg flex items-center justify-center font-black text-xs text-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
            title="Close Drawer"
          >
            ✕
          </button>
        </div>

        {/* Sub-header info bar */}
        <div className="bg-[var(--rs-paper-alt)] px-4 py-2 border-b-2 border-[#2D2319] flex items-center justify-between text-xs font-mono font-bold text-[#2D2319]">
          <span>CURRICULUM INDEX</span>
          <span>{totalLessons} TOTAL LEVELS</span>
        </div>

        {/* Stages List Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-[var(--rs-paper)]">
          {stages.map((stage, idx) => {
            const isUnlocked = unlockedLevel >= stage.start;
            const stageLessonsCount = stage.end - stage.start + 1;
            
            // Count completed in stage
            let completedInStage = 0;
            for (let i = stage.start; i <= stage.end; i++) {
              if (scores[i]?.completed) {
                completedInStage++;
              }
            }

            const percent = Math.round((completedInStage / Math.max(1, stageLessonsCount)) * 100);
            const isFinished = percent === 100;

            return (
              <div
                key={stage.id || idx}
                onClick={() => {
                  sound.playKeyClick();
                  onSelectStage(stage);
                  onClose();
                }}
                className={`p-3.5 rounded-2xl border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] transition-all cursor-pointer ${
                  isUnlocked
                    ? 'bg-white hover:bg-amber-50 active:translate-x-0.5 active:translate-y-0.5'
                    : 'bg-[#FDF8EE]/50 opacity-60 cursor-not-allowed border-[#2D2319]/40'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  
                  {/* Left info */}
                  <div className="flex items-start space-x-3">
                    <div className={`w-9 h-9 rounded-xl border-2 border-[#2D2319] flex items-center justify-center font-mono font-black text-xs shrink-0 shadow-[1px_1px_0px_#2D2319] ${
                      isFinished
                        ? 'bg-[#10B981] text-white'
                        : isUnlocked
                        ? 'bg-[#F6C445] text-[#2D2319]'
                        : 'bg-[#FDF8EE] text-[#2D2319]/40'
                    }`}>
                      {isFinished ? (
                        <Check className="w-5 h-5 stroke-[3]" />
                      ) : isUnlocked ? (
                        `#${idx + 1}`
                      ) : (
                        <Lock className="w-4 h-4 text-[#2D2319]/40" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-mono text-[10px] font-bold text-[#2D2319]/60">
                          Levels {stage.start}–{stage.end}
                        </span>
                        {stage.goal && (
                          <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-100 px-1.5 rounded border border-sky-300">
                            {stage.goal}
                          </span>
                        )}
                      </div>
                      <h4 className="font-display font-black text-sm text-[#2D2319] mt-0.5">
                        {stage.title}
                      </h4>
                    </div>
                  </div>

                  {/* Right Progress % */}
                  <div className="text-right shrink-0">
                    <span className="font-mono text-xs font-black text-[#2D2319]">
                      {percent}%
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#2D2319]/40 ml-auto mt-1" />
                  </div>

                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-[var(--rs-paper)] rounded-full border border-[#2D2319] overflow-hidden mt-2.5 p-0.2">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      isFinished ? 'bg-[#10B981]' : 'bg-[#F6C445]'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Drawer Footer */}
        <div className="bg-[var(--rs-paper-alt)] p-4 border-t-2 border-[#2D2319] flex items-center justify-between font-mono text-xs font-bold text-[#2D2319]">
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Progress: {totalStars} Stars Earned</span>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              onClose();
            }}
            className="px-3 py-1 rounded-xl bg-white hover:bg-slate-100 text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer font-display"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
