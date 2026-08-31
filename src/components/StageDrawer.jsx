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
        className="w-full max-w-md bg-[#f8fafc] h-full shadow-[8px_0_0_#0f172a] flex flex-col justify-between animate-in slide-in-from-right duration-200 border-l-4 border-slate-900 font-sans"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Retro OS Drawer Window Header Strip */}
        <div className="bg-[#2c3e50] text-white p-4 border-b-2 border-slate-900 flex items-center justify-between font-mono">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span className="font-bold text-xs tracking-wider">TABLE_OF_CONTENTS.TXT</span>
            <span className="px-1.5 py-0.2 rounded bg-sky-600 text-white font-bold text-[10px]">
              {stages.length} STAGES
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              onClose();
            }}
            className="w-6 h-6 bg-[#f87171] hover:bg-rose-500 border-2 border-slate-900 rounded-lg flex items-center justify-center font-black text-xs text-slate-900 shadow-[1px_1px_0_#0f172a] active:translate-x-0.5 active:translate-y-0.5"
            title="Close Drawer"
          >
            ✕
          </button>
        </div>

        {/* Sub-header info bar */}
        <div className="bg-slate-100 px-4 py-2 border-b-2 border-slate-900 flex items-center justify-between text-xs font-mono font-bold text-slate-700">
          <span>CURRICULUM INDEX</span>
          <span>{totalLessons} TOTAL LEVELS</span>
        </div>

        {/* Stages List Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-[#f0f7fa]">
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
                className={`p-3.5 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0_#0f172a] transition-all cursor-pointer ${
                  isUnlocked
                    ? 'bg-white hover:bg-amber-50 active:translate-x-0.5 active:translate-y-0.5'
                    : 'bg-slate-200/80 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div className={`w-7 h-7 rounded-lg border-2 border-slate-900 flex items-center justify-center font-mono font-black text-xs shrink-0 shadow-[1px_1px_0_#0f172a] ${
                      isFinished 
                        ? 'bg-[#48bb78] text-slate-950' 
                        : isUnlocked 
                        ? 'bg-[#1888ff] text-white' 
                        : 'bg-slate-300 text-slate-600'
                    }`}>
                      {isFinished ? '✓' : idx + 1}
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-black text-xs sm:text-sm text-slate-900 truncate font-display">
                        {stage.title}
                      </h4>
                      <div className="text-[10px] text-slate-600 font-mono font-bold">
                        Levels {stage.start}–{stage.end} ({completedInStage}/{stageLessonsCount})
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 shrink-0">
                    <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border border-slate-900 ${
                      isFinished ? 'bg-emerald-200 text-emerald-950' : isUnlocked ? 'bg-sky-200 text-sky-950' : 'bg-slate-300 text-slate-700'
                    }`}>
                      {percent}%
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </div>
                </div>

                {stage.goal && (
                  <div className="text-[10px] text-slate-700 font-mono font-bold flex items-center space-x-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-300 mb-2">
                    <Target className="w-3 h-3 text-amber-600 shrink-0" />
                    <span className="truncate">{stage.goal}</span>
                  </div>
                )}

                {/* Retro Segmented / Striped Progress Bar */}
                <div className="w-full h-2.5 bg-slate-100 rounded-xs border border-slate-900 overflow-hidden">
                  <div 
                    className={`h-full ${isFinished ? 'bg-[#48bb78]' : 'bg-[#1888ff]'}`}
                    style={{ 
                      width: `${percent}%`,
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 6px)'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Drawer Footer */}
        <div className="p-3 sm:p-4 border-t-2 border-slate-900 bg-white flex items-center justify-between font-mono text-xs font-bold">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-lg bg-[#1888ff] text-white border-2 border-slate-900 shadow-[2px_2px_0_#0f172a]">
              Active: Lvl {unlockedLevel} / {totalLessons}
            </span>
          </div>
          
          <span className="px-2.5 py-1 rounded-lg bg-[#fef08a] text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] flex items-center space-x-1 font-black">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
            <span>{totalStars} Stars</span>
          </span>
        </div>

      </div>
    </div>
  );
}

