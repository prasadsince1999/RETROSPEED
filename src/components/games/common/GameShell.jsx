// Universal GameShell & HUD for all 8 RETROSPEED Workshop Games
// "Same in every game: Window chrome, HUD, 3 Paper Hearts, Score, Streak, WPM, Acc, Exit, Retry"
import React, { useState, useEffect } from 'react';
import {
  Heart,
  LogOut,
  RotateCcw,
  Pause,
  Play,
  Flame,
  Zap,
  Target,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { sound } from '../../../utils/audio';

export default function GameShell({
  title = 'WORKSHOP GAME',
  subtitle = 'PRACTICE',
  score = 0,
  streak = 0,
  lives = 3,
  maxLives = 3,
  wpm = 0,
  accuracy = 100,
  targetChar = null,
  targetWord = null,
  inputBuffer = '',
  isPaused = false,
  onTogglePause,
  onRestart,
  onExit,
  children
}) {
  // ESC to exit, SPACE / P to pause, R to restart
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (onExit) onExit();
      } else if ((e.key === 'p' || e.key === 'P') && e.ctrlKey) {
        e.preventDefault();
        if (onTogglePause) onTogglePause();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExit, onTogglePause]);

  return (
    <div className="relative w-full h-full flex flex-col justify-between font-sans select-none bg-[#FDF8EE] overflow-hidden">
      
      {/* TOP UNIFIED HUD BAR */}
      <div className="bg-[#FAF3E0] px-4 py-2.5 border-b-2 border-[#2D2319] shadow-[0px_2px_0px_#2D2319] flex items-center justify-between gap-3 text-xs font-mono font-bold text-[#2D2319] shrink-0 z-30">
        
        {/* Left: Title & 3 Paper Hearts */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              if (sound && typeof sound.playKeyClick === 'function') sound.playKeyClick();
              if (onExit) onExit();
            }}
            className="px-2 py-1 rounded-lg bg-[#FDF8EE] hover:bg-[#F28B82] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all text-xs font-bold text-[#2D2319] flex items-center space-x-1"
            title="Exit to Hub (Esc)"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit</span>
          </button>

          <div className="hidden md:block">
            <span className="font-display font-black text-sm text-[#2D2319]">{title}</span>
            <span className="text-[10px] text-[#2D2319]/70 font-mono ml-2">— {subtitle}</span>
          </div>

          {/* 3 Paper Hearts */}
          <div className="flex items-center space-x-1.5 pl-2 border-l border-[#2D2319]/20">
            {Array.from({ length: maxLives }).map((_, i) => {
              const isAlive = i < lives;
              return (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-md border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] flex items-center justify-center transition-all ${
                    isAlive ? 'bg-[#F28B82] text-[#2D2319] scale-100' : 'bg-[#FAF3E0] text-[#2D2319]/30 scale-90'
                  }`}
                  title={`Life ${i + 1}`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isAlive ? 'fill-[#2D2319]' : ''}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Center: Live Score & Streak */}
        <div className="flex items-center space-x-2">
          {/* Score Badge */}
          <div className="px-3 py-1 rounded-lg bg-[#FDF8EE] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] flex items-center space-x-1.5">
            <span className="text-[10px] text-[#2D2319]/70 uppercase">SCORE</span>
            <span className="font-black text-sm text-[#2D2319] font-mono">{score.toLocaleString()}</span>
          </div>

          {/* Streak Flame */}
          {streak > 1 && (
            <div className="px-2.5 py-1 rounded-lg bg-[#F6C445] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] flex items-center space-x-1 animate-in zoom-in-90 duration-100">
              <Flame className="w-3.5 h-3.5 fill-[#2D2319] text-[#2D2319]" />
              <span className="font-black text-xs text-[#2D2319]">{streak}x</span>
            </div>
          )}
        </div>

        {/* Right: Telemetry (WPM & Accuracy) + Pause & Restart */}
        <div className="flex items-center space-x-2">
          <div className="hidden sm:flex items-center space-x-2">
            <div className="px-2.5 py-1 rounded-lg bg-[#FDF8EE] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] flex items-center space-x-1 text-xs">
              <Zap className="w-3 h-3 text-[#F6C445] fill-[#F6C445]" />
              <span className="font-black">{wpm} WPM</span>
            </div>

            <div className="px-2.5 py-1 rounded-lg bg-[#FDF8EE] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] flex items-center space-x-1 text-xs">
              <Target className="w-3 h-3 text-[#10B981]" />
              <span className="font-black text-[#10B981]">{accuracy}%</span>
            </div>
          </div>

          {/* Pause Button */}
          {onTogglePause && (
            <button
              onClick={() => {
                if (sound && typeof sound.playKeyClick === 'function') sound.playKeyClick();
                onTogglePause();
              }}
              className="p-1.5 rounded-lg bg-[#FDF8EE] hover:bg-[#FAF3E0] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all text-[#2D2319]"
              title={isPaused ? 'Resume' : 'Pause (Ctrl+P)'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 fill-[#2D2319]" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Restart Button */}
          {onRestart && (
            <button
              onClick={() => {
                if (sound && typeof sound.playKeyClick === 'function') sound.playKeyClick();
                onRestart();
              }}
              className="p-1.5 rounded-lg bg-[#FDF8EE] hover:bg-[#F6C445] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all text-[#2D2319]"
              title="Restart Round"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {/* CENTER PLAYFIELD AREA */}
      <div className="relative flex-1 w-full overflow-hidden bg-[#FDF8EE]">
        {children}

        {/* PAUSE OVERLAY */}
        {isPaused && (
          <div className="absolute inset-0 bg-[#2D2319]/70 backdrop-blur-xs flex items-center justify-center z-40">
            <div className="bg-[#FAF3E0] border-3 border-[#2D2319] rounded-2xl p-6 shadow-[6px_6px_0px_#2D2319] text-center space-y-4 max-w-xs w-full animate-in zoom-in-95 duration-100">
              <div className="font-display font-black text-xl text-[#2D2319]">
                WORKSHOP PAUSED
              </div>
              <p className="text-xs font-mono text-[#2D2319]/80">
                Hands rested. The press is on hold.
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={onTogglePause}
                  className="w-full py-2 rounded-xl bg-[#48B89F] hover:bg-[#F6C445] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] font-mono text-xs font-black uppercase text-[#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                >
                  ▶ Resume Workshop
                </button>
                <button
                  onClick={onExit}
                  className="w-full py-2 rounded-xl bg-[#FDF8EE] hover:bg-[#F28B82] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] font-mono text-xs font-bold text-[#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                >
                  Exit to Hub
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM PROMPT / INPUT DOCK */}
      {(targetChar || targetWord !== null || inputBuffer !== null) && (
        <div className="bg-[#FAF3E0] px-4 py-2 border-t-2 border-[#2D2319] flex items-center justify-between gap-3 text-xs font-mono shrink-0 z-30">
          
          {/* Target Chip */}
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold text-[#2D2319]/70 uppercase">TARGET:</span>
            {targetChar && (
              <div className="px-3 py-1 rounded-lg bg-[#FDF8EE] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] font-mono font-black text-sm text-[#2D2319]">
                {targetChar === ' ' ? 'SPACE ␣' : targetChar}
              </div>
            )}
            {targetWord && (
              <div className="px-3 py-1 rounded-lg bg-[#FDF8EE] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] font-mono font-black text-xs text-[#2D2319]">
                {targetWord}
              </div>
            )}
          </div>

          {/* Current Input Stream */}
          {inputBuffer !== undefined && (
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold text-[#2D2319]/70 uppercase hidden sm:inline">INPUT:</span>
              <div className="px-3 py-1 rounded-lg bg-[#FDF8EE] border-2 border-[#2D2319] shadow-[1px_1px_0px_#2D2319] font-mono font-bold text-xs text-[#2D2319] min-w-[80px]">
                {inputBuffer || <span className="opacity-40 italic">Type letters...</span>}
              </div>
            </div>
          )}

          {/* Quick Helper */}
          <div className="text-[10px] font-mono text-[#2D2319]/60 hidden md:block">
            Esc: Exit · Space: Submit / Pause
          </div>

        </div>
      )}

    </div>
  );
}
