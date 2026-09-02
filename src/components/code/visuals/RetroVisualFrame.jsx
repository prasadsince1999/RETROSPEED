import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Layers
} from 'lucide-react';
import { sound } from '../../../utils/audio';

export default function RetroVisualFrame({
  title = 'Visual Concept Storyboard',
  analogy = 'Mental Model',
  frames = [],
  autoPlayInterval = 6000
}) {
  const [currentFrameIdx, setCurrentFrameIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const totalFrames = frames.length;
  const currentFrame = frames[currentFrameIdx] || { title: '', caption: '', render: () => null };

  useEffect(() => {
    let timer;
    if (isPlaying && totalFrames > 1) {
      timer = setInterval(() => {
        setCurrentFrameIdx(prev => (prev + 1) % totalFrames);
      }, autoPlayInterval);
    }
    return () => clearInterval(timer);
  }, [isPlaying, totalFrames, autoPlayInterval]);

  const handleNext = () => {
    sound.playKeyClick();
    setCurrentFrameIdx(prev => (prev + 1) % totalFrames);
  };

  const handlePrev = () => {
    sound.playKeyClick();
    setCurrentFrameIdx(prev => (prev - 1 + totalFrames) % totalFrames);
  };

  const handleJump = (idx) => {
    sound.playKeyClick();
    setCurrentFrameIdx(idx);
  };

  const togglePlay = () => {
    sound.playKeyClick();
    setIsPlaying(prev => !prev);
  };

  if (totalFrames === 0) return null;

  return (
    <div className="bg-[#FAF3E0] border-2 border-[#2D2319] rounded-2xl shadow-[4px_4px_0px_#2D2319] overflow-hidden flex flex-col font-sans transition-all">
      {/* 1. RETRO WINDOW TITLEBAR */}
      <div className="bg-[#C3A6E8] px-3.5 py-2 border-b-2 border-[#2D2319] flex items-center justify-between text-xs font-mono font-bold text-[#2D2319]">
        <div className="flex items-center space-x-2 truncate">
          <Layers className="w-3.5 h-3.5 text-[#2D2319]" />
          <span className="truncate">{title}</span>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <span className="px-2 py-0.5 rounded-md bg-[#F6C445] text-[#2D2319] text-[10px] font-black border border-[#2D2319] shadow-[1px_1px_0px_#2D2319]">
            💡 {analogy}
          </span>
          <span className="text-[11px] font-mono text-[#2D2319]/80 font-bold">
            Step {currentFrameIdx + 1}/{totalFrames}
          </span>
        </div>
      </div>

      {/* 2. VISUAL CANVAS STAGE */}
      <div className="p-4 sm:p-5 bg-[#FDF8EE] min-h-[220px] flex items-center justify-center relative overflow-hidden">
        {currentFrame.render ? currentFrame.render() : null}
      </div>

      {/* 3. NARRATIVE CAPTION & STEP CONTROLS BAR */}
      <div className="bg-[#FAF3E0] px-4 py-3 border-t-2 border-[#2D2319] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
        {/* Caption */}
        <div className="flex-1 space-y-0.5">
          <div className="flex items-center space-x-1.5 text-[11px] font-black text-[#2D2319]">
            <span className="w-2 h-2 rounded-full bg-[#48B89F]" />
            <span>{currentFrame.subtitle || currentFrame.title || `Step ${currentFrameIdx + 1}`}</span>
          </div>
          <p className="text-[11px] text-[#2D2319]/80 font-serif leading-relaxed">
            {currentFrame.caption}
          </p>
        </div>

        {/* Playback Controls & Frame Indicator Dots */}
        <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
          <div className="flex items-center space-x-1 mr-1">
            {frames.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleJump(idx)}
                className={`w-2.5 h-2.5 rounded-full border border-[#2D2319] transition-all cursor-pointer ${
                  currentFrameIdx === idx 
                    ? 'bg-[#F6C445] scale-125 shadow-[1px_1px_0px_#2D2319]' 
                    : 'bg-white hover:bg-[#C3A6E8]'
                }`}
                title={`Jump to step ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handlePrev}
            disabled={totalFrames <= 1}
            className="p-1.5 rounded-lg bg-[#FDF8EE] hover:bg-[#FAF3E0] border border-[#2D2319] shadow-[1px_1px_0px_#2D2319] text-[#2D2319] disabled:opacity-30 cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
            title="Previous Frame"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            className={`px-2 py-1 rounded-lg border border-[#2D2319] shadow-[1px_1px_0px_#2D2319] text-[10px] font-bold flex items-center space-x-1 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 ${
              isPlaying ? 'bg-[#48B89F] text-white' : 'bg-[#FDF8EE] text-[#2D2319]'
            }`}
            title={isPlaying ? 'Pause Auto-Play' : 'Auto-Play Storyboard'}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isPlaying ? 'Auto' : 'Play'}</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={totalFrames <= 1}
            className="px-2.5 py-1 rounded-lg bg-[#F6C445] hover:bg-[#fcd673] border border-[#2D2319] shadow-[1px_1px_0px_#2D2319] text-[#2D2319] font-black text-[11px] flex items-center space-x-1 cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
            title="Next Frame"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
