import React from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowRight, 
  Subtitles, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import { sound } from '../../utils/audio';

/**
 * Bottom Transport & Timeline Control Bar
 * Play/pause, 1x/1.25x speed, timeline with beat pips, caption toggle, skip to drill.
 */
export default function MotionTransportBar({
  isPlaying,
  onTogglePlay,
  onRestart,
  playbackRate,
  onToggleSpeed,
  currentTime,
  durationMs,
  onSeek,
  beats = [],
  currentBeatIndex,
  showCaptions,
  onToggleCaptions,
  onSkipToDrill
}) {
  const progressPercent = durationMs > 0 ? Math.min(100, (currentTime / durationMs) * 100) : 0;

  const formatTime = (ms) => {
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-3 select-none flex flex-col gap-2.5">
      
      {/* TIMELINE SCRUBBER WITH INTERACTIVE BEAT PIPS */}
      <div className="w-full flex items-center space-x-3">
        <span className="font-mono text-xs font-bold text-[#2D2319] w-10 text-right shrink-0">
          {formatTime(currentTime)}
        </span>

        <div 
          className="relative flex-1 h-3.5 bg-white border-2 border-[#2D2319] rounded-full shadow-[2px_2px_0px_#2D2319] cursor-pointer overflow-visible group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const targetPercent = Math.max(0, Math.min(1, clickX / rect.width));
            onSeek(targetPercent * durationMs);
          }}
        >
          {/* Progress fill */}
          <div 
            className="h-full bg-[#1888ff] rounded-full transition-all duration-100"
            style={{ width: `${progressPercent}%` }}
          />

          {/* Beat Markers / Pips along the timeline */}
          {beats.map((beat, idx) => {
            const pipPercent = (beat.at / durationMs) * 100;
            const isPassed = currentTime >= beat.at;
            const isCurrent = idx === currentBeatIndex;

            return (
              <div
                key={beat.id || idx}
                title={`Beat ${idx + 1}: ${beat.banner || beat.line.slice(0, 25)}...`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSeek(beat.at);
                }}
                className={`absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border border-[#2D2319] transition-transform duration-150 hover:scale-140 ${
                  isCurrent ? 'bg-[#F6C445] scale-125 z-10' :
                  isPassed ? 'bg-white' : 'bg-slate-300'
                }`}
                style={{ left: `${pipPercent}%` }}
              />
            );
          })}
        </div>

        <span className="font-mono text-xs font-bold text-[#2D2319]/60 w-10 shrink-0">
          {formatTime(durationMs)}
        </span>
      </div>

      {/* CONTROLS ROW */}
      <div className="w-full flex items-center justify-between gap-3">
        
        {/* Left: Play / Pause / Replay */}
        <div className="flex items-center space-x-2">
          {/* Play / Pause Button */}
          <button
            type="button"
            onClick={onTogglePlay}
            title={isPlaying ? "Pause (Space)" : "Play (Space)"}
            className="px-3.5 py-2 rounded-xl bg-[#F6C445] hover:bg-[#eab308] text-[#2D2319] font-mono text-xs font-black border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            <span className="hidden sm:inline font-display">{isPlaying ? "PAUSE" : "PLAY"}</span>
          </button>

          {/* Replay */}
          <button
            type="button"
            onClick={onRestart}
            title="Restart Lesson"
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-[#2D2319] border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Speed Toggle (1.0x / 1.25x) */}
          <button
            type="button"
            onClick={onToggleSpeed}
            title="Toggle Narration Speed"
            className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#2D2319] font-mono text-xs font-black border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            {playbackRate.toFixed(2).replace('.00', '')}x
          </button>
        </div>

        {/* Center: Caption Toggle */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={onToggleCaptions}
            title="Toggle Subtitles (T)"
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border-2 border-[#2D2319] shadow-[2px_2px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1.5 cursor-pointer ${
              showCaptions ? 'bg-[#1888ff] text-white' : 'bg-white text-[#2D2319]/70'
            }`}
          >
            <Subtitles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CC</span>
          </button>
        </div>

        {/* Right: Skip to Drill CTA */}
        <div>
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              onSkipToDrill();
            }}
            title="Skip to Practice Drill (Enter)"
            className="px-4 sm:px-6 py-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-display font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-[#2D2319] shadow-[3px_3px_0px_#2D2319] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-2 cursor-pointer"
          >
            <span>Start Drill</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

      </div>

    </div>
  );
}
